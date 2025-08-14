import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IUser {
  username: string;
  name: string;
  groups: string[];
  legajo: string;
  account: Record<string, unknown>;
  suc: unknown[];
}

export interface AuthState {
  user: IUser | null;
  authenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  authenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
      state.authenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.authenticated = false;
    },
    hydrate: (_state, action: PayloadAction<AuthState | undefined>) => {
      return action.payload ?? initialState;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;

export const selectIsAuthenticated = (s: any) => s.auth.authenticated;
export const selectUser = (s: any) => s.auth.user;

export default authSlice.reducer;

const KEY = "auth_state_v1";
export const saveAuthState = (state: AuthState) => {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {}
};

export const loadAuthState = (): AuthState | undefined => {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return undefined;
    return JSON.parse(raw) as AuthState;
  } catch {
    return undefined;
  }
};

export const clearAuthState = () => {
  try {
    localStorage.removeItem(KEY);
  } catch {}
};
