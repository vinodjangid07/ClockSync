import { Suspense } from "react";
import Header from "../../components/header";
import Dashboard from "../../components/dashboard";

export default function SyncPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      <main className="pt-32 pb-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-light text-white mb-3">
              Coordinate across time zones
            </h1>
            <p className="text-lg text-zinc-400">
              Set your meeting time and share the link with your team
            </p>
          </div>
          
          <Suspense fallback={
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-8 text-center">
              <div className="text-zinc-400">Loading ClockSync...</div>
            </div>
          }>
            <Dashboard />
          </Suspense>
        </div>
      </main>
    </div>
  );
}