import { Action } from "./types";

export default function Actions({ config }) {
  const selectedGoal = config.goals[config.selectedGoalIndex];

  return <section id="actions">
    <header className="header-controls">
      <h2>Actions</h2>
      <h3>{selectedGoal.label}</h3>
      <form className="actions">
        {selectedGoal.actions.map((action: Action, idx: number) => <Action idx={idx} config={config} action={action}></Action>)}
      </form>
    </header>
  </section>;
}

function Action({ idx, config, action }) {
  const change = (value: string) => {
    config.updateAction(config.selectedGoalIndex, idx, { label: value });
  }
  return <input type="text" value={action.label} onChange={(e) => change(e.target.value)} />
}
