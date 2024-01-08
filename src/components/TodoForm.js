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
      <form 
        id="toDoForm"
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