import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import InputText from "./InputText";
import TsFormUser, { userSchema } from "./createFormUser";
import validateYup from "./validateYup";

function App() {
  const [count, setCount] = useState(0);
  const { submit } = TsFormUser;

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    submit((data) => validateYup(data, userSchema));
  };

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <form onSubmit={handleSubmit}>
        <InputText field="name" />
        <InputText field="document" />
        <InputText field="data.0.image" />
        <p>
          <input type="submit" value="Enviar" />
        </p>
      </form>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
