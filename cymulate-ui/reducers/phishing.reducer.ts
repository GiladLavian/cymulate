import { Message } from "@pymu/types";
import { useReducer } from "react";

export interface PhishingState {
  phishings: Message[];
  loading: boolean;
  error: string | null;
}

type PhishingsAction =
  | { type: "pending" }
  | { type: "fulfilled"; payload: Message[] }
  | { type: "rejected"; payload: string };

function phishingsReducer(
  state: PhishingState,
  action: PhishingsAction
): PhishingState {
  switch (action.type) {
    case "pending":
      return { ...state, loading: true, error: null };
    case "fulfilled":
      return {
        ...state,
        phishings: action.payload,
        loading: false,
        error: null,
      };
    case "rejected":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}
const initialPhshingsState: PhishingState = {
  phishings: [],
  loading: false,
  error: null,
};

export const useUsersReducer = () => {
  return useReducer(phishingsReducer, initialPhshingsState);
};
