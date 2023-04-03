import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../services/authApi";
import { translateApi } from "../services/translateApi";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import authReducer from "../features/authSlice"
import tokenReducer from "../features/tokenSlice"
import translateReducer from "../features/translateSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    token: tokenReducer,
    translate: translateReducer,
    [authApi.reducerPath]: authApi.reducer,
    [translateApi.reducerPath]: translateApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
setupListeners(store.dispatch);
