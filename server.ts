import loadSecrets from "./src/configs/loadSecrets";
import app from "./app";
import { redisConnect } from "./src/configs/redis";
import mongooseConnect from "./src/configs/mongooseConnect";
import deleteUnverifiedEmails from "./src/jobs/deleteUnverifiedEmails";
import { initGeoLite } from "./src/configs/geolite";
import seedSubscriptions from "./src/seed/seedSubscriptions";
import sentryConfig from "./src/configs/sentryConfig";
import * as Sentry from "@sentry/node";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import typeDefs from "./src/graphql/typeDefs/typeDefs";
import resolvers from "./src/graphql/resolvers/resolvers";

const launchBackendServer = async () => {
  loadSecrets();

  redisConnect();

  await initGeoLite();

  await mongooseConnect();

  await seedSubscriptions();

  await deleteUnverifiedEmails.start();

  Sentry.setupExpressErrorHandler(app);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  app.listen(3000);
  console.log(`Apollo Server ready at: ${url}`);
};

launchBackendServer();
