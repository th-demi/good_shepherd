// src/components/PrivacyPolicy.jsx

import "../app/globals.css";

export default function PrivacyPolicy() {
    return (
        <div className="mt-8 w-full max-w-lg text-gray-700">
            <h2 className="text-2xl font-semibold mb-4">Privacy Policy</h2>
            <div className="text-lg">
                <p>Your privacy is important to us. Here’s how we handle your personal information:</p>
                <ul className="list-disc pl-5 mt-2">
                    <li>We collect personal details only for the purpose of class enrollment and communication.</li>
                    <li>Your information is stored securely and will not be shared with third parties without your consent.</li>
                    <li>We use cookies to improve your experience on our site. You can manage cookie settings in your browser.</li>
                </ul>
            </div>
        </div>
    );
}
