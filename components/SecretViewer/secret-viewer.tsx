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
  const [secret, setSecret] = useState<string>("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(!!cryptoKey);

  console.log("[SecretViewer] mount - id:", id, "iv:", iv, "cryptoKey:", cryptoKey, "loading:", !!cryptoKey);

  const revealSecret = (key: string) => {
    console.log("[SecretViewer] revealSecret called, key length:", key.length);
    setLoading(true);
    onReveal(id)
      .then(({ message, error }) => {
        console.log("[SecretViewer] onReveal response - error:", error, "hasMessage:", !!message);
        if (error || !message) {
          setError(true);
          return;
        }
        return decrypt(message, iv, key);
      })
      .then((result) => {
        console.log("[SecretViewer] decrypt result:", !!result);
        if (result) setSecret(result);
      })
      .catch((e) => {
        console.error("[SecretViewer] error:", e);
        setError(true);
      });
  };

  useEffect(() => {
    console.log("[SecretViewer] useEffect - cryptoKey:", cryptoKey);
    if (cryptoKey) revealSecret(cryptoKey);
  }, []);

  const handleDecrypt = (key: string) => {
    revealSecret(key);
  };

  return (
    <main className="max-w-2xl mx-auto mt-12 px-4 pb-16">
      {error
        ? <SecretError />
        : loading
          ? (secret ? <Decrypted secret={secret} /> : <p className="text-white">Decrypting...</p>)
          : <DecryptionKey handleDecrypt={handleDecrypt} />
      }
    </main>
  );
}
