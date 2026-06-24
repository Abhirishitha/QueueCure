import { QRCodeCanvas }
from "qrcode.react";

const TokenQRCode = ({
  token,
}) => {
  return (
    <div className="bg-white p-6 rounded-3xl shadow">

      <h2 className="text-xl font-bold mb-4">
        Track Your Queue
      </h2>

      <QRCodeCanvas
        value={`http://localhost:5173/patient?token=${token}`}
        size={200}
      />

    </div>
  );
};

export default TokenQRCode;