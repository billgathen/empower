import { Goal } from "./types";

export const defaultGoals: Goal[] = [
  {
    label: "Research",
    actions: [
      { label: "Ask someone", details: "Got some answers" },
      { label: "Ask someone else", details: "Got some more answers" },
      { label: "Ask the machines", details: "Got some sketchy answers" },
    ],
    successCriteria: "Figure some stuff out"
  },
  {
    label: "Plan",
    actions: [
      { label: "Make a plan", details: "Do some stuff" },
      { label: "Refine plan", details: "Do some smart stuff" },
      { label: "Discard plan", details: "Scrap it all" },
      { label: "Make a better plan", details: "Do the right stuff" },
    ],
    successCriteria: "Get some stuff organized"
  },
  {
    label: "Implement",
    actions: [
      { label: "Do it", details: "Did my best" },
      { label: "Do it again", details: "Did more of my best" },
      { label: "Do it until you succeed", details: "Still waiting" },
    ],
    successCriteria: "Get some stuff done"
  }
]

