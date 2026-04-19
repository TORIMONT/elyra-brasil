import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const mpRes = await fetch(
      "https://api.mercadopago.com/checkout/preferences",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.MERCADO_PAGO_ACCESS_TOKEN}`,
        },
        body: JSON.stringify({
          items: body.items.map((item: any) => ({
            title: String(item.name || "Produto"),
            quantity: Number(item.quantity || 1),
            unit_price: Number(item.price || 1),
            currency_id: "BRL",
          })),
        }),
      }
    );

    // 🔥 DEBUG REAL (NÃO REMOVE)
    const text = await mpRes.text();
    console.log("MP RAW:", text);

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      throw new Error("Resposta inválida do Mercado Pago");
    }

    // 🔥 VALIDAÇÃO FORTE
    if (!mpRes.ok) {
      throw new Error(data?.message || "Erro na API do Mercado Pago");
    }

    const url =
      data.init_point ||
      data.sandbox_init_point ||
      data.response?.init_point;

    if (!url) {
      throw new Error("Mercado Pago não retornou URL");
    }

    return NextResponse.json({ url });

  } catch (error: any) {
    console.error("ERRO CHECKOUT FINAL:", error);

    return NextResponse.json(
      { error: error.message || "Erro no checkout" },
      { status: 500 }
    );
  }
}