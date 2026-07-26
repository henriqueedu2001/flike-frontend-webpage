"use client";

import { useState } from "react";
import QRCode from "qrcode";

import { getDigitalKeyByKeyId } from "@/services/digitalKey.service";

// The backend returns `payload` as a human-readable, space/newline separated
// hex dump (e.g. "00 00 ... 43 "). The physical lock scans the raw bytes, so
// we parse the hex pairs back into a byte array. This must be encoded as a QR
// "byte" segment (not a plain string) — passing a string through the default
// text mode re-encodes it as UTF-8, which corrupts any byte >= 0x80.
function hexPayloadToBytes(payload: string): Uint8Array {
  const bytes = payload
    .split(/\s+/)
    .filter(Boolean)
    .map((hex) => {
      const byte = parseInt(hex, 16);

      if (Number.isNaN(byte)) {
        throw new Error(`Payload inválido: "${hex}" não é um byte hexadecimal.`);
      }

      return byte;
    });

  return Uint8Array.from(bytes);
}

export function useKeyQrCode() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);

  async function openForKey(keyId: number) {
    setIsOpen(true);
    setLoading(true);
    setError("");
    setQrDataUrl(null);

    try {
      const key = await getDigitalKeyByKeyId(keyId);
      const bytes = hexPayloadToBytes(key.payload);

      const dataUrl = await QRCode.toDataURL(
        [{ data: bytes, mode: "byte" }],
        { width: 260, margin: 1 }
      );

      setQrDataUrl(dataUrl);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erro ao gerar QR Code da chave."
      );
    } finally {
      setLoading(false);
    }
  }

  function close() {
    setIsOpen(false);
  }

  return { isOpen, loading, error, qrDataUrl, openForKey, close };
}
