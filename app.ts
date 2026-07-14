import dotenv from "dotenv";
dotenv.config({ path: ".env.development" });

import express from "express";
import cors from "cors";
import typeDefs from "./src/graphql/typeDefs/typeDefs";
import resolvers from "./src/graphql/resolvers/resolvers";
import { ApolloServer } from "@apollo/server";

import authRoutes from "./src/features/auth/authRoutes";
import { expressMiddleware } from "@as-integrations/express5";
import cookieParser from "cookie-parser";
import verifyJWT from "./src/features/auth/services/common/verifyJWT";
import User from "./src/schemas/User";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes);

const startApolloServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: async ({ req }) => {
        const token = req.cookies.login || "";

        try {
          const payload = verifyJWT(token);
          const user = await User.findById(payload.userId).populate(
            "subscription",
          );

          return { user };
        } catch (error) {
          console.error("Error getting context in GraphQL: ", error);
          return { user: null };
        }
      },
    }),
  );
};

startApolloServer();

export default app;
