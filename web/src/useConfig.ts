import { useReducer } from "react";
import { defaultGoals } from "./data";
import { configReducer } from "./reducers";

const initialState = {
  goals: defaultGoals,
  selectedGoalIndex: 0
}

export function useConfig() {
  const [state, dispatch] = useReducer(configReducer, initialState);

  return {
    goals: state.goals,
    selectedGoalIndex: state.selectedGoalIndex,
    selectGoal: (index: number) => dispatch({ type: "select-goal", index }),
    addGoal: (label: string) => dispatch({ type: "add-goal", label }),
    addAction: (goalIndex: number, label: string) => dispatch({ type: "add-action", goalIndex, label }),
    updateAction: (
      goalIndex: number,
      actionIndex: number,
      updates: { label?: string; details?: string }
    ) => dispatch({ type: "update-action", goalIndex, actionIndex, ...updates }),
  }
}
