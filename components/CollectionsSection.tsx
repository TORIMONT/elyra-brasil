"use client";

import { useState } from "react";

type CollectionsSectionProps = {
  onOpenBlend: () => void;
  onAddToCart: (item: {
    id: string;
    name: string;
    subtitle: string;
    price: number;
    quantity: number;
    kind: "collection" | "custom";
  }) => void;
};

type BossaBlend = {
  name: string;
  notes: string;
  vibe: string;
  inspiredBy: string;
  sensations: string;
  benefits: string;
  price: number;
  highlight?: boolean;
};

const BOSSA: BossaBlend[] = [
  {
    name: "Vinil 62",
    notes: "erva doce • camomila • baunilha",
    vibe: "som baixo, madeira quente, fim de tarde",
    inspiredBy:
      "Uma sala silenciosa no fim da tarde, madeira aquecida pela luz e um vinil girando baixo. Vinil 62 nasce dessa pausa elegante, íntima e nostálgica.",
    sensations:
      "Na xícara, entrega maciez, doçura sutil e um calor delicado que desacelera o tempo. O aroma lembra conforto, casa arrumada, respiração mais funda e presença.",
    benefits:
      "camomila e erva-doce ajudam no relaxamento e no conforto digestivo, enquanto a baunilha arredonda a experiência e amplia o acolhimento sensorial.",
    price: 118,
    highlight: true,
  },
  {
    name: "Copacabana",
    notes: "chá verde • hortelã • limão siciliano",
    vibe: "brisa leve, manhã clara, cidade aberta",
    inspiredBy:
      "A claridade limpa da manhã, a brisa aberta da orla e a cidade começando a respirar. Copacabana traduz frescor, movimento e leveza urbana.",
    sensations:
      "É um blend claro, vivo e luminoso. Hortelã e limão siciliano abrem o aroma e criam uma sensação de limpeza, energia leve e mente desperta.",
    benefits:
      "chá verde favorece foco e vitalidade; hortelã e limão siciliano trazem frescor e sensação revigorante para começar o dia.",
    price: 98,
  },
  {
    name: "Noite em Ipanema",
    notes: "chá preto • canela • baunilha",
    vibe: "luz baixa, calor, presença",
    inspiredBy:
      "Luz baixa, conversa longa, calor elegante. Noite em Ipanema carrega o lado mais profundo e noturno da coleção Bossa.",
    sensations:
      "Tem corpo, presença e um perfume quente que envolve. A canela e a baunilha criam aconchego, enquanto o chá preto sustenta uma atmosfera intensa e sofisticada.",
    benefits:
      "chá preto oferece energia estruturada, enquanto canela e baunilha ampliam a sensação de aquecimento e conforto.",
    price: 98,
  },
  {
    name: "Garota da Tarde",
    notes: "hibisco • laranja • capim limão",
    vibe: "tarde longa, luz suave, pausa",
    inspiredBy:
      "O instante em que a tarde desacelera, a luz fica mais macia e o tempo parece se alongar. Garota da Tarde foi criado para esse intervalo bonito entre movimento e pausa.",
    sensations:
      "Tem brilho cítrico, leveza floral e frescor delicado. É um blend que ilumina sem pesar e deixa a xícara mais leve, aberta e gentil.",
    benefits:
      "hibisco e laranja trazem vivacidade e frescor, enquanto o capim-limão ajuda a criar uma experiência mais equilibrada e relaxante.",
    price: 98,
  },
  {
    name: "Luz de Leblon",
    notes: "chá branco • rosa branca • maçã",
    vibe: "silêncio dourado, leveza, elegância",
    inspiredBy:
      "Uma luz dourada e limpa no fim do dia, quase silenciosa. Luz de Leblon nasce da elegância calma, do respiro e da beleza sem excesso.",
    sensations:
      "É claro, delicado e refinado. Rosa branca e maçã deixam a experiência macia, aérea e serena, com uma sensação de leveza sofisticada.",
    benefits:
      "chá branco oferece suavidade e delicadeza; rosa branca e maçã ajudam a construir uma experiência mais calma, equilibrada e sensorial.",
    price: 108,
  },
  {
    name: "Ritmo Carioca",
    notes: "mate tostado • gengibre • laranja",
    vibe: "movimento, energia, pulso urbano",
    inspiredBy:
      "A pulsação da rua, o movimento da cidade, o calor humano. Ritmo Carioca é a parte mais vibrante da coleção Bossa.",
    sensations:
      "Tem calor, presença e impulso. Mate tostado, gengibre e laranja criam uma xícara mais energética, viva e expansiva.",
    benefits:
      "mate tostado favorece disposição; gengibre aquece e ativa; laranja traz brilho e leveza para sustentar uma energia mais limpa.",
    price: 98,
  },
  {
    name: "Brisa Atlântica",
    notes: "capim limão • melissa • limão siciliano",
    vibe: "vento leve, frescor, desacelerar",
    inspiredBy:
      "O vento leve vindo do mar, a sensação de pausa e o ar mais limpo depois do excesso. Brisa Atlântica é a desaceleração da coleção.",
    sensations:
      "Entrega frescor suave, limpeza aromática e calma leve. É o tipo de blend que parece abrir espaço por dentro e deixar o corpo respirar melhor.",
    benefits:
      "melissa ajuda no relaxamento, enquanto capim-limão e limão siciliano ampliam a sensação de frescor e clareza.",
    price: 98,
  },
];
function EssenciasSection({
  onSelectEssencia,
}: {
  onSelectEssencia: (erva: string) => void;
}) {
  const ESSENCIAS = [
    {
      name: "chá verde",
      desc: "claro • vivo • contínuo",
      text: "energia leve, foco e presença",
    },
    {
      name: "chá branco",
      desc: "suave • etéreo • delicado",
      text: "leveza, silêncio e refinamento",
    },
    {
      name: "chá preto",
      desc: "profundo • quente • estruturado",
      text: "presença, corpo e intensidade",
    },
    {
      name: "camomila",
      desc: "macia • acolhedora • calmante",
      text: "descanso, conforto e desaceleração",
    },
    {
      name: "capim limão",
      desc: "fresco • limpo • equilibrado",
      text: "clareza, leveza e respiração",
    },
    {
      name: "hortelã",
      desc: "viva • fria • expansiva",
      text: "despertar, frescor e abertura",
    },
    {
      name: "hibisco",
      desc: "vibrante • ácido • floral",
      text: "movimento, cor e leve intensidade",
    },
  ];

  return (
    <section id="essencias" className="mx-auto max-w-7xl px-6 py-28">
      
      {/* título */}
      <div className="mb-20 max-w-2xl">
        <p className="text-xs uppercase tracking-[0.35em] text-[#6f6963]">
          essências
        </p>
        <h2 className="mt-4 text-4xl font-light">
          a base de cada composição
        </h2>
        <p className="mt-6 leading-relaxed text-[#5f5650]">
          antes do blend, a origem. cada erva carrega um estado, uma direção, uma intenção.
        </p>
      </div>

      {/* grid */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {ESSENCIAS.map((erva) => (
          <button
            key={erva.name}
            onClick={() => onSelectEssencia(erva.name)}
            className="group rounded-[28px] border border-[#d6d3d0] bg-[#f2f1ef] p-8 text-left transition duration-500 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)]"
          >
            <p className="text-xs uppercase tracking-[0.25em] text-[#7a6f67]">
              {erva.desc}
            </p>

            <h3 className="mt-4 text-xl font-light capitalize">
              {erva.name}
            </h3>

            <p className="mt-4 text-sm leading-relaxed text-[#5f5650]">
              {erva.text}
            </p>

            <p className="mt-6 text-xs uppercase tracking-[0.18em] text-[#1f1d1a]">
              criar a partir daqui
            </p>
          </button>
        ))}
      </div>

    </section>
  );
}
export default function CollectionsSection({
  onOpenBlend,
  onAddToCart,
}: CollectionsSectionProps) {
  const [selectedBlend, setSelectedBlend] = useState<BossaBlend | null>(null);

  return (
    <>
      <section id="colecoes" className="mx-auto max-w-7xl px-6 py-28">
        <div className="mb-20 max-w-2xl">
          <p className="text-xs uppercase tracking-[0.35em] text-[#6f6963]">
            coleção atual
          </p>
          <h2 className="mt-4 text-4xl font-light">bossa</h2>
          <p className="mt-6 leading-relaxed text-[#5f5650]">
            sete composições inspiradas na bossa nova, criadas para diferentes momentos do dia.
          </p>
        </div>

        <div className="flex gap-10 overflow-x-auto pb-6">
          {BOSSA.map((blend, index) => (
            <div
              key={index}
              className={`
                group relative flex-shrink-0 rounded-[36px] border border-[#d6d3d0]
                bg-[#f2f1ef] p-10 transition duration-500
                hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)]
                ${blend.highlight ? "h-[460px] w-[340px]" : "h-[400px] w-[280px]"}
              `}
            >
              <h3 className="text-2xl font-light">{blend.name}</h3>

              <p className="mt-4 text-xs uppercase tracking-[0.25em] text-[#7a6f67]">
                {blend.notes}
              </p>

              <p className="mt-8 text-sm leading-relaxed text-[#5f5650]">
                {blend.vibe}
              </p>

              <div className="mt-8 space-y-2 text-xs leading-relaxed text-[#6c635d]">
                <p>400 g</p>
                <p>frasco da coleção</p>
                <p>marcado pela coleção</p>
              </div>

              <div className="absolute bottom-8 left-10 right-10">
                <p className="mb-3 text-sm text-[#1f1d1a]">
                  R$ {blend.price},00
                </p>

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => setSelectedBlend(blend)}
                    className="rounded-full border border-[#cfcac7] bg-white px-5 py-2 text-xs transition hover:bg-black hover:text-white"
                  >
                    explorar
                  </button>

                  <button
                    onClick={() =>
                      onAddToCart({
                        id: `${blend.name}-${Date.now()}`,
                        name: `${blend.name} • frasco`,
                        subtitle: "frasco da coleção 400 g • marcado pela coleção",
                        price: blend.price,
                        quantity: 1,
                        kind: "collection",
                      })
                    }
                    className="rounded-full bg-black px-5 py-2 text-xs text-white transition hover:opacity-90"
                  >
                    adicionar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {selectedBlend && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">
          <div className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-[36px] border border-[#d8d2cc] bg-[#f5f2ee] p-8 shadow-[0_30px_100px_rgba(0,0,0,0.18)] md:p-12">
            <button
              onClick={() => setSelectedBlend(null)}
              className="absolute right-6 top-6 rounded-full border border-[#d0cbc6] bg-white px-4 py-2 text-xs text-[#4d4742]"
            >
              fechar
            </button>

            <p className="text-xs uppercase tracking-[0.3em] text-[#7a6f67]">
              coleção bossa
            </p>

            <h3 className="mt-4 text-4xl font-light text-[#1f1d1a]">
              {selectedBlend.name}
            </h3>

            <p className="mt-4 text-xs uppercase tracking-[0.25em] text-[#7a6f67]">
              {selectedBlend.notes}
            </p>

            <p className="mt-6 text-base text-[#1f1d1a]">
              R$ {selectedBlend.price},00
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <div className="rounded-[22px] bg-white/70 p-4">
                <p className="text-[11px] uppercase tracking-[0.18em] text-[#7a6f67]">
                  formato
                </p>
                <p className="mt-2 text-sm text-[#3f3935]">400 g</p>
              </div>

              <div className="rounded-[22px] bg-white/70 p-4">
                <p className="text-[11px] uppercase tracking-[0.18em] text-[#7a6f67]">
                  frasco
                </p>
                <p className="mt-2 text-sm text-[#3f3935]">frasco da coleção</p>
              </div>

              <div className="rounded-[22px] bg-white/70 p-4">
                <p className="text-[11px] uppercase tracking-[0.18em] text-[#7a6f67]">
                  permanência
                </p>
                <p className="mt-2 text-sm text-[#3f3935]">feito para permanecer</p>
              </div>
            </div>

            <div className="mt-12 space-y-10">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-[#7a6f67]">
                  inspirado por
                </p>
                <p className="mt-3 text-sm leading-8 text-[#4f4843]">
                  {selectedBlend.inspiredBy}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-[#7a6f67]">
                  sensações
                </p>
                <p className="mt-3 text-sm leading-8 text-[#4f4843]">
                  {selectedBlend.sensations}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-[#7a6f67]">
                  benefícios
                </p>
                <p className="mt-3 text-sm leading-8 text-[#4f4843]">
                  {selectedBlend.benefits}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-[#7a6f67]">
                  conservação
                </p>
                <p className="mt-3 text-sm leading-8 text-[#4f4843]">
                  manter fechado, em local fresco, seco e ao abrigo da luz.
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-[#7a6f67]">
                  continuidade
                </p>
                <p className="mt-3 text-sm leading-8 text-[#4f4843]">
                  o frasco permanece. os próximos envios acompanham o seu ritmo.
                </p>
              </div>
            </div>

            <div className="mt-12 flex flex-wrap gap-4">
              <button
                onClick={() => {
                  onAddToCart({
                    id: `${selectedBlend.name}-${Date.now()}`,
                    name: `${selectedBlend.name} • frasco`,
                    subtitle: "frasco da coleção 400 g • marcado pela coleção",
                    price: selectedBlend.price,
                    quantity: 1,
                    kind: "collection",
                  });
                  setSelectedBlend(null);
                }}
                className="rounded-full bg-black px-6 py-3 text-sm text-white transition hover:opacity-90"
              >
                adicionar ao carrinho
              </button>

              <button
                onClick={() => {
                  setSelectedBlend(null);
                  onOpenBlend();
                }}
                className="rounded-full border border-[#cfcac7] bg-white px-6 py-3 text-sm text-[#1f1d1a] transition hover:bg-[#ece8e3]"
              >
                criar versão autoral
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}