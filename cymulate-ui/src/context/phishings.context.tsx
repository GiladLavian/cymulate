import { Message } from "@/@pymu/types";
import { usePhishingApi } from "@/app/api";
import {
  createContext,
  JSX,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
} from "react";
import { PhishingState, useUsersReducer } from "../../reducers";

export interface PhishingContextValue {
  state: PhishingState;
  findPhishings: () => void;
  createPhishing: (message: Partial<Message>) => Promise<Message | undefined>;
}

export const PhishingContext = createContext<PhishingContextValue>(
  {} as PhishingContextValue
);

export function usePhishings(): PhishingContextValue {
  const context = useContext(PhishingContext);
  if (!context) {
    throw new Error("useUsers must be used within a UsersProvider");
  }
  return context;
}

export function PhishingsProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const { findManyMessaging, createOneMessage } = usePhishingApi();
  const [state, dispatch] = useUsersReducer();

  const findPhishings = useCallback(async () => {
    dispatch({ type: "pending" });

    try {
      const response = await findManyMessaging();
      dispatch({ type: "fulfilled", payload: response.data });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }, [dispatch, findManyMessaging]);

  const createPhishing = useCallback(
    async (message: Partial<Message>) => {
      try {
        const response = await createOneMessage(message);
        return response.data;
      } catch (error) {
        dispatch({
          type: "rejected",
          payload: error instanceof Error ? error.message : "Unknown error",
        });
      }
    },
    [createOneMessage, dispatch]
  );

  useEffect(() => {
    findPhishings();
  }, [findPhishings]);

  return (
    <PhishingContext.Provider value={{ findPhishings, createPhishing, state }}>
      {children}
    </PhishingContext.Provider>
  );
}
