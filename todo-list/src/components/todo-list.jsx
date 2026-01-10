import  dayjs  from 'dayjs';
import './todo-list.css';

export const TodoList = () => {
  return (
    <>
      <h1 className="heading1">Welcome to my Todo List</h1>
      <h2 className="heading2">{dayjs().format('dddd, MMMM D, YYYY')}</h2>
    </>
  );
};