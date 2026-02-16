

export function Calculator() {


  const pressNum = () => {
    const num1 = document.querySelector(".num1");
    const num2 = document.querySelector(".num2");
    const result = document.querySelector(".result");
    num1.value;
    num2.value;
    result.value = parseInt(num1.value) + parseInt(num2.value);
  }

  const boxOne = () => {
    const num1 = document.querySelector(".num1");
    const btn1 = document.querySelector(".btn1");
    const btn2 = document.querySelector(".btn2");
    num1.value = num1.value + btn2.textContent || num1.value + btn1.textContent;
  }

  const boxTwo = () => {
    const num2 = document.querySelector(".num2");
    const btn2 = document.querySelector(".btn2");
    num2.value = num2.value + btn2.textContent;
  }

  return (
    <>
      
      <h2>Welcome to my simple but powerful calculator</h2>

      <h3> Enter first number </h3>
      <input type="text" className="num1" />
      <h3> Enter second number </h3>
      <input type="text" className="num2" />
      
      <h3> Answer </h3>
      <input type="text" className="result" /><br/>
      <button onClick={pressNum}>Calculate</button>

      <button className="btn1" onClick={boxOne}>1</button>
      <button className="btn2" onClick={boxTwo}>2</button>
      <button>3</button>
      <button>4</button>
      <button>5</button>
      <button>6</button>
      <button>7</button>
      <button>7</button>
      <button>7</button>
      <button>0</button>
    </>
  );
}