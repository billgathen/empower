import { useConfig } from "./useConfig";
import Actions from "./actions";
import Goals from "./goals";
import Assistant from "./assistant";

/* TODO Make sections resizable using Resizer component */
export default function App() {
  const config = useConfig();

  return (
    <>
      <Goals config={config}></Goals>
      <div className="divider"></div >
      <div className="stack">
        <Actions config={config}></Actions>
        <Assistant config={config}></Assistant>
      </div>
    </>
  );
}
