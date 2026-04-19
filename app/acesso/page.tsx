"use client";

import { useMemo, useState } from "react";

type ArtworkItem = {
  code: string;
  title: string;
  image: string;
  description: string;
};

const ARTWORKS: ArtworkItem[] = [
  {
    code: "ELYRA-VINIL62-2026",
    title: "Vinil 62",
    image: "/bossa/vinil62.jpg",
    description: "Edição digital liberada para a coleção Vinil 62.",
  },
  {
    code: "ELYRA-COPA-2026",
    title: "Copacabana",
    image: "/bossa/copacabana.jpg",
    description: "Edição digital liberada para a coleção Copacabana.",
  },
  {
    code: "ELYRA-NOITE-2026",
    title: "Noite em Ipanema",
    image: "/bossa/noite.jpg",
    description: "Edição digital liberada para a coleção Noite em Ipanema.",
  },
  {
    code: "ELYRA-TARDE-2026",
    title: "Garota da Tarde",
    image: "/bossa/tarde.jpg",
    description: "Edição digital liberada para a coleção Garota da Tarde.",
  },
  {
    code: "ELYRA-LEBLON-2026",
    title: "Luz de Leblon",
    image: "/bossa/leblon.jpg",
    description: "Edição digital liberada para a coleção Luz de Leblon.",
  },
  {
    code: "ELYRA-RITMO-2026",
    title: "Ritmo Carioca",
    image: "/bossa/ritmo.jpg",
    description: "Edição digital liberada para a coleção Ritmo Carioca.",
  },
  {
    code: "ELYRA-BRISA-2026",
    title: "Brisa Atlântica",
    image: "/bossa/brisa.jpg",
    description: "Edição digital liberada para a coleção Brisa Atlântica.",
  },
];

export default function AcessoPage() {
  const [input, setInput] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const match = useMemo(() => {
    const normalized = input.trim().toUpperCase();
    return ARTWORKS.find((item) => item.code === normalized) || null;
  }, [input]);

  const showError = submitted && !match;

  return (
    <main className="min-h-screen bg-[#111111] px-6 py-20 text-white">
      <div className="mx-auto max-w-5xl">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.35em] text-white/50">
            acesso Elyra
          </p>

          <h1 className="mt-6 text-4xl font-light md:text-5xl">
            desbloqueie sua obra digital
          </h1>

          <p className="mt-6 text-sm leading-7 text-white/70">
            Insira o código recebido com a sua coleção para visualizar e baixar
            a arte digital correspondente.
          </p>
        </div>

        <div className="mt-12 rounded-[32px] border border-white/10 bg-white/[0.04] p-6 md:p-8">
          <label className="block text-xs uppercase tracking-[0.25em] text-white/50">
            código de acesso
          </label>

          <div className="mt-4 flex flex-col gap-4 md:flex-row">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Digite seu código"
              className="w-full rounded-full border border-white/15 bg-white/[0.06] px-5 py-4 text-sm text-white outline-none placeholder:text-white/30"
            />

            <button
              onClick={() => setSubmitted(true)}
              className="rounded-full bg-white px-6 py-4 text-sm text-[#111111] transition hover:opacity-90"
            >
              desbloquear
            </button>
          </div>

          {showError && (
            <p className="mt-4 text-sm text-white/60">
              Código não encontrado. Verifique e tente novamente.
            </p>
          )}
        </div>

        {match && (
          <section className="mt-10 rounded-[32px] border border-white/10 bg-white/[0.04] p-6 md:p-8">
            <p className="text-xs uppercase tracking-[0.25em] text-white/50">
              acesso liberado
            </p>

            <h2 className="mt-4 text-3xl font-light">{match.title}</h2>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/70">
              {match.description}
            </p>

            <div className="mt-8 overflow-hidden rounded-[28px]">
              <img
                src={match.image}
                alt={match.title}
                className="w-full object-cover"
              />
            </div>

            <div className="mt-6 flex flex-wrap gap-4">
              <a
                href={match.image}
                download
                className="rounded-full bg-white px-6 py-3 text-sm text-[#111111] transition hover:opacity-90"
              >
                baixar arte
              </a>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}