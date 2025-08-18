import React, { useState, useLayoutEffect } from 'react';
import { View, Text, Alert } from 'react-native';
import { Container, Card, Button, Input, Label, HeaderRightPrivacy } from '../components/ui';
import { useAppStore } from '../store/useAppStore';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../App';

export type FeelingsProps = NativeStackScreenProps<RootStackParamList, 'Feelings'>;

const FeelingsScreen: React.FC<FeelingsProps> = ({ navigation }) => {
	const { setEntryText, generate3DayPlan } = useAppStore();
	const [text, setText] = useState('');

	useLayoutEffect(() => {
		navigation.setOptions({ headerRight: () => <HeaderRightPrivacy /> });
	}, [navigation]);

	async function onGenerate() {
		if (!text.trim()) return;
		setEntryText(text.trim());
		await generate3DayPlan();
		navigation.replace('Plan');
	}

	return (
		<Container>
			<Text style={{ fontSize: 24, fontWeight: '800', color: '#1A202C' }}>How do you feel today and what do you think the problem is?</Text>
			<Card>
				<Label text="Share anything on your mind" />
				<Input value={text} onChangeText={setText} placeholder="e.g., I feel anxious about work deadlines..." multiline numberOfLines={6} />
			</Card>
			<Button title="Create my 3‑day plan" onPress={onGenerate} disabled={!text.trim()} />
			<View style={{ alignItems: 'center' }}>
				<Text style={{ color: '#718096', fontSize: 12 }}>Private by default. Stored only on your device.</Text>
			</View>
		</Container>
	);
};

export default FeelingsScreen;