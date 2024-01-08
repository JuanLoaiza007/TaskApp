import React, { useState} from "react";

function TodoForm ({onAddTodo}) { 
  const initialFormValues = {
    title: '',
    responsible: '',
    description: '',
    priority: 'low'
  };

  const [state, setState] = useState(initialFormValues);  

  function handleInput(e) {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const trimmedState = {};

    for (const key in state) {
      if (key in state) {
        trimmedState[key] = state[key].trim();
      }
    }
  
    const errors = validateForm(trimmedState);

    if (errors.length > 0) {
      alert(
        "No se ha podido agregar la tarea:\n\n" +
        errors.join("\n"));
      return; // Salida temprana por errores de validacion en el formulario
    }
  
    onAddTodo(state);
    reloadForm();
    console.log(state);
  }
  
  function validateForm({ title, responsible}) {
    const errors = [];
  
    if (!title) errors.push("El campo de título no debe estar vacío.");
  
    return errors;
  }

  function reloadForm() {
    document.getElementById("toDoForm").reset();
    setState(initialFormValues);  
  }
  
  return (
    <div className="card">
      <div className="card-header">
        <h4>Agregar tarea</h4>
      </div>
      <form 
        id="toDoForm"
        className="card-body"
        onSubmit={handleSubmit} >
        <div className="form-group my-2">
          <input
            type="text"
            name="title"
            className="form-control"
            placeholder="Titulo"
            onChange={handleInput}
          />
        </div>
        <div className="form-group my-2">
          <input
            type="text"
            name="responsible"
            className="form-control"
            placeholder="Responsable"
            onChange={handleInput}
          />
        </div>
        <div className="form-group my-2">
          <input
            type="text"
            name="description"
            className="form-control"
            placeholder="Descripcion"
            onChange={handleInput}
          />
        </div>
        <div className="form-group my-2">
          <p className="h5 mt-2"> Prioridad </p>
          <select
          name="priority"
          className="form-control"
          onChange={handleInput}>
            <option> baja </option>
            <option> media </option>
            <option> alta </option>
          </select>
        </div>
        <div className="card-footer mt-4">
          <div className="form-group my-2">
            <button 
              type="submit" 
              className="btn btn-success mx-2"> Agregar </button>
            <button 
              type="button" 
              className="btn btn-danger mx-2" 
              onClick={reloadForm}> Limpiar </button>
          </div>
        </div>
      </form>
    </div>
  );
  
}

export default TodoForm;