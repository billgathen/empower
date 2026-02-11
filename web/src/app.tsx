import { useConfig } from "./useConfig";
import Goals from "./goals";
import Workspace from "./workspace";

/* TODO Make sections resizable using Resizer component */
export default function App() {
  const config = useConfig();

  return (
    <>
      <Goals config={config}></Goals>
      <div className="divider"></div >
      <Workspace config={config}></Workspace>
    </>
  );
}
