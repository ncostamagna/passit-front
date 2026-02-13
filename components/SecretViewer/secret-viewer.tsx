"use client";

import { useEffect, useState } from "react";

import { Decrypted } from "./decrypted";
import { DecryptionKey } from "./decryption-key";

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
  console.log(decrypted);

  // Mock decrypted secret — replace with real API call
  const secret = "asdasdasd";

  useEffect(() => {
    if (!decrypted) return;
    onReveal(id).then(({message, error}) => {
      console.log(message, error)
    })
  }, [decrypted]);

  const handleDecrypt = (key: string) => {
    setDecrypted(true);
  }

  

  return (
    <main className="max-w-2xl mx-auto mt-12 px-4 pb-16">
      {decrypted ?
        <Decrypted secret={secret} /> : <DecryptionKey handleDecrypt={handleDecrypt} />
        }
    </main>
  );
}
