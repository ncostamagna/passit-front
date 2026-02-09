"use client";

import { use, useState } from "react";

function EyeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function KeyIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

export default function SecretPage({
  params,
}: {
  params: Promise<{ params: string[] }>;
}) {
  const { params: segments } = use(params);

  // /s/:token/:id → one-click (key in URL)
  // /s/:id        → short link (need to ask for key)
  const hasToken = segments.length >= 2;
  const token = hasToken ? segments[0] : null;
  const id = hasToken ? segments[1] : segments[0];

  const [decryptionKey, setDecryptionKey] = useState("");
  const [decrypted, setDecrypted] = useState(hasToken);
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
    <div className="min-h-screen bg-gradient-animated">
      {/* Navbar */}
      <nav className="border-b border-white/5 backdrop-blur-md bg-white/[0.02]">
        <div className="max-w-4xl mx-auto flex items-center justify-between px-6 py-4">
          <a href="/" className="flex items-center gap-3 group">
            <div className="text-indigo-400 group-hover:text-indigo-300 transition-colors">
              <LockIcon />
            </div>
            <h1 className="text-xl font-bold tracking-wide text-white group-hover:text-indigo-200 transition-colors">
              Passit
            </h1>
          </a>
          <span className="text-sm text-slate-400 hidden sm:block">
            Share Secrets Securely
          </span>
        </div>
      </nav>

      {/* Main */}
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
    </div>
  );
}
