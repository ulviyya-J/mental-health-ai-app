import React from 'react';
import { View, Text } from 'react-native';
import { Container, Card, Button, HeaderRightPrivacy } from '../components/ui';
import { useAppStore } from '../store/useAppStore';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../App';

export type PremiumProps = NativeStackScreenProps<RootStackParamList, 'Premium'>;

const PremiumScreen: React.FC<PremiumProps> = ({ navigation }) => {
	const { activatePremium } = useAppStore();

	const features = [
		'Unlimited daily coaching tasks',
		'Deep‑dive weekly check‑ins',
		'Personalized habit plans',
		'Gentle reminders & progress insights',
		'Privacy‑first. Your data stays on device',
	];

	return (
		<Container>
			<Text style={{ fontSize: 28, fontWeight: '800', color: '#1A202C' }}>Continue your journey</Text>
			<Text style={{ color: '#4A5568', marginBottom: 8 }}>Become Premium for just $5/month. Cancel anytime.</Text>
			<Card>
				{features.map((f) => (
					<View key={f} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
						<View style={{ width: 8, height: 8, borderRadius: 8, backgroundColor: '#5C6AC4', marginRight: 8 }} />
						<Text style={{ color: '#2D3748' }}>{f}</Text>
					</View>
				))}
			</Card>
			<Button title="Start Premium — $5/month" onPress={() => { activatePremium(); navigation.replace('Plan'); }} />
			<Button title="Not now" onPress={() => navigation.replace('Plan')} variant="secondary" />
		</Container>
	);
};

export default PremiumScreen;