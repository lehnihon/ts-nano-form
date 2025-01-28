import "./App.css";
import TsFormUser from "./createFormUser";

import InputText from "./InputText";

function App() {
  const handleSubmit = () => {
    TsFormUser.submit((data) => console.log(data));
  };

  return (
    <>
      <InputText field="name" mask={["000-000", "00-000-000"]} />

      <button onClick={handleSubmit}>Send</button>
    </>
  );
}

export default App;
