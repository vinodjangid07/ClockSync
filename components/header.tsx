import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 min-w-[90%] lg:min-w-[55%]">
      <div className="bg-black/80 backdrop-blur-md border border-zinc-800 rounded-2xl px-3 md:px-6 py-3">
        <div className="flex items-center justify-between gap-8">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-7 h-7 bg-white rounded-lg flex items-center justify-center">
              <span className="text-black font-bold text-sm">C</span>
            </div>
            <span className="text-lg font-semibold text-white">ClockSync</span>
          </Link>
          
          <div className="flex items-center md:space-x-3">
            <Link 
              href="/sync" 
              className="bg-white text-black px-4 py-2 rounded-lg hover:bg-zinc-100 transition-colors font-medium text-sm"
            >
              Try it now
            </Link>
            <a 
              href="https://github.com/vinodjangid07/ClockSync" 
              target="_blank"
              rel="noopener noreferrer"
              className="hidden border border-zinc-700 text-white px-4 py-2 rounded-lg hover:border-zinc-600 transition-colors font-medium text-sm md:flex items-center space-x-2"
            >
              <span>★</span>
              <span>Star on GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}