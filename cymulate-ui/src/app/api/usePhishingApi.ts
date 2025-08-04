import { useHttp } from "@/hooks";
import { Message } from "@pymu/types";
import { useCallback } from "react";

export function usePhishingApi() {
  const { get, post, patch, put, remove } = useHttp();

  const findManyMessages = useCallback(async () => {
    return get<Message[]>("findManyMessages");
  }, [get]);

  const createOneMessage = useCallback(
    async (message: Partial<Message>) => {
      return post<Message>("createOneMessage", message);
    },
    [post]
  );

  const updateMessage = useCallback(async (userId: string, userData: any) => {
    throw new Error("Not implemented");
  }, []);

  const deleteMessage = useCallback(async (messageId: string) => {
    throw new Error("Not implemented");
  }, []);

  return {
    findManyMessaging: findManyMessages,
    createOneMessage,
    updateMessage,
    deleteMessage,
  };
}
