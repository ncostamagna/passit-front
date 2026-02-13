import { Navbar } from "@/components/navbar";
import { Home as HomeContent } from "@/components/Home/home";
import grpcClient from "@/lib/grpc-client";
import { CreateSecretRequest, CreateSecretResponse } from "@ncostamagna/passit-proto";
import { ServiceError } from "@grpc/grpc-js";
import { BASE_URL } from "@/config/config";

export default function Home() {

  async function createSecret(encryptedText: string, oneTime: boolean) : Promise<{error: boolean, data: string}> {
    "use server";

    const request = new CreateSecretRequest();
    request.setMessage(encryptedText);
    request.setExpiration(3600);
    request.setOneTime(oneTime);

    const response = await new Promise<{error: boolean, data: string}>((resolve, reject) => grpcClient.createSecret(request, (err : ServiceError, response: CreateSecretResponse) => {
      // TODO: solve in 1 line
      if (err) {
        resolve({
          error: true,
          data: 'Error creating secret',
        });
        return;
      } 

      resolve({
        error: false,
        data: response.getKey(),
      });
    }));

    return response;
  }

  return (
    <div className="min-h-screen bg-gradient-animated">
      <Navbar />
      <HomeContent createSecret={createSecret} baseUrl={BASE_URL} />
    </div>
  );
}
