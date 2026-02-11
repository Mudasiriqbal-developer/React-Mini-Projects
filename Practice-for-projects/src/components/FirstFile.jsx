export function FirstFile({ count, handleCount, reset, handleAuto }) {

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