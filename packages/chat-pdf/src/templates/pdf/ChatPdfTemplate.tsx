import {
  Document,
  Font,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import React from "react";
import { QRCodeUtil } from "../../qrcode-util";
import type { ChatExport } from "../../types";
import { Footer } from "./parts/Footer";
import { Header } from "./parts/Header";
import { Message } from "./parts/Message";
import { Meta } from "./parts/Meta";

const THAI_REG = process.env.NEXT_PUBLIC_THAI_FONT_REGULAR_URL;
const THAI_BLD = process.env.NEXT_PUBLIC_THAI_FONT_BOLD_URL;

let fontsEnsured = false;
function ensureFonts() {
  if (fontsEnsured) return;
  if (THAI_REG && THAI_BLD) {
    try {
      Font.register({
        family: "NotoSansThai",
        fonts: [
          { src: THAI_REG, fontWeight: "normal" },
          { src: THAI_BLD, fontWeight: "bold" },
        ],
      });
    } catch (e) {
      console.warn("[ChatPdfTemplate] Thai font register failed, fallback.", e);
    }
  }
  fontsEnsured = true;
}

const styles = StyleSheet.create({
  page: {
    paddingTop: 56,
    paddingBottom: 56,
    paddingHorizontal: 48,
    fontSize: 12,
    lineHeight: 1.4,
    fontFamily: THAI_REG && THAI_BLD ? "NotoSansThai" : undefined,
  },
  body: { marginTop: 10 },
  qrWrap: { marginTop: 12, width: 120 },
  qr: { width: 120, height: 120 },
});

export async function ChatPdfTemplate(data: ChatExport) {
  ensureFonts();

  let qrData: string | null = null;
  if (data.template?.includeQr && data.token) {
    const url = `https://app.example.com/chat/${data.token}`;
    qrData = await QRCodeUtil.toDataURL(url, { width: 120, margin: 0 });
  }

  return (
    <Document
      author={data.brand?.name || ""}
      title={data.title || "Chat Transcript"}
    >
      <Page
        wrap
        size={(data.template?.size || "A4") as "A4" | "LETTER"}
        style={styles.page}
      >
        <Header brand={data.brand} title={data.title} />
        <Meta sessionId={data.sessionId} generatedAt={data.generatedAt} />

        <View style={styles.body}>
          {data.messages?.map((m) => (
            <Message key={m.id} m={m} />
          ))}
          {qrData ? (
            <View style={styles.qrWrap}>
              <Image src={qrData} style={styles.qr} />
            </View>
          ) : null}
        </View>

        <Footer brandName={data.brand?.name} />
      </Page>
    </Document>
  );
}
