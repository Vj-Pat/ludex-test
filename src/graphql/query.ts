import { type QueryResolvers as IQuery } from "./generated/graphql";
import { Context } from "./context";

export const Query: IQuery<Context> = {
  hello: () => "world",
  // Returns all Todos
  todos: async (_, __ ,{ prisma }) => {
    try{ 
      const todos = await prisma.todo.findMany();
      return todos.length > 0 ? todos.map(todo => ({
        id: todo.id,
        title: todo.title,
        completed: todo.completed,
        createdAt: todo.createdAt.toDateString(),
        updatedAt: todo.updatedAt ? todo.updatedAt.toDateString() : null,
      })): [];
    } catch (error) {
      console.error(error);
      return [];
    } 
  },
  // Returns only the incomplete todos
  incompleteTodos: async (_, __, { prisma }) => {
    try{
      const todos = await prisma.todo.findMany({
        where: {completed: false}
      });
      return todos.length > 0 ? todos.map(todo => ({
        id: todo.id,
        title: todo.title,
        completed: todo.completed,
        createdAt: todo.createdAt.toDateString(),
        updatedAt: todo.updatedAt ? todo.updatedAt.toDateString() : null,
      })): [];
    } catch (error) {
      console.error(error);
      return [];
    }
  },
  // Returns only the complete Todos
  // If possible, sort by date
  completeTodos: async (_, { input }, { prisma }) => {
    try{
      const todos = await prisma.todo.findMany({
        where: {
          AND: {
            completed: true,
            // To filter by date, use a value similar to this format
            // 2025-02-23T06:17:21.655Z (UTC date&time) 
            createdAt: input ? new Date(input.date) : undefined  
          }
        },
        orderBy: {createdAt: 'asc'}
      });
      return todos.length > 0 ? todos.map(todo => ({
        id: todo.id,
        title: todo.title,
        completed: todo.completed,
        createdAt: todo.createdAt.toDateString(),
        updatedAt: todo.updatedAt ? todo.updatedAt.toDateString() : null,
      })): [];
    } catch (error) {
      console.error(error);
      return [];
    }
  },
  // Return a single Todo
  todo: async (_, { input }, { prisma }) => {
    try{
      const todo = await prisma.todo.findFirst({
        where: {id: input.id}
      }); 
      return todo ? {
        id: todo.id,
        completed: todo.completed,
        title: todo.title,
        createdAt: todo.createdAt.toDateString(),
        updatedAt: todo.updatedAt.toDateString()
      } : null;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  todoByPage: async (_, { pages, qty }, { prisma }) => {
    try{
      const todos = await prisma.todo.findMany({
        skip : pages && pages.amount ? pages.amount : undefined,
        take : qty && qty.amount ? qty.amount: 10
      });
      return todos.length > 0 ? todos.map(todo => ({
        id: todo.id,
        title: todo.title,
        completed: todo.completed,
        createdAt: todo.createdAt.toDateString(),
        updatedAt: todo.updatedAt ? todo.updatedAt.toDateString() : null,
      })): [];
    } catch (error) {
      console.error(error);
      return [];
    }
  },
};
