import { useState } from "react";
import { QrReader } from "react-qr-reader";

function Product() {
    const [result, setResult] = useState("No result");

    return (
        <div>
            <QrReader
                constraints={{ facingMode: "environment" }}
                onResult={(res, err) => {
                    if (res) setResult(res.text);
                }}
                style={{ width: "100%" }}
            />
            <div>Result: {result}</div>
        </div>
    );
}

export default Product;