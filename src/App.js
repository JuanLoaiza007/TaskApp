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
    "version": "1.5.1",
    "versionState": "deactivated"
  });

  const [tasks, setTasks] = useState({ todos: [] });

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
    const storedTasks = localStorage.getItem('tasks');

    if (storedTasks) {  // Si hay tareas del usuario en el navegador cargarlas
      setTasks(JSON.parse(storedTasks));
    } else {            // Sino, crear tareas por defecto
      setTasks(todos);
    }
    
  }, []);

  function handleAddTodo(todo) {
    setTasks({
      todos: [...tasks.todos, todo]
    })

    const updatedTasks = {
      todos: [...tasks.todos, todo]
    }
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    setTasks(updatedTasks);
  }

  function handleRemove(index){
    if (window.confirm("¿Seguro que desea eliminar la tarea?")){
      setTasks({
        todos: tasks.todos.filter((e, i) => {
          return i !== index;
        })
      })

      const updatedTasks = {
        todos: tasks.todos.filter((e, i) => {
        return i !== index;
      })}
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }
  }

  function deleteAllTasks() {
    if (window.confirm("¿Seguro que desea eliminar todas las tareas? \nEsta opciones irreversible")){
      setTasks({
        todos: []
      });

      const updatedTasks = {
        todos: []
      }
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }
  }

  function createPillForPriority(priority){
    let pillClassName = "bg-";

    if (priority ==="alta") {
      pillClassName += "danger";
    } else if (priority ==="media") {
      pillClassName += "warning";
    } else {
      pillClassName += "primary";
    }

    pillClassName = "badge rounded-pill " + pillClassName;

    return (
      <span className={pillClassName}>
        Prioridad {priority}
      </span>
    );
  }

  const todosCards = tasks.todos.map((todo, i) => (
    <div className='col-md-4'>
      <div className='mt-4'>
      <div className="card" key={i}>
        <div className='card-header'>
          <h1> {todo.title} </h1>
          {createPillForPriority(todo.priority)}
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

      <div className='mb-4'>
        <div className='m-4'>
          <button 
          className='btn btn-warning m-3'
          onClick={switchVersion}>
            Ocultar/Mostrar version
          </button>     
          <button 
            type="button" 
            class="btn btn-danger m-3"
            onClick={deleteAllTasks}> 
            Eliminar todas las tareas
          </button>
        </div>
        <div className='container'>
          <div className='row justify-content-center'>
            <div className='col-md-5 col-sm-12'>
              <TodoForm 
                onAddTodo={handleAddTodo}
              />
            </div>
          </div>
          
          <div className='row mt-4'>
            {todosCards}   
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
