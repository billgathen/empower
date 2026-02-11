import { useEffect, useReducer, useState } from "react";
import { defaultGoals } from "./data";
import { configReducer } from "./reducers";
import { AssistantResponse } from "./types";

const STORAGE_KEY = "empower-config";
const initialState = {
  goals: defaultGoals,
  selectedGoalIndex: 0,
  assistantRequest: { type: "", requestText: "" },
  assistantResponse: ""
}

type Authorized = boolean | null;

export function useConfig() {
  const [state, dispatch] = useReducer(configReducer, undefined, loadInitialState);
  /* let this reset on page refresh */
  const [assistantIsAuthorized, setAssistantIsAuthorized] = useState<Authorized>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  return {
    goals: state.goals,
    selectedGoalIndex: state.selectedGoalIndex,
    assistantIsAuthorized: assistantIsAuthorized,
    assistantRequest: state.assistantRequest,
    assistantResponse: state.assistantResponse,
    selectGoal: (index: number) => dispatch({ type: "select-goal", index }),
    updateGoal: (index: number, label: string) => dispatch({ type: "update-goal", index, label }),
    addGoal: (label: string) => dispatch({ type: "add-goal", label }),
    deleteGoal: () => dispatch({ type: "delete-goal" }),
    addAction: (goalIndex: number, label: string) => dispatch({ type: "add-action", goalIndex, label }),
    updateAction: (
      goalIndex: number,
      actionIndex: number,
      updates: { label?: string; details?: string }
    ) => dispatch({ type: "update-action", goalIndex, actionIndex, ...updates }),
    setAssistantIsAuthorized: (assistantIsAuthorized: boolean) => setAssistantIsAuthorized(assistantIsAuthorized),
    setAssistantResponse: (assistantResponse: AssistantResponse) => dispatch({ type: "set-assistant-response", assistantResponse }),
  }
}

function loadInitialState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialState;

    const parsed = JSON.parse(raw);

    return {
      ...initialState,
      ...parsed
    };
  } catch {
    console.error("Error loading initialState from localStorage");
    return initialState;
  }
}
