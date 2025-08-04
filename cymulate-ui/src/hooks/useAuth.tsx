import { useAuthApi } from "@/app/api";
import { useCallback } from "react";

export function useAuth() {
  const authApi = useAuthApi();

  const signin = useCallback(
    async (email: string, password: string) => {
      try {
        const { data } = await authApi.signin(email, password);
        if (data?.access_token) {
          // Store the access token in local storage or context as needed
          localStorage.setItem("access_token", data.access_token);
        } else {
          throw new Error("Authentication failed: No access token received");
        }
      } catch (e) {
        const error = e as any;
        if (error.status === 401) {
          throw new Error("Invalid email or password");
        }

        throw new Error(
          "An unexpected error occurred. Please try again later."
        );
      }

      return true;
    },
    [authApi]
  );

  const signout = useCallback(async () => {
    return new Promise((resolve, reject) => {});
  }, []);

  const signup = useCallback(
    async (
      email: string,
      password: string,
      firstName: string,
      lastName: string
    ) => {
      try {
        const { data } = await authApi.signup(
          email,
          password,
          firstName,
          lastName
        );
      } catch (e) {
        const error = e as any;
        if (error.status === 400) {
          throw new Error("Invalid input data");
        }

        throw new Error(
          "An unexpected error occurred. Please try again later."
        );
      }

      return true;
    },
    [authApi]
  );

  return {
    signin,
    signout,
    signup,
  };
}
