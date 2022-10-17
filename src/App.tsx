import "./App.css";
import { Router, Route, Routes } from "react-router-dom";
import { Login, UploadForm } from "./components";
import { history } from "./state/_helpers";
function App() {
  return (
    <div className="App">
      <Login history={history} />
    </div>
  );
}

export default App;
