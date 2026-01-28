import { useState } from "react";

type GoalData = {
  label?: string
}

const defaultGoals = [
  { label: "Research" },
  { label: "Plan" },
  { label: "Implement" }
]

export default function Goals() {
  const [goals, setGoals] = useState<GoalData[]>(defaultGoals);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const addNewGoal = (name: string) => setGoals([{ label: name }, ...goals])

  return <section className="goals">
    <h2>Goals</h2>
    <NewGoal addNewGoal={addNewGoal}></NewGoal>
    <div className="goals">
      {goals.map((data, idx) => <Goal data={data} idx={idx} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex}></Goal>)}
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

function Goal({ data, idx, selectedIndex, setSelectedIndex }) {
  return <label key={idx}>
    <input
      type="radio"
      name="goal"
      checked={selectedIndex === idx}
      onChange={() => setSelectedIndex(idx)}
    />
    {data.label}
  </label>;
} 
