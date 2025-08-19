import {
  type ChatExport,
  ChatPdfTemplate,
  renderToBuffer,
} from "@midday/chat-pdf";
import { createClient } from "@midday/supabase/job";

const supabase = createClient();

export async function exportChatPdfJob(payload: {
  chatId: string;
  teamId: string;
  title?: string;
}) {
  const data: ChatExport = await getChatExport(payload.chatId);

  const buffer = await renderToBuffer(await ChatPdfTemplate(data));

  const filename = `${data.title || data.sessionId || "chat"}.pdf`;
  const fullPath = `${payload.teamId}/chats/${filename}`;
  const { error } = await supabase.storage
    .from("vault")
    .upload(fullPath, buffer, {
      contentType: "application/pdf",
      upsert: true,
    });
  if (error) throw error;

  await notifyWhenReady({ fullPath, filename });
}

async function getChatExport(chatId: string): Promise<ChatExport> {
  throw new Error("Implement getChatExport");
}
async function notifyWhenReady(_: { fullPath: string; filename: string }) {}
