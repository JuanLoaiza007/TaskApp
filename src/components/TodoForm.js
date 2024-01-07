import React, { useState, useEffect } from "react";

function TodoForm ({onAddTodo}) { 

  const [state, setState] = useState({
    title: '',
    responsible: '',
    description: '',
    priority: 'low'
  });

  function handleInput(e) {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value
    }));
  }

  function handleSubmit(e){
    e.preventDefault();
    onAddTodo(state);
  }
  
  return (
    <div className="card">
      <form 
        className="card-body"
        onSubmit={handleSubmit} >
        <div className="form-group">
          <input
            type="text"
            name="title"
            className="form-control"
            placeholder="Titulo"
            onChange={handleInput}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="responsible"
            className="form-control"
            placeholder="Responsable"
            onChange={handleInput}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="description"
            className="form-control"
            placeholder="Descripcion"
            onChange={handleInput}
          />
        </div>
        <div className="form-group">
          <select
          name="priority"
          className="form-control"
          onChange={handleInput}>
            <option> low </option>
            <option> medium </option>
            <option> high </option>
          </select>
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary mt-4"> Agregar </button>
        </div>
      </form>
    </div>
  );
  
}

export default TodoForm;