"use client";

import { useEffect, useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CollectionsSection from "@/components/CollectionsSection";
import TopBar from "@/components/TopBar";
import BossaGallerySection from "@/components/BossaGallerySection";
import { motion } from "framer-motion";

type PackKey = "glass" | "refill" | "essential";
type CartKind = "collection" | "custom";
type BenefitKey = "calmante" | "energia" | "refresco" | "floral";

type BossaBlend = {
  name: string;
  notes: string;
  profile: string;
  story: string;
  benefit: string;
};

type CartItem = {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  quantity: number;
  kind: CartKind;
};


type EssenciaItem = {
  name: string;
  desc: string;
  text: string;
  notes: string;
  benefit: string;
  poetry: string;
  price: number;
};

const MP_PUBLIC_KEY = "TEST-22750140-4417-45e4-b347-0e19ca8c3ae0";
const CHECKOUT_API_URL = "/api/mercado-pago/checkout";
const MATCHA_PRICE = 58;

const INGREDIENTS = {
  bases: ["chá verde", "chá preto", "chá branco", "mate tostado"],
  ervas: [
    "capim limão",
    "mulungu",
    "hortelã",
    "hortelã pimenta",
    "menta",
    "melissa",
    "folha de maracujá",
    "folha de amora",
    "alecrim",
    "salvia branca",
    "verbena",
    "ginko biloba",
    "moringa",
    "ora pro nobis",
    "folha de neem",
    "dente de leão",
  ],
  flores: [
    "camomila",
    "hibisco",
    "calêndula",
    "lúpulo",
    "alfazema azul",
    "lavanda",
    "rosa branca",
    "rosa damascena",
  ],
  frutas: [
    "blueberry",
    "cranberry",
    "mirtilo",
    "goji berry",
    "limão siciliano",
    "laranja",
    "maçã",
    "coco desidratado",
  ],
  especiarias: [
    "canela em pau",
    "cravo",
    "gengibre",
    "cúrcuma",
    "anis estrelado",
    "fava de baunilha",
    "pimenta rosa",
    "zimbro",
    "endro",
  ],
} as const;

const LIMITS = {
  ervas: 5,
  flores: 3,
  frutas: 1,
  especiarias: 2,
} as const;

const PACKS: Record<PackKey, { label: string; sub: string; priceAdd: number }> =
  {
    glass: {
      label: "frasco Elyra",
      sub: "vidro + inox + refil 400g",
      priceAdd: 22,
    },
    refill: {
      label: "refil 400g",
      sub: "continuidade",
      priceAdd: 0,
    },
    essential: {
      label: "formato essencial 200g",
      sub: "entrada",
      priceAdd: -10,
    },
  };

const BOSSA_BLENDS: BossaBlend[] = [
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
    image: "/bossa/vinil62.jpg",
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
    image: "/bossa/copacabana.jpg",
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
    image: "/bossa/noite.jpg",
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
    image: "/bossa/tarde.jpg",
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
    image: "/bossa/leblon.jpg",
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
    image: "/bossa/ritmo.jpg",
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
    image: "/bossa/brisa.jpg",
  },
];

function SectionTitle({
  eyebrow,
  title,
  text,
  dark = false,
}: {
  eyebrow: string;
  title: string;
  text: string;
  dark?: boolean;
}) {
  return (
    <div className="mb-14 max-w-2xl">
      <p
        className={`text-xs uppercase tracking-[0.35em] ${
          dark ? "text-[#c8c1bb]" : "text-[#6f6963]"
        }`}
      >
        {eyebrow}
      </p>
      <h2 className="mt-4 text-4xl font-light">{title}</h2>
      <p
        className={`mt-6 leading-relaxed ${
          dark ? "text-[#ece1d9]" : "text-[#5f5650]"
        }`}
      >
        {text}
      </p>
    </div>
  );
}

