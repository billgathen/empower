import { useState } from "react";
import { Action } from "./types";

export default function Actions({ config }) {
  const selectedGoal = config.goals[config.selectedGoalIndex];

  const addNewAction = (name: string) => {
    config.addAction(config.selectedGoalIndex, name);
  }

  return <section id="actions">
    <h2>{selectedGoal.label} Actions</h2>
    <NewAction addNewAction={addNewAction}></NewAction>
    <form id="actions-list">
      {selectedGoal.actions.map((action: Action, idx: number) => <Action idx={idx} config={config} action={action}></Action>)}
    </form>
  </section>;
}

function NewAction({ addNewAction }) {
  const [newActionName, setNewActionName] = useState("");
  const handleSubmit = (form: HTMLFormElement) => {
    if (form.checkValidity()) {
      addAction();
    } else {
      form.reportValidity();
    }
  };
  const addAction = () => {
    addNewAction(newActionName);
    setNewActionName("");
  }
  return <div id="new-action">
    <form onSubmit={(e) => { e.preventDefault(); handleSubmit(e.target) }}>
      <label htmlFor="add-action-input">New Action</label>
      <div className="add-item">
        <input type="text" id="add-action-input" required value={newActionName} onChange={(e) => setNewActionName(e.target.value)} />
        <button type="submit" aria-label="Add Action">Add</button>
      </div>
    </form>
  </div >
}

function Action({ idx, config, action }) {
  const change = (value: string) => {
    config.updateAction(config.selectedGoalIndex, idx, { label: value });
  }
  return <input type="text" value={action.label} onChange={(e) => change(e.target.value)} />
}
