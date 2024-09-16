import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { authApi } from '../services/authApi';
import formReducer from './slices/formSlice';

const store = configureStore({
  reducer: {
    form: formReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

setupListeners(store.dispatch);

export default store;
