// src/components/ContactUs.jsx

import "../app/globals.css";

export default function ContactUs() {
    return (
        <div className="flex flex-col items-center justify-center px-4">
            <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
            <p className="text-gray-600 text-lg mb-2">
                For any inquiries or feedback, please contact us at:
            </p>
            <p className="text-gray-600 text-lg mb-2">
                Email: <a href="mailto:goodshepherdim@gmail.com">goodshepherdim@gmail.com</a>
            </p>
            <p className="text-gray-600 text-lg mb-4">
                Phone: <a href="tel:+919884556997">+91 98845 56997</a>
            </p>
        </div>
    );
}
