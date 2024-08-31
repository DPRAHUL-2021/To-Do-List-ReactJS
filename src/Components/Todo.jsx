import { useState, useEffect, useRef } from 'react';
import './CSS/Todo.css';
import { TodoItems } from './TodoItems';

export const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [count, setCount] = useState(0); // Use state for count
  const inputRef = useRef(null);

  const add = () => {
    const newCount = count + 1;
    const newTodo = { no: newCount, text: inputRef.current.value, display: "" };
    setTodos([...todos, newTodo]);
    setCount(newCount);
    inputRef.current.value = "";
    localStorage.setItem("todos_count", newCount);
  };

  useEffect(() => {
    // Initialize todos and count from localStorage
    const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    const storedCount = parseInt(localStorage.getItem("todos_count")) || 0;
    setTodos(storedTodos);
    setCount(storedCount);
  }, []);

  useEffect(() => {
    // Update localStorage when todos change
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="todo">
      <div className="todo-header">To-Do List</div>
      <div className="todo-add">
        <input ref={inputRef} type="text" placeholder='Enter Your Task' className='todo-input' />
        <div onClick={add} className="todo-add-btn">ADD</div>
      </div>
      <div className="todo-list">
        {todos.map((item, index) => {
          return (
            <TodoItems 
              key={item.no} 
              setTodos={setTodos} 
              no={item.no} 
              display={item.display} 
              text={item.text} 
            />
          );
        })}
      </div>
    </div>
  );
};
