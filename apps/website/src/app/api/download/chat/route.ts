export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

import { type ChatExport, ChatPdfTemplate } from "@midday/chat-pdf";
import { renderToStream } from "@react-pdf/renderer";
import type { NextRequest } from "next/server";

async function fetchChatById(id: string): Promise<ChatExport> {
  throw new Error("Implement fetchChatById");
}
async function fetchChatByToken(token: string): Promise<ChatExport> {
  throw new Error("Implement fetchChatByToken");
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const token = searchParams.get("token");
    const preview = searchParams.get("preview") === "1";

    let data: ChatExport | null = null;
    if (id) data = await fetchChatById(id);
    else if (token) data = await fetchChatByToken(token);
    else
      return new Response(JSON.stringify({ error: "missing id or token" }), {
        status: 400,
      });

    const stream = await renderToStream(await ChatPdfTemplate(data));
    const blob = await new Response(stream).blob();

    const headers: Record<string, string> = {
      "Content-Type": "application/pdf",
      "Cache-Control": "no-store, max-age=0",
      "Content-Disposition": preview
        ? "inline"
        : `attachment; filename="${data.title || data.sessionId || "chat"}.pdf"`,
    };

    return new Response(blob, { headers });
  } catch (err: any) {
    console.error("[GET /api/download/chat] Error:", err);
    return new Response(
      JSON.stringify({
        error: "download_failed",
        message: String(err?.message || err),
      }),
      {
        status: 500,
        headers: { "content-type": "application/json" },
      },
    );
  }
}
