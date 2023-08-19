import { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.post("/login", { email, password });
      if (response.status === 401) {
        // console.log(response.data.msg);
        setIsLoading(false);
        setError(response.data["data"].msg);
      }
      if (response.status === 200 && response.data.status === "Success") {
        // save the user to local storage
        localStorage.setItem("user", JSON.stringify(response.data.data));
        localStorage.setItem("token", JSON.stringify(response.data.token));

        // update the auth context
        dispatch({
          type: "LOGIN",
          payload: { user: response.data.data, token: response.data.token },
        });

        // update loading state
        setIsLoading(false);
      }
    } catch (error) {
      setError("Something went wrong. Please try again later.");
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};
