import { useState } from "react";
import { KeyIcon } from "../icons";

export function DecryptionKey({ handleDecrypt }: { handleDecrypt: (key: string) => void }) {

    const [decryptionKey, setDecryptionKey] = useState("");


  return (
    <div className="animate-fade-in">
    {/* Header */}
    <div className="flex items-center gap-3 mb-6">
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
        <KeyIcon />
      </div>
      <div>
        <h2 className="text-xl font-semibold text-white">
          Enter decryption key
        </h2>
        <p className="text-sm text-slate-400">
          A decryption key is required, please enter it below
        </p>
      </div>
    </div>

    <div className="bg-[#151525] rounded-2xl card-glow p-8 transition-all duration-300">
      <div>
        <label className="text-xs font-semibold uppercase tracking-wider text-indigo-400 block mb-3">
          Decryption Key
        </label>
        <input
          type="text"
          value={decryptionKey}
          onChange={(e) => setDecryptionKey(e.target.value)}
          placeholder="Enter your decryption key..."
          className="textarea-styled w-full p-4 text-[15px]"
        />
      </div>

      <button
        onClick={() => handleDecrypt(decryptionKey)}
        disabled={!decryptionKey.trim()}
        className="btn-gradient mt-8 w-full text-white py-3.5 px-6 rounded-xl font-semibold cursor-pointer"
      >
        Decrypt Secret
      </button>
    </div>
  </div>
  );
}