import { Image, StyleSheet, Text, View } from "@react-pdf/renderer";
import type { Brand } from "../../../types";

const styles = StyleSheet.create({
  wrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  brandRow: { flexDirection: "row", gap: 8, alignItems: "center" },
  logo: { width: 20, height: 20 },
  brandName: { fontSize: 11 },
  title: { fontSize: 16, fontWeight: 700 as any },
});

export function Header({ brand, title }: { brand?: Brand; title?: string }) {
  return (
    <View style={styles.wrap} fixed>
      <View style={styles.brandRow}>
        {brand?.logoUrl ? (
          <Image src={brand.logoUrl} style={styles.logo} />
        ) : null}
        <Text style={styles.brandName}>{brand?.name || ""}</Text>
      </View>
      <Text style={styles.title}>{title || "Chat Transcript"}</Text>
    </View>
  );
}
