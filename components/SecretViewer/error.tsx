export function SecretError() {
  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-500/10 text-red-400 border border-red-500/20">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-white">
            Secret does not exist
          </h2>
        </div>
      </div>

      <div className="bg-[#151525] rounded-2xl card-glow p-8 transition-all duration-300">
        <p className="text-slate-400 mb-6">
          It might be caused by any of these reasons.
        </p>

        <div className="space-y-5">
          {/* Opened before */}
          <div className="bg-red-500/5 border border-red-500/10 rounded-xl px-5 py-4">
            <h3 className="text-sm font-semibold text-red-300 mb-1">
              Opened before
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              A secret can be restricted to a single download. It might be lost
              because the sender clicked this link before you viewed it. The
              secret might have been compromised and read by someone else. You
              should contact the sender and request a new secret.
            </p>
          </div>

          {/* Broken link */}
          <div className="bg-red-500/5 border border-red-500/10 rounded-xl px-5 py-4">
            <h3 className="text-sm font-semibold text-red-300 mb-1">
              Broken link
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              The link must match perfectly in order for the decryption to work,
              it might be missing some magic digits.
            </p>
          </div>

          {/* Expired */}
          <div className="bg-red-500/5 border border-red-500/10 rounded-xl px-5 py-4">
            <h3 className="text-sm font-semibold text-red-300 mb-1">
              Expired
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              No secret lasts forever. All stored secrets will expire and self
              destruct automatically. Lifetime varies from one hour up to one
              week.
            </p>
          </div>
        </div>

        <a
          href="/"
          className="btn-gradient mt-8 w-full text-white py-3 px-6 rounded-xl font-semibold cursor-pointer block text-center"
        >
          Encrypt Another Message
        </a>
      </div>
    </div>
  );
}
