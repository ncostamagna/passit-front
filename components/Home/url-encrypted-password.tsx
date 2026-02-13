import { ShieldCheckIcon } from "../icons";
import { CopyButton } from "../copy-button";

const BASE_URL = "http://localhost:3000";

export function UrlEncryptedPassword({ id, iv, cryptoKey, handleBack}: { id: string, iv: string, cryptoKey: string, handleBack: () => void }) {

    const oneClickLink = `${BASE_URL}/s/${id}/${iv}/${cryptoKey}`;
    const shortLink = `${BASE_URL}/s/${id}/${iv}`;

    return (
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
                <CopyButton text={cryptoKey} />
              </div>
              <p className="text-sm text-slate-300 break-all font-mono leading-relaxed">
                {cryptoKey}
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
    )
}