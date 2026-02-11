import { useState } from "react";
import { FirstFile } from "./components/FirstFile";
import { Calculator } from "./components/Calculator";

export function App() {
  const [isOn, setIsOn] = useState(false);
  const [count, setCount] = useState(0);

  const handleBtn = () => {
    if (isOn) {
      setIsOn(false);
    } else {
      setIsOn(true);
    }
  };

  const handleCount = () => {
    setCount(count + 1);
  };

  const handleAuto = () => {
    setInterval(() => {
      handleCount();
    }, 100);
  };

  const reset = () => {
    setCount(0);
  };

  return (
    <div>
      <h1>Hello, World!</h1>
      <h2>Light is {isOn ? "ON" : "OFF"}</h2>
      <button onClick={handleBtn}>{isOn ? "ON" : "OFF"}</button>

      <FirstFile
        count={count}
        handleCount={handleCount}
        reset={reset}
        handleAuto={handleAuto}
        setInterval={setInterval}
      />

      <Calculator />
    </div>
  );
}
export default App;
