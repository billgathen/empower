export type Action = {
  label: string
  details: string
}

export type Goal = {
  label: string
  actions: Action[]
}

export type AssistantRequest = {
  type: string
  requestText: string
}

export const EmptyAssistantRequest: AssistantRequest = {
  type: "",
  requestText: ""
}

export type AssistantResponse = {
  status: number
  message: string
}

export type ConfigAction =
  | { type: "delete-goal" }
  | { type: "select-goal"; index: number }
  | { type: "update-goal"; index: number; label: string }
  | { type: "add-goal"; label: string }
  | { type: "add-action"; goalIndex: number; label: string }
  | { type: "set-assistant-is-authorized"; assistantIsAuthorized: boolean | null }
  | { type: "set-assistant-response"; assistantResponse: AssistantResponse }
  | {
    type: "update-action";
    goalIndex: number;
    actionIndex: number;
    label?: string;
    details?: string;
  };

export type ConfigState = {
  goals: Goal[],
  selectedGoalIndex: number,
  assistantIsAuthorized: boolean | null,
  assistantRequest: AssistantRequest,
  assistantResponse: AssistantResponse,
}
