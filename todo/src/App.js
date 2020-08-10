

import React from 'react';
import './App.css';
import useForm from './hooks/useForm'
import moment from 'moment';

const initialTodo = [{
  item: 'Your todo Item',
  completed: false,
  id: Date.now(),
}]
const todoReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      let newList = state.slice()
      newList.push({
        item: action.payload.item,
        completed: false,
        id: Date.now(),
      })
      return newList
    case 'EDIT':
      const newEdit = state.slice()
      newEdit.forEach(aTodo => {
        if (aTodo.item === action.payload.item) {
          aTodo.item = action.payload.edit
        }
      })
      return newEdit
    case 'COMPLETED':
    console.log(`running todoReducer case COMPLETED`)
    //flip the completed boolean
      let newCompleted = state.slice()
      debugger
      newCompleted.forEach((aTodo) => {
        const isIdMatching = aTodo.id === parseInt(action.payload.id)
        if (isIdMatching) {
          debugger
          aTodo.completed = !aTodo.completed
        }
      })

      return newCompleted //it's flipping correctly but the state is not updating on the app
    case 'CLEAR':
      const clearCompletedTodos = state = action.payload.newTodo
      return clearCompletedTodos
    default:
      return state
  }
}


function App() {
  const [useInput, todoList, onChange, onSubmit, toggleCompleted, clearTodos] = useForm(initialTodo, todoReducer)

  function displayTodos() {
    //prefer this way to you can debugge it
    //take all of the array obj descripton text and put in on a li tag to be 
    const item = todoList.map(aTodo => {
      return (
        <li id={aTodo.id} onClick={toggleCompleted} key={aTodo.id}>
          <span className={aTodo.completed ? 'completed' : ''} id={aTodo.id}>   
            {aTodo.item}
          </span>
          <span id={aTodo.id}>
            {aTodo.completed ? ` Completed: ${moment().format('MMMM Do YYYY, h:mm a')}` : ''}
          </span>
        </li>
      )
    })
    return item
  }

  return (
    <div className="App">
      <section className="challange-todo-list">
        <div className="display-todos">
          <h2>Todo List:</h2>
          <ul>
            {displayTodos()}
          </ul>

        </div>
        <div className="todo-form">
          <form onSubmit={onSubmit}>
            <input placeholder='Add new Todo' value={useInput} onChange={onChange} />
            <button type='submit'>Submit Todo</button>
          </form>
          <button onClick={clearTodos}>Clearn Completed Todos</button>
        </div>
      </section>
    </div>
  );
}

export default App;
