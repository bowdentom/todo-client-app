import React, { useState, useEffect } from 'react'
import { generate } from 'shortid'
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost'

import TodoItem from './TodoItem'
import TodoTextInput from './TodoTextInput'
// import { initialTodos } from '../data'
import { LIST_TODOS } from '../graphql/queries'
import { CREATE_TODO, DELETE_TODO, UPDATE_TODO } from '../graphql/mutations'
import { GRAPHQL_API_URL } from '../config'

const client = new ApolloClient({
  link: new HttpLink({ uri: GRAPHQL_API_URL }),
  cache: new InMemoryCache(),
})

const App = () => {
  const [todos, setTodos] = useState([])

  const fetchTodos = async () => {
    // Get a fresh list of all todos from the server
    try {
      const response = await client.query({
        query: LIST_TODOS,
        fetchPolicy: 'no-cache',
      })
      const fetchedTodos = response.data.listTodos
      setTodos(fetchedTodos)
    } catch (err) {
      console.log(`Error in fetchTodos API call: ${err}`)
    }
  }

  // Fetch todos on mount
  useEffect(() => {
    fetchTodos()
  }, [])

  const addTodo = async todoText => {
    // Update UI immediately
    const addedTodo = {
      id: generate(),
      text: todoText,
      completed: false,
    }
    const updatedTodos = [...todos, addedTodo]
    setTodos(updatedTodos)
    // Send operation to the API
    try {
      const createTodoInput = {
        id: addedTodo.id,
        text: addedTodo.text,
        completed: addedTodo.completed,
      }
      await client.mutate({
        mutation: CREATE_TODO,
        variables: { input: createTodoInput },
      })
    } catch (err) {
      console.log(`Error in addTodo API call with text ${todoText}: ${err}`)
    }
  }

  const removeTodo = async todoId => {
    // Update UI immediately
    const updatedTodos = todos.filter(todo => todo.id !== todoId)
    setTodos(updatedTodos)
    // Send operation to the API
    try {
      const deleteTodoInput = {
        id: todoId,
      }
      await client.mutate({
        mutation: DELETE_TODO,
        variables: { input: deleteTodoInput },
      })
    } catch (err) {
      console.log(`Error in removeTodo API call with id ${todoId}: ${err}`)
    }
  }

  const editTodo = async (todoId, todoText) => {
    // Update UI immediately
    const updateTodos = [...todos]
    const index = updateTodos.findIndex(todo => todo.id === todoId)
    const editedTodo = updateTodos[index]
    editedTodo.text = todoText
    setTodos(updateTodos)
    // Send operation to the API
    try {
      const updateTodoInput = {
        id: todoId,
        text: todoText,
        completed: editedTodo.completed,
      }
      await client.mutate({
        mutation: UPDATE_TODO,
        variables: { input: updateTodoInput },
      })
    } catch (err) {
      console.log(
        `Error in editTodo API call with id ${todoId} and text ${todoText}: ${err}`
      )
    }
  }

  const completeTodo = async todoId => {
    // Update UI immediately
    const updateTodos = [...todos]
    const index = updateTodos.findIndex(todo => todo.id === todoId)
    const editedTodo = updateTodos[index]
    editedTodo.completed = !editedTodo.completed
    setTodos(updateTodos)
    // Send operation to the API
    try {
      const updateTodoInput = {
        id: todoId,
        text: editedTodo.text,
        completed: editedTodo.completed,
      }
      await client.mutate({
        mutation: UPDATE_TODO,
        variables: { input: updateTodoInput },
      })
    } catch (err) {
      console.log(`Error in completeTodo API call with id ${todoId}: ${err}`)
    }
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
