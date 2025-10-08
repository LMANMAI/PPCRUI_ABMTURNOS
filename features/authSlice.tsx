import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export interface IUser {
  ok: boolean;
  status: string;
  accessToken: string;
  accessTokenExpiresIn: number;
  accessTokenExpiresAt: string;
  refreshToken: string;
  refreshTokenExpiresIn: number;
  refreshTokenExpiresAt: string;
  user: UserContentType;
}

export interface UserContentType {
  sub: string;
  orgId: string;
  email: string;
  name: string;
  profile: string;
  centerId: string;
  roles: string[];
  phone: string;
  usuarioVerificado: boolean;
  jti: string;
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

export const selectIsAuthenticated = (state: RootState) =>
  state.auth.authenticated;
export const selectUser = (state: RootState) => state.auth.user;

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
