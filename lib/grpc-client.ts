import grpc from "@grpc/grpc-js";                  
import { GRPC_HOST } from "@/config/config";
const proto = require("@ncostamagna/passit-proto");

const client = new proto.PassitClient(
  GRPC_HOST,
  grpc.credentials.createInsecure()
);

export default client;