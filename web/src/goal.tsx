import { useState } from "react";
import { flushSync } from "react-dom";

export default function Goal({ config }) {
  const goalLabel = config.goals[config.selectedGoalIndex].label
  const successLabel = config.goals[config.selectedGoalIndex].successCriteria
  const [statusContent, setStatusContent] = useState("");

  const changeGoal = (value: string) => {
    config.updateGoal(config.selectedGoalIndex, value);
  }

  const changeSuccessCriteria = (value: string) => {
    config.updateSuccessCriteria(config.selectedGoalIndex, value);
  }

  const deleteGoal = () => {
    if (window.confirm(`Delete goal '${goalLabel}'?`)) {
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
      <input id="goal-label" type="text" value={goalLabel} onChange={(e) => changeGoal(e.target.value)} />
      <button type="button" id="delete-selected-goal" aria-label={`Delete ${goalLabel}`} onClick={deleteGoal}>Delete</button>
    </div>
    <label htmlFor="success-label" className="success-label">Success Criteria</label>
    <input id="success-label" type="text" value={successLabel} onChange={(e) => changeSuccessCriteria(e.target.value)} />

    <div role="status" aria-live="polite" aria-atomic="true" className="sr-only" id="goals-status">{statusContent}</div>
  </section>;
}
