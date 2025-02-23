import { type QueryResolvers as IQuery } from "./generated/graphql";
import { Context } from "./context";

export const Query: IQuery<Context> = {
  hello: () => "world",
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
  completeTodos: async (_, __, { prisma }) => {
    try{
      const todos = await prisma.todo.findMany({
        where: {completed: true}
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
};
