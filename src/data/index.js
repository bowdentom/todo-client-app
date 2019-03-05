const initialTodos = [
  {
    id: 'asdfgh',
    text: 'Do laundry',
    completed: false,
  },
  {
    id: 'qwerty',
    text: 'Wash dishes',
    completed: true,
  },
  {
    id: 'zxcvbn',
    text: 'Buy groceries',
    completed: false,
  },
]

// We use `module.exports` here so that `todos` can also be accessed from `nodeJS`
module.exports = { initialTodos }
