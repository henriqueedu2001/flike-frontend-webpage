"use client";

interface Props {
  isOpen: boolean;
  loading: boolean;
  error: string;
  qrDataUrl: string | null;
  onClose: () => void;
}

export default function QrCodeModal({
  isOpen,
  loading,
  error,
  qrDataUrl,
  onClose,
}: Props) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">Chave de Acesso</h2>

        {loading && <p>Gerando QR Code...</p>}

        {!loading && error && <p style={{ color: "red" }}>{error}</p>}

        {!loading && !error && qrDataUrl && (
          <div className="qr-code-wrapper">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={qrDataUrl}
              alt="QR Code de acesso"
              width={260}
              height={260}
            />
          </div>
        )}

        <div className="modal-actions">
          <button className="modal-save" onClick={onClose}>
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
