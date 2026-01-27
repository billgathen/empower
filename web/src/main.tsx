import { createRoot } from "react-dom/client";

function App() {
  return <div>Hello from React</div>;
}

const el = document.getElementById("app");
if (el) createRoot(el).render(<App />);
