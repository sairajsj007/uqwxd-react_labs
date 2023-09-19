import React, {useState} from "react";
import {useEffect} from "react";
import "./App.css";

const App = () => {
    const [todos, setTodos] = useState([]);
    const [todo, setTodo] = useState("");
    const [todoEditing, setTodoEditing] = useState(null);
    const [editingText, setEditingText] = useState("");
    useEffect(() => {
      const json = localStorage.getItem("todos");
      const loadedTodos = JSON.parse(json);
      if (loadedTodos) {
        setTodos(loadedTodos);
      }
    }, []);
    useEffect(() => {
      if (todos.length > 0) {
          const json = JSON.stringify(todos);
          localStorage.setItem("todos", json);
      }
    }, [todos]);
    function handleSubmit(e) {
      e.preventDefault();
      const newTodo = {
        id: new Date().getTime(),
        text: todo.trim(),
        completed: false,
      };
      if (newTodo.text.length > 0 ) {
          setTodos([...todos].concat(newTodo));
          setTodo("");
      } else {
          alert("Enter Valid Task");
          setTodo("");
      }
    }
    function deleteTodo(id) {
      let updatedTodos = [...todos].filter((todo) => todo.id !== id);
      setTodos(updatedTodos);
    }
    function toggleComplete(id) {
      let updatedTodos = [...todos].map((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      });
      setTodos(updatedTodos);
    }
    function submitEdits(id) {
      const updatedTodos = [...todos].map((todo) => {
        if (todo.id === id) {
          todo.text = editingText;
          }
          return todo;
        });
        setTodos(updatedTodos);
        setTodoEditing(null);
      }
      return (
          <div id="todo-list">
            <h1>Todo List</h1>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                onChange={(e) => setTodo(e.target.value)}
                value={todo}
              />
              <button type="submit">Add Todo</button>
            </form>
  {todos.map((todo) => (
    <div key={todo.id} className="todo">
      <div className="todo-text">
        {/* Add checkbox for toggle complete */}
        <input
          type="checkbox"
          id="completed"
          checked={todo.completed}
          onChange={() => toggleComplete(todo.id)}
        />
        {/* if it is edit mode, display input box, else display text */}
        {todo.id === todoEditing ?
          (<input
            type="text"
            onChange={(e) => setEditingText(e.target.value)}
          />) :
          (<div>{todo.text}</div>)
        }
      </div>
      <div className="todo-actions">
        {/* if it is edit mode, allow submit edit, else allow edit */}
        {todo.id === todoEditing ?
        (
          <button onClick={() => submitEdits(todo.id)}>Submit Edits</button>
        ) :
        (
          <button onClick={() => setTodoEditing(todo.id)}>Edit</button>
        )}
        <button onClick={() => deleteTodo(todo.id)}>Delete</button>
       </div>
    </div>
  ))}
    </div>
  );
};
export default App;
