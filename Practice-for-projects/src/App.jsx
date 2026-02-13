import { useState } from "react";
import { FirstFile } from "./components/FirstFile";
import { Calculator } from "./components/Calculator";

export function App() {
  const [isOn, setIsOn] = useState(false);

  const handleBtn = () => {
    if (isOn) {
      setIsOn(false);
    } else {
      setIsOn(true);
    }
  };

  return (
    <div>
      <h1>Hello, World!</h1>
      <h2>Light is {isOn ? "ON" : "OFF"}</h2>
      <button onClick={handleBtn}>{isOn ? "ON" : "OFF"}</button>

      <FirstFile/>
      <Calculator />
    </div>
  );
}
export default App;
