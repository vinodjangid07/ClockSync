import Link from "next/link";
import Header from "../components/header";
import Footer from "../components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24">
        <section className="max-w-7xl mx-auto px-6 pt-20 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-light tracking-tight text-white mb-6">
              Sync Clocks,
              <br />
              <span className="text-zinc-400">Schedule Easy</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-zinc-400 font-light mb-12 max-w-2xl mx-auto">
              The simplest way to coordinate meetings across time zones.
              Share a link, and everyone sees their local time.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                href="/sync"
                className="bg-white text-black px-8 py-3 rounded-xl font-medium hover:bg-zinc-100 transition-colors"
              >
                Try it now
              </Link>
              <a 
                href="https://github.com/vinodjangid07/ClockSync"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-zinc-700 text-white px-8 py-3 rounded-xl font-medium hover:border-zinc-600 transition-colors flex items-center space-x-2"
              >
                <span>★</span>
                <span>Star on GitHub</span>
              </a>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light text-white mb-4">
              Built for remote teams
            </h2>
            <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
              No accounts, no downloads, no complexity. Just simple time coordination.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-zinc-800 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl">🌍</span>
              </div>
              <h3 className="text-xl font-medium text-white mb-2">Global Coverage</h3>
              <p className="text-zinc-400 text-sm">
                Support for 400+ time zones worldwide. From Tokyo to San Francisco, we&apos;ve got you covered.
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-zinc-800 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl">⚡</span>
              </div>
              <h3 className="text-xl font-medium text-white mb-2">Instant Sharing</h3>
              <p className="text-zinc-400 text-sm">
                Generate shareable links in seconds. No sign-ups, no friction, just pure simplicity.
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-zinc-800 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-xl">✨</span>
              </div>
              <h3 className="text-xl font-medium text-white mb-2">Smart Detection</h3>
              <p className="text-zinc-400 text-sm">
                Automatically detects visitor&apos;s timezone and highlights optimal meeting windows.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
