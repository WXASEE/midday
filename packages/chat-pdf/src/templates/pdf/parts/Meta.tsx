import { StyleSheet, Text, View } from "@react-pdf/renderer";

const st = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
    fontSize: 10,
    color: "#666",
  },
});

export function Meta({
  sessionId,
  generatedAt,
}: {
  sessionId?: string;
  generatedAt?: string;
}) {
  const ts = generatedAt ? new Date(generatedAt).toLocaleString() : "";
  return (
    <View style={st.row}>
      <Text>Session: {sessionId || "-"}</Text>
      <Text>Generated: {ts}</Text>
    </View>
  );
}
