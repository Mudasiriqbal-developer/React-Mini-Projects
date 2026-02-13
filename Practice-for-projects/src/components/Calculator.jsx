export function Calculator() {

  const pressnum = () => {
    const num1 = document.querySelector(".num1").value;
    const num2 = document.querySelector(".num2").value;
    const result = document.querySelector(".result");
    result.value = parseInt(num1) + parseInt(num2);
    
  }

  return (
    <div>
      <h2>Welcome to my simple but powerful calculator</h2>

      <input type="text" className="num1" onChange={pressnum}/>
      <h3> + </h3>
      <input type="text" className="num2" onChange={pressnum}/>
      <h3> = </h3>
      <input type="text" className="result" onChange={pressnum}/>

    </div>
  );
}