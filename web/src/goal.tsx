import { useState } from "react";
import { flushSync } from "react-dom";

export default function Goal({ config }) {
  const label = config.goals[config.selectedGoalIndex].label
  const [statusContent, setStatusContent] = useState("");

  const change = (value: string) => {
    config.updateGoal(config.selectedGoalIndex, value);
  }

  const deleteGoal = () => {
    if (window.confirm(`Delete goal '${label}'?`)) {
      config.deleteGoal()

      flushSync(() => setStatusContent(""))

      setTimeout(() => {
        setStatusContent("Goal deleted")
      }, 150)
    }
  }

  return <section id="goal" aria-labelledby="goal-heading">
    <h2 id="goal-heading">Goal</h2>
    <label htmlFor="goal-label" className="goal-label">Goal</label>
    <div className="add-item">
      <input id="goal-label" type="text" value={label} onChange={(e) => change(e.target.value)} />
      <button type="button" id="delete-selected-goal" aria-label={`Delete ${label}`} onClick={deleteGoal}>Delete</button>
    </div>
    <div role="status" aria-live="polite" aria-atomic="true" className="sr-only" id="goals-status">{statusContent}</div>
  </section>;
}
