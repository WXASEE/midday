import * as QRCode from "qrcode";

export const QRCodeUtil = {
  toDataURL: async (text: string, opts?: QRCode.QRCodeToDataURLOptions) =>
    QRCode.toDataURL(text, { margin: 0, width: 120, ...opts }),
};
