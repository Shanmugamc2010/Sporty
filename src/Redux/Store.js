import {applyMiddleware, createStore} from 'redux';
import {mainReducer} from './Reducer';
import {persistReducer, persistStore} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import thunk from 'redux-thunk'; // Correct the import statement

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['loginData', 'isFirstTimeAppOpen', 'stateData'], // You can add the whitelist here if needed
};
const persistedReducer = persistReducer(persistConfig, mainReducer);
const Store = createStore(persistedReducer, applyMiddleware(thunk));
const Persistor = persistStore(Store);

export {Store, Persistor};
