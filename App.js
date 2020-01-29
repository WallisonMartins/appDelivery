import React from 'react';
import {StatusBar} from 'react-native';

import Routes from './src/routes';

export default function App() {
  return (
    <>
      {/* <StatusBar  backgroundColor="#ff3" barStyle="light-content"/> */}
      <StatusBar  backgroundColor="#ff3"/>
      <Routes />
    </>
  );
}
