import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { navigationReducer } from './slices/navigationSlice';
import { cartReducer } from './slices/cartSlice';

const rootReducer = combineReducers({
  navigationReducer,
  cartReducer,
});
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cartReducer'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const setupStore = () =>
  configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });
export const store = setupStore();
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
