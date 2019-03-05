import React, { useState } from 'react'
import classnames from 'classnames'

import TodoTextInput from './TodoTextInput'

const TodoItem = props => {
  const [editing, setEditing] = useState(false)

  const handleDoubleClick = () => setEditing(true)

  const handleSave = (id, text) => {
    const { removeTodo, editTodo } = props
    text.length === 0 ? removeTodo(id) : editTodo(id, text)
    setEditing(false)
  }

  const { todo, completeTodo, removeTodo } = props

  let element
  if (editing) {
    element = (
      <TodoTextInput
        text={todo.text}
        editing={editing}
        onSave={text => handleSave(todo.id, text)}
      />
    )
  } else {
    element = (
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={todo.completed}
          onChange={() => completeTodo(todo.id)}
          style={{ cursor: 'pointer' }}
        />
        <label
          onDoubleClick={handleDoubleClick}
          style={{ cursor: 'crosshair' }}
        >
          {todo.text}
        </label>
        <button
          className="destroy"
          onClick={() => removeTodo(todo.id)}
          style={{ cursor: 'pointer' }}
        />
      </div>
    )
  }

  return (
    <li
      className={classnames({
        completed: todo.completed,
        editing,
      })}
    >
      {element}
    </li>
  )
}

export default TodoItem
