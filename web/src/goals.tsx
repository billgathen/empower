import { useState } from "react";
import { Goal } from "./types";

export default function Goals({ config }) {

  const addNewGoal = (name: string) => {
    config.addGoal(name);
    config.selectGoal(0);
  }

  return <section className="goals">
    <h2>Goals</h2>
    <NewGoal addNewGoal={addNewGoal}></NewGoal>
    <div className="goals">
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
  </section >;
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
      <label>
        New Goal<br />
        <input type="text" size={25} required value={newGoalName} onChange={(e) => setNewGoalName(e.target.value)} />
      </label>&nbsp;
      <button type="submit" aria-label="Add Goal">Add</button>
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
