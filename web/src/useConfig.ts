import { useEffect, useReducer } from "react";
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

export function useConfig() {
  const [state, dispatch] = useReducer(configReducer, undefined, loadInitialState);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  return {
    goals: state.goals,
    selectedGoalIndex: state.selectedGoalIndex,
    assistantRequest: state.assistantRequest,
    assistantResponse: state.assistantResponse,
    selectGoal: (index: number) => dispatch({ type: "select-goal", index }),
    addGoal: (label: string) => dispatch({ type: "add-goal", label }),
    addAction: (goalIndex: number, label: string) => dispatch({ type: "add-action", goalIndex, label }),
    updateAction: (
      goalIndex: number,
      actionIndex: number,
      updates: { label?: string; details?: string }
    ) => dispatch({ type: "update-action", goalIndex, actionIndex, ...updates }),
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
