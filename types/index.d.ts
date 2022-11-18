import { MongoClient } from "mongodb";

declare global {
  var _mongoClientPromise: Promise<MongoClient>;
  var normalUserName: string;
  var normalUserPassword: string;
  var adminUserName: string;
  var adminUserPassword: string;
}

export {};
