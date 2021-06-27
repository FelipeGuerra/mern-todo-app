import React, { useState, useContext, useEffect } from "react";
import { CredentialsContext } from "../App";
import { v4 as uuidv4 } from "uuid";

export default function Todos() {
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState("");
  const [credentials] = useContext(CredentialsContext);

  const persist = (newTodos) => {
    fetch(`http://localhost:4000/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${credentials.username}:${credentials.password}`,
      },
      body: JSON.stringify(newTodos),
    }).then(() => { });
  };

  useEffect(() => {
    fetch(`http://localhost:4000/todos`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${credentials.username}:${credentials.password}`,
      },
    })
      .then((response) => response.json())
      .then((todos) => setTodos(todos));
  }, []);

  const addTodo = (e) => {
    e.preventDefault();
    if (!todoText) return;
    const newTodo = { id: uuidv4(), checked: false, text: todoText };
    const newTodos = [...todos, newTodo];
    setTodos(newTodos);
    setTodoText("");
    persist(newTodos);
  };

  const toggleTodo = (id) => {
    const newTodoList = [...todos];
    const todoItem = newTodoList.find((todo) => todo.id === id);
    todoItem.checked = !todoItem.checked;
    setTodos(newTodoList);
    persist(newTodoList);
  };

  const getTodos = () => {
    return todos;
  };

  return (
    <div className="wrapper wrapper--flex">
      <div className="todos">
        <div className="todos__list">
          <header className="todos__list-header">
            <span className="title">ToDo List</span>
            <div className="todos__list-actions">
              <span className="edit">
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="pencil-alt" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M497.9 142.1l-46.1 46.1c-4.7 4.7-12.3 4.7-17 0l-111-111c-4.7-4.7-4.7-12.3 0-17l46.1-46.1c18.7-18.7 49.1-18.7 67.9 0l60.1 60.1c18.8 18.7 18.8 49.1 0 67.9zM284.2 99.8L21.6 362.4.4 483.9c-2.9 16.4 11.4 30.6 27.8 27.8l121.5-21.3 262.6-262.6c4.7-4.7 4.7-12.3 0-17l-111-111c-4.8-4.7-12.4-4.7-17.1 0zM124.1 339.9c-5.5-5.5-5.5-14.3 0-19.8l154-154c5.5-5.5 14.3-5.5 19.8 0s5.5 14.3 0 19.8l-154 154c-5.5 5.5-14.3 5.5-19.8 0zM88 424h48v36.3l-64.5 11.3-31.1-31.1L51.7 376H88v48z"></path></svg>
              </span>
              <span className="remove">
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="trash-alt" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"></path></svg>
              </span>
            </div>
          </header>

          <div className="todos__list-items">
            <h3>To Do</h3>
            {todos.filter((todo) => (
              !todo.checked
            )).map((todo) => (
              <div key={todo.id}>
                <input
                  checked={todo.checked}
                  onChange={() => toggleTodo(todo.id)}
                  type="checkbox"
                />
                <label>{todo.text}</label>
              </div>
            ))}
            <h3>Done</h3>
            {todos.filter((todo) => (
              todo.checked
            )).map((todo) => (
              <div key={todo.id}>
                <input
                  checked={todo.checked}
                  onChange={() => toggleTodo(todo.id)}
                  type="checkbox"
                />
                <label>{todo.text}</label>
              </div>
            ))}
          </div>
          
          <div className="todos__list-footer">
            <form onSubmit={addTodo}>
              <input
                value={todoText}
                onChange={(e) => setTodoText(e.target.value)}
                type="text"
              ></input>
              <button type="submit">Add</button>
            </form>
          </div>
        </div>
      </div>
      <div className="createNewProject">
        <h2>Create a new project</h2>
        <form className="createNewProject__form">
          <input type="text" placeholder="Project Name"/>
          <button type="submit">Create Project</button>
        </form>
      </div>
    </div>
  );
}