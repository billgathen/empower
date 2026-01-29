import { useState } from "react";
import { Goal } from "./types";

export default function Goals({ config }) {

  const addNewGoal = (name: string) => {
    const newGoal: Goal = { label: name, actions: [] }
    config.setGoals([newGoal, ...config.goals]);
    config.setSelectedGoal(newGoal);
  }

  return <section className="goals">
    <h2>Goals</h2>
    <NewGoal addNewGoal={addNewGoal}></NewGoal>
    <div className="goals">
      {config.goals.map((goal: Goal, idx: number) => {
        return <Goal
          goal={goal}
          key={idx}
          selectedGoal={config.selectedGoal}
          setSelectedGoal={config.setSelectedGoal}
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

function Goal({ goal, selectedGoal, setSelectedGoal }) {
  const change = () => {
    if (goal !== selectedGoal) {
      setSelectedGoal(goal)
    }
  }

  return <label>
    <input
      type="radio"
      name="goal"
      checked={goal === selectedGoal}
      onChange={change}
    />
    {goal.label}
  </label>;
} 
