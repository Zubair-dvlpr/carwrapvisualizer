// Library Imports
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
// LOCAL IMPORTS
import currentUserSlice from './features/auth/authSlice';

// Local Imports

// Define the persist configuration
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['currentUser']
};

// Combine your reducers
const rootReducer = combineReducers({
  currentUser: currentUserSlice
});

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store with the persisted reducer
export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }),
  devTools: process.env.NODE_ENV !== 'production'
});

// Create a persistor
export const persistor = persistStore(store);
