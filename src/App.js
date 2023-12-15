import { Route, Routes, BrowserRouter } from "react-router-dom"
import Project from "./project";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
            <Route path="/*" element={<Project/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
