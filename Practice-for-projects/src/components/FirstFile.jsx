import { useState } from "react";

export function FirstFile() {

  const [count, setCount] = useState(0);

  const handleCount = () => {
    setCount(count + 1);
  };

  const handleAuto = () => {
    setInterval(() => {
      setCount(prevCount => prevCount + 1);
    }, 1000);
  }

  const reset = () => {
    setCount(0);
  };

  return (
    <div>
      <h1>
        This is the First File Component
      </h1>

      <button 
        onClick={handleCount}>
        Clicked {count} 
        times
      </button>

      <button 
        onClick={reset}>
        Clear
      </button>

      <button onClick={handleAuto}>
        Auto Click
      </button>

    </div>
  )
}