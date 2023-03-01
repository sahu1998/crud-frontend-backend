import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AllRoutes from "./routes";
import { createContext } from "react";

export const DemoContext = createContext();
function App() {
  return (
    <BrowserRouter>
      <AllRoutes />
    </BrowserRouter>
  );
}

export default App;
