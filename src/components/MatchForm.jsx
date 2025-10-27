import { useState } from "react";
import { Heart, Wand2 } from "lucide-react";

export default function MatchForm({ onMatch }) {
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [loading, setLoading] = useState(false);

  function clean(s) {
    return s.replace(/[^a-z]/gi, "").toLowerCase();
  }

  function flamesResult(n1, n2) {
    // FLAMES algorithm: remove common letters then count remaining
    const a = clean(n1).split("");
    const b = clean(n2).split("");

    let i = 0;
    while (i < a.length) {
      const ch = a[i];
      const j = b.indexOf(ch);
      if (j !== -1) {
        a.splice(i, 1);
        b.splice(j, 1);
      } else {
        i++;
      }
    }

    const count = a.length + b.length || 1;
    const letters = ["F", "L", "A", "M", "E", "S"]; // Friends, Lovers, Affection, Marriage, Enemies, Siblings
    let idx = 0;
    let list = [...letters];
    while (list.length > 1) {
      idx = (idx + count - 1) % list.length;
      list.splice(idx, 1);
    }
    const finalLetter = list[0];

    const mappings = {
      F: { label: "Friends", emoji: "🤝" },
      L: { label: "Lovers", emoji: "💖" },
      A: { label: "Affection", emoji: "✨" },
      M: { label: "Marriage", emoji: "💍" },
      E: { label: "Enemies", emoji: "⚡" },
      S: { label: "Siblings", emoji: "👫" },
    };

    // playful score influenced by name lengths and count
    const base = Math.min(95, 40 + ((clean(n1).length * 7 + clean(n2).length * 5 + count * 3) % 61));
    const score = Math.max(5, Math.min(98, finalLetter === "E" ? 100 - base : base));

    function messageFor(scoreVal, label) {
      if (label === "Enemies") {
        return "Spicy chemistry alert! Rival energy can be iconic — or chaotic. Handle with care.";
      }
      if (scoreVal >= 85) return "You two share a spark that can light up the world!";
      if (scoreVal >= 70) return "Such a sweet pairing — give it time and watch the magic grow.";
      if (scoreVal >= 50) return "There’s a cute vibe here. A little nudge could make it shine.";
      return "Opposites attract? Maybe. The universe loves a plot twist!";
    }

    return {
      letter: finalLetter,
      result: mappings[finalLetter].label,
      emoji: mappings[finalLetter].emoji,
      score,
      message: messageFor(score, mappings[finalLetter].label),
    };
  }

  function shipName(a, b) {
    const n1 = clean(a);
    const n2 = clean(b);
    if (!n1 || !n2) return "";
    const cut1 = Math.max(1, Math.ceil(n1.length / 2));
    const cut2 = Math.max(1, Math.floor(n2.length / 2));
    const options = [
      n1.slice(0, cut1) + n2.slice(n2.length - cut2),
      n2.slice(0, cut2) + n1.slice(n1.length - cut1),
    ];
    const pick = options[(n1.charCodeAt(0) + n2.charCodeAt(0)) % options.length];
    return pick.charAt(0).toUpperCase() + pick.slice(1);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name1.trim() || !name2.trim()) return;
    setLoading(true);
    setTimeout(() => {
      const res = flamesResult(name1, name2);
      const nickname = shipName(name1, name2);
      onMatch({ name1, name2, ...res, nickname });
      setLoading(false);
    }, 600);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input
          type="text"
          value={name1}
          onChange={(e) => setName1(e.target.value)}
          placeholder="Your Name"
          className="w-full rounded-xl border border-white/20 bg-white/10 text-white placeholder-white/60 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400/60"
          aria-label="Your Name"
        />
        <input
          type="text"
          value={name2}
          onChange={(e) => setName2(e.target.value)}
          placeholder="Their Name"
          className="w-full rounded-xl border border-white/20 bg-white/10 text-white placeholder-white/60 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400/60"
          aria-label="Their Name"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="mt-4 inline-flex items-center justify-center gap-2 w-full md:w-auto px-5 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-fuchsia-500 text-white font-semibold shadow-lg shadow-pink-500/30 hover:from-pink-400 hover:to-fuchsia-400 transition disabled:opacity-60"
      >
        <Heart className={"w-5 h-5 " + (loading ? "animate-bounce" : "")} />
        {loading ? "Finding your vibe..." : "Find Compatibility"}
      </button>
      <div className="mt-2 flex items-center gap-2 text-white/70 text-sm">
        <Wand2 className="w-4 h-4" />
        <span>Works offline. Backend integration ready when available.</span>
      </div>
    </form>
  );
}
