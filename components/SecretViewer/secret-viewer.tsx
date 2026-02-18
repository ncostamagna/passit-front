"use client";

import { useEffect, useState } from "react";

import { Decrypted } from "./decrypted";
import { DecryptionKey } from "./decryption-key";
import { SecretError } from "./error";
import { decrypt } from "@/lib/crypt";
export function SecretViewer({
  id,
  iv,
  cryptoKey,
  onReveal,
}: {
  id: string;
  iv: string;
  cryptoKey: string | null;
  onReveal: (id: string) => Promise<{message: string | null; error: boolean}>;
}) {

  console.log(cryptoKey);
  const [decrypted, setDecrypted] = useState(!!cryptoKey);
  const [secret, setSecret] = useState<string>("");
  const [error, setError] = useState(false);
  console.log(decrypted);

  // Mock decrypted secret — replace with real API call

  useEffect(() => {
    if (!decrypted) return;
    onReveal(id).then(({message, error}) => {
      console.log(message, error)

      if (error) {
        setError(true);
        return;
      }

      if (message && cryptoKey) {
        decrypt(message, iv, cryptoKey).then((decrypted) => {
          console.log(decrypted);
          setSecret(decrypted);
        });
      }
    })
  }, [decrypted]);

  const handleDecrypt = (key: string) => {
    setDecrypted(true);
  }

  

  return (
    <main className="max-w-2xl mx-auto mt-12 px-4 pb-16">
      {error
        ? <SecretError />
        : decrypted
          ? (secret ? <Decrypted secret={secret} /> : <p className="text-white">Decrypting...</p>)
          : <DecryptionKey handleDecrypt={handleDecrypt} />
      }
    </main>
  );
}
