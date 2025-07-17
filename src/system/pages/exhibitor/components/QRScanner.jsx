import React from 'react';
import { QrReader } from 'react-qr-reader';

function QRScanner({ onScan, onError }) {
    return (
        <div style={{ width: '300px', margin: '20px auto' }}>
            <h3>Scan QR Code</h3>
            <QrReader
                onResult={(result, error) => {
                    if (!!result) {
                        onScan(result?.text);
                    }
                    if (!!error) {
                        onError(error);
                    }
                }}
                constraints={{ facingMode: 'environment' }} // Use back camera
            />
            <p>Scan a user's QR code...</p>
        </div>
    );
}

export default QRScanner;