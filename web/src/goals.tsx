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
  const [items, setItems] = useState<GoalData[]>(defaultGoals);
  const [selectedIndex, setSelectedIndex] = useState(0);

  return <section className="goals">
    <header className="header-controls">
      <h2>Goals</h2>
      <button aria-label="Add goal">Add</button>
    </header>
    <div className="items">
      {items.map((data, idx) => <Goal data={data} idx={idx} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex}></Goal>)}
    </div>
  </section>;
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
