import { Outlet, redirect, useNavigate } from "react-router-dom";

import { Sidebar } from "../components";
import customFetch from "../utils/customFetch";
import toast from "react-hot-toast";
import styles from "./AppLayout.module.css";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AxiosHeaders } from "axios";

const userQuery = {
  queryKey: ["user"],
  queryFn: async () => {
    const { data } = await customFetch("/user/current-user", {
      withCredentials: true,
    });
    return data;
  },
};

export const loader = (queryClient) => async () => {
  try {
    return await queryClient.ensureQueryData(userQuery);
  } catch (error) {
    return redirect("/");
  }
};

function AppLayout({ queryClient }) {
  const { user } = useQuery(userQuery).data;

  const navigate = useNavigate();
  const [isAuthError, setIsAuthError] = useState(false);
  const logoutUser = async () => {
    try {
      navigate("/");
      await customFetch.get("/user/logout");
      queryClient.invalidateQueries();
      toast.success("Logged out successfully");
    } catch (error) {
      return error;
    }
  };
  customFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error?.response?.status === 401) {
        setIsAuthError(true);
      }
      return Promise.reject(error);
    }
  );
  useEffect(() => {
    if (!isAuthError) return;
    logoutUser();
    // eslint-disable-next-line
  }, [isAuthError]);

  return (
    <div className={styles.layout}>
      <Sidebar logoutUser={logoutUser} />
      <main className={styles.container}>
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
