import { useState } from "react";
import { logoutUser, setUser } from "../../features/auth/authSlice";
import { useEffect } from "react";
import axios from "../../api/axios";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Spinner from "./Spinner";
import { Outlet } from "react-router-dom";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    // try getting new access token using refresh token
    let isMounted = true;
    const abortController = new AbortController();
    const verifyRefresh = async () => {
      try {
        const response = await axios.get("/auth/refresh", {
          signal: abortController.signal,
        });
        if (isMounted) {
          dispatch(setUser(response.data));
          setIsLoading(false);
        }
      } catch (error) {
        if (error instanceof Error && error.name !== "CanceledError") {
          setIsLoading(false);
          dispatch(logoutUser());
        }
      }
    };

    !user?.accessToken ? verifyRefresh() : setIsLoading(false);
    return () => {
      isMounted = false;
      abortController.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <Spinner />;
  }
  return <Outlet />;
};

export default PersistLogin;
