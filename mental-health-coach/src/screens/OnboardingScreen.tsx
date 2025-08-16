import React, { useState } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { Container, Card, Button, Input, Label, HeaderRightPrivacy } from '../components/ui';
import { useAppStore } from '../store/useAppStore';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../App';

export type OnboardingProps = NativeStackScreenProps<RootStackParamList, 'Onboarding'>;

const OnboardingScreen: React.FC<OnboardingProps> = ({ navigation }) => {
	const { setUserProfile } = useAppStore();
	const [name, setName] = useState('');
	const [age, setAge] = useState('');
	const [gender, setGender] = useState('');
	const [job, setJob] = useState('');
	const [birthday, setBirthday] = useState('');
	const [status, setStatus] = useState('');

	navigation.setOptions({ headerRight: () => <HeaderRightPrivacy /> });

	function onContinue() {
		if (!name.trim()) return;
		setUserProfile({
			name: name.trim(),
			age: age ? Number(age) : undefined,
			gender: gender || undefined,
			job: job || undefined,
			birthday: birthday || undefined,
			status: status || undefined,
		});
		navigation.replace('Feelings');
	}

	return (
		<ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
			<Container>
				<Text style={{ fontSize: 28, fontWeight: '800', color: '#1A202C' }}>Welcome</Text>
				<Text style={{ color: '#4A5568' }}>Let's personalize your 3‑day support. You can edit this later.</Text>
				<Card>
					<Label text="Name" />
					<Input value={name} onChangeText={setName} placeholder="e.g., Alex" />
					<Label text="Age" />
					<Input value={age} onChangeText={setAge} placeholder="e.g., 28" keyboardType="numeric" />
					<Label text="Gender" />
					<Input value={gender} onChangeText={setGender} placeholder="optional" />
					<Label text="Job" />
					<Input value={job} onChangeText={setJob} placeholder="optional" />
					<Label text="Birthday" />
					<Input value={birthday} onChangeText={setBirthday} placeholder="YYYY-MM-DD (optional)" />
					<Label text="Status" />
					<Input value={status} onChangeText={setStatus} placeholder="single/married/student/etc. (optional)" />
				</Card>
				<Button title="Continue" onPress={onContinue} disabled={!name.trim()} />
				<View style={{ alignItems: 'center' }}>
					<Text style={{ color: '#718096', fontSize: 12 }}>We store only on your device. No account required.</Text>
				</View>
			</Container>
		</ScrollView>
	);
};

export default OnboardingScreen;