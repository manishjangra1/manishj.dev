import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="text-center flex flex-col items-center gap-8">
        <div className="relative">
          <div className="text-9xl font-black text-white/5 tracking-tighter">404</div>
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-2xl font-bold text-white uppercase tracking-[0.5em] ml-[0.5em]">Lost in Space</h1>
          </div>
        </div>
        
        <p className="text-white/40 text-xs font-mono uppercase tracking-widest max-w-xs leading-relaxed">
          The requested coordinate does not exist within the current workspace parameters.
        </p>

        <Link
          href="/"
          className="glass px-10 py-4 rounded-xl text-[10px] uppercase tracking-widest text-white/60 hover:text-white transition-all shadow-2xl"
        >
          Return to Base
        </Link>
      </div>
    </main>
  );
}

