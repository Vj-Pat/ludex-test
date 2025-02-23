import { type MutationResolvers as IMutation } from "./generated/graphql";
import { Context } from "./context";

export const Mutation: IMutation<Context> = {
  createSomething: async (_, { input }, { prisma }) => {
    const something = await prisma.something.create({
      data: {
        name: input.name,
      },
    });

    return {
      id: something.id,
      name: something.name,
    };
  },
  // Creates a new todo, with the current date
  createTodo: async (_, { input }, { prisma }) => {
    const todo = await prisma.todo.create({
      data: {
        title: input.title,
      },
    });
    
    return {
      id: todo.id,
      completed: todo.completed,
      title: todo.title,
      createdAt: todo.createdAt.toDateString(),
      updatedAt: todo.updatedAt.toDateString(),
    };
  },
  //Updates a todo, to set its status from completed to uncompleted
  // and vice versa (true -> false, false -> true)
  updateCompleteTodo: async (_, { input }, { prisma }) => {
    const findTodo = await prisma.todo.findFirst({
      where: {id: input.id},
    });
    const todo = await prisma.todo.update({
      where: {id: input.id},
      data: {completed: !findTodo?.completed},
    });
    return {
      id: todo.id,
      completed: todo.completed,
      title: todo.title,
      createdAt: todo.createdAt.toDateString(),
      updatedAt: todo.updatedAt.toDateString()
    }
  },
  //Update the title of a todo
  updateTitleTodo: async (_, { inputID, inputTitle }, { prisma }) => {
    const todo = await prisma.todo.update({
      where: {id: inputID.id},
      data: {title: inputTitle.title}
    });
    return {
      id: todo.id,
      completed: todo.completed,
      title: todo.title,
      createdAt: todo.createdAt.toDateString(),
      updatedAt: todo.updatedAt.toDateString()
    }
  },
  deleteTodo: async(_, { input }, { prisma }) => {
    const todo = await prisma.todo.delete({
      where: {id: input.id}
    });
    return {
      id: todo.id,
      completed: todo.completed,
      title: todo.title,
      createdAt: todo.createdAt.toDateString(),
      updatedAt: todo.updatedAt.toDateString()
    }
  },
};