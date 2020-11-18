import logo from "./logo.svg";
import "./App.css";
import { getPassword } from "./api/password";
import { useEffect } from "react";
import useAsync from "./hooks/useAsync";

function App() {
  const { data, loading, error, doFetch } = useAsync(() => getPassword("wifi"));

  useEffect(() => {
    doFetch();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        {data}
        {loading && <div>Loading...</div>}
        {error && <div>{error.message}</div>}
      </header>
    </div>
  );
}

export default App;
