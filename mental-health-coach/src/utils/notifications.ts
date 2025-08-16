import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import dayjs from 'dayjs';
import { Plan } from '../store/useAppStore';

export async function requestNotificationPermission() {
	if (Platform.OS === 'web') return;
	const { status } = await Notifications.requestPermissionsAsync();
	if (status !== 'granted') return;
	if (Platform.OS === 'android') {
		await Notifications.setNotificationChannelAsync('daily', {
			name: 'Daily Reminders',
			importance: Notifications.AndroidImportance.DEFAULT,
		});
	}
}

export async function schedule3DayPlanNotifications(plan: Plan) {
	if (Platform.OS === 'web') return;
	try {
		// Cancel previous
		await Notifications.cancelAllScheduledNotificationsAsync();
		const base = dayjs(plan.startDateISO);
		for (let i = 0; i < 3; i++) {
			const when = base.add(i, 'day').hour(9).minute(0).second(0);
			await Notifications.scheduleNotificationAsync({
				content: {
					title: `Day ${i + 1} — gentle nudge` as any,
					body: 'Your small tasks are ready. Take one tiny step.',
				},
				trigger: Platform.select({
					android: { channelId: 'daily', date: when.toDate() } as any,
					ios: { date: when.toDate() } as any,
					default: { date: when.toDate() } as any,
				}),
			});
		}
	} catch {}
}