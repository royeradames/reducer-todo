

import React, { useState, useReducer } from 'react';
import './App.css';
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
  //states
  const [useInput, setUserInput] = useState('')
  const [todoList, setTodoList] = useReducer(todoReducer, initialTodo)

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
  //handles Changes on input
  function onChange(e) {
    //get the user input on the text area into the userInput state
    setUserInput(e.target.value)
  }
  //handle the submit button
  function onSubmit(e) {
    //stop page reload
    e.preventDefault()
    //get the userInput state text has the next todo into the todoList
    setTodoList({ type: 'ADD', payload: { item: useInput } })
    //clear input data
    setUserInput('')
  }
  //toggle completed
  const toggleCompleted = (e) => {
    //prvent page reload, and event propagation
    e.preventDefault()
    // e.stopPropagation()

    // console.log(`running toogleCompleted`)
    // debugger
    //call the reducer and flip the completed boolean value
    setTodoList({ type: 'COMPLETED', payload: { id: e.target.id } })

  }
  //clear the todos
  function clearTodos() {
    //get a copy of how you want the list to look like
    const newTodo = todoList.filter(aTodo => {
      return aTodo.completed !== true
    })
    //override the todolist with this new array
    setTodoList({ type: 'CLEAR', payload: { newTodo } })
  }
  return (
    <div className="App">
      <section className="challange-todo-list">
        <div className="display-todos">
          <h2>Todo List:</h2>
          <ul>
            {todoList.map(aTodo => {
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
    })}
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
