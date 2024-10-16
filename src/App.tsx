import "./App.css";

import InputText from "./InputText";

function App() {
  return (
    <>
      <InputText field="name" mask={["000-000", "00-000-000"]} />
    </>
  );
}

export default App;
