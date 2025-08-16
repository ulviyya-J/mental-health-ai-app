import React, { useLayoutEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Container, Card, Button, HeaderRightPrivacy } from '../components/ui';
import { useAppStore } from '../store/useAppStore';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../App';
import dayjs from 'dayjs';

export type PlanProps = NativeStackScreenProps<RootStackParamList, 'Plan'>;

const PlanScreen: React.FC<PlanProps> = ({ navigation }) => {
	const { plan, toggleTask, goToNextDayIfReady } = useAppStore();

	useLayoutEffect(() => {
		navigation.setOptions({ headerRight: () => <HeaderRightPrivacy /> });
	}, [navigation]);

	if (!plan) {
		return (
			<Container>
				<Text style={{ fontSize: 18 }}>No plan yet.</Text>
				<Button title="Start" onPress={() => navigation.replace('Onboarding')} />
			</Container>
		);
	}

	const day = plan.days[plan.currentDayIndex];
	const isLastDay = plan.currentDayIndex === 2;
	const allDone = day.tasks.every((t) => t.completed);

	return (
		<Container>
			<Text style={{ fontSize: 22, fontWeight: '800', color: '#1A202C' }}>Day {plan.currentDayIndex + 1}</Text>
			<Text style={{ color: '#718096', marginBottom: 8 }}>{dayjs(day.dateISO).format('dddd, MMM D')}</Text>
			<Card>
				{day.tasks.map((task) => (
					<TouchableOpacity key={task.id} onPress={() => toggleTask(plan.currentDayIndex, task.id)} style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 12 }}>
						<View style={{ width: 24, height: 24, borderRadius: 6, borderWidth: 2, borderColor: task.completed ? '#5C6AC4' : '#CBD5E0', backgroundColor: task.completed ? '#5C6AC4' : 'transparent', marginRight: 12 }} />
						<Text style={{ flex: 1, color: '#2D3748', textDecorationLine: task.completed ? 'line-through' : 'none' }}>{task.text}</Text>
					</TouchableOpacity>
				))}
			</Card>
			{!isLastDay && (
				<Button title={allDone ? 'Go to next day' : 'Complete tasks to continue'} onPress={goToNextDayIfReady} disabled={!allDone} />
			)}
			{isLastDay && (
				<Button title={allDone ? 'Finish and continue' : 'Complete tasks to finish'} onPress={() => navigation.replace('Premium')} disabled={!allDone} />
			)}
		</Container>
	);
};

export default PlanScreen;