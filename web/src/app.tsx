import Actions from "./actions";
import Goals from "./goals";

/* TODO Make sections resizable using Resizer component */
export default function App() {
  return (
    <>
      <Goals></Goals>
      <div className="divider"></div>
      <Actions></Actions>
    </>
  );
}
