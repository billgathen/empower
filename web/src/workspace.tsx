import Actions from "./actions";
import Assistant from "./assistant";
import Goal from "./goal";
import Loading from "./loading";

export default function Workspace({ config }) {
  const selected = config.goals[config.selectedGoalIndex];

  return <div id="workspace" className="stack">
    {selected ?
      <>
        <Goal config={config}></Goal>
        <Actions config={config}></Actions>
        <Assistant config={config}></Assistant>
        <Loading config={config}></Loading>
      </>
      : <div>Create or select a goal to begin.</div>
    }
  </div>
}
