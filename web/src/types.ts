export type Action = {
  label: string
  details: string
}

export type Goal = {
  label: string
  actions: Action[]
}

export type ConfigAction =
  | { type: "select-goal"; index: number }
  | { type: "add-goal"; label: string }
  | { type: "rename-goal"; index: number; label: string }
  | {
    type: "update-action";
    goalIndex: number;
    actionIndex: number;
    label?: string;
    details?: string;
  };

export type ConfigState = {
  goals: Goal[],
  selectedGoalIndex: number;
}
