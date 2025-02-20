import "reflect-metadata";
import { Router } from "express";
import { createYoga, createSchema, useExtendContext } from "graphql-yoga";
import { typeDefs } from "./typeDefinitions";
import { PrismaClient } from "@prisma/client";
import { Query } from "./query";
import { Mutation } from "./mutation";

const prisma = new PrismaClient();

const yogaPublicRouter = Router();

const schema = createSchema({
  typeDefs,
  resolvers: {
    Query,
    Mutation,
  },
});

const yoga = createYoga({
  schema,
  graphiql: true,
  healthCheckEndpoint: "/health",
  landingPage: false,
  logging: true,
  plugins: [
    // explanation: default behavior of the project
    // eslint-disable-next-line @typescript-eslint/require-await
    useExtendContext(async (ctx) => {
      // explanation: default behavior of the project
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return {
        ...ctx,
        prisma: prisma,
      };
    }),
  ],
});
yogaPublicRouter.use(yoga);

export { yogaPublicRouter, yoga as yogaPublic };
