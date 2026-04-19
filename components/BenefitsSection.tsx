export default function BenefitsSection() {
  return (
    <section id="beneficios" className="mx-auto max-w-7xl px-6 py-28">
      <div className="mb-20 max-w-2xl">
        <p className="text-xs uppercase tracking-[0.35em] text-[#6f6963]">
          por benefício
        </p>
        <h2 className="mt-4 text-4xl font-light">
          escolha pela sensação
        </h2>
        <p className="mt-6 leading-relaxed text-[#5f5650]">
          uma forma mais intuitiva de encontrar seu blend ou criar o seu próprio.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="rounded-[32px] border border-[#d6d3d0] bg-[#f2f1ef] p-10">
          <h3 className="text-xl font-light">calmante</h3>
          <p className="mt-3 text-sm text-[#6a625c]">desacelerar com elegância</p>

          <p className="mt-6 text-sm leading-relaxed text-[#5f5650]">
            blends pensados para o fim do dia, pausas mais profundas e uma sensação de acolhimento leve.
          </p>

          <p className="mt-6 text-xs uppercase tracking-[0.25em] text-[#7a6f67]">
            melissa • camomila • lavanda • mulungu
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <button className="rounded-full border border-[#cfcac7] bg-white px-4 py-2 text-xs transition hover:bg-black hover:text-white">
              ver na coleção
            </button>
            <button className="rounded-full bg-[#2e4a3a] px-4 py-2 text-xs text-white transition hover:opacity-90">
              criar guiado
            </button>
            <button className="rounded-full border border-[#cfcac7] bg-white px-4 py-2 text-xs transition hover:bg-black hover:text-white">
              criar do zero
            </button>
          </div>
        </div>

        <div className="rounded-[32px] border border-[#d6d3d0] bg-[#f2f1ef] p-10">
          <h3 className="text-xl font-light">energia</h3>
          <p className="mt-3 text-sm text-[#6a625c]">ativar sem pesar</p>

          <p className="mt-6 text-sm leading-relaxed text-[#5f5650]">
            composições para foco, presença e ritmo, com calor e clareza para acompanhar o movimento do dia.
          </p>

          <p className="mt-6 text-xs uppercase tracking-[0.25em] text-[#7a6f67]">
            chá preto • mate tostado • gengibre • laranja
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <button className="rounded-full border border-[#cfcac7] bg-white px-4 py-2 text-xs transition hover:bg-black hover:text-white">
              ver na coleção
            </button>
            <button className="rounded-full bg-[#2e4a3a] px-4 py-2 text-xs text-white transition hover:opacity-90">
              criar guiado
            </button>
            <button className="rounded-full border border-[#cfcac7] bg-white px-4 py-2 text-xs transition hover:bg-black hover:text-white">
              criar do zero
            </button>
          </div>
        </div>

        <div className="rounded-[32px] border border-[#d6d3d0] bg-[#f2f1ef] p-10">
          <h3 className="text-xl font-light">refresco</h3>
          <p className="mt-3 text-sm text-[#6a625c]">abrir o corpo e a mente</p>

          <p className="mt-6 text-sm leading-relaxed text-[#5f5650]">
            blends leves e vivos, com frescor aromático e sensação de limpeza para manhãs claras e pausas revigorantes.
          </p>

          <p className="mt-6 text-xs uppercase tracking-[0.25em] text-[#7a6f67]">
            hortelã • limão siciliano • capim-limão • melissa
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <button className="rounded-full border border-[#cfcac7] bg-white px-4 py-2 text-xs transition hover:bg-black hover:text-white">
              ver na coleção
            </button>
            <button className="rounded-full bg-[#2e4a3a] px-4 py-2 text-xs text-white transition hover:opacity-90">
              criar guiado
            </button>
            <button className="rounded-full border border-[#cfcac7] bg-white px-4 py-2 text-xs transition hover:bg-black hover:text-white">
              criar do zero
            </button>
          </div>
        </div>

        <div className="rounded-[32px] border border-[#d6d3d0] bg-[#f2f1ef] p-10">
          <h3 className="text-xl font-light">floral</h3>
          <p className="mt-3 text-sm text-[#6a625c]">delicadeza com presença</p>

          <p className="mt-6 text-sm leading-relaxed text-[#5f5650]">
            composições sutis, perfumadas e elegantes, criadas para uma experiência mais aérea e sensorial.
          </p>

          <p className="mt-6 text-xs uppercase tracking-[0.25em] text-[#7a6f67]">
            rosa branca • hibisco • lavanda • chá branco
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <button className="rounded-full border border-[#cfcac7] bg-white px-4 py-2 text-xs transition hover:bg-black hover:text-white">
              ver na coleção
            </button>
            <button className="rounded-full bg-[#2e4a3a] px-4 py-2 text-xs text-white transition hover:opacity-90">
              criar guiado
            </button>
            <button className="rounded-full border border-[#cfcac7] bg-white px-4 py-2 text-xs transition hover:bg-black hover:text-white">
              criar do zero
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}