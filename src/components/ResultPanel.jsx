import { motion, AnimatePresence } from "framer-motion";
import { Share2, RotateCcw, Sparkles, Stars } from "lucide-react";

export default function ResultPanel({ data, onReset }) {
  if (!data) return null;
  const { name1, name2, result, emoji, score, message, nickname, letter } = data;

  const gradientByLetter = {
    F: "from-sky-500 to-emerald-500",
    L: "from-pink-500 to-fuchsia-500",
    A: "from-amber-400 to-pink-500",
    M: "from-violet-500 to-indigo-500",
    E: "from-red-500 to-orange-500",
    S: "from-purple-500 to-blue-500",
  };

  const shareText = `ConnectMatch says: ${name1} × ${name2} = ${result} ${emoji} — ${score}% match!`;
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: "ConnectMatch", text: shareText, url: shareUrl });
      } else {
        await navigator.clipboard.writeText(`${shareText} ${shareUrl}`.trim());
        alert("Result copied to clipboard!");
      }
    } catch (_) {
      // ignore
    }
  };

  return (
    <AnimatePresence>
      <motion.section
        key="result"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ type: "spring", stiffness: 120, damping: 16 }}
        className="mt-8"
      >
        <div className={`relative overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-br ${gradientByLetter[letter]} p-[1px]`}> 
          <div className="relative rounded-2xl bg-black/40 p-6 md:p-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 140, damping: 12 }}
              className="text-center"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/90">
                <Stars className="w-4 h-4" />
                <span className="text-sm">Result</span>
              </div>
              <h2 className="mt-4 text-3xl md:text-5xl font-extrabold text-white">
                {result} {emoji}
              </h2>
              <p className="mt-2 text-white/80">{name1} × {name2}</p>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="rounded-xl bg-white/10 border border-white/15 p-4 text-white text-center">
                  <p className="text-4xl font-black">{score}%</p>
                  <p className="text-sm text-white/80">Compatibility</p>
                </div>
                <div className="rounded-xl bg-white/10 border border-white/15 p-4 text-white text-center">
                  <p className="text-xl font-semibold">{nickname}</p>
                  <p className="text-sm text-white/80">Couple nickname</p>
                </div>
                <div className="rounded-xl bg-white/10 border border-white/15 p-4 text-white text-center">
                  <p className="text-xl font-semibold">{letter}</p>
                  <p className="text-sm text-white/80">FLAMES letter</p>
                </div>
              </div>

              <p className="mt-6 text-lg text-white/90">
                {message}
              </p>

              <div className="mt-8 flex flex-col md:flex-row gap-3 justify-center">
                <button
                  onClick={onReset}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/15 text-white border border-white/20 hover:bg-white/20"
                >
                  <RotateCcw className="w-5 h-5" />
                  Try Again
                </button>
                <button
                  onClick={handleShare}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-white to-white/80 text-black font-semibold hover:from-white/90"
                >
                  <Share2 className="w-5 h-5" />
                  Share Result
                </button>
              </div>
            </motion.div>

            <Particles />
          </div>
        </div>
      </motion.section>
    </AnimatePresence>
  );
}

function Particles() {
  const items = Array.from({ length: 18 });
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map((_, i) => (
        <motion.span
          key={i}
          initial={{ y: 60, opacity: 0, scale: 0.6 }}
          animate={{ y: [60, -40], opacity: [0, 1, 0], scale: [0.6, 1, 0.8] }}
          transition={{ duration: 2 + (i % 5) * 0.4, delay: i * 0.05, repeat: Infinity, repeatDelay: 1 }}
          className="absolute text-xl"
          style={{ left: `${(i * 37) % 100}%`, bottom: `${(i * 13) % 60}px` }}
        >
          {i % 3 === 0 ? "💖" : i % 3 === 1 ? "✨" : "💞"}
        </motion.span>
      ))}
    </div>
  );
}
