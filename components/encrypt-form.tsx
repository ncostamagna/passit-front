"use client";

import { useState } from "react";
import { ShieldCheckIcon } from "./icons";
import { CopyButton } from "./copy-button";

function generateUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function generateKey(length = 22) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

const BASE_URL = "https://yopass.ncostamagna.com";

export function EncryptForm() {
  const [message, setMessage] = useState("");
  const [expiration, setExpiration] = useState("3600");
  const [oneTime, setOneTime] = useState(false);
  const [generateDecryptionKey, setGenerateDecryptionKey] = useState(true);
  const [result, setResult] = useState<{
    uuid: string;
    key: string;
  } | null>(null);

  const handleEncrypt = () => {
    const uuid = generateUUID();
    const key = generateKey();
    setResult({ uuid, key });
  };

  const handleBack = () => {
    setResult(null);
    setMessage("");
  };

  const oneClickLink = result
    ? `${BASE_URL}/s/${result.key}/${result.uuid}`
    : "";
  const shortLink = result ? `${BASE_URL}/s/${result.uuid}` : "";

  return (
    <main className="max-w-2xl mx-auto mt-12 px-4 pb-16">
      {result ? (
        <div className="animate-fade-in">
          {/* Success badge */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <ShieldCheckIcon />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">
                Secret stored in database
              </h2>
              <p className="text-sm text-slate-400">
                Encrypted and ready to share
              </p>
            </div>
          </div>

          <div className="bg-[#151525] rounded-2xl card-glow p-8 transition-all duration-300">
            <div className="bg-amber-500/5 border border-amber-500/10 rounded-xl px-4 py-3 mb-6">
              <p className="text-sm text-amber-200/80 leading-relaxed">
                Remember that secrets can only be downloaded once if not set
                otherwise. So do not open the link yourself.
              </p>
              <p className="text-sm text-amber-200/80 leading-relaxed mt-1">
                The cautious should send the decryption key in a separate
                communication channel.
              </p>
            </div>

            <div className="space-y-3">
              <div className="result-row">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
                    One-click link
                  </span>
                  <CopyButton text={oneClickLink} />
                </div>
                <p className="text-sm text-slate-300 break-all font-mono leading-relaxed">
                  {oneClickLink}
                </p>
              </div>

              <div className="result-row">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
                    Short link
                  </span>
                  <CopyButton text={shortLink} />
                </div>
                <p className="text-sm text-slate-300 break-all font-mono leading-relaxed">
                  {shortLink}
                </p>
              </div>

              <div className="result-row">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
                    Decryption Key
                  </span>
                  <CopyButton text={result.key} />
                </div>
                <p className="text-sm text-slate-300 break-all font-mono leading-relaxed">
                  {result.key}
                </p>
              </div>
            </div>

            <button
              onClick={handleBack}
              className="btn-gradient mt-8 w-full text-white py-3 px-6 rounded-xl font-semibold cursor-pointer"
            >
              Encrypt Another Message
            </button>
          </div>
        </div>
      ) : (
        <div className="animate-fade-in">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">
              Encrypt Message
            </h2>
            <p className="text-slate-400">
              Your secret will be encrypted and stored securely
            </p>
          </div>

          <div className="bg-[#151525] rounded-2xl card-glow p-8 transition-all duration-300">
            <textarea
              className="textarea-styled w-full h-40 p-4 resize-vertical text-[15px] leading-relaxed"
              placeholder="Enter your secret message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            {/* Expiration */}
            <div className="mt-7">
              <p className="text-sm font-semibold text-slate-300 mb-3 uppercase tracking-wider">
                Expiration
              </p>
              <div className="flex gap-2">
                {[
                  { label: "One Hour", value: "3600" },
                  { label: "One Day", value: "86400" },
                  { label: "One Week", value: "604800" },
                ].map((option) => (
                  <label
                    key={option.value}
                    className={`flex-1 text-center py-2.5 px-4 rounded-lg text-sm font-medium cursor-pointer transition-all duration-200 border ${
                      expiration === option.value
                        ? "bg-indigo-500/15 border-indigo-500/30 text-indigo-300"
                        : "bg-white/[0.02] border-white/[0.06] text-slate-400 hover:bg-white/[0.05] hover:text-slate-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="expiration"
                      value={option.value}
                      checked={expiration === option.value}
                      onChange={(e) => setExpiration(e.target.value)}
                      className="sr-only"
                    />
                    {option.label}
                  </label>
                ))}
              </div>
            </div>

            {/* Checkboxes */}
            <div className="mt-7 flex flex-col gap-3">
              <label className="flex items-center gap-3 cursor-pointer text-sm text-slate-300 hover:text-slate-200 transition-colors">
                <input
                  type="checkbox"
                  checked={oneTime}
                  onChange={(e) => setOneTime(e.target.checked)}
                  className="checkbox-custom"
                />
                One-time download
              </label>
              <label className="flex items-center gap-3 cursor-pointer text-sm text-slate-300 hover:text-slate-200 transition-colors">
                <input
                  type="checkbox"
                  checked={generateDecryptionKey}
                  onChange={(e) => setGenerateDecryptionKey(e.target.checked)}
                  className="checkbox-custom"
                />
                Generate decryption key
              </label>
            </div>

            <button
              onClick={handleEncrypt}
              disabled={!message.trim()}
              className="btn-gradient mt-8 w-full text-white py-3.5 px-6 rounded-xl font-semibold cursor-pointer"
            >
              Encrypt Message
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
