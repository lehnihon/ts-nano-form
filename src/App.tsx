import "./App.css";
import InputText from "./InputText";
import TsNanoForm from "./nanoForm";
import NanoFormProvider from "./nanoFormProvider";

function App() {
  const formLogin = TsNanoForm.getForm("login");
  const formUser = TsNanoForm.getForm("user");

  const handleSubmitLogin = () => {
    formLogin.submit((data) => console.log("submit login", data));
  };

  const handleSubmitUser = () => {
    formUser.submit((data) => console.log("submit user", data));
  };

  return (
    <>
      <NanoFormProvider form={formLogin}>
        <InputText name="username" />
        <InputText name="password" />

        <button onClick={handleSubmitLogin}>Login</button>
      </NanoFormProvider>

      <NanoFormProvider form={formUser}>
        <InputText name="name" />
        <InputText name="document" mask={["000-000", "00-000-000"]} />

        <button onClick={handleSubmitUser}>Send</button>
      </NanoFormProvider>
    </>
  );
}

export default App;
