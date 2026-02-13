"use client";

import { useState } from "react";
import { EncryptForm } from "./encrypt-form";
import { UrlEncryptedPassword } from "./url-encrypted-password";
import { encrypt } from "@/lib/crypt";

export function Home({createSecret}: {createSecret: (encryptedText: string, oneTime: boolean) => Promise<{error: boolean, data: string}>}) {

  const [result, setResult] = useState<{
    id: string;
    iv: string;
    cryptoKey: string;
  } | null>(null);

  const handleEncrypt = async (message: string, oneTime: boolean) => {
    console.log(message);
    const {ciphertext, iv, key} = await encrypt(message);
    // TODO: send ciphertext to backend and recive id
    const { error, data } = await createSecret(ciphertext, oneTime);
    console.log(ciphertext, iv, key);
    setResult({ id: data, iv, cryptoKey: key });
  };

  const handleBack = () => {
    setResult(null);
  };

  return (
    <main className="max-w-2xl mx-auto mt-12 px-4 pb-16">
      {result ? <UrlEncryptedPassword id={result.id} iv={result.iv} cryptoKey={result.cryptoKey} handleBack={handleBack} /> : <EncryptForm handleEncrypt={handleEncrypt}/>}
    </main>
  );
}
