"use client";

import { useState } from "react";
import { EyeIcon, KeyIcon, CheckIcon, CopyIcon } from "./icons";

export function SecretViewer({
  id,
  token,
}: {
  id: string;
  token: string | null;
}) {
  const [decryptionKey, setDecryptionKey] = useState("");
  const [decrypted, setDecrypted] = useState(!!token);
  const [copied, setCopied] = useState(false);

  // Mock decrypted secret — replace with real API call
  const secret = "asdasdasd";

  const handleDecrypt = () => {
    // TODO: use decryptionKey + id to fetch and decrypt the secret
    setDecrypted(true);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(secret);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="max-w-2xl mx-auto mt-12 px-4 pb-16">
      {decrypted ? (
        <div className="animate-fade-in">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <EyeIcon />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">
                Decrypted Message
              </h2>
              <p className="text-sm text-slate-400">ID: {id}</p>
            </div>
          </div>

          <div className="bg-[#151525] rounded-2xl card-glow p-8 transition-all duration-300">
            {/* Warning */}
            <div className="bg-amber-500/5 border border-amber-500/10 rounded-xl px-4 py-3 mb-6">
              <p className="text-sm text-amber-200/80 leading-relaxed">
                This secret might not be viewable again, make sure to save it
                now!
              </p>
            </div>

            {/* Secret content */}
            <div className="result-row">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
                  Secret
                </span>
                <button
                  onClick={handleCopy}
                  className={`copy-btn ${copied ? "copied" : ""}`}
                  title="Copy to clipboard"
                >
                  {copied ? <CheckIcon /> : <CopyIcon />}
                </button>
              </div>
              <pre className="text-[15px] text-slate-200 whitespace-pre-wrap break-all font-mono leading-relaxed">
                {secret}
              </pre>
            </div>

            <a
              href="/"
              className="btn-gradient mt-8 w-full text-white py-3 px-6 rounded-xl font-semibold cursor-pointer block text-center"
            >
              Encrypt Another Message
            </a>
          </div>
        </div>
      ) : (
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
              onClick={handleDecrypt}
              disabled={!decryptionKey.trim()}
              className="btn-gradient mt-8 w-full text-white py-3.5 px-6 rounded-xl font-semibold cursor-pointer"
            >
              Decrypt Secret
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
