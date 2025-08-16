import React from 'react';
import { View, Text } from 'react-native';
import { Container, Card } from '../components/ui';

const PrivacyScreen: React.FC = () => {
	return (
		<Container>
			<Text style={{ fontSize: 24, fontWeight: '800', color: '#1A202C' }}>Privacy & Safety</Text>
			<Card>
				<Text style={{ color: '#2D3748', marginBottom: 8 }}>• On‑device only: Your profile, entries, and plans are stored only on your device via secure storage.</Text>
				<Text style={{ color: '#2D3748', marginBottom: 8 }}>• No account required: We don't run servers or track you. No analytics, no ads.</Text>
				<Text style={{ color: '#2D3748', marginBottom: 8 }}>• You control data: Use the reset option in settings (coming soon) to wipe your data anytime.</Text>
				<Text style={{ color: '#4A5568', marginTop: 8, fontSize: 12 }}>This app provides wellbeing guidance and is not a substitute for professional care. If you're in crisis, contact local emergency services or a crisis hotline.</Text>
			</Card>
		</Container>
	);
};

export default PrivacyScreen;