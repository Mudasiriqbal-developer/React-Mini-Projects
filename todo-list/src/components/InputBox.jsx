import './InputBox.css';

export function InputBox() {
  return (
    <>
    <div 
     className="task-box">

      <input 
        className="input-box" 
        type="text" 
        placeholder="Add a new task" 
      />

      <button 
        className='send-button'>
        Add
      </button>
    </div>
    </>
    
  );
}