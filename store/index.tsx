import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "@/features/counterSlice";
import authReducer, {
  AuthState,
  loadAuthState,
  saveAuthState,
} from "@/features/authSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const preloadedAuth = loadAuthState();

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
  },
  preloadedState: preloadedAuth ? { auth: preloadedAuth } : undefined,
});
store.subscribe(() => {
  const state = store.getState() as { auth: AuthState };
  saveAuthState(state.auth);
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
