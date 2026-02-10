import { useState } from "react";
import { Goal } from "./types";

export default function Goals({ config }) {

  const addNewGoal = (name: string) => {
    config.addGoal(name);
    config.selectGoal(0);
  }

  const jumpToActions = () => {
    const el = document.getElementById("add-action-input") as HTMLInputElement | null;
    el?.focus();
  };

  const deleteGoal = () => {
    if (window.confirm(`Delete goal '${selectedGoalLabel(config)}'?`)) {
      config.deleteGoal()
    }
  }

  return <section id="goals" aria-labelledby="goals-heading">
    <h2 id="goals-heading">Goals</h2>
    <NewGoal addNewGoal={addNewGoal}></NewGoal>
    <div id="goals-list">
      <div id="goals-help" className="sr-only">
        Use arrow keys to move through goals. Press Tab to reach View Actions, Edit, and Delete
      </div>

      {config.goals.map((goal: Goal, idx: number) => {
        return <Goal
          goal={goal}
          idx={idx}
          key={idx}
          selectedGoalIndex={config.selectedGoalIndex}
          selectGoal={config.selectGoal}
        ></Goal>
      })}
    </div>

    <div id="goals-controls" role="group" aria-label="Actions for selected goal">
      <button type="button" id="jump-to-actions" aria-describedby="jump-help" aria-label={`Jump to actions for ${selectedGoalLabel(config)}`} onClick={jumpToActions}>Actions</button>
      <span id="jump-help" className="sr-only">
        Moves focus to the action input for this goal
      </span>
      <button type="button" id="edit-selected-goal" aria-label={`Edit ${selectedGoalLabel(config)}`}>Edit</button>
      <button type="button" id="delete-selected-goal" aria-label={`Delete ${selectedGoalLabel(config)}`} onClick={deleteGoal}>Delete</button>
    </div>

    <div aria-live="polite" aria-atomic="true" className="sr-only" id="goals-status"></div>
  </section >;
}

function selectedGoalLabel(config) {
  return config.goals[config.selectedGoalIndex]?.label || ""
}

function NewGoal({ addNewGoal }) {
  const [newGoalName, setNewGoalName] = useState("");
  const handleSubmit = (form: HTMLFormElement) => {
    if (form.checkValidity()) {
      addGoal();
    } else {
      form.reportValidity();
    }
  };
  const addGoal = () => {
    addNewGoal(newGoalName);
    setNewGoalName("");
  }
  return <div id="new-goal">
    <form onSubmit={(e) => { e.preventDefault(); handleSubmit(e.target) }}>
      <label htmlFor="add-goal-input">New Goal</label>
      <div className="add-item">
        <input type="text" id="add-goal-input" size={24} required value={newGoalName} onChange={(e) => setNewGoalName(e.target.value)} />
        <button type="submit" aria-label="Add Goal">Add</button>
      </div>
    </form>
  </div >
}

function Goal({ goal, idx, selectedGoalIndex, selectGoal }) {
  const isSelected = idx === selectedGoalIndex
  const change = () => {
    if (!isSelected) {
      selectGoal(idx)
    }
  }

  return <label>
    <input
      type="radio"
      name="goal"
      checked={isSelected}
      onChange={change}
    />
    {goal.label}
  </label>;
} 
