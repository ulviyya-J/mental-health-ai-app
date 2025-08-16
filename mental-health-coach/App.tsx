import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingScreen from './src/screens/OnboardingScreen';
import FeelingsScreen from './src/screens/FeelingsScreen';
import PlanScreen from './src/screens/PlanScreen';
import PremiumScreen from './src/screens/PremiumScreen';
import PrivacyScreen from './src/screens/PrivacyScreen';

export type RootStackParamList = {
	Onboarding: undefined;
	Feelings: undefined;
	Plan: undefined;
	Premium: undefined;
	Privacy: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppTheme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		background: '#F7FAFC',
	},
};

export default function App() {
	return (
		<NavigationContainer theme={AppTheme}>
			<StatusBar style="dark" />
			<Stack.Navigator>
				<Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ headerShown: false }} />
				<Stack.Screen name="Feelings" component={FeelingsScreen} options={{ title: 'How are you today?' }} />
				<Stack.Screen name="Plan" component={PlanScreen} options={{ title: 'Your 3‑Day Plan' }} />
				<Stack.Screen name="Premium" component={PremiumScreen} options={{ title: 'Go Premium' }} />
				<Stack.Screen name="Privacy" component={PrivacyScreen} options={{ title: 'Privacy' }} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}
