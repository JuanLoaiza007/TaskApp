import React, { useState, useEffect } from 'react';
import './App.css';
import logo from './logo.svg';
import Navigation from './components/Navigation';
import TodoForm from './components/TodoForm';

import todos from './todos.json';

function App() {
  const [appState, setAppState] = useState({
    "appName": "TaskApp",
    "showenVersion": "...",
    "version": "1.1.0",
    "versionState": "deactivated"
  });

  const [tasks, setTasks] = useState(todos);

  function switchVersion() {
    let showenVersion = appState.version;
    let versionState = "unhide"

    if (appState.versionState === "unhide") {
      showenVersion = "****"; 
      versionState = "hide";
    } 

    setAppState ({
      ...appState,
      "showenVersion": showenVersion,
      "versionState": versionState
    })
  }   

  useEffect(() => {
    switchVersion();
    /* Guardar en navegador parte 1  */
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
    
  }, []);

  function handleAddTodo(todo) {
    setTasks({
      todos: [...tasks.todos, todo]
    })

    /* Guardar en navegador parte 2  */
    const updatedTasks = {
      todos: [...tasks.todos, todo]
    }
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
  }

  function handleRemove(index){
    if (window.confirm("Seguro que desea eliminar la tarea?")){
      setTasks({
        todos: tasks.todos.filter((e, i) => {
          return i !== index;
        })
      })
    }
      const updatedTasks = {
      todos: [...tasks.todos, todo]
    }
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
  }

  const todosCards = tasks.todos.map((todo, i) => (
    <div className='col-md-4'>
      <div className='mt-4'>
      <div className="card" key={i}>
        <div className='card-header'>
          <h1> {todo.title} </h1>
          <span className='badge rounded-pill bg-danger'> 
          {todo.priority}
          </span>
        </div>
        <div className='card-body'>
          <p>{todo.description}</p>
          <p><b>{todo.responsible}</b></p>
        </div>
        <div className='card-footer'>
        {/* {() => handleRemove(i)} : Paso como funcion anonima */}
          <button 
          className='btn btn-danger'
          onClick={() => handleRemove(i)}> 
            Eliminar
          </button>
        </div>
      </div>
      </div>
    </div>
  ));  

  return (
    <div className="App">
      <Navigation
        appName={appState.appName}
        showenVersion={appState.showenVersion}
        tasksCount={tasks.todos.length}
        logo={logo}
      />

      <button 
      className='btn btn-warning m-4'
      onClick={switchVersion}>
        Ocultar/Activar version
      </button>     
      
      <div className='container'>
      <div className='col-md-4'>
          <TodoForm 
            onAddTodo={handleAddTodo}
          />
          </div>
        <div className='row mt-4'>
          {todosCards}   
        </div>
      </div>
    </div>
  );
}

export default App;
