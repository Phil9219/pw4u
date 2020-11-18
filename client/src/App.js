import logo from "./logo.svg";
import "./App.css";
import { getPassword } from "./api/password";
import { useState, useEffect } from "react";

function App() {
  const [password, setPassword] = useState(null);
  useEffect(() => {
    const dofetch = async () => {
      const newPassword = await getPassword("wifi");
      setPassword(newPassword);
    };
    dofetch();
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {password}
      </header>
    </div>
  );
}

export default App;
