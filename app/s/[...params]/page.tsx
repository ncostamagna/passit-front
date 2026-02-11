import { Navbar } from "@/components/navbar";
import { SecretViewer } from "@/components/secret-viewer";
import grpcClient from "@/lib/grpc-client";
import {ServiceError} from "@grpc/grpc-js"
import { GetSecretResponse, GetSecretRequest } from "@ncostamagna/passit-proto";

export default async function SecretPage({
  params,
}: {
  params: Promise<{ params: string[] }>;
}) {
  const { params: segments } = await params;

  const hasToken = segments.length >= 2;
  const token = hasToken ? segments[0] : null;
  const id = hasToken ? segments[1] : segments[0];

  async function revealSecret(id: string, token:
    string | null) {
        // rpc endpoint
        "use server";

        const request = new GetSecretRequest();
        request.setKey("test123");

        return new Promise<{message: string | null; error: boolean}>((resolve, reject) => {
          grpcClient.getSecret(request, (err : ServiceError, response: GetSecretResponse) => {
            resolve({error: !!err, message: response?.getMessage()})
          });
        });
      }

  return (
    <div className="min-h-screen bg-gradient-animated">
      <Navbar />
      <SecretViewer id={id} token={token} onReveal={revealSecret} />
    </div>
  );
}
