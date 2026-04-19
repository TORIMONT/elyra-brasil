"use client";

export default function TopBar() {
  return (
    <div className="fixed inset-x-0 top-0 z-[60] overflow-hidden border-b border-[#e5e2df] bg-[#f6f4f1]">
      <div className="animate-marquee whitespace-nowrap py-2 text-center text-[11px] uppercase tracking-[0.28em] text-[#6f6963]">
        <span className="mx-8">entrega em até 24 horas na capital paulista</span>
        <span className="mx-8">chás autorais • cafés • cápsulas compatíveis</span>
        <span className="mx-8">experiência elyra — da origem ao ritual</span>
        <span className="mx-8">entrega em até 24 horas na capital paulista</span>
        <span className="mx-8">chás autorais • cafés • cápsulas compatíveis</span>
        <span className="mx-8">experiência elyra — da origem ao ritual</span>
      </div>

      <div className="pointer-events-none absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-[#f6f4f1] to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-[#f6f4f1] to-transparent" />
    </div>
  );
}