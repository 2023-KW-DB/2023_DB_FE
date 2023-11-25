import logo from "./logo.svg";
import Layout from "./Layout";
import { BrowserRouter } from "react-router-dom";
import "./firebase-messaging-sw.js";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </div>
  );
}

export default App;
