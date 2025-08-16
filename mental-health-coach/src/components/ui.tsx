import React from 'react';
import { View, Text, TouchableOpacity, TextInput, ViewStyle, TextStyle } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const Container: React.FC<{ children: React.ReactNode; style?: ViewStyle }>	= ({ children, style }) => (
	<View style={[{ flex: 1, padding: 20, gap: 16 }, style]}>{children}</View>
);

export const Card: React.FC<{ children: React.ReactNode; style?: ViewStyle }>	= ({ children, style }) => (
	<View
		style={[
			{
				backgroundColor: '#fff',
				borderRadius: 16,
				padding: 16,
				shadowColor: '#000',
				shadowOpacity: 0.06,
				shadowRadius: 10,
				elevation: 2,
			},
			style,
		]}
	>
		{children}
	</View>
);

export const Button: React.FC<{ title: string; onPress: () => void; disabled?: boolean; variant?: 'primary' | 'secondary' }>	= ({ title, onPress, disabled, variant = 'primary' }) => (
	<TouchableOpacity
		onPress={onPress}
		disabled={disabled}
		style={{
			backgroundColor: disabled ? '#A0AEC0' : variant === 'primary' ? '#5C6AC4' : '#E2E8F0',
			paddingVertical: 14,
			borderRadius: 12,
			alignItems: 'center',
		}}
	>
		<Text style={{ color: variant === 'primary' ? '#fff' : '#1A202C', fontWeight: '600', fontSize: 16 }}>{title}</Text>
	</TouchableOpacity>
);

export const Label: React.FC<{ text: string; style?: TextStyle }>	= ({ text, style }) => (
	<Text style={[{ color: '#2D3748', fontWeight: '600', marginBottom: 6 }, style]}>{text}</Text>
);

export const Input: React.FC<{
	value: string;
	onChangeText: (t: string) => void;
	placeholder?: string;
	keyboardType?: any;
	multiline?: boolean;
	numberOfLines?: number;
}>	= ({ value, onChangeText, placeholder, keyboardType, multiline, numberOfLines }) => (
	<TextInput
		value={value}
		onChangeText={onChangeText}
		placeholder={placeholder}
		keyboardType={keyboardType}
		multiline={multiline}
		numberOfLines={numberOfLines}
		style={{
			borderWidth: 1,
			borderColor: '#E2E8F0',
			padding: 12,
			borderRadius: 12,
			backgroundColor: '#fff',
		}}
	/>
);

export const HeaderRightPrivacy: React.FC = () => {
	const navigation = useNavigation<any>();
	return (
		<TouchableOpacity onPress={() => navigation.navigate('Privacy')}>
			<Text style={{ color: '#5C6AC4', fontWeight: '600' }}>Privacy</Text>
		</TouchableOpacity>
	);
};