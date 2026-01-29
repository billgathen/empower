import { useConfig } from "./useConfig";
import Actions from "./actions";
import Goals from "./goals";

/* TODO Make sections resizable using Resizer component */
export default function App() {
  const config = useConfig();

  return (
    <>
      <Goals config={config}></Goals>
      <div className="divider"></div>
      <Actions config={config}></Actions>
    </>
  );
}
