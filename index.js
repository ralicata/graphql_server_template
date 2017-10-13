import express from "express";
import bodyParser from "body-parser";
import { graphqlExpress, graphiqlExpress } from "apollo-server-express";
import { makeExecutableSchema } from "graphql-tools";

import typeDefs from "./schema";
import resolvers from "./resolvers";
import models from "./models";

const PORT = 3000;

const app = express();

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

app.use(
  "/graphql",
  bodyParser.json(),
  graphqlExpress({ schema, context: { models } })
);

app.use(
  "/graphiql",
  graphiqlExpress({
    endpointURL: "/graphql"
  })
);

models.sequelize.sync().then(() => app.listen(PORT));
