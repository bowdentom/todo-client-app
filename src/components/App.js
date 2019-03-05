import React, { useState } from 'react'
import { generate } from 'shortid'

import TodoItem from './TodoItem'
import TodoTextInput from './TodoTextInput'
import { initialTodos } from '../data'

const App = () => {
  const [todos, setTodos] = useState(initialTodos)

  const addTodo = todoText => {
    const addedTodo = {
      id: generate(),
      completed: false,
      text: todoText,
    }
    const updateTodos = [...todos, addedTodo]
    setTodos(updateTodos)
  }

  const removeTodo = todoId => {
    const updateTodos = todos.filter(todo => todo.id !== todoId)
    setTodos(updateTodos)
  }

  const editTodo = (todoId, todoText) => {
    const updateTodos = [...todos]
    const index = updateTodos.findIndex(todo => todo.id === todoId)
    const editedTodo = updateTodos[index]
    editedTodo.text = todoText
    setTodos(updateTodos)
  }

  const completeTodo = todoId => {
    const updateTodos = [...todos]
    const index = updateTodos.findIndex(todo => todo.id === todoId)
    const editedTodo = updateTodos[index]
    editedTodo.completed = !editedTodo.completed
    setTodos(updateTodos)
  }

  return (
    <div>
      <header className="header">
        <h1>todos</h1>
        <TodoTextInput
          newTodo
          onSave={text => {
            if (text.length !== 0) addTodo(text)
          }}
        />
      </header>
      <section className="main">
        <ul className="todo-list">
          {todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              completeTodo={completeTodo}
              editTodo={editTodo}
              removeTodo={removeTodo}
            />
          ))}
        </ul>
      </section>
    </div>
  )
}

export default App
