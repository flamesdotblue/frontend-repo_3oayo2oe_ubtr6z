import { Heart, Sparkles } from "lucide-react";

export default function Header() {
  return (
    <header className="text-center py-10">
      <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 backdrop-blur border border-white/20 text-pink-100">
        <Sparkles className="w-4 h-4" />
        <span className="text-sm">Playful compatibility matcher</span>
      </div>
      <h1 className="mt-6 text-4xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-br from-pink-400 via-fuchsia-400 to-purple-400 text-transparent bg-clip-text">
        ConnectMatch
      </h1>
      <p className="mt-3 text-base md:text-lg text-white/80 max-w-xl mx-auto">
        Find your FLAMES vibe — Friends, Lovers, Affection, Marriage, Enemies, or Siblings. Enter two names and see the spark!
      </p>
      <div className="mt-6 flex items-center justify-center gap-2 text-pink-200">
        <Heart className="w-5 h-5 animate-pulse" />
        <span className="text-sm">Made with a lot of ❤️ and a pinch of fate</span>
      </div>
    </header>
  );
}
