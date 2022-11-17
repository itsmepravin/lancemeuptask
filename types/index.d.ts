import { MongoClient } from "mongodb";

declare global {
  var _mongoClientPromise: Promise<MongoClient>;
  var normalUserName: string;
  var normalUserPassword: string;
}

export {};
