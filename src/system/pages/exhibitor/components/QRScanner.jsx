import React from 'react';
import { QrReader } from 'react-qr-reader';

function QRScanner({ onScan, onError }) {
    return (
        <div className="w-full max-w-md mx-auto mt-8 p-6 bg-white rounded-2xl shadow-lg">
            <h2 className="text-xl font-semibold text-center mb-4 text-gray-800">Scan QR Code</h2>
            <div className="overflow-hidden rounded-lg border border-gray-300">
                <QrReader
                    constraints={{ facingMode: 'environment' }}
                    onResult={(result, error) => {
                        if (result?.text) onScan(result.text);
                        if (error) onError(error);
                    }}
                    containerStyle={{ width: '50%' }}
                    videoStyle={{ width: '50%' }}
                />
            </div>
            <p className="mt-4 text-center text-sm text-gray-500">
                Hold your camera steady over the QR code to scan.
            </p>
        </div>
    );
}

export default QRScanner;
