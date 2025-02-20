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
    createTodo(input: CreateTodoInput!): Todo!
    updateCompleteTodo(input: UpdateTodoInput!): Todo!
    updateTitleTodo(inputID: UpdateTodoInput!, inputTitle: CreateTodoInput!): Todo!
  }

  type Query {
    hello: String
  }

  type Todo {
    id: ID!
    title: String!
    completed: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  input CreateTodoInput {
    title: String!
  }

  input UpdateTodoInput {
    id: String!
  }
`;
