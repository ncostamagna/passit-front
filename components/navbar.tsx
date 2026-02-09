import { LockIcon } from "./icons";

export function Navbar() {
  return (
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
  );
}
