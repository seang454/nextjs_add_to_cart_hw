// app/page.tsx
'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import QRCode from 'qrcode';

export default function Qr() {
  const [amount, setAmount] = useState<number>(1300000);
  const [qrUrl, setQrUrl] = useState<string | null>(null);
  const bakongLink = `https://bakong.page.link/jSGMGSWfSxLWtzcF8?amount=${amount}`;

  useEffect(() => {
    QRCode.toDataURL(bakongLink)
      .then(setQrUrl)
      .catch(console.error);
  }, [bakongLink]);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50 text-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Pay with Bakong</h1>

      {/* Static image from public/image */}
      <div className="mb-6">
        <Image
          src="/image/KHQR Logo.png"
          alt="KHR Logo"
          width={120}
          height={40}
          className="mx-auto mb-2"
        />
      </div>

      <div className="mb-6 w-full max-w-xs mx-auto">
        <label htmlFor="amount" className="block text-gray-700 font-medium mb-2">Amount (KHR)</label>
        <input
          id="amount"
          type="number"
          min={0}
          value={amount}
          onChange={e => setAmount(Number(e.target.value))}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4 text-xl font-semibold text-gray-800">Amount: {amount.toLocaleString()} KHR</div>

      <a
        href={bakongLink}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full text-lg mb-6"
      >
        Pay Now
      </a>

      <p className="text-gray-600 mb-2">or scan QR code:</p>

      {qrUrl ? (
        <Image
          src={qrUrl}
          alt="Bakong QR Code"
          width={200}
          height={200}
          className="rounded-lg shadow-md"
        />
      ) : (
        <p>Loading QR Code...</p>
      )}
    </main>
  );
}
