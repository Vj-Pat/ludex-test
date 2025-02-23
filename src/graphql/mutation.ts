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
  createTodo: async (_, { input, due}, { prisma }) => {
    const newDate = new Date();
    const todo = await prisma.todo.create({
      data: {
        title: input.title,
        due: due && due.amount ? setDueDate(newDate, due.amount) : undefined
      },
    });
    
    return {
      id: todo.id,
      completed: todo.completed,
      title: todo.title,
      createdAt: todo.createdAt.toLocaleString(),
      updatedAt: todo.updatedAt.toLocaleString(),
      due: todo.due ? todo.due.toLocaleString() : "",
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
      createdAt: todo.createdAt.toLocaleString(),
      updatedAt: todo.updatedAt.toLocaleString(),
      due: todo.due ? todo.due.toLocaleString() : "",
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
      createdAt: todo.createdAt.toLocaleString(),
      updatedAt: todo.updatedAt.toLocaleString(),
      due: todo.due ? todo.due.toLocaleString() : "",
    }
  },
  // Deletes a todo with an ID
  deleteTodo: async(_, { input }, { prisma }) => {
    const todo = await prisma.todo.delete({
      where: {id: input.id}
    });
    return {
      id: todo.id,
      completed: todo.completed,
      title: todo.title,
      createdAt: todo.createdAt.toLocaleString(),
      updatedAt: todo.updatedAt.toLocaleString(),
      due: todo.due ? todo.due.toLocaleString() : "",
    }
  },
};

function setDueDate(
  newDate: Date,
  due: number):
  string | undefined {
  return new Date(newDate.setDate(newDate.getDate() + due)).toISOString();
}
