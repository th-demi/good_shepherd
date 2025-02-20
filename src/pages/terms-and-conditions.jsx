// src/components/TermsAndConditions.jsx

import "../app/globals.css";

export default function TermsAndConditions() {
    return (
        <div className="mt-8 w-full max-w-lg text-gray-700">
            <h2 className="text-2xl font-semibold mb-4">Terms and Conditions</h2>
            <div className="text-lg">
                <p>By using our services, you agree to the following terms and conditions:</p>
                <ul className="list-disc pl-5 mt-2">
                    <li>Classes are subject to availability.</li>
                    <li>Payment must be made in advance for course enrollment.</li>
                    <li>Any changes or cancellations to the course schedule must be communicated in advance.</li>
                </ul>
            </div>
        </div>
    );
}
