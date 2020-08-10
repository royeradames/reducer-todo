import { useState, useReducer } from 'react';

export default function useForm(initialTodo, todoReducer) {
  //state
  const [useInput, setUserInput] = useState('')
  const [todoList, setTodoList] = useReducer(todoReducer, initialTodo)

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
    e.stopPropagation()
    
    console.log(`running toogleCompleted`)
    debugger
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

  //return the state and setState
  return [useInput, todoList, onChange, onSubmit, toggleCompleted, clearTodos]
}