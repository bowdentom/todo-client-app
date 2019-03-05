import gql from 'graphql-tag'

export const LIST_TODOS = gql`
  query ListTodos {
    listTodos {
      id
      text
      completed
    }
  }
`
