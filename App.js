/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {RootStack} from './src/navigation/RootStack';
import Color from './src/utils/themes/colors';

function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Color.White}}>
      <RootStack />
    </SafeAreaView>
  );
}

export default App;
