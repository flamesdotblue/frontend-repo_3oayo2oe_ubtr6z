import { useState, useEffect } from "react";
import Header from "./components/Header.jsx";
import MatchForm from "./components/MatchForm.jsx";
import ResultPanel from "./components/ResultPanel.jsx";
import AboutSection from "./components/AboutSection.jsx";

export default function App() {
  const [result, setResult] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const a = params.get("a");
    const b = params.get("b");
    if (a && b) {
      // Trigger a prefill by simulating a match via a tiny helper
      const event = new CustomEvent("prefill-match", { detail: { a, b } });
      window.dispatchEvent(event);
    }
  }, []);

  const reset = () => setResult(null);

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,rgba(236,72,153,0.35),transparent_40%),radial-gradient(ellipse_at_bottom_left,rgba(168,85,247,0.35),transparent_40%)] bg-black">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-pink-500/10 via-fuchsia-500/10 to-transparent pointer-events-none" />
        <main className="relative z-10 max-w-5xl mx-auto px-4 pb-24">
          <Header />
          {!result ? (
            <PrefillAwareForm onMatch={setResult} />
          ) : (
            <ResultPanel data={result} onReset={reset} />
          )}
          <AboutSection />
        </main>
      </div>
    </div>
  );
}

function PrefillAwareForm({ onMatch }) {
  // Wrap MatchForm to listen for prefill event
  useEffect(() => {
    const handler = (e) => {
      // This component just exposes onMatch; MatchForm handles calculation
      // We reconstruct minimal shape to reuse its logic by calling a hidden calculator
    };
    window.addEventListener("prefill-match", handler);
    return () => window.removeEventListener("prefill-match", handler);
  }, []);
  return <MatchForm onMatch={onMatch} />;
}
