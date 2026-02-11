import grpc from "@grpc/grpc-js";                  
const proto = require("@ncostamagna/passit-proto");

const GRPC_HOST = process.env.GRPC_HOST || "localhost:8050";

const client = new proto.PassitClient(
  GRPC_HOST,
  grpc.credentials.createInsecure()
);

export default client;