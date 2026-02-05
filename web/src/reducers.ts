import { ConfigState, ConfigAction, Goal, EmptyAssistantRequest } from "./types"

export function configReducer(
  state: ConfigState,
  action: ConfigAction
): ConfigState {
  switch (action.type) {
    case "add-goal":
      const newGoal = { label: action.label, actions: [] } as Goal;
      return {
        ...state,
        goals: [newGoal, ...state.goals],
        assistantRequest: { type: 'goal', requestText: newGoal.label }
      };

    case "select-goal":
      return {
        ...state,
        selectedGoalIndex: action.index,
      };

    case "add-action":
      return {
        ...state,
        goals: state.goals.map((goal, gi) =>
          gi !== action.goalIndex
            ? goal
            : {
              ...goal,
              actions: [{ label: action.label, details: "" }, ...goal.actions],
            }
        ),
      };

    case "update-action":
      return {
        ...state,
        goals: state.goals.map((goal, gi) =>
          gi !== action.goalIndex
            ? goal
            : {
              ...goal,
              actions: goal.actions.map((a, ai) =>
                ai !== action.actionIndex
                  ? a
                  : {
                    ...a,
                    ...(action.label !== undefined && {
                      label: action.label,
                    }),
                    ...(action.details !== undefined && {
                      details: action.details,
                    }),
                  }
              ),
            }
        ),
      };

    case "set-assistant-response":
      return {
        ...state,
        assistantRequest: EmptyAssistantRequest,
        assistantResponse: action.assistantResponse
      };

    default:
      return state;
  }
}

