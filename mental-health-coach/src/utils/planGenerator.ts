import dayjs, { Dayjs } from 'dayjs';
import { PlanDay, Task, UserProfile } from '../store/useAppStore';

const categories: Record<string, { keywords: string[]; tasks: string[] }> = {
	sadness: {
		keywords: ['sad', 'down', 'depressed', 'tear', 'blue', 'grief', 'lonely'],
		tasks: [
			'Write down 3 things you are grateful for',
			'Go for a 10‑minute walk in fresh air',
			'Listen to one uplifting song',
			'Have a warm tea or water and breathe slowly for 2 minutes',
			'Pet an animal or watch a cute animal video',
		],
	},
	anxiety: {
		keywords: ['anxious', 'worry', 'panic', 'fear', 'overthink', 'nervous'],
		tasks: [
			'Do a 4‑7‑8 breathing cycle 4 times',
			'Name 5 things you can see, 4 you can feel, 3 you can hear',
			'Limit news/social media for 1 hour',
			'Note your top 1 concern and one tiny next step',
			'Declutter one small surface for 5 minutes',
		],
	},
	stress: {
		keywords: ['stress', 'overload', 'busy', 'deadline', 'burnout', 'tired'],
		tasks: [
			'Plan a 25‑minute focused block with a 5‑minute break',
			'Drink a glass of water and stretch shoulders',
			'Write a mini to‑do with max 3 items for today',
			'Block 15 minutes for yourself this evening',
			'Close 1 open tab/task right now',
		],
	},
	loneliness: {
		keywords: ['lonely', 'alone', 'isolated', 'no one', 'friendless'],
		tasks: [
			'Send a hello message to someone you trust',
			'Say hi to a neighbor/barista/stranger',
			'Share a meme or song with a friend',
			'Join one online group or forum you like',
			'Compliment someone today',
		],
	},
	anger: {
		keywords: ['angry', 'mad', 'rage', 'irritated', 'frustrated'],
		tasks: [
			'Do 20 slow shoulder rolls and unclench your jaw',
			'Write an unsent letter to vent safely',
			'Do 10 squats or a brisk 3‑minute walk',
			'Cool down: splash water on face or hold a cold drink',
			'Name what boundary you need to set today',
		],
	},
	selfesteem: {
		keywords: ['worthless', 'failure', 'not good enough', 'hate myself', 'insecure'],
		tasks: [
			'Write one kind sentence to yourself using your name',
			'Wear an outfit that feels comfortable and you',
			'List 3 small wins from the past week',
			'Do one act of tidy‑up for Future You',
			'Practice saying “no” once today',
		],
	},
	relationship: {
		keywords: ['breakup', 'relationship', 'partner', 'family', 'mom', 'dad'],
		tasks: [
			'Call or text a supportive person',
			'Write what you need from others this week',
			'Plan a 20‑minute shared activity',
			'Set a gentle boundary in one conversation',
			'Express appreciation to someone',
		],
	},
};

function pickCategoryScores(text: string): string[] {
	const lower = text.toLowerCase();
	const scores: Record<string, number> = {};
	Object.entries(categories).forEach(([cat, def]) => {
		scores[cat] = def.keywords.reduce((acc, kw) => acc + (lower.includes(kw) ? 1 : 0), 0);
	});
	return Object.keys(scores)
		.sort((a, b) => scores[b] - scores[a])
		.slice(0, 2);
}

function uniqueId(prefix: string) {
	return `${prefix}-${Math.random().toString(36).slice(2, 8)}`;
}

function personalize(task: string, profile: UserProfile): string {
	let t = task;
	if (profile.name) t = t.replace('yourself', `${profile.name}`);
	if (/mom|mother/i.test(task)) {
		// leave as is
	}
	return t;
}

export function generatePlan(entryText: string, profile: UserProfile, start: Dayjs): PlanDay[] {
	const top = pickCategoryScores(entryText);
	const pool = top.flatMap((c) => categories[c]?.tasks ?? []);
	const fallback = ['Drink water and take 5 slow breaths', 'Step outside for fresh air', 'Tidy one small area', 'Call your mom or a supportive person', 'Feed or watch a cat/dog/bird'];
	const combined = [...new Set([...pool, ...fallback])];

	function pick(n: number, offset: number): string[] {
		const out: string[] = [];
		for (let i = 0; i < n; i++) {
			const idx = (i * 3 + offset) % combined.length;
			out.push(combined[idx]);
		}
		return out;
	}

	const day1Tasks = pick(3, 0).map((text) => ({ id: uniqueId('d1'), text: personalize(text, profile), completed: false } as Task));
	const day2Tasks = pick(3, 1).map((text) => ({ id: uniqueId('d2'), text: personalize(text, profile), completed: false } as Task));
	const day3Tasks = pick(3, 2).map((text) => ({ id: uniqueId('d3'), text: personalize(text, profile), completed: false } as Task));

	const days: PlanDay[] = [
		{ dateISO: start.toISOString(), tasks: day1Tasks },
		{ dateISO: start.add(1, 'day').toISOString(), tasks: day2Tasks },
		{ dateISO: start.add(2, 'day').toISOString(), tasks: day3Tasks },
	];
	return days;
}