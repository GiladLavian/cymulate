import { useHttp } from "@/hooks";
import { User } from "@pymu/types";
import { useCallback } from "react";

export function useUsersApi() {
  const { get, post, patch, put, remove } = useHttp();

  const findManyUsers = useCallback(async () => {
    return get<User[]>("findManyUsers");
  }, [get]);

  const createUser = useCallback(
    async (user: User) => {
      return post<User>("createUser", user);
    },
    [post]
  );

  const updateUser = useCallback(
    async (userId: string, userData: any) => {
      return patch<User>(`users/${userId}`, userData);
    },
    [patch]
  );

  const deleteUser = useCallback(
    async (userId: string) => {
      return remove<User>(`users/${userId}`);
    },
    [remove]
  );

  return {
    findManyUsers,
    createUser,
    updateUser,
    deleteUser,
  };
}
