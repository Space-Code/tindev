/**
 * Tindev
 * @author Rodrigo Santos de Souza
 *
 * @format
 * @flow
 */

import React from 'react';
import { YellowBox } from 'react-native';

YellowBox.ignoreWarnings(['Unrecognized WebSocket']);

import Routes from './routes';

const App = () => {
	return <Routes />;
};

export default App;
