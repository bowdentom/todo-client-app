import React, { useState } from 'react'
import classnames from 'classnames'

const TodoTextInput = props => {
  const [text, setText] = useState(props.text || '')

  const handleSubmit = event => {
    const { onSave, newTodo } = props
    const text = event.target.value.trim()
    // Key event with code 13 is "enter"
    if (event.which === 13) {
      onSave(text)
      if (newTodo) setText('')
    }
  }

  const handleChange = event => setText(event.target.value)

  const handleBlur = event => {
    const { onSave, newTodo } = props
    if (!newTodo) onSave(event.target.value)
  }

  return (
    <input
      className={classnames({
        edit: props.editing,
        'new-todo': props.newTodo,
      })}
      type="text"
      placeholder="What needs to be done?"
      autoFocus
      value={text}
      onBlur={handleBlur}
      onChange={handleChange}
      onKeyDown={handleSubmit}
    />
  )
}

export default TodoTextInput
