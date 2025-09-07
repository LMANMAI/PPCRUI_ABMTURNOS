import { useEffect } from "react";
import { useAppSelector } from "@/store";
import {
  selectIsAuthenticated,
  selectUser,
  logout,
} from "../features/authSlice";
import {
  scheduleAutoLogout,
  cancelAutoLogout,
} from "../containers/Login/sessionManager";
import { useAppDispatch } from "@/store";
import RouterProvider from "../routes";

function App() {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(selectIsAuthenticated);
  const authUser = useAppSelector(selectUser);

  useEffect(() => {
    if (!isAuth || !authUser) {
      cancelAutoLogout();
      return;
    }
    scheduleAutoLogout(authUser.accessTokenExpiresAt, () => {
      dispatch(logout());
    });

    return () => cancelAutoLogout();
  }, [isAuth, authUser, dispatch]);

  return <RouterProvider />;
}

export default App;
