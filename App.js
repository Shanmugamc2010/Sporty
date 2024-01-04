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
import {Provider} from 'react-redux';
import {Persistor, Store} from './src/Redux/Store';
import {PersistGate} from 'redux-persist/integration/react';
import SportyLoader from './src/components/SportyLoader';

function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Color.White}}>
      <Provider store={Store}>
        <PersistGate loading={null} persistor={Persistor}>
          <RootStack />
          <SportyLoader />
        </PersistGate>
      </Provider>
    </SafeAreaView>
  );
}

export default App;
