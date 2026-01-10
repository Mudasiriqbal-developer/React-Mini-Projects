import './InputBox.css';
import { useState } from 'react';

export function InputBox() {
  const [task, setTask] = useState('');

  const handleInputChange = (event) => {
    setTask(event.target.value);
  };
  



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
        className='send-button'
        onClick={handleInputChange}>
        Add
      </button>
    </div>
    </>
    
  );
}