export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

import { type ChatExport, ChatPdfTemplate } from "@midday/chat-pdf";
import { renderToBuffer } from "@react-pdf/renderer";
import type { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const payload: ChatExport = await req.json();
    const buffer = await renderToBuffer(await ChatPdfTemplate(payload));
    return new Response(buffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="chat.pdf"',
        "Cache-Control": "no-store",
      },
    });
  } catch (err: any) {
    console.error("[POST /export/chat.pdf] Error:", err);
    return new Response(
      JSON.stringify({
        error: "export_failed",
        message: String(err?.message || err),
      }),
      {
        status: 500,
        headers: { "content-type": "application/json" },
      },
    );
  }
}
