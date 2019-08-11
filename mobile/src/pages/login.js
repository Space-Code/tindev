/**
 * Tindev
 * @author Rodrigo Santos de Souza
 *
 * @format
 * @flow
 */

import React, { useState, useEffect } from 'react';
import {
	KeyboardAvoidingView,
	TextInput,
	Image,
	StyleSheet,
	TouchableOpacity,
	Text,
	Platform
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import logo from '../assets/logo.png';

import api from '../service/api';

export default ({ navigation }) => {
	const [user, setUser] = useState('');

	useEffect(() => {
		AsyncStorage.getItem('id').then(id => {
			if (id) {
				navigation.navigate('Main', { id });
			}
		});
	});

	async function handleLogin() {
		const response = await api.post('/devs', {
			username: user
		});

		const { _id } = response.data.data;

		await AsyncStorage.setItem('id', _id);

		navigation.navigate('Main', { id: _id });
	}

	return (
		<KeyboardAvoidingView
			behavior="padding"
			enabled={Platform.OS === 'ios'}
			style={styles.container}
		>
			<Image source={logo} />
			<TextInput
				autoCapitalize="none"
				autoCorrect={false}
				placeholder="Digite o seu usuario do Github"
				value={user}
				onChangeText={setUser}
				style={styles.textInput}
			/>

			<TouchableOpacity onPress={handleLogin} style={styles.button}>
				<Text style={styles.buttonText}>Enviar</Text>
			</TouchableOpacity>
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f5f5f5',
		justifyContent: 'center',
		alignItems: 'center',
		padding: 30
	},

	textInput: {
		height: 60,
		alignSelf: 'stretch',
		backgroundColor: '#fff',
		borderWidth: 1,
		borderColor: '#ddd',
		borderRadius: 4,
		marginTop: 20,
		paddingHorizontal: 15
	},

	button: {
		height: 46,
		alignSelf: 'stretch',
		backgroundColor: '#df4623',
		borderRadius: 4,
		marginTop: 10,
		justifyContent: 'center',
		alignItems: 'center'
	},

	buttonText: {
		color: '#fff',
		fontWeight: 'bold',
		fontSize: 16
	}
});
