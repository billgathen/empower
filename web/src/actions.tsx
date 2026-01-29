import { Action } from "./types";

export default function Actions({ config }) {

  return <section id="actions">
    <header className="header-controls">
      <h2>Actions</h2>
      <h3>{config.selectedGoal.label}</h3>
      <form className="actions">
        {config.selectedGoal.actions.map((action: Action) => <Action action={action}></Action>)}
      </form>
    </header>
  </section>;
}

function Action({ action }) {
  const change = (value: string) => {

  }
  return <input type="text" value={action.label} onChange={(e) => change(e.target.value)} />
}
