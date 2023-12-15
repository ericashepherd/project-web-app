import { Route, Routes, BrowserRouter, HashRouter } from "react-router-dom"
import Project from "./project";

function App() {
  return (
    <HashRouter>
      <div>
        <Routes>
            <Route path="/*" element={<Project/>} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
