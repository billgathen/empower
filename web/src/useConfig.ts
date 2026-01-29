import { useState } from "react";
import { Goal } from "./types";

const defaultGoals: Goal[] = [
  {
    label: "Research",
    actions: [
      { label: "Ask someone", details: "Got some answers" },
      { label: "Ask someone else", details: "Got some more answers" },
      { label: "Ask the machines", details: "Got some sketchy answers" },
    ]
  },
  {
    label: "Plan",
    actions: [
      { label: "Make a plan", details: "Do some stuff" },
      { label: "Refine plan", details: "Do some smart stuff" },
      { label: "Discard plan", details: "Scrap it all" },
      { label: "Make a better plan", details: "Do the right stuff" },
    ]
  },
  {
    label: "Implement",
    actions: [
      { label: "Do it", details: "Did my best" },
      { label: "Do it again", details: "Did more of my best" },
      { label: "Do it until you succeed", details: "Still waiting" },
    ]
  }
]

export function useConfig() {
  const [goals, setGoals] = useState(defaultGoals);
  const [selectedGoal, setSelectedGoal] = useState(goals[0]);
  return {
    selectedGoal: selectedGoal,
    setSelectedGoal: setSelectedGoal,
    goals: goals,
    setGoals: setGoals,
  }
}
