export const typeDefs = /* GraphQL */ `
  input CreateSomethingInput {
    name: String!
  }

  type Something {
    id: ID!
    name: String!
  }

  type Mutation {
    createSomething(input: CreateSomethingInput!): Something!
    createTodo(input: TitleInput!, due: Number): Todo!
    updateCompleteTodo(input: IdInput!): Todo!
    updateTitleTodo(inputID: IdInput!, inputTitle: TitleInput!): Todo!
    deleteTodo(input: IdInput!): Todo!
  }

  type Query {
    hello: String
    todos: [Todo]
    incompleteTodos: [Todo]
    completeTodos(input: CreateDateInput): [Todo]
    todo(input: IdInput!): Todo
    todoByPage(pages: Number, qty: Number): [Todo]
  }

  type Todo {
    id: ID!
    title: String!
    completed: Boolean!
    due: String!
    createdAt: String!
    updatedAt: String
  }

  input CreateDateInput {
    date: String!
  }

  input Number {
    amount: Int
  }

  input TitleInput { 
    title: String!
  }

  input IdInput {
    id: String!
  }
`;
