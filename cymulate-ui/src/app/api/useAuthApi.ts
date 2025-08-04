import { useHttp } from "@/hooks";
import { useCallback } from "react";

export function useAuthApi() {
  const { get, post, patch, put, remove } = useHttp();

  const signin = useCallback(
    async (email: string, password: string) => {
      return post<{ access_token: string }>("auth/signin", { email, password });
    },
    [post]
  );

  const signup = useCallback(
    async (
      email: string,
      password: string,
      firstName: string,
      lastName: string
    ) => {
      return post<{ access_token: string }>("auth/signup", {
        email,
        password,
        firstName,
        lastName,
      });
    },
    [post]
  );

  return {
    signin,
    signup
  };
}
