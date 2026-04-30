"use server";

import grpcClient from "@/lib/grpc-client";
import { ServiceError } from "@grpc/grpc-js";
import { GetSecretResponse, GetSecretRequest } from "@ncostamagna/passit-proto";

export async function revealSecret(id: string): Promise<{ message: string | null; error: boolean }> {
  console.log("[revealSecret] called with id:", id);

  const request = new GetSecretRequest();
  request.setKey(id);

  return new Promise((resolve) => {
    console.log("[revealSecret] sending gRPC request");
    grpcClient.getSecret(request, (err: ServiceError, response: GetSecretResponse) => {
      console.log("[revealSecret] gRPC response - error:", !!err, "message:", response?.getMessage());
      resolve({ error: !!err, message: response?.getMessage() });
    });
  });
}