function BossaSection({
  onSelect,
  onAddToCart,
}: {
  onSelect: (blend: BossaBlend) => void;
  onAddToCart: (item: CartItem) => void;
}) {
  return (
    <section className="bg-[#2a2a2a] py-28 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <SectionTitle
          eyebrow="coleção atual"
          title="bossa"
          text="Inspirada na atmosfera da bossa nova brasileira: tardes tranquilas, madeira, café e vinil."
          dark
        />

        {/* CARROSSEL */}
        <div className="relative mt-16">
          {/* fade esquerdo */}
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-[#2a2a2a] to-transparent" />

          {/* fade direito */}
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-[#2a2a2a] to-transparent" />

          {/* carrossel */}
          <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory">
            {BOSSA_BLENDS.map((blend) => (
              <article
                key={blend.name}
                className="group min-w-[280px] max-w-[280px] flex-shrink-0 snap-start transition duration-500 hover:-translate-y-1"
              >
                <div className="overflow-hidden rounded-[28px] bg-[#1a1a1a]">
                  <img
                    src={blend.image}
                    alt={blend.name}
                    className="h-[260px] w-full object-cover transition duration-700 group-hover:scale-[1.05]"
                  />
                </div>

                <div className="mt-5 space-y-3">
                  <h3 className="text-sm tracking-wide text-white">
                    {blend.name}
                  </h3>

                  <p className="text-xs text-[#cfcfcf] leading-relaxed">
                    {blend.notes}
                  </p>

                  <p className="text-xs text-[#9d9d9d]">
                    a partir de R$ {blend.price}
                  </p>

                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => onSelect(blend)}
                      className="rounded-full border border-[#5f5f5f] px-4 py-2 text-xs text-white transition hover:bg-white hover:text-[#222]"
                    >
                      explorar o blend
                    </button>

                    <button
                      onClick={() =>
                        onAddToCart({
                          id: `${blend.name}-${Date.now()}`,
                          name: `${blend.name} • frasco`,
                          subtitle: "frasco da coleção 400 g",
                          price: blend.price,
                          quantity: 1,
                          kind: "collection",
                        })
                      }
                      className="rounded-full bg-white px-4 py-2 text-xs text-[#222] transition hover:opacity-90"
                    >
                      comprar
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
function BenefitsSection({
  onViewCollection,
  onGuidedCreate,
}: {
  onViewCollection: () => void;
  onGuidedCreate: (benefit: BenefitKey) => void;
}) {
  const states = [
    {
      key: "calmante" as BenefitKey,
      title: "desacelerar",
      subtitle: "calmante",
      text: "para quando o dia pede pausa, silêncio e uma respiração mais profunda.",
    },
    {
      key: "energia" as BenefitKey,
      title: "ativar",
      subtitle: "energia",
      text: "para momentos que pedem foco, presença e movimento com leveza.",
    },
    {
      key: "refresco" as BenefitKey,
      title: "respirar",
      subtitle: "refresco",
      text: "para abrir o corpo, clarear a mente e trazer leveza ao ritmo do dia.",
    },
    {
      key: "floral" as BenefitKey,
      title: "sentir",
      subtitle: "floral",
      text: "para uma experiência mais delicada, sensorial e presente.",
    },
    {
      key: "foco" as BenefitKey,
      title: "focar",
      subtitle: "foco",
      text: "clareza mental, presença contínua e atenção mais estável.",
    },
    {
      key: "detox" as BenefitKey,
      title: "limpar",
      subtitle: "detox",
      text: "sensação de leveza, limpeza interna e renovação do corpo.",
    },
    {
      key: "equilibrar" as BenefitKey,
      title: "equilibrar",
      subtitle: "equilíbrio",
      text: "harmonia entre corpo e mente, trazendo estabilidade ao seu ritmo.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % states.length);
    }, 5200);
    return () => clearInterval(interval);
  }, [states.length]);

  return (
    <section className="mx-auto max-w-5xl px-6 py-32 text-center">
      {/* HEADER */}
      <div className="mb-20">
        <p className="text-xs uppercase tracking-[0.35em] text-[#6f6963]">
          por benefício
        </p>

        <h2 className="mt-4 text-4xl font-light">
          escolha pela sensação
        </h2>

        <p className="mt-8 text-lg text-[#3f3935]">
          hoje, eu preciso
        </p>
      </div>

      {/* CAMPO ORGÂNICO */}
      <div className="relative flex h-[380px] items-center justify-center">
        {states.map((item, index) => {
          const isActive = index === activeIndex;

          const positions = [
            { x: 0, y: 0 },
            { x: -130, y: -40 },
            { x: 120, y: 30 },
            { x: -180, y: 60 },
            { x: 180, y: -60 },
            { x: -60, y: 110 },
            { x: 80, y: -110 },
          ];

          const pos = positions[index % positions.length];

          return (
            <div
              key={item.key}
              className="absolute"
              style={{
                transform: `translate(${pos.x}px, ${pos.y}px)`,
              }}
            >
              <button
                onClick={() => setActiveIndex(index)}
                className="transition-all duration-[1600ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{
                  transform: `scale(${isActive ? 1 : 0.5})`,
                  opacity: isActive ? 1 : 0.12,
                  filter: isActive ? "blur(0px)" : "blur(2px)",
                  zIndex: isActive ? 20 : 5,
                  animation: isActive
                    ? "none"
                    : `float ${8 + index}s ease-in-out infinite`,
                }}
              >
                <div className="rounded-[28px] border border-[#d6d3d0] bg-[#f2f1ef] px-6 py-6 shadow-[0_10px_30px_rgba(0,0,0,0.05)]">
                  <h3
                    className={`font-light ${
                      isActive ? "text-2xl" : "text-sm"
                    }`}
                  >
                    {item.title}
                  </h3>

                  {isActive && (
                    <>
                      <p className="mt-3 text-xs uppercase tracking-[0.25em] text-[#7a6f67]">
                        {item.subtitle}
                      </p>

                      <p className="mt-5 text-sm text-[#5f5650] max-w-[240px] mx-auto">
                        {item.text}
                      </p>

                      <div className="mt-6">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onGuidedCreate(item.key);
                          }}
                          className="rounded-full bg-[#1f1d1a] px-5 py-2 text-xs text-white transition active:scale-[0.96]"
                        >
                          começar
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </button>
            </div>
          );
        })}
      </div>

      {/* CTA FINAL */}
      <div className="mt-20 flex justify-center">
        <button
          onClick={onViewCollection}
          className="rounded-full border border-[#cfcac7] bg-white px-6 py-3 text-sm transition hover:bg-black hover:text-white"
        >
          ver benefícios
        </button>
      </div>

      {/* FLOAT GLOBAL */}
      <style jsx>{`
        @keyframes float {
          0% { transform: translate(0, 0); }
          50% { transform: translate(0px, -10px); }
          100% { transform: translate(0, 0); }
        }
      `}</style>
    </section>
  );
}
function SubscriptionsSection({
  onBecomeMember,
  onStart,
}: {
  onBecomeMember?: () => void;
  onStart: () => void;
}) {
  const blocks = [
    {
      key: "comecar",
      eyebrow: "começar",
      title: "o início da casa Elyra.",
      text:
        "você recebe o frasco e o primeiro refil, um ponto de partida para criar seu próprio ritmo. o recipiente permanece, o ritual começa.",
      detail: "frasco Elyra + primeiro refil",
      image: "/subscription/comecar.jpg",
      alt: "Frasco Elyra em superfície mineral, iniciando o ritual.",
    },
    {
      key: "manter",
      eyebrow: "manter",
      title: "quando o ritual já faz sentido, você apenas continua.",
      text:
        "com o frasco em casa, você repõe conforme sua necessidade. menos excesso, mais continuidade. o que muda é o conteúdo, não a experiência.",
      detail: "refis sob medida • continuidade do uso",
      image: "/subscription/manter.jpg",
      alt: "Refil Elyra em cena editorial, representando continuidade.",
    },
    {
      key: "viver",
      eyebrow: "viver",
      title: "a Elyra deixa de ser um momento e passa a ser parte do seu dia.",
      text:
        "na recorrência, os blends chegam em fluxo contínuo. você mantém o frasco, o ritmo e a presença — sem precisar interromper o cuidado.",
      detail: "recorrência • fluxo contínuo • tornar-se membro",
      image: "/subscription/viver.jpg",
      alt: "Composição Elyra representando rotina, fluxo e presença.",
    },
  ];

  return (
    <section
      id="assinaturas"
      className="border-y border-[#d9d6d3] bg-[#ece9e6]"
    >
      <div className="mx-auto max-w-7xl px-6 py-28">
        {/* HEADER */}
        <div className="mb-24 max-w-3xl">
          <p className="text-xs uppercase tracking-[0.35em] text-[#6f6963]">
            formas de viver a elyra
          </p>

          <h2 className="mt-4 text-4xl font-light text-[#1f1d1a]">
            começar, manter, viver
          </h2>

          <p className="mt-6 max-w-2xl leading-relaxed text-[#5f5650]">
            mais do que formatos, um sistema. você começa com o frasco,
            mantém com refis e, quando quiser, entra no fluxo contínuo.
          </p>
        </div>

        {/* BLOCOS */}
        <div className="space-y-24">
          {blocks.map((block, index) => {
            const reverse = index % 2 !== 0;

            return (
              <article
                key={block.key}
                className={`grid items-center gap-10 lg:grid-cols-2 ${
                  reverse ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                {/* IMAGEM */}
                <div className="overflow-hidden rounded-[32px] border border-[#d8d4d0] bg-[#f4f1ee] shadow-[0_18px_50px_rgba(0,0,0,0.05)]">
                  <img
                    src={block.image}
                    alt={block.alt}
                    className="h-[420px] w-full object-cover md:h-[520px]"
                  />
                </div>

                {/* TEXTO */}
                <div className="max-w-xl">
                  <p className="text-xs uppercase tracking-[0.3em] text-[#7a6f67]">
                    {block.eyebrow}
                  </p>

                  <h3 className="mt-5 text-3xl font-light leading-tight text-[#1f1d1a] md:text-4xl">
                    {block.title}
                  </h3>

                  <p className="mt-6 text-base leading-8 text-[#5f5650]">
                    {block.text}
                  </p>

                  {/* DETALHE */}
                  <div className="mt-8 rounded-[22px] border border-[#ddd8d3] bg-white/70 px-5 py-4">
                    <p className="text-[11px] uppercase tracking-[0.22em] text-[#8a817b]">
                      leitura
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-[#4f4843]">
                      {block.detail}
                    </p>
                  </div>

                  {/* CTA */}
                  <div className="mt-10 flex flex-wrap gap-4">
                    <button
                      onClick={
                        block.key === "comecar"
                          ? onStart
                          : onBecomeMember
                      }
                      className={`rounded-full px-6 py-3 text-sm transition ${
                        block.key === "viver"
                          ? "bg-[#1f1d1a] text-white hover:opacity-90"
                          : "border border-[#cfcac7] bg-white text-[#1f1d1a] hover:bg-black hover:text-white"
                      }`}
                    >
                      {block.key === "comecar" && "iniciar com frasco"}
                      {block.key === "manter" && "repor refil"}
                      {block.key === "viver" && "tornar-se membro"}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
type CoffeeCapsule = {
  name: string;
  profile: string;
  type: string;
  ml: string;
  intensity: string;
  price: string;
  sub: string;
  image: string;
  modalImage: string;
  notes: string;
  roast: string;
  cultivation: string;
  acidity: string;
  body: string;
  story: string;
};

function CoffeeSection({
  onOpenCapsule,
}: {
  onOpenCapsule: (
    capsule: CoffeeCapsule,
    mode: "buy" | "subscribe"
  ) => void;
}) {
  const CAFES: CoffeeCapsule[] = [
    {
      name: "gran crema",
      profile: "encorpado • persistente • intenso",
      type: "espresso",
      ml: "40 ml",
      intensity: "8",
      price: "29,90",
      sub: "24,90",
      image: "/coffee/grancrema.jpg",
      modalImage: "/cafe/cf1.jpg",
      notes: "crema ampla, presença quente e final persistente.",
      roast: "torra profunda, pensada para corpo e permanência.",
      cultivation:
        "uma leitura clássica do espresso italiano, entre origem e ritual.",
      acidity: "acidez baixa e equilibrada.",
      body: "corpo amplo, redondo e contínuo.",
      story:
        "uma cápsula pensada para quem busca textura, calor e uma presença mais longa na xícara.",
    },
    {
      name: "arabians",
      profile: "aromático • floral • equilibrado",
      type: "espresso",
      ml: "40 ml",
      intensity: "6",
      price: "29,90",
      sub: "24,90",
      image: "/coffee/arabians.jpg",
      modalImage: "/cafe/cf2.jpg",
      notes: "aroma mais aberto, delicado e preciso.",
      roast: "torra mais limpa, com leitura elegante do grão.",
      cultivation: "um perfil mais refinado, voltado à clareza aromática.",
      acidity: "acidez média e delicada.",
      body: "corpo equilibrado e mais leve.",
      story:
        "uma leitura mais luminosa do espresso, com elegância e um desenho aromático mais sutil.",
    },
    {
      name: "grand espresso",
      profile: "profundo • marcante • quente",
      type: "ristretto",
      ml: "25 ml",
      intensity: "10",
      price: "29,90",
      sub: "24,90",
      image: "/coffee/grandexpresso.jpg",
      modalImage: "/cafe/cf3.jpg",
      notes: "mais denso, concentrado e escuro.",
      roast: "torra intensa, com presença e estrutura.",
      cultivation: "perfil feito para um gesto curto e marcante.",
      acidity: "acidez baixa.",
      body: "corpo alto e concentrado.",
      story:
        "para quem prefere uma xícara mais curta, com força, calor e uma assinatura mais incisiva.",
    },
    {
      name: "dek",
      profile: "leve • suave • contínuo",
      type: "espresso",
      ml: "40 ml",
      intensity: "4",
      price: "29,90",
      sub: "24,90",
      image: "/coffee/dek.jpg",
      modalImage: "/cafe/cf4.jpg",
      notes: "suave, limpo e confortável.",
      roast: "torra equilibrada, preservando maciez e continuidade.",
      cultivation: "uma pausa mais calma, sem perder ritual.",
      acidity: "acidez leve.",
      body: "corpo médio e macio.",
      story:
        "uma experiência sem cafeína pensada para manter aroma, forma e presença em um ritmo mais sereno.",
    },
  ];

  return (
    <section id="coffee" className="mx-auto max-w-7xl px-6 py-28">
      <div className="mb-16 max-w-2xl">
        <p className="text-xs uppercase tracking-[0.35em] text-[#6f6963]">
          café
        </p>
        <h2 className="mt-4 text-4xl font-light">espresso por izzo</h2>
        <p className="mt-6 leading-relaxed text-[#5f5650]">
          cápsulas compatíveis com máquinas nespresso®. quatro décadas entre
          torra, cultura e permanência.
        </p>
      </div>

      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        {CAFES.map((cafe) => (
          <div key={cafe.name} className="group">
            <div className="relative overflow-hidden rounded-[28px] bg-black">
              <img
                src={cafe.image}
                alt={cafe.name}
                className="h-[260px] w-full object-cover transition duration-700 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <p className="text-[11px] uppercase tracking-[0.2em] text-white/70">
                  {cafe.type} • {cafe.ml}
                </p>
                <p className="mt-1 text-[12px] text-white/80">
                  intensidade {cafe.intensity}
                </p>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-light capitalize text-[#1f1d1a]">
                {cafe.name}
              </h3>

              <p className="mt-2 text-sm text-[#6a625c]">{cafe.profile}</p>

              <p className="mt-4 text-xs uppercase tracking-[0.25em] text-[#9c948e]">
                10 cápsulas • compatível com nespresso®
              </p>

              <div className="mt-4">
                <p className="text-sm text-[#1f1d1a]">R$ {cafe.price}</p>
                <p className="text-xs text-[#6f6963]">
                  ou R$ {cafe.sub} na assinatura
                </p>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => onOpenCapsule(cafe, "buy")}
                  className="rounded-full bg-black px-5 py-2.5 text-sm text-white transition hover:opacity-90"
                >
                  comprar
                </button>

                <button
                  type="button"
                  onClick={() => onOpenCapsule(cafe, "subscribe")}
                  className="rounded-full border border-[#d0cbc6] px-5 py-2.5 text-sm text-[#1f1d1a] transition hover:bg-black hover:text-white"
                >
                  tornar recorrente
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}


function CoffeeCapsuleModal({
  capsule,
  open,
  mode,
  onClose,
  onAddToCart,
}: {
  capsule: CoffeeCapsule | null;
  open: boolean;
  mode: "buy" | "subscribe";
  onClose: () => void;
  onAddToCart: (item: CartItem) => void;
}) {
  if (!open || !capsule) return null;
  return (
    <div className="fixed inset-0 z-[75] flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">
      <div className="relative max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-[32px] bg-[#1a1a1a] p-8 text-white md:p-10">
        <button
          onClick={onClose}
          className="absolute right-6 top-6 text-xs uppercase tracking-[0.2em] text-[#bdbdbd]"
        >
          fechar
        </button>

        <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr]">
          <div>
            <div className="overflow-hidden rounded-[24px]">
              <img
                src={capsule.modalImage}
                alt={capsule.name}
                className="h-[300px] w-full object-cover md:h-[460px]"
              />
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#8a8a8a]">
              espresso • por izzo
            </p>

            <h3 className="mt-4 text-4xl font-light capitalize">
              {capsule.name}
            </h3>

            <p className="mt-4 text-sm uppercase tracking-[0.18em] text-[#9d9d9d]">
              {capsule.type} • {capsule.ml} • intensidade {capsule.intensity}
            </p>

            <p className="mt-6 text-sm leading-7 text-[#d6d6d6]">
              {capsule.profile}
            </p>

            <div className="mt-8 border-t border-white/10 pt-8">
              <p className="text-[11px] uppercase tracking-[0.18em] text-[#8f8f8f]">
                história
              </p>
              <p className="mt-3 text-sm leading-7 text-[#ececec]">
                {capsule.story}
              </p>
            </div>

            <div className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2">
              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-[#8f8f8f]">
                  notas
                </p>
                <p className="mt-2 text-sm text-[#ececec]">{capsule.notes}</p>
              </div>

              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-[#8f8f8f]">
                  torra
                </p>
                <p className="mt-2 text-sm text-[#ececec]">{capsule.roast}</p>
              </div>

              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-[#8f8f8f]">
                  cultivo
                </p>
                <p className="mt-2 text-sm text-[#ececec]">
                  {capsule.cultivation}
                </p>
              </div>

              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-[#8f8f8f]">
                  acidez • corpo
                </p>
                <p className="mt-2 text-sm text-[#ececec]">
                  {capsule.acidity}
                  <br />
                  {capsule.body}
                </p>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-8">
              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-[#8f8f8f]">
                  formato
                </p>
                <p className="mt-2 text-sm text-[#d6d6d6]">
                  10 cápsulas • compatível com nespresso®
                </p>
              </div>

              <div className="text-right">
                <p className="text-sm text-white">R$ {capsule.price}</p>
                <p className="mt-1 text-xs text-[#bdbdbd]">
                  ou R$ {capsule.sub} na assinatura
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={() => {
                  onAddToCart({
                    id: `${capsule.name}-box-${Date.now()}`,
                    name: `${capsule.name} • caixa`,
                    subtitle: "10 cápsulas • compatível com máquinas Nespresso",
                    price: Number(capsule.price.replace(",", ".")),
                    quantity: 1,
                    kind: "collection",
                  });
                  onClose();
                }}
                className={`rounded-full px-6 py-3 text-sm transition ${
                  mode === "buy"
                    ? "bg-white text-[#222]"
                    : "border border-[#5a5a5a] text-white hover:bg-white hover:text-[#222]"
                }`}
              >
                comprar agora
              </button>

              <button
                onClick={() => {
                  onAddToCart({
                    id: `${capsule.name}-subscription-${Date.now()}`,
                    name: `${capsule.name} • assinatura`,
                    subtitle: "10 cápsulas • recorrência",
                    price: Number(capsule.sub.replace(",", ".")),
                    quantity: 1,
                    kind: "collection",
                  });
                  onClose();
                }}
                className={`rounded-full px-6 py-3 text-sm transition ${
                  mode === "subscribe"
                    ? "bg-white text-[#222]"
                    : "border border-[#5a5a5a] text-white hover:bg-white hover:text-[#222]"
                }`}
              >
                tornar recorrente
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}
function BossaModal({
  blend,
  onClose,
  onAddToCart,
  onOpenBlend,
}: {
  blend: BossaBlend;
  onClose: () => void;
  onAddToCart: () => void;
  onOpenBlend: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[55] flex items-start justify-center bg-black/50 px-4 py-6 backdrop-blur-sm md:items-center">
      <div className="relative w-full max-w-3xl rounded-[32px] border border-white/10 bg-[#1f1f1f] p-8 text-white shadow-[0_40px_120px_rgba(0,0,0,0.35)]">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 rounded-full border border-[#4d4d4d] px-3 py-2 text-xs text-[#d8d8d8]"
        >
          fechar
        </button>
        <p className="text-xs uppercase tracking-[0.28em] text-[#a7a7a7]">
          coleção atual • bossa
        </p>
        <h3 className="mt-4 text-4xl font-light">{blend.name}</h3>
        <p className="mt-4 text-sm uppercase tracking-[0.18em] text-[#a7a7a7]">
          {blend.profile}
        </p>
        <p className="mt-6 text-base leading-8 text-[#ececec]">{blend.notes}</p>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[#a7a7a7]">
              história do nome
            </p>
            <p className="mt-3 text-sm leading-7 text-[#dddddd]">
              {blend.story}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[#a7a7a7]">
              proposta e benefício
            </p>
            <p className="mt-3 text-sm leading-7 text-[#dddddd]">
              {blend.benefit}
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap gap-4">
          <button
            onClick={onAddToCart}
            className="rounded-full bg-white px-6 py-3 text-sm text-[#222]"
          >
            adicionar ao carrinho
          </button>
          <button
            onClick={onOpenBlend}
            className="rounded-full border border-[#5a5a5a] px-6 py-3 text-sm text-white"
          >
            criar versão autoral
          </button>
        </div>
      </div>
    </div>
  );
}

function CartDrawer({
  isOpen,
  onClose,
  items,
  onRemove,
  onIncrease,
  onDecrease,
  onCheckout,
}: {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: string) => void;
  onIncrease: (id: string) => void;
  onDecrease: (id: string) => void;
  onCheckout: () => void;
}) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = items.length === 0 ? 0 : subtotal >= 180 ? 0 : 18;
  const total = subtotal + shipping;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] bg-black/30 backdrop-blur-[2px]">
      <div className="absolute inset-0" onClick={onClose} />
      <aside className="absolute right-0 top-0 h-full w-full max-w-md border-l border-[#e5e2df] bg-[#f7f5f2] shadow-[-20px_0_60px_rgba(0,0,0,0.12)]">
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-[#e5e2df] px-6 py-5">
            <div>
              <p className="text-[11px] uppercase tracking-[0.28em] text-[#8a817b]">
                carrinho
              </p>
              <h3 className="mt-2 text-2xl font-light text-[#1f1d1a]">
                seleção Elyra
              </h3>
              <p className="mt-1 text-[11px] text-[#8a817b]">
                Mercado Pago pronto para backend
              </p>
            </div>
            <button
              onClick={onClose}
              className="rounded-full border border-[#d8d2cc] bg-white px-4 py-2 text-xs text-[#3f3935]"
            >
              fechar
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-6">
            {items.length === 0 ? (
              <div className="rounded-[28px] border border-[#ddd7d2] bg-white/80 p-8 text-center">
                <p className="text-sm uppercase tracking-[0.22em] text-[#8a817b]">
                  vazio por enquanto
                </p>
                <p className="mt-4 text-sm leading-relaxed text-[#5f5650]">
                  Adicione um blend da coleção ou crie sua composição autoral para
                  começar.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-[28px] border border-[#ddd7d2] bg-white p-5 shadow-[0_10px_30px_rgba(0,0,0,0.03)]"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.22em] text-[#8a817b]">
                          {item.kind === "collection" ? "coleção" : "autoral"}
                        </p>
                        <h4 className="mt-2 text-lg font-light text-[#1f1d1a]">
                          {item.name}
                        </h4>
                        <p className="mt-2 text-sm leading-relaxed text-[#5f5650]">
                          {item.subtitle}
                        </p>
                      </div>
                      <button
                        onClick={() => onRemove(item.id)}
                        className="rounded-full border border-[#ddd7d2] px-3 py-1.5 text-[11px] uppercase tracking-[0.14em] text-[#6f6963]"
                      >
                        remover
                      </button>
                    </div>

                    <div className="mt-5 flex items-center justify-between rounded-full bg-[#f8f6f3] px-3 py-2">
                      <span className="text-xs uppercase tracking-[0.16em] text-[#8a817b]">
                        quantidade
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onDecrease(item.id)}
                          className="h-8 w-8 rounded-full border border-[#ddd7d2] text-sm text-[#3f3935]"
                        >
                          −
                        </button>
                        <span className="min-w-6 text-center text-sm text-[#1f1d1a]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onIncrease(item.id)}
                          className="h-8 w-8 rounded-full border border-[#ddd7d2] text-sm text-[#3f3935]"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="mt-5 flex items-center justify-between border-t border-[#efebe7] pt-4 text-sm">
                      <span className="text-[#8a817b]">subtotal do item</span>
                      <span className="text-[#1f1d1a]">
                        R$ {(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="border-t border-[#e5e2df] bg-white/80 px-6 py-6 backdrop-blur">
            <div className="space-y-3 text-sm text-[#5f5650]">
              <div className="flex items-center justify-between">
                <span>subtotal</span>
                <span className="text-[#1f1d1a]">R$ {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>frete</span>
                <span className="text-[#1f1d1a]">
                  {shipping === 0 && items.length > 0
                    ? "grátis"
                    : `R$ ${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex items-center justify-between border-t border-[#efebe7] pt-3 text-base text-[#1f1d1a]">
                <span>total final</span>
                <span>R$ {total.toFixed(2)}</span>
              </div>
            </div>
            <button
              onClick={onCheckout}
              className="mt-5 w-full rounded-full bg-black px-6 py-3 text-sm text-white transition hover:opacity-90"
            >
              ir para checkout
            </button>
            <button
              onClick={onClose}
              className="mt-3 w-full rounded-full border border-[#d8d2cc] bg-transparent px-6 py-3 text-sm text-[#3f3935]"
            >
              continuar explorando
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}

function BlendBuilderModal({
  isOpen,
  onClose,
  onAddCustomToCart,
  base,
  setBase,
  selected,
  toggleIngredient,
  categoryCount,
  pack,
  setPack,
  price,
  blendName,
  profile,
  fillLevel,
  notice,
  teaColor,
  rotation,
  setRotation,
}: {
  isOpen: boolean;
  onClose: () => void;
  onAddCustomToCart: (item: CartItem) => void;
  base: string | null;
  setBase: (value: string) => void;
  selected: string[];
  toggleIngredient: (item: string) => void;
  categoryCount: Record<string, number>;
  pack: PackKey;
  setPack: (value: PackKey) => void;
  price: number;
  blendName: string;
  profile: string;
  fillLevel: number;
  notice: string;
  teaColor: string;
  rotation: { x: number; y: number };
  setRotation: (value: { x: number; y: number }) => void;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 px-4 py-6 backdrop-blur-sm md:items-center">
      <div className="relative max-h-[92vh] w-full max-w-7xl overflow-y-auto rounded-[32px] border border-white/60 bg-[#ecebea] shadow-[0_40px_120px_rgba(0,0,0,0.22)]">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#d9d6d3] bg-[#ecebea]/95 px-6 py-5 backdrop-blur">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#6e6761]">
              monte seu blend
            </p>
            <h2 className="mt-2 text-3xl font-light tracking-tight">
              crie seu blend
            </h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-full border border-[#cfcac7] bg-white px-4 py-2 text-sm"
          >
            fechar
          </button>
        </div>

        <section className="mx-auto max-w-7xl px-6 py-10">
          <div className="mb-10">
            <p className="mb-3 text-sm uppercase tracking-[0.18em] text-[#6e6761]">
              base
            </p>
            <div className="flex flex-wrap gap-3">
              {INGREDIENTS.bases.map((item) => (
                <button
                  key={item}
                  onClick={() => setBase(item)}
                  className={`rounded-full border px-4 py-2 text-sm ${
                    base === item
                      ? "border-black bg-black text-white"
                      : "border-[#d8d2cc] bg-white/90"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {Object.entries(INGREDIENTS).map(([category, items]) =>
            category !== "bases" ? (
              <div key={category} className="mb-8">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-sm capitalize text-[#3d3936]">{category}</p>
                  <p className="text-xs text-[#7b736d]">
                    {categoryCount[category] || 0}/
                    {LIMITS[category as keyof typeof LIMITS]}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {items.map((item) => (
                    <button
                      key={item}
                      onClick={() => toggleIngredient(item)}
                      className={`rounded-full border px-3 py-2 text-sm ${
                        selected.includes(item)
                          ? "border-black bg-black text-white"
                          : "border-[#d8d2cc] bg-white/90"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            ) : null
          )}

          <div className="mt-16 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[28px] border border-white/70 bg-white/75 p-8 shadow-[0_30px_80px_rgba(0,0,0,0.08)] backdrop-blur">
              <div className="mb-10 flex justify-center">
                <div
                  className="relative h-72 w-52 [perspective:1400px]"
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = (e.clientY - rect.top) / rect.height - 0.5;
                    const y = (e.clientX - rect.left) / rect.width - 0.5;
                    setRotation({ x: x * 18, y: y * 24 });
                  }}
                  onMouseLeave={() => setRotation({ x: 0, y: 0 })}
                >
                  <div
                    className="absolute inset-0 transition-transform duration-300 [transform-style:preserve-3d]"
                    style={{
                      transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                    }}
                  >
                    <div className="absolute left-1/2 top-0 h-7 w-28 -translate-x-1/2 rounded-full border border-[#b5b5b5] bg-gradient-to-b from-[#efefef] via-[#bfc0c2] to-[#8e9092]" />
                    <div className="absolute left-1/2 top-5 h-[228px] w-[156px] -translate-x-1/2 rounded-[34px] border border-white/60 bg-gradient-to-b from-white/55 via-white/18 to-white/10 backdrop-blur-sm" />
                    <div className="absolute left-1/2 top-5 h-[228px] w-[156px] -translate-x-1/2 overflow-hidden rounded-[34px]">
                      <div
                        className="absolute bottom-0 left-0 w-full transition-all duration-700 ease-out"
                        style={{
                          height: `${fillLevel}%`,
                          background: `linear-gradient(180deg, rgba(255,255,255,0.16) 0%, ${teaColor} 18%, ${teaColor} 100%)`,
                        }}
                      />
                    </div>
                    <div className="absolute bottom-14 left-1/2 w-[112px] -translate-x-1/2 rounded-[18px] border border-black/8 bg-[#f4f1ee]/88 px-3 py-3 text-center">
                      <p className="text-[10px] uppercase tracking-[0.28em] text-[#5f5954]">
                        elyra
                      </p>
                      <p className="mt-1 text-xs text-[#2f2a27]">{blendName}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[#7b736d]">
                    nome
                  </p>
                  <p className="mt-2 text-lg text-[#24211f]">{blendName}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[#7b736d]">
                    perfil
                  </p>
                  <p className="mt-2 text-lg text-[#24211f]">{profile}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[#7b736d]">
                    nível no frasco
                  </p>
                  <p className="mt-2 text-lg text-[#24211f]">{fillLevel}%</p>
                </div>
              </div>

              <div className="mt-6 rounded-[22px] bg-[#f4f1ee] p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-[#7b736d]">
                  seleção atual
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[#4b4540]">
                  Base: {base || "—"}
                  <br />
                  Ingredientes: {selected.length ? selected.join(" • ") : "—"}
                </p>
                {notice ? (
                  <p className="mt-3 text-sm text-[#2e4a3a]">{notice}</p>
                ) : null}
              </div>
            </div>

            <div className="rounded-[28px] border border-white/70 bg-[#f6f3f0]/88 p-8 shadow-[0_30px_80px_rgba(0,0,0,0.06)] backdrop-blur">
              <p className="text-xs uppercase tracking-[0.24em] text-[#7b736d]">
                compra
              </p>
              <h3 className="mt-3 text-3xl font-light">
                frasco, refil ou essencial
              </h3>

              <div className="mt-6 space-y-2">
                {Object.entries(PACKS).map(([key, item]) => (
                  <label
                    key={key}
                    className={`flex cursor-pointer items-center justify-between rounded-full border px-4 py-3 ${
                      pack === key ? "border-black bg-white" : "bg-white/60"
                    }`}
                  >
                    <div>
                      <p className="text-sm">{item.label}</p>
                      <p className="text-xs text-gray-500">{item.sub}</p>
                    </div>
                    <input
                      type="radio"
                      checked={pack === key}
                      onChange={() => setPack(key as PackKey)}
                    />
                  </label>
                ))}
              </div>

              <div className="mt-8 space-y-3 text-sm text-[#403b37]">
                <div className="flex items-center justify-between rounded-full bg-white/80 px-4 py-3">
                  <span>base</span>
                  <span>{base || "—"}</span>
                </div>
                <div className="flex items-center justify-between rounded-full bg-white/80 px-4 py-3">
                  <span>ingredientes</span>
                  <span>{selected.length}</span>
                </div>
                <div className="flex items-center justify-between rounded-full bg-white/80 px-4 py-3">
                  <span>embalagem</span>
                  <span>{PACKS[pack].label}</span>
                </div>
                <div className="flex items-center justify-between rounded-full bg-white/80 px-4 py-3">
                  <span>valor</span>
                  <span>R$ {price.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  onAddCustomToCart({
                    id: `custom-${Date.now()}`,
                    name: blendName,
                    subtitle: `${base || "sem base"} • ${
                      selected.length ? selected.join(" • ") : "sem ingredientes"
                    } • ${PACKS[pack].label}`,
                    price,
                    quantity: 1,
                    kind: "custom",
                  });
                  onClose();
                }}
                className="mt-8 w-full rounded-full bg-black px-6 py-3 text-sm text-white"
              >
                adicionar ao carrinho
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
function StartElyraModal({
  onClose,
  onOpenBuilder,
  onViewCollection,
}: {
  onClose: () => void;
  onOpenBuilder: () => void;
  onViewCollection: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-6">
      <div className="w-full max-w-lg rounded-[28px] bg-white p-8 shadow-xl">
        <h2 className="text-2xl font-light text-[#1f1d1a]">
          começar com a elyra
        </h2>

        <p className="mt-6 text-sm leading-relaxed text-[#5f5650]">
          você não está comprando apenas um chá.
          <br />
          o início acontece com o frasco, o recipiente que permanece.
        </p>

        <div className="mt-6 space-y-2 text-sm text-[#4f4843]">
          <p>1. você recebe o frasco Elyra</p>
          <p>2. escolhe seu primeiro blend</p>
          <p>3. depois, repõe quando quiser</p>
        </div>

        <div className="mt-8 flex flex-col gap-3">
          <button
            onClick={onOpenBuilder}
            className="rounded-full bg-[#1f1d1a] px-6 py-3 text-sm text-white"
          >
            criar meu primeiro blend
          </button>

          <button
            onClick={onViewCollection}
            className="rounded-full border border-[#cfcac7] px-6 py-3 text-sm"
          >
            ver blends prontos
          </button>
        </div>

        <button
          onClick={onClose}
          className="mt-6 text-xs text-[#8a817b]"
        >
          fechar
        </button>
      </div>
    </div>
  );
}
function ExperienceSection({
  onOpenBlend,
  onViewCollection,
  onGuided,
}: {
  onOpenBlend: () => void;
  onViewCollection: () => void;
  onGuided: () => void;
}) {
  return (
    <section className="relative overflow-hidden bg-[#121212] px-6 py-32 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_60%)]" />

      <div className="relative mx-auto max-w-5xl text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-[#8f8f8f]">
          elyra experience
        </p>

        <h2 className="mt-6 text-4xl font-light leading-tight">
          um ritual, não uma escolha
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-[#cfcfcf]">
          crie, sinta ou descubra. cada blend é um caminho.
        </p>

        <div className="mt-20 grid gap-6 md:grid-cols-3">
          <button
            onClick={onViewCollection}
            className="group rounded-[28px] border border-white/10 bg-white/[0.03] p-8 text-left transition duration-500 hover:-translate-y-[4px] hover:border-white/20 hover:bg-white/[0.06]"
          >
            <span className="block text-xs uppercase tracking-[0.2em] text-[#8f8f8f]">
              explorar
            </span>
            <span className="mt-4 block text-lg font-light">
              blends prontos
            </span>
            <span className="mt-4 block text-sm text-[#cfcfcf]">
              descubra a coleção atual e encontre o seu ritmo.
            </span>
            <span className="mt-6 block text-xs uppercase tracking-[0.18em] text-white">
              entrar
            </span>
          </button>

          <button
            onClick={onGuided}
            className="group rounded-[28px] border border-white/10 bg-white/[0.03] p-8 text-left transition duration-500 hover:-translate-y-[4px] hover:border-white/20 hover:bg-white/[0.06]"
          >
            <span className="block text-xs uppercase tracking-[0.2em] text-[#8f8f8f]">
              sentir
            </span>
            <span className="mt-4 block text-lg font-light">por intenção</span>
            <span className="mt-4 block text-sm text-[#cfcfcf]">
              escolha pelo que você precisa agora.
            </span>
            <span className="mt-6 block text-xs uppercase tracking-[0.18em] text-white">
              iniciar
            </span>
          </button>

          <button
            onClick={onOpenBlend}
            className="group rounded-[28px] border border-white/10 bg-white/[0.03] p-8 text-left transition duration-500 hover:-translate-y-[4px] hover:border-white/20 hover:bg-white/[0.06]"
          >
            <span className="block text-xs uppercase tracking-[0.2em] text-[#8f8f8f]">
              criar
            </span>
            <span className="mt-4 block text-lg font-light">seu blend</span>
            <span className="mt-4 block text-sm text-[#cfcfcf]">
              monte sua composição e leve para casa.
            </span>
            <span className="mt-6 block text-xs uppercase tracking-[0.18em] text-white">
              começar
            </span>
          </button>
        </div>

        <div className="mt-16">
          <button
            onClick={onOpenBlend}
            className="rounded-full border border-white/20 px-8 py-4 text-sm uppercase tracking-[0.2em] text-white transition hover:bg-white hover:text-black"
          >
            iniciar experiência
          </button>
        </div>
      </div>
    </section>
  );
}

function InfoModal({
  type,
  onClose,
}: {
  type: "contato" | "privacidade" | "termos" | "aviso" | null;
  onClose: () => void;
}) {
  if (!type) return null;

  const content = {
    contato: {
      title: "contato",
      body: (
        <>
          <p className="mt-4">elyrabrasil@gmail.com</p>
          <p className="mt-2">@elyrabrasil</p>
        </>
      ),
    },
    privacidade: {
      title: "privacidade",
      body: (
        <p className="mt-4 leading-relaxed">
          utilizamos dados apenas para funcionamento da plataforma e melhoria da
          experiência. não compartilhamos informações pessoais de forma indevida.
        </p>
      ),
    },
    termos: {
      title: "termos",
      body: (
        <p className="mt-4 leading-relaxed">
          o uso do site implica na aceitação das condições de navegação, compra e
          disponibilidade dos produtos. valores, imagens e informações podem ser
          atualizados sem aviso prévio.
        </p>
      ),
    },
    aviso: {
      title: "aviso fitoterápico",
      body: (
        <p className="mt-4 leading-relaxed">
          os produtos da Elyra não substituem orientação médica. não são
          destinados a diagnosticar, tratar ou curar doenças. gestantes,
          lactantes, crianças e pessoas em uso de medicação devem buscar
          orientação profissional antes do consumo.
        </p>
      ),
    },
  };

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm">
      <div className="relative w-full max-w-xl rounded-[32px] bg-[#1a1a1a] p-10 text-white shadow-[0_40px_120px_rgba(0,0,0,0.4)]">
        <button
          onClick={onClose}
          className="absolute right-6 top-6 text-xs uppercase tracking-[0.2em] text-[#bdbdbd]"
        >
          fechar
        </button>

        <p className="text-xs uppercase tracking-[0.3em] text-[#8a8a8a]">
          {content[type].title}
        </p>

        <div className="text-sm text-[#d6d6d6]">{content[type].body}</div>
      </div>
    </div>
  );
}

function EssenciasSection({
  onOpenEssencia,
}: {
  onOpenEssencia: (essencia: EssenciaItem) => void;
}) {
  const ESSENCIAS: (EssenciaItem & { image: string })[] = [
    {
      name: "chá verde",
      desc: "claro • vivo • contínuo",
      text: "energia leve, foco e presença",
      notes: "vegetal, fresco, limpo",
      benefit: "clareza, ritmo e atenção mais estável ao longo do dia",
      poetry:
        "um verde que desperta sem romper o silêncio. presença limpa, gesto contínuo.",
      price: 42,
      image: "/essencias/chaverde.jpg",
    },
    {
      name: "chá branco",
      desc: "suave • etéreo • delicado",
      text: "leveza, silêncio e refinamento",
      notes: "macio, floral, sutil",
      benefit: "leveza mental, pausa delicada e uma experiência mais aérea",
      poetry:
        "quase invisível, mas presente. uma pausa fina, clara e leve.",
      price: 46,
      image: "/essencias/chabranco.jpg",
    },
    {
      name: "chá preto",
      desc: "profundo • quente • estruturado",
      text: "presença, corpo e intensidade",
      notes: "encorpado, quente, amplo",
      benefit: "mais corpo, mais presença e profundidade no ritual",
      poetry: "calor, estrutura e permanência. uma xícara com mais chão.",
      price: 44,
      image: "/essencias/chapreto.jpg",
    },
    {
      name: "camomila",
      desc: "macia • acolhedora • calmante",
      text: "descanso, conforto e desaceleração",
      notes: "floral, doce, macio",
      benefit: "acolhimento, desaceleração e conforto no fim do dia",
      poetry:
        "como luz baixa no fim da tarde. conforto que pousa devagar.",
      price: 38,
      image: "/essencias/camomila.jpg",
    },
    {
      name: "capim limão",
      desc: "fresco • limpo • equilibrado",
      text: "clareza, leveza e respiração",
      notes: "cítrico, herbal, leve",
      benefit: "sensação de limpeza, leveza e respiro mais aberto",
      poetry: "um frescor sereno. o corpo desacelera e a mente respira.",
      price: 36,
      image: "/essencias/capimlimao.jpg",
    },
    {
      name: "hortelã",
      desc: "viva • fria • expansiva",
      text: "despertar, frescor e abertura",
      notes: "fria, aromática, viva",
      benefit: "despertar sensorial, frescor e sensação de abertura",
      poetry: "mais ar, mais claridade, mais movimento. uma pausa que expande.",
      price: 36,
      image: "/essencias/hortela.jpg",
    },
    {
      name: "hibisco",
      desc: "vibrante • ácido • floral",
      text: "movimento, cor e leve intensidade",
      notes: "ácido, floral, vivo",
      benefit: "vitalidade, cor e uma experiência mais expressiva",
      poetry: "vibração em vermelho. presença leve com gesto mais vivo.",
      price: 39,
      image: "/essencias/hibisco.jpg",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setActiveIndex((prev) => (prev + 1) % ESSENCIAS.length);
  }, 5200);

  return () => clearInterval(interval);
}, [ESSENCIAS.length]);

const getVisualState = (index: number) => {
  const total = ESSENCIAS.length;

  const rawDiff = index - activeIndex;
  const diff =
    rawDiff > total / 2
      ? rawDiff - total
      : rawDiff < -total / 2
      ? rawDiff + total
      : rawDiff;

  if (diff === 0) {
    return {
      x: 0,
      scale: 1,
      opacity: 1,
      blur: 0,
      zIndex: 30,
    };
  }

  if (diff === 1) {
    return {
      x: 110,
      scale: 0.82,
      opacity: 0.5,
      blur: 2,
      zIndex: 20,
    };
  }

  if (diff === -1) {
    return {
      x: -110,
      scale: 0.82,
      opacity: 0.5,
      blur: 2,
      zIndex: 20,
    };
  }

  if (diff === 2) {
    return {
      x: 190,
      scale: 0.62,
      opacity: 0.16,
      blur: 4,
      zIndex: 10,
    };
  }

  if (diff === -2) {
    return {
      x: -190,
      scale: 0.62,
      opacity: 0.16,
      blur: 4,
      zIndex: 10,
    };
  }

  return {
    x: 0,
    scale: 0.45,
    opacity: 0,
    blur: 8,
    zIndex: 0,
  };
};

return (
  <section id="essencias" className="mx-auto max-w-7xl px-6 py-28">
    <div className="mb-20 max-w-2xl">
      <p className="text-xs uppercase tracking-[0.35em] text-[#6f6963]">
        essências
      </p>
      <h2 className="mt-4 text-4xl font-light">a base de cada composição</h2>
      <p className="mt-6 leading-relaxed text-[#5f5650]">
        antes do blend, a origem. cada chá carrega um estado, uma direção, uma
        presença.
      </p>
    </div>

    <div className="overflow-hidden rounded-[32px] border border-[#d8d4d0] bg-[#f4f1ee] px-4 py-8 md:px-6 md:py-10">
      <div className="mx-auto flex max-w-[700px] flex-col items-center">
        <div className="relative h-[220px] w-full md:h-[280px]">
          {ESSENCIAS.map((essencia, index) => {
            const state = getVisualState(index);
            const isActive = index === activeIndex;

            return (
              <button
                key={essencia.name}
                onClick={() => {
                  if (isActive) {
                    onOpenEssencia(essencia);
                  } else {
                    setActiveIndex(index);
                  }
                }}
                className="absolute left-1/2 top-1/2 h-[150px] w-[150px] overflow-hidden rounded-full transition-all duration-[1600ms] ease-[cubic-bezier(0.22,1,0.36,1)] md:h-[190px] md:w-[190px]"
                style={{
                  transform: `translate(-50%, -50%) translateX(${state.x}px) scale(${state.scale})`,
                  opacity: state.opacity,
                  filter: `blur(${state.blur}px)`,
                  zIndex: state.zIndex,
                  pointerEvents: state.opacity < 0.08 ? "none" : "auto",
                }}
                aria-label={
                  isActive ? `abrir ${essencia.name}` : `ver ${essencia.name}`
                }
              >
                <img
                  src={essencia.image}
                  alt={essencia.name}
                  className="h-full w-full rounded-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent" />
              </button>
            );
          })}
        </div>

        <div className="mt-6 w-full border-t border-[#ddd8d3] pt-6 text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-[#7a6f67]">
            {ESSENCIAS[activeIndex].desc}
          </p>

          <h3 className="mt-4 text-2xl font-light capitalize text-[#1f1d1a]">
            {ESSENCIAS[activeIndex].name}
          </h3>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#5f5650]">
            {ESSENCIAS[activeIndex].text}
          </p>

          <div className="mt-8 flex items-center justify-center gap-2">
            {ESSENCIAS.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`h-2.5 rounded-full transition-all duration-500 ${
                  activeIndex === index ? "w-8 bg-[#1f1d1a]" : "w-2.5 bg-[#cfc8c2]"
                }`}
                aria-label={`ver essência ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => onOpenEssencia(ESSENCIAS[activeIndex])}
            className="mt-8 rounded-full border border-[#cfcac7] bg-white px-6 py-3 text-sm text-[#1f1d1a] transition hover:bg-black hover:text-white"
          >
            conhecer essência
          </button>
        </div>
      </div>
    </div>
  </section>
);
}

function MatchaSection({
  onAddToCart,
}: {
  onAddToCart: (item: CartItem) => void;
}) {
  const rituals = [
    {
      name: "puro",
      text: "água quente, gesto lento. o matcha na sua forma mais clara.",
      image: "/matcha/matchapuro.jpg",
    },
    {
      name: "latte",
      text: "cremoso, equilibrado, contínuo. uma leitura mais confortável do ritual.",
      image: "/matcha/matchalatte.jpg",
    },
    {
      name: "iced matcha",
      text: "frio, preciso, luminoso. uma pausa mais limpa, mais atual.",
      image: "/matcha/icedmatcha.jpg",
      highlight: true,
    },
    {
      name: "iced latte",
      text: "leve, cremoso e silencioso. o ritmo desacelera sem perder presença.",
      image: "/matcha/icedlatte.jpg",
    },
  ];

  const [activeRitual, setActiveRitual] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveRitual((prev) => (prev + 1) % rituals.length);
    }, 4200);

    return () => clearInterval(interval);
  }, [rituals.length]);

  return (
    <section id="matcha" className="mx-auto max-w-7xl px-6 py-28">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-[#6f6963]">
            matcha da casa
          </p>

          <h2 className="mt-4 text-4xl font-light">
            um verde mais calmo.
            <br />
            uma energia mais limpa.
          </h2>

          <p className="mt-8 max-w-xl leading-relaxed text-[#5f5650]">
            o matcha na Elyra não é uma forma única. é um ponto de partida.
            você escolhe como viver: puro, latte, iced ou no ritmo da sua casa.
          </p>

          <div className="mt-10 space-y-4">
            <div className="rounded-[24px] border border-[#d8d4d0] bg-[#f4f1ee] p-5">
              <p className="text-[11px] uppercase tracking-[0.22em] text-[#7a6f67]">
                inspiração
              </p>
              <p className="mt-3 text-sm leading-7 text-[#4f4843]">
                o matcha da casa nasce do encontro entre clareza, cor e ritual.
                uma nova pausa dentro da Elyra, pensada para a experiência em
                casa.
              </p>
            </div>

            <div className="rounded-[24px] border border-[#d8d4d0] bg-[#f4f1ee] p-5">
              <p className="text-[11px] uppercase tracking-[0.22em] text-[#7a6f67]">
                formato
              </p>
              <p className="mt-3 text-sm leading-7 text-[#4f4843]">
                100 g • pensado para puro, latte, iced matcha e iced latte.
              </p>
            </div>

            <div className="rounded-[24px] border border-[#d8d4d0] bg-[#f4f1ee] p-5">
              <p className="text-[11px] uppercase tracking-[0.22em] text-[#7a6f67]">
                conservação
              </p>
              <p className="mt-3 text-sm leading-7 text-[#4f4843]">
                manter fechado, em local fresco, seco e ao abrigo da luz.
              </p>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <button
              onClick={() =>
                onAddToCart({
                  id: `matcha-da-casa-${Date.now()}`,
                  name: "matcha da casa",
                  subtitle: "100 g • matcha em pó",
                  price: MATCHA_PRICE,
                  quantity: 1,
                  kind: "collection",
                })
              }
              className="rounded-full bg-black px-6 py-3 text-sm text-white transition hover:opacity-90"
            >
              adicionar ao carrinho
            </button>

            <button
              onClick={() =>
                document
                  .getElementById("cafes")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="rounded-full border border-[#cfcac7] bg-white px-6 py-3 text-sm text-[#1f1d1a] transition hover:bg-[#ece8e3]"
            >
              continuar explorando
            </button>
          </div>
        </div>

        <div>
          <p className="text-[11px] uppercase tracking-[0.24em] text-[#7a6f67]">
            leituras do matcha
          </p>

          <div className="mt-6 overflow-hidden rounded-[32px] border border-[#d8d4d0] bg-[#f2f1ef]">
            <div className="relative h-[520px] overflow-hidden">
              <div
                className="h-full transition-transform duration-[1600ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{
                  transform: `translateY(-${activeRitual * 100}%)`,
                }}
              >
                {rituals.map((item) => (
                  <div key={item.name} className="relative h-[520px]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />

                    <div className="absolute left-6 top-6 rounded-full bg-white/80 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-[#4f4843] backdrop-blur-sm">
                      matcha
                    </div>

                    {item.highlight ? (
                      <div className="absolute right-6 top-6 rounded-full bg-[#edf2e8]/90 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-[#46523f] backdrop-blur-sm">
                        sugestão da casa
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-[#ddd8d3] bg-[#f6f4f1] px-6 py-5">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="text-sm uppercase tracking-[0.18em] text-[#6d665f]">
                    {rituals[activeRitual].name}
                  </p>
                  <p className="mt-3 max-w-lg text-sm leading-7 text-[#4f4843]">
                    {rituals[activeRitual].text}
                  </p>
                </div>

                <div className="hidden items-center gap-2 md:flex">
                  {rituals.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveRitual(index)}
                      className={`h-2.5 rounded-full transition-all duration-500 ${
                        activeRitual === index
                          ? "w-8 bg-[#1f1d1a]"
                          : "w-2.5 bg-[#cfc8c2]"
                      }`}
                      aria-label={`ver ritual ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function EssenciaModal({
  essencia,
  onClose,
  onAddToCart,
  onCreateFromEssencia,
}: {
  essencia: EssenciaItem | null;
  onClose: () => void;
  onAddToCart: (item: CartItem) => void;
  onCreateFromEssencia?: () => void;
}) {
  const [weight, setWeight] = useState<100 | 200 | 400>(200);

  if (!essencia) return null;

  const priceMap = {
  100: 29,
  200: 46,
  400: 82,
} as const;

  const subtitleMap = {
    100: "100 g • descoberta",
    200: "200 g • presença",
    400: "400 g • continuidade",
  } as const;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30 backdrop-blur-sm px-4">
      <div className="w-full max-w-4xl rounded-[28px] bg-[#f4f1ee] p-6 md:p-8 text-[#1f1d1a]">

        {/* fechar */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-xs uppercase tracking-[0.2em] text-[#8b8178]"
        >
          fechar
        </button>

        <div className="grid md:grid-cols-2 gap-6 items-start">

          <div className="flex items-center justify-center h-full min-h-[320px]">
  <div className="relative flex items-center justify-center h-[260px] w-[260px] overflow-visible">

    {/* glow âmbar */}
    <div
      className="pointer-events-none absolute rounded-full"
      style={{
        width: 240,
        height: 240,
        background:
          "radial-gradient(circle, rgba(214,146,58,0.45) 0%, rgba(214,146,58,0.18) 38%, rgba(214,146,58,0.06) 60%, transparent 80%)",
        filter: "blur(32px)",
        animation: "elyraGlow 4.5s ease-in-out infinite",
      }}
    />

    {/* imagem */}
    <div className="relative z-[2] h-[200px] w-[200px] overflow-hidden rounded-full border border-white/70 shadow-[0_12px_30px_rgba(0,0,0,0.10)]">
      <img
        src={essencia.image || "/essencias/chaverde.jpg"}
        alt={essencia.name}
        className="h-full w-full object-cover object-center scale-[1.1]"
      />
    </div>
  </div>
</div>
          {/* 🔥 BLOCO 2 — CONTEÚDO */}
          <div className="space-y-4">

            {/* CARD INTERNO */}
            <div className="rounded-[22px] border border-[#ddd8d3] bg-[#faf8f5] p-5">

              <p className="text-[10px] uppercase tracking-[0.25em] text-[#8b8178]">
                essência
              </p>

              <h3 className="mt-3 text-2xl font-light capitalize">
                {essencia.name}
              </h3>

              <p className="mt-2 text-xs uppercase tracking-[0.15em] text-[#8f857c]">
                {essencia.desc}
              </p>

              <p className="mt-4 text-sm leading-7 text-[#5f5650]">
                {essencia.text}
              </p>

              {/* notas */}
              <div className="mt-5">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#8f857c]">
                  notas
                </p>
                <p className="mt-1 text-sm text-[#3f3935]">
                  {essencia.notes}
                </p>
              </div>

              {/* benefício */}
              <div className="mt-4">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#8f857c]">
                  benefício
                </p>
                <p className="mt-1 text-sm text-[#3f3935]">
                  {essencia.benefit}
                </p>
              </div>

              {/* poética */}
              <div className="mt-5 border-t border-[#e5e1dc] pt-4">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#8f857c]">
                  poética
                </p>
                <p className="mt-2 text-sm italic text-[#4f4843] leading-7">
                  {essencia.poetry}
                </p>
              </div>
            </div>

            {/* 🔥 CARD GRAMATURA */}
            <div className="rounded-[22px] border border-[#ddd8d3] bg-[#faf8f5] p-5">

              <div className="flex gap-2 flex-wrap">
                {[100, 200, 400].map((g) => (
                  <button
                    key={g}
                    onClick={() => setWeight(g as 100 | 200 | 400)}
                    className={`rounded-full px-4 py-2 text-sm transition ${
                      weight === g
                        ? "bg-[#1f1d1a] text-white"
                        : "border border-[#d6d0ca] bg-white text-[#1f1d1a]"
                    }`}
                  >
                    {g} g
                  </button>
                ))}
              </div>

              <div className="mt-4 flex justify-between items-center">
                <p className="text-xs text-[#6f6963]">
                  {subtitleMap[weight]}
                </p>

                <p className="text-lg font-light">
                 R$ {priceMap[weight]}
                </p>
              </div>

              <div className="mt-5 flex gap-3 flex-wrap">

                {onCreateFromEssencia && (
                  <button
                    onClick={onCreateFromEssencia}
                    className="rounded-full border border-[#d6d0ca] px-5 py-2 text-sm"
                  >
                    conhecer
                  </button>
                )}

                <button
                  onClick={() =>
                    onAddToCart({
                      id: `${essencia.name}-${weight}-${Date.now()}`,
                      name: essencia.name,
                      subtitle: subtitleMap[weight],
                      price: priceMap[weight],
                      quantity: 1,
                      kind: "collection",
                    })
                  }
                  className="rounded-full bg-[#1f1d1a] px-5 py-2 text-sm text-white"
                >
                  adicionar
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* 🔥 ANIMAÇÃO GLOBAL */}
      <style jsx>{`
  @keyframes elyraGlow {
    0% {
      transform: scale(0.92);
      opacity: 0.72;
    }
    50% {
      transform: scale(1.14);
      opacity: 1;
    }
    100% {
      transform: scale(0.92);
      opacity: 0.72;
    }
  }

  @keyframes elyraGlowSoft {
    0% {
      transform: scale(1);
      opacity: 0.45;
    }
    50% {
      transform: scale(1.18);
      opacity: 0.72;
    }
    100% {
      transform: scale(1);
      opacity: 0.45;
    }
  }
`}</style>
    </div>
  );
}
export default function Page() {
  const [isBlendOpen, setIsBlendOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeBlend, setActiveBlend] = useState<BossaBlend | null>(null);
  const [activeEssencia, setActiveEssencia] = useState<EssenciaItem | null>(
    null
  );
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [base, setBase] = useState<string | null>(null);
  const [selected, setSelected] = useState<string[]>([]);
  const [notice, setNotice] = useState("");
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [fillLevel, setFillLevel] = useState(8);
  const [pack, setPack] = useState<PackKey>("glass");
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [coffeeOpen, setCoffeeOpen] = useState(false);
  const [activeCapsule, setActiveCapsule] = useState<CoffeeCapsule | null>(null);
  const [capsuleModalOpen, setCapsuleModalOpen] = useState(false);
  const [capsuleMode, setCapsuleMode] = useState<"buy" | "subscribe">("buy");
  const [selectedBlend, setSelectedBlend] = useState<any>(null);
  const [openStartModal, setOpenStartModal] = useState(false);
  const BOSSA_GALLERY = BOSSA_BLENDS.map((b) => ({
  name: b.name,
  image: b.image,
  inspiredBy: b.inspiredBy,
}));
  const [modal, setModal] = useState<
    "contato" | "privacidade" | "termos" | "aviso" | null
  >(null);

  const categoryMap = useMemo(() => {
    const map: Record<string, string> = {};
    Object.entries(INGREDIENTS).forEach(([category, items]) =>
      items.forEach((item) => {
        map[item] = category;
      })
    );
    return map;
  }, []);

  const categoryCount = useMemo(() => {
    return selected.reduce((acc, item) => {
      const cat = categoryMap[item];
      if (cat && cat !== "bases") acc[cat] = (acc[cat] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }, [selected, categoryMap]);

  const addCoffeeToCart = (item: CartItem) => {
    setCartItems((prev) => [...prev, item]);
    setIsCartOpen(true);
  };

  const handleSelectEssencia = (erva: string) => {
    const normalized = erva.toLowerCase();
    setNotice("");

    if (
      INGREDIENTS.bases.includes(
        normalized as (typeof INGREDIENTS.bases)[number]
      )
    ) {
      setBase(normalized);
      setSelected([]);
    } else {
      setSelected((prev) => {
        const next = prev.filter((i) => i !== normalized);
        return [normalized, ...next];
      });
    }

    setIsBlendOpen(true);
  };

  const toggleIngredient = (item: string) => {
    setNotice("");
    const category = categoryMap[item] as keyof typeof LIMITS | undefined;

    setSelected((prev) => {
      if (prev.includes(item)) return prev.filter((i) => i !== item);
      if (!category) return prev;
      if ((categoryCount[category] || 0) >= LIMITS[category]) {
        setNotice(`limite atingido para ${category}`);
        return prev;
      }
      return [...prev, item];
    });
  };

  const profile = useMemo(() => {
    const joined = selected.join(" ").toLowerCase();
    const baseText = (base || "").toLowerCase();

    if (/melissa|camomila|lavanda|mulungu|lúpulo/.test(joined))
      return "calmante";
    if (
      /gengibre|cúrcuma|canela|cravo/.test(joined) ||
      /chá preto|mate tostado/.test(baseText)
    )
      return "energizante";
    if (/hortelã|menta|limão/.test(joined)) return "refrescante";
    if (/rosa|hibisco|lavanda|calêndula/.test(joined)) return "floral";
    return "sensorial";
  }, [base, selected]);

  const blendName = useMemo(() => {
    if (!selected.length) return "seu blend";
    if (profile === "calmante") return "noite serena";
    if (profile === "energizante") return "pulso vivo";
    if (profile === "refrescante") return "brisa clara";
    if (profile === "floral") return "véu floral";
    return "blend autoral";
  }, [profile, selected]);

  const teaColor = useMemo(() => {
    if (profile === "calmante") return "rgba(183, 160, 98, 0.72)";
    if (profile === "energizante") return "rgba(126, 73, 39, 0.78)";
    if (profile === "refrescante") return "rgba(136, 156, 95, 0.76)";
    if (profile === "floral") return "rgba(166, 112, 124, 0.74)";
    return "rgba(148, 120, 88, 0.74)";
  }, [profile]);

  const price = useMemo(() => {
    const basePrice = base ? 42 : 32;
    const ingredientsPrice = selected.length * 3.8;
    return Math.max(
      28,
      Number((basePrice + ingredientsPrice + PACKS[pack].priceAdd).toFixed(2))
    );
  }, [base, selected, pack]);

  const cartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  useEffect(() => {
    const nextLevel = Math.min(78, 8 + selected.length * 10 + (base ? 6 : 0));
    const timer = window.setTimeout(() => setFillLevel(nextLevel), 120);
    return () => window.clearTimeout(timer);
  }, [base, selected]);

  const openBlankBlend = () => {
    setBase(null);
    setSelected([]);
    setNotice("");
    setPack("glass");
    setIsBlendOpen(true);
  };

  const openGuidedBlend = (benefit: BenefitKey) => {
    const presets: Record<
      BenefitKey,
      { base: string; selected: string[]; notice: string }
    > = {
      calmante: {
        base: "chá branco",
        selected: [
          "melissa",
          "folha de maracujá",
          "camomila",
          "lavanda",
          "fava de baunilha",
        ],
        notice: "blend guiado • calmante",
      },
      energia: {
        base: "mate tostado",
        selected: ["alecrim", "hortelã", "hibisco", "laranja", "gengibre"],
        notice: "blend guiado • energia",
      },
      refresco: {
        base: "chá verde",
        selected: [
          "capim limão",
          "hortelã",
          "melissa",
          "hibisco",
          "limão siciliano",
        ],
        notice: "blend guiado • refresco",
      },
      floral: {
        base: "chá branco",
        selected: [
          "rosa branca",
          "lavanda",
          "camomila",
          "maçã",
          "fava de baunilha",
        ],
        notice: "blend guiado • floral",
      },
    };

    const preset = presets[benefit];
    setBase(preset.base);
    setSelected(preset.selected);
    setNotice(preset.notice);
    setPack("glass");
    setIsBlendOpen(true);
  };

  const viewCollection = () => {
    document.getElementById("colecoes")?.scrollIntoView({ behavior: "smooth" });
  };

 const handleCheckout = async () => {
  try {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: cartItems,
      }),
    });

    const data = await res.json();

    console.log("RESPOSTA JSON:", data);

    if (data.url) {
      window.location.href = data.url;
    } else {
      alert(data.error || "Erro no checkout");
    }

  } catch (error) {
    console.error("ERRO CHECKOUT:", error);
  }
};

  return (
    <>
      <TopBar />

      <Navbar
        cartCount={cartCount}
        onOpenBlend={() => setIsBlendOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
      />

      <main className="min-h-screen bg-[#ecebea] pt-[110px] font-serif text-[#1f1d1a]">
  <HeroSection onOpenBlend={() => setIsBlendOpen(true)} />

<BossaSection
  onSelect={(blend) => setSelectedBlend(blend)}
  onAddToCart={(item) => {
    setCartItems((prev) => [...prev, item]);
    setIsCartOpen(true);
  }}
/>
<BossaGallerySection blends={BOSSA_GALLERY} />



  <BenefitsSection
    onViewCollection={viewCollection}
    onGuidedCreate={openGuidedBlend}
    onOpenBlank={openBlankBlend}
  />

  <SubscriptionsSection
  onStart={() => setOpenStartModal(true)}
  onBecomeMember={() => console.log("membro")}
 />
 {openStartModal && (
  <StartElyraModal
    onClose={() => setOpenStartModal(false)}
    onOpenBuilder={() => {
      setOpenStartModal(false);
      setOpenBlendBuilder(true);
    }}
    onViewCollection={() => {
      setOpenStartModal(false);
    }}
  />
)}
<CoffeeSection
  onOpenCapsule={(capsule, mode) => {
    console.log("abrindo modal");

    setActiveCapsule(capsule);
    setCapsuleMode(mode);
    setCapsuleModalOpen(true);
  }}
/>


<IzzoFilmSection />

<ExperienceSection
  onOpenBlend={() => setIsBlendOpen(true)}
  onViewCollection={() =>
    document
      .getElementById("colecoes")
      ?.scrollIntoView({ behavior: "smooth" })
  }
  onGuided={() => openGuidedBlend("calmante")}
/>

<EssenciasSection onOpenEssencia={setActiveEssencia} />

<MatchaSection
  onAddToCart={(item) => {
    setCartItems((prev) => [...prev, item]);
    setIsCartOpen(true);
  }}
/>

        <footer className="bg-[#141414] px-6 py-20 text-[#bdbdbd]">
          <div className="mx-auto grid max-w-7xl gap-12 text-sm md:grid-cols-4">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-white">
                elyra
              </p>
              <p className="mt-5 max-w-xs leading-relaxed text-[#9d9d9d]">
                chás autorais, cafés e experiências sensoriais. um ritual, não
                uma escolha.
              </p>
            </div>

            <div>
              <p className="mb-4 text-xs uppercase tracking-[0.25em] text-white">
                explorar
              </p>

              <div className="space-y-2">
                <button
                  onClick={() =>
                    document
                      .getElementById("colecoes")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="block transition hover:text-white"
                >
                  coleções
                </button>

                <button
                  onClick={() =>
                    document
                      .getElementById("beneficios")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="block transition hover:text-white"
                >
                  benefícios
                </button>

                <button
                  onClick={() =>
                    document
                      .getElementById("assinaturas")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="block transition hover:text-white"
                >
                  assinaturas
                </button>

                <button
                  onClick={() =>
                    document
                      .getElementById("cafes")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="block transition hover:text-white"
                >
                  cafés
                </button>

                <button
                  onClick={() =>
                    document
                      .getElementById("essencias")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="block transition hover:text-white"
                >
                  essências
                </button>

                <button
                  onClick={() =>
                    document
                      .getElementById("matcha")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="block transition hover:text-white"
                >
                  matcha
                </button>
              </div>
            </div>

            <div>
              <p className="mb-4 text-xs uppercase tracking-[0.25em] text-white">
                suporte
              </p>

              <div className="space-y-2">
                <button
                  onClick={() => setModal("contato")}
                  className="block transition hover:text-white"
                >
                  contato
                </button>

                <button
                  onClick={() => setModal("privacidade")}
                  className="block transition hover:text-white"
                >
                  privacidade
                </button>

                <button
                  onClick={() => setModal("termos")}
                  className="block transition hover:text-white"
                >
                  termos
                </button>

                <button
                  onClick={() => setModal("aviso")}
                  className="block transition hover:text-white"
                >
                  aviso
                </button>
              </div>
            </div>

            <div>
              <p className="mb-4 text-xs uppercase tracking-[0.25em] text-white">
                social
              </p>

              <a
                href="https://instagram.com/elyrabrasil"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 transition hover:text-white"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full border border-[#555] text-[10px]">
                  ig
                </span>
                <span>@elyrabrasil</span>
              </a>
            </div>
          </div>

          <div className="mx-auto mt-16 max-w-7xl border-t border-[#2a2a2a] pt-6 text-[11px] tracking-[0.18em] text-[#6f6f6f]">
            © {new Date().getFullYear()} elyra — by humans, for humanity
          </div>
        </footer>
      </main>

      {activeBlend && (
        <BossaModal
          blend={activeBlend}
          onClose={() => setActiveBlend(null)}
          onAddToCart={() => {
            setCartItems((prev) => [
              ...prev,
              {
                id: `${activeBlend.name}-${Date.now()}`,
                name: activeBlend.name,
                subtitle: activeBlend.notes,
                price: 58,
                quantity: 1,
                kind: "collection",
              },
            ]);
            setActiveBlend(null);
            setIsCartOpen(true);
          }}
          onOpenBlend={() => {
            setActiveBlend(null);
            setIsBlendOpen(true);
          }}
        />
      )}
      
{selectedBlend && (
  <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">
    <div className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-[36px] border border-[#d8d2cc] bg-[#f5f2ee] px-8 py-10 shadow-[0_30px_100px_rgba(0,0,0,0.18)] md:px-12 md:py-12">
      
      <button
        onClick={() => setSelectedBlend(null)}
        className="absolute right-6 top-6 rounded-full border border-[#d0cbc6] bg-white px-4 py-2 text-xs text-[#4d4742]"
      >
        fechar
      </button>

      {/* header */}
      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.3em] text-[#7a6f67]">
          coleção bossa
        </p>

        <h3 className="mt-3 text-4xl font-light text-[#1f1d1a]">
          {selectedBlend.name}
        </h3>

        <p className="mt-3 text-xs uppercase tracking-[0.25em] text-[#7a6f67]">
          {selectedBlend.notes}
        </p>

        <p className="mt-5 text-base text-[#1f1d1a]">
          R$ {selectedBlend.price},00
        </p>
      </div>

      {/* especificações */}
      <div className="mb-12 grid gap-4 md:grid-cols-3">
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
          <p className="mt-2 text-sm text-[#3f3935]">
            frasco da coleção
          </p>
        </div>

        <div className="rounded-[22px] bg-white/70 p-4">
          <p className="text-[11px] uppercase tracking-[0.18em] text-[#7a6f67]">
            permanência
          </p>
          <p className="mt-2 text-sm text-[#3f3935]">
            feito para permanecer
          </p>
        </div>
      </div>

      {/* conteúdo */}
      <div className="space-y-10">

        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-[#7a6f67]">
            inspirado por
          </p>
          <p className="mt-3 text-sm leading-7 text-[#4f4843]">
            {selectedBlend.inspiredBy}
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-[#7a6f67]">
            sensações
          </p>
          <p className="mt-3 text-sm leading-7 text-[#4f4843]">
            {selectedBlend.sensations}
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-[#7a6f67]">
            benefícios
          </p>
          <p className="mt-3 text-sm leading-7 text-[#4f4843]">
            {selectedBlend.benefits}
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-[#7a6f67]">
            conservação
          </p>
          <p className="mt-3 text-sm leading-7 text-[#4f4843]">
            Manter fechado, em local fresco, seco e ao abrigo da luz.
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-[#7a6f67]">
            continuidade
          </p>
          <p className="mt-3 text-sm leading-7 text-[#4f4843]">
            O frasco permanece. Os próximos envios acompanham o seu ritmo.
          </p>
        </div>

      </div>

     {/* ações */}
<div className="mt-12 flex">
  <button
    onClick={() => {
      setCartItems((prev) => [
        ...prev,
        {
          id: `${selectedBlend.name}-${Date.now()}`,
          name: `${selectedBlend.name} • frasco`,
          subtitle: "frasco da coleção 400 g",
          price: selectedBlend.price,
          quantity: 1,
          kind: "collection",
        },
      ]);
      setIsCartOpen(true);
      setSelectedBlend(null);
    }}
    className="w-full rounded-full bg-black px-6 py-4 text-sm text-white transition hover:opacity-90"
  >
    comprar
  </button>
</div>

    </div>
  </div>
)}
      <BlendBuilderModal
        isOpen={isBlendOpen}
        onClose={() => setIsBlendOpen(false)}
        onAddCustomToCart={(item) => {
          setCartItems((prev) => [...prev, item]);
          setIsCartOpen(true);
        }}
        base={base}
        setBase={setBase}
        selected={selected}
        toggleIngredient={toggleIngredient}
        categoryCount={categoryCount}
        pack={pack}
        setPack={setPack}
        price={price}
        blendName={blendName}
        profile={profile}
        fillLevel={fillLevel}
        notice={notice}
        teaColor={teaColor}
        rotation={rotation}
        setRotation={setRotation}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemove={(id) =>
          setCartItems((prev) => prev.filter((item) => item.id !== id))
        }
        onIncrease={(id) =>
          setCartItems((prev) =>
            prev.map((item) =>
              item.id === id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          )
        }
        onDecrease={(id) =>
          setCartItems((prev) =>
            prev
              .map((item) =>
                item.id === id
                  ? { ...item, quantity: Math.max(1, item.quantity - 1) }
                  : item
              )
              .filter((item) => item.quantity > 0)
          )
        }
        onCheckout={handleCheckout}
      />

        <InfoModal type={modal} onClose={() => setModal(null)} />

      <EssenciaModal
  essencia={activeEssencia}
  onClose={() => setActiveEssencia(null)}
  onAddToCart={(item) => {
    setCartItems((prev) => [...prev, item]);
    setActiveEssencia(null);
    setIsCartOpen(true);
  }}
  onCreateFromEssencia={() => {
    if (!activeEssencia) return;
    handleSelectEssencia(activeEssencia.name);
    setActiveEssencia(null);
  }}
/>


      {checkoutLoading && (
        <div className="fixed inset-0 z-[95] flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="rounded-full bg-white px-6 py-3 text-sm text-[#1f1d1a] shadow-[0_20px_50px_rgba(0,0,0,0.12)]">
            preparando checkout...
          </div>
        </div>
      )}
    </>
  );
}


function IzzoFilmSection() {
  return (
    
    <section className="mx-auto max-w-7xl px-6 py-28">
      <div className="mb-10 max-w-2xl">
        <p className="text-xs uppercase tracking-[0.35em] text-[#6f6963]">
          izzo
        </p>
        <h2 className="mt-4 text-4xl font-light">
          entre origem, torra e gesto
        </h2>
        <p className="mt-6 leading-relaxed text-[#5f5650]">
          quatro décadas entre cultura, espresso e permanência.
        </p>
      </div>

      <div className="relative overflow-hidden rounded-[32px] border border-[#d8d4d0] bg-black">
        <video
          className="h-[320px] w-full object-cover md:h-[520px]"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/videos/izzofilm.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-black/10" />

        <div className="absolute bottom-0 left-0 p-6 md:p-8">
          <p className="text-[11px] uppercase tracking-[0.25em] text-white/70">
            espresso • por izzo
          </p>
          <p className="mt-3 max-w-md text-sm leading-7 text-white/90 md:text-base">
            uma travessia entre terra, torra e presença.
          </p>
        </div>
      </div>
    </section>
    
    
    
  );
}
