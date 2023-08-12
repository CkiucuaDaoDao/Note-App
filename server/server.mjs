import express from 'express'
import http from 'http'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import { ApolloServer } from '@apollo/server';
import bodyParser from 'body-parser';
import { expressMiddleware } from '@apollo/server/express4'
import cors from 'cors'
import mongoose from 'mongoose';
import 'dotenv/config.js'
import { MongoClient, ServerApiVersion } from 'mongodb'
import { resolvers } from './resolvers/index.mjs';
import { typeDefs } from './schemas/index.mjs';
import FakeData from '../server/FakeData/index.js';

const app = express()
const httpServer = http.createServer(app)

//Connect to DB
const URI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.o0mkgpm.mongodb.net/?retryWrites=true&w=majority`
const PORT = process.env.PORT || 4000
const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
  });
  
await server.start()

app.use(cors(), bodyParser.json(), expressMiddleware(server))

const client = new MongoClient(URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    await new Promise((resolve) => httpServer.listen({port: PORT}, resolve))
    console.log('🚀  Server ready at http://localhost:4000');
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);



