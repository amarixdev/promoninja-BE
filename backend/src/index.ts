import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { PrismaClient } from "@prisma/client";
import fetch from "node-fetch";
import { env } from "../../environment";
import resolvers from "./graphql/resolvers";
import typeDefs from "./graphql/typeDefs";

const { CLIENT_ID, CLIENT_SECRET } = env;

const main = async () => {
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  interface MyContext {
    prisma?: PrismaClient;
    test: string;
  }

  const server = new ApolloServer<MyContext>({
    schema,
  });

  const prisma = new PrismaClient();
  const PORT = process.env.PORT || 4000;

  const { url } = await startStandaloneServer<MyContext>(server, {
    context: async ({ req, res }) => {
      const accessToken = await fetch(
        "https://accounts.spotify.com/api/token",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization:
              "Basic " +
              Buffer.from(CLIENT_ID + ":" + CLIENT_SECRET).toString("base64"),
          },
          body: "grant_type=client_credentials",
        }
      )
        .then((result) => result.json())
        .then((data) => {
          return data.access_token;
        });
      return {
        accessToken,
        test: "test",
        prisma,
      };
    },

    listen: { port: Number(PORT) || 4000 },
  });
  console.log(`🚀  Server ready at: ${url}`);
};

main().catch((err) => console.log(err));
