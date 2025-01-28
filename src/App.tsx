import "./App.css";
import TsFormUser, { TsFormUserInitalValues } from "./createFormUser";

import InputText from "./InputText";

function App() {
  const handleSubmit = () => {
    TsFormUser.submit((data) => {
      const errors = { ...TsFormUserInitalValues };
      if (!data.name) errors.name = "name required";
      //check for errors
      if (JSON.stringify(errors) === JSON.stringify(TsFormUserInitalValues))
        console.log("send data", data);

      return errors;
    });
  };

  return (
    <>
      <InputText field="name" mask={["000-000", "00-000-000"]} />

      <button onClick={handleSubmit}>Send</button>
    </>
  );
}

export default App;
