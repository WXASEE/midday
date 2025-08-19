import { StyleSheet, Text, View } from "@react-pdf/renderer";

const st = StyleSheet.create({
  wrap: {
    position: "absolute",
    bottom: 24,
    left: 48,
    right: 48,
    fontSize: 10,
    color: "#666",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export function Footer({ brandName }: { brandName?: string }) {
  return (
    <View style={st.wrap} fixed>
      <Text>{brandName || ""}</Text>
      <Text
        render={({ pageNumber, totalPages }) =>
          `หน้า ${pageNumber}/${totalPages}`
        }
      />
    </View>
  );
}
