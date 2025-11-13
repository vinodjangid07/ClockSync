export default function Footer() {
  return (
    <footer className="w-full border-t border-zinc-800 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="text-center">
          <p className="text-zinc-400 text-sm mb-2">
            Built by{" "}
            <a 
              href="https://github.com/vinodjangid07" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-zinc-300 transition-colors"
            >
              Vinod Jangid
            </a>
          </p>
          <p className="text-zinc-500 text-xs mb-4">
            <a 
              href="https://github.com/vinodjangid07/ClockSync" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-zinc-400 transition-colors"
            >
              github.com/vinodjangid07
            </a>
          </p>
        </div>

        <div className="pt-2 text-center">
          <p className="text-zinc-500 text-xs">
            © 2025 ClockSync. Open source.
          </p>
        </div>
      </div>
    </footer>
  );
}