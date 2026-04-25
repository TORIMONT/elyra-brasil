type HeroSectionProps = {
  onOpenBlend: () => void;
};

export default function HeroSection({ onOpenBlend }: HeroSectionProps) {
  return (
    <section className="border-b border-[#d9d6d3] bg-[#ecebea]">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-28 md:grid-cols-2">
        <div className="flex flex-col justify-center">
          <span className="text-xs uppercase tracking-[0.35em] text-[#6b5e57]">
            Elyra Brasil
          </span>

          <h1 className="mt-6 text-5xl font-light leading-tight md:text-6xl">
            chá como coleção artística
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-relaxed text-[#5a524d]">
            Coleções sazonais, assinaturas, cafés italianos e uma experiência autoral minimalista.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <button
              onClick={() =>
                document.getElementById("colecoes")?.scrollIntoView({ behavior: "smooth" })
              }
              className="rounded-full bg-[#2e4a3a] px-6 py-3 text-sm text-white"
            >
              explorar coleção
            </button>

            <button
              onClick={onOpenBlend}
              className="rounded-full border border-[#cfcac7] bg-white/80 px-6 py-3 text-sm"
            >
              criar meu blend
            </button>
          </div>
        </div>

        <div className="flex items-center justify-center">
  <div
    className="relative h-[420px] w-[420px] [perspective:1200px]"
    onMouseMove={(e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (e.clientY - rect.top) / rect.height - 0.5;
      const y = (e.clientX - rect.left) / rect.width - 0.5;

      e.currentTarget.style.transform = `
        rotateX(${x * 8}deg)
        rotateY(${y * 12}deg)
        scale(1.02)
      `;
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
    }}
  >
    <img
      src="/hero/elyra-hero.jpg"
      alt="Elyra Experience"
     className="h-full w-full rounded-[40px] object-cover shadow-[0_30px_80px_rgba(0,0,0,0.18)] animate-elyraZoom"
    />

    {/* glow Elyra */}
    <div
      className="pointer-events-none absolute -bottom-12 -right-12 h-[200px] w-[200px] rounded-full blur-[90px]"
      style={{
        background: "rgba(214,146,58,0.25)",
      }}
    />
  </div>
    
          <div className="pointer-events-none absolute inset-0 rounded-[40px] bg-gradient-to-t from-black/20 via-transparent to-transparent" />
        </div>
      </div>
    </section>
  );
}
<style jsx>{`
  @keyframes elyraZoom {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.04);
    }
    100% {
      transform: scale(1);
    }
  }

  .animate-elyraZoom {
    animation: elyraZoom 12s ease-in-out infinite;
  }
`}</style>