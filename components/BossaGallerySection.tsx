"use client";

import { useState } from "react";

type BossaBlend = {
  name: string;
  image: string;
  inspiredBy: string;
};

export default function BossaGallerySection({
  blends,
}: {
  blends: BossaBlend[];
}) {
  const [active, setActive] = useState<BossaBlend | null>(null);

  return (
    <>
      <section className="bg-[#1a1a1a] py-32 text-white animate-fadeUp">
        <div className="mx-auto max-w-7xl px-6">

          {/* INTRO */}
          <div className="mb-24 max-w-2xl">
            <p className="text-xs uppercase tracking-[0.35em] text-[#8a817a]">
              bossa — coleção visual
            </p>

            <h2 className="mt-6 text-4xl font-light">
              sete composições.
              <br />
              sete imagens.
              <br />
              um estado.
            </h2>
          </div>

          {/* WRAPPER CENTRAL */}
          <div className="mt-16 flex justify-center">
            <div className="w-full max-w-6xl">

              {/* CARROSSEL */}
              <div className="flex gap-8 overflow-x-auto snap-x snap-mandatory pb-8 pt-2">

                {blends.map((blend) => (
                  <div
                    key={blend.name}
                    onClick={() => setActive(blend)}
                    className="group min-w-[320px] cursor-pointer snap-start"
                  >
                    <div className="overflow-hidden rounded-[32px]">
                      <img
                        src={blend.image}
                        alt={blend.name}
                        className="h-[420px] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                      />
                    </div>

                    <p className="mt-6 text-sm tracking-wide text-[#cfcfcf]">
                      {blend.name}
                    </p>
                  </div>
                ))}

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MODAL */}
      {active && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/70 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-4xl px-6">

            <button
              onClick={() => setActive(null)}
              className="absolute right-6 top-6 text-sm text-white/60"
            >
              fechar
            </button>

            <div className="overflow-hidden rounded-[32px]">
              <img
                src={active.image}
                alt={active.name}
                className="w-full object-cover rounded-[32px]"
              />
            </div>

            <div className="mt-10 max-w-xl">
              <h3 className="text-2xl font-light">
                {active.name}
              </h3>

              <p className="mt-4 text-sm leading-7 text-[#d6d0cb]">
                {active.inspiredBy}
              </p>
            </div>

          </div>
        </div>
      )}
    </>
  );
}