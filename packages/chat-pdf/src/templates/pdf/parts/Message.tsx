import { StyleSheet, Text, View } from "@react-pdf/renderer";
import type { ChatMessage } from "../../../types";

const st = StyleSheet.create({
  row: { marginTop: 8, padding: 8, borderRadius: 6 },
  user: { backgroundColor: "#eef7ff", border: "1 solid #cfe8ff" },
  assistant: { backgroundColor: "#f6f6f6", border: "1 solid #e6e6e6" },
  system: { backgroundColor: "#fff7e6", border: "1 solid #ffe6b3" },
  tool: { backgroundColor: "#f4f0ff", border: "1 solid #e1d8ff" },
  head: { fontSize: 10, color: "#666", marginBottom: 4 },
  text: { fontSize: 12, lineHeight: 1.45, whiteSpace: "pre-wrap" as any },
});

export function Message({ m }: { m: ChatMessage }) {
  const cls =
    m.role === "user"
      ? st.user
      : m.role === "assistant"
        ? st.assistant
        : m.role === "system"
          ? st.system
          : st.tool;

  return (
    <View style={[st.row, cls]}>
      <Text style={st.head}>
        {m.role.toUpperCase()} {m.time ? `• ${m.time}` : ""}
      </Text>
      <Text style={st.text}>{m.text}</Text>
    </View>
  );
}
