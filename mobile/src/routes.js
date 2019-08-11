/**
 * Tindev
 * @author Rodrigo Santos de Souza
 *
 * @format
 * @flow
 */

import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Login from './pages/login';
import Main from './pages/main';

export default createAppContainer(
	createSwitchNavigator({
		Login,
		Main
	})
);
