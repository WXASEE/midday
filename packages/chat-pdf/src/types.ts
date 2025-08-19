export type ChatMessage = {
  id: string;
  role: "user" | "assistant" | "system" | "tool";
  text: string;
  time?: string;
};

export type Brand = { name?: string; logoUrl?: string | null };

export type TemplateOptions = {
  size?: "A4" | "LETTER";
  includeQr?: boolean;
};

export type ChatExport = {
  title?: string;
  brand?: Brand;
  generatedAt?: string;
  sessionId?: string;
  token?: string;
  messages: ChatMessage[];
  template?: TemplateOptions;
};
