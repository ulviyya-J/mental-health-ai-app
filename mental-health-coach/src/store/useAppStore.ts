import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import * as SecureStore from 'expo-secure-store';
import dayjs from 'dayjs';
import { generatePlan } from '../utils/planGenerator';
import { schedule3DayPlanNotifications, requestNotificationPermission } from '../utils/notifications';

export type UserProfile = {
	name: string;
	age?: number;
	gender?: string;
	job?: string;
	birthday?: string;
	status?: string;
};

export type Task = {
	id: string;
	text: string;
	completed: boolean;
};

export type PlanDay = {
	dateISO: string;
	tasks: Task[];
};

export type Plan = {
	startDateISO: string;
	days: PlanDay[]; // 3 days
	currentDayIndex: number; // 0..2
	completed: boolean;
};

export type AppState = {
	userProfile?: UserProfile;
	entryText?: string;
	plan?: Plan;
	premiumActive: boolean;
	// actions
	setUserProfile: (profile: UserProfile) => void;
	setEntryText: (text: string) => void;
	generate3DayPlan: () => Promise<void>;
	toggleTask: (dayIndex: number, taskId: string) => void;
	goToNextDayIfReady: () => void;
	activatePremium: () => void;
	resetAll: () => void;
};

const secureStorage = createJSONStorage(() => ({
	getItem: async (key: string) => {
		try {
			const value = await SecureStore.getItemAsync(key);
			return value ?? null;
		} catch (e) {
			return null;
		}
	},
	setItem: async (key: string, value: string) => {
		try {
			await SecureStore.setItemAsync(key, value);
		} catch {}
	},
	removeItem: async (key: string) => {
		try {
			await SecureStore.deleteItemAsync(key);
		} catch {}
	},
}));

export const useAppStore = create<AppState>()(
	persist(
		(set, get) => ({
			userProfile: undefined,
			entryText: undefined,
			plan: undefined,
			premiumActive: false,

			setUserProfile: (profile) => set({ userProfile: profile }),
			setEntryText: (text) => set({ entryText: text }),

			generate3DayPlan: async () => {
				const profile = get().userProfile;
				const entry = get().entryText?.trim();
				if (!profile || !entry) return;

				const start = dayjs();
				const days = generatePlan(entry, profile, start);
				const plan: Plan = {
					startDateISO: start.toISOString(),
					days,
					currentDayIndex: 0,
					completed: false,
				};
				set({ plan });

				await requestNotificationPermission();
				schedule3DayPlanNotifications(plan);
			},

			toggleTask: (dayIndex, taskId) => {
				const plan = get().plan;
				if (!plan) return;
				const updatedDays = plan.days.map((day, idx) => {
					if (idx !== dayIndex) return day;
					return {
						...day,
						tasks: day.tasks.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t)),
					};
				});
				set({ plan: { ...plan, days: updatedDays } });
			},

			goToNextDayIfReady: () => {
				const plan = get().plan;
				if (!plan) return;
				const today = plan.days[plan.currentDayIndex];
				const allDone = today.tasks.every((t) => t.completed);
				if (!allDone) return;
				if (plan.currentDayIndex < 2) {
					set({ plan: { ...plan, currentDayIndex: plan.currentDayIndex + 1 } });
				} else {
					set({ plan: { ...plan, completed: true } });
				}
			},

			activatePremium: () => set({ premiumActive: true }),

			resetAll: () => set({ userProfile: undefined, entryText: undefined, plan: undefined, premiumActive: false }),
		}),
		{ name: 'mhc-store', storage: secureStorage }
	)
);