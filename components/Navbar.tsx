"use client";

type NavbarProps = {
  cartCount: number;
  onOpenBlend: () => void;
  onOpenCart: () => void;
};

export default function Navbar({
  cartCount,
  onOpenBlend,
  onOpenCart,
}: NavbarProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="fixed inset-x-0 top-[33px] z-50 border-b border-[#e5e2df] bg-[#ecebea]/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <button
          onClick={scrollToTop}
          className="text-sm uppercase tracking-[0.35em] text-[#1f1d1a]"
        >
          elyra
        </button>

        <nav className="hidden items-center gap-6 md:flex">
          <button
            onClick={() => scrollToSection("colecoes")}
            className="text-xs uppercase tracking-[0.2em] text-[#6f6963] transition hover:text-black"
          >
            coleções
          </button>
          <button
            onClick={() => scrollToSection("beneficios")}
            className="text-xs uppercase tracking-[0.2em] text-[#6f6963] transition hover:text-black"
          >
            benefícios
          </button>
          <button
            onClick={() => scrollToSection("assinaturas")}
            className="text-xs uppercase tracking-[0.2em] text-[#6f6963] transition hover:text-black"
          >
            assinaturas
          </button>
          <button
            onClick={() => scrollToSection("cafes")}
            className="text-xs uppercase tracking-[0.2em] text-[#6f6963] transition hover:text-black"
          >
            cafés
          </button>
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenBlend}
            className="rounded-full border border-[#cfcac7] bg-white px-4 py-2 text-xs uppercase tracking-[0.12em] text-[#1f1d1a] transition hover:bg-black hover:text-white"
          >
            criar blend
          </button>

          <button
            onClick={onOpenCart}
            className="rounded-full border border-[#cfcac7] bg-white px-4 py-2 text-xs uppercase tracking-[0.12em] text-[#1f1d1a] transition hover:bg-black hover:text-white"
          >
            carrinho {cartCount > 0 ? `(${cartCount})` : ""}
          </button>
        </div>
      </div>
    </header>
  );
}