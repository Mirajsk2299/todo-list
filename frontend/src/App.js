import "./styles.css";
import bgimage from "./assets/bgimg.webp"; 
import React, { useState, useEffect } from "react";
import { getTodos, addTodo, updateTodo, deleteTodo } from "./api";

export function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const res = await getTodos();
    setTodos(res.data);

   
    
  };

  const handleAdd = async () => {
    if (!text.trim()) return;
    await addTodo(text);
    setText("");   
    fetchTodos();
  };

  const handleUpdate = async (id, updatedText, completed) => {
    await updateTodo(id, { text: updatedText, completed });
    fetchTodos();
  };

  const handleDelete = async (id) => {
    await deleteTodo(id);
    fetchTodos();
  };

  return (
    <div className="main-div" style={{backgroundImage:`url(${bgimage})`}}>
    <div className="card-div">
      <h2>To-Do List</h2>
  <p>(Initial loading takes few seconds while the server starts. Pls Wait.) </p>
      <div className="add-input"
       style={{display:'flex', marginTop:'1.5em',marginBottom:'0.5rem', flexDirection:'row', gap:'5px'}}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter todo"
      />
      <button onClick={handleAdd}  >Add</button>
      </div>

      <ul style={{ listStyleType: "none"}}>

        {todos.map((todo) => (
          <li key={todo._id}  style={{marginBottom:'0.5rem', }}>

            <input   className="check-box"
            
              type="checkbox"
              checked={todo.completed}
              onChange={(e) =>
                handleUpdate(todo._id, todo.text, e.target.checked)
              }
            />
            <input
            
            style={{marginRight:"7px",  border: "none", textDecoration: todo.completed ? "line-through"  : "none",  opacity: todo.completed ? 0.5 : 1}}
              value={todo.text}
              onChange={(e) =>
                handleUpdate(todo._id, e.target.value, todo.completed)
              }
            />
            <button onClick={() => handleDelete(todo._id)}>Delete</button>

          </li>   

        ))}
      </ul>


      </div>
    </div>
  );
}

export default App;



