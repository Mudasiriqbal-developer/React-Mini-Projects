// todo-list.jsx
import  dayjs  from 'dayjs';
import './todo-list.css';

export const TodoList = ({ todosCount }) => {
  const completedTasks = todosCount; // You can modify this when you track completed tasks
  
  return (
    <div className="header-container">
      <h1 className="heading1">My Todo List</h1>
      <h2 className="heading2">{dayjs().format('dddd, MMMM D, YYYY')}</h2>
      <div className="stats">
        <span className="stat-item">
          <span className="stat-number">{todosCount}</span>
          <span className="stat-label">Total Tasks</span>
        </span>
      </div>
    </div>
  );
};