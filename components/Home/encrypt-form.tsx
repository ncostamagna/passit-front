import { useState } from "react";
export function EncryptForm({handleEncrypt}: { handleEncrypt: (message: string, oneTime: boolean) => void }) {

  const [message, setMessage] = useState("");
  const [expiration, setExpiration] = useState("3600");
  //const [generateDecryptionKey, setGenerateDecryptionKey] = useState(true);
  const [oneTime, setOneTime] = useState(true);

  return (
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
        {/*<label className="flex items-center gap-3 cursor-pointer text-sm text-slate-300 hover:text-slate-200 transition-colors">
          <input
            type="checkbox"
            checked={generateDecryptionKey}
            onChange={(e) => setGenerateDecryptionKey(e.target.checked)}
            className="checkbox-custom"
          />
          Generate decryption key
        </label>*/}
      </div>

      <button
        onClick={() => handleEncrypt(message, oneTime)}
        disabled={!message.trim()}
        className="btn-gradient mt-8 w-full text-white py-3.5 px-6 rounded-xl font-semibold cursor-pointer"
      >
        Encrypt Message
      </button>
    </div>
  </div>
  )
}