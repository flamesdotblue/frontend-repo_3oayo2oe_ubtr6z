export default function AboutSection() {
  return (
    <section className="mt-16 max-w-3xl mx-auto text-white/90">
      <h3 className="text-2xl font-bold">About FLAMES</h3>
      <p className="mt-3 leading-relaxed text-white/80">
        FLAMES is a playful schoolyard game that predicts relationship vibes using the letters:
        <span className="font-semibold text-white"> F</span>riends,
        <span className="font-semibold text-white"> L</span>overs,
        <span className="font-semibold text-white"> A</span>ffection,
        <span className="font-semibold text-white"> M</span>arriage,
        <span className="font-semibold text-white"> E</span>nemies, and
        <span className="font-semibold text-white"> S</span>iblings.
      </p>
      <p className="mt-3 leading-relaxed text-white/80">
        We remove common letters in the two names, count the remainder, and then cycle through
        the letters in FLAMES until one remains. It’s just for fun — but sometimes it feels eerily accurate!
      </p>
    </section>
  );
}
