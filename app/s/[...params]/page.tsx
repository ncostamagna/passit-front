import { Navbar } from "@/components/navbar";
import { SecretViewer } from "@/components/SecretViewer/secret-viewer";
import grpcClient from "@/lib/grpc-client";
import {ServiceError} from "@grpc/grpc-js"
import { GetSecretResponse, GetSecretRequest } from "@ncostamagna/passit-proto";

export default async function SecretPage({
  params,
}: {
  params: Promise<{ params: string[] }>;
}) {
  const { params: segments } = await params;

  const invalidUrl = segments.length < 2 || segments.length > 3;

  if (invalidUrl) {
    return <div>Invalid URL</div>;
  }

  console.log(segments);
  console.log(segments.length);
  const id = segments[0];
  const iv = segments[1];
  const cryptoKey = segments.length == 3 ? segments[2] : null;

  console.log(id, iv, cryptoKey);

  async function revealSecret(id: string) {
      // rpc endpoint
      "use server";

      const request = new GetSecretRequest();
      request.setKey(id);

      return new Promise<{message: string | null; error: boolean}>((resolve, reject) => {
        grpcClient.getSecret(request, (err : ServiceError, response: GetSecretResponse) => {
          resolve({error: !!err, message: response?.getMessage()})
        });
      });
    }

  return (
    <div className="min-h-screen bg-gradient-animated">
      <Navbar />
      <SecretViewer id={id} iv={iv} cryptoKey={cryptoKey} onReveal={revealSecret} />
    </div>
  );
}
