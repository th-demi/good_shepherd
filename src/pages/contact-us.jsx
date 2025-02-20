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

            {/* Terms and Conditions Section */}
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

            {/* Cancellation and Refunds Section */}
            <div className="mt-8 w-full max-w-lg text-gray-700">
                <h2 className="text-2xl font-semibold mb-4">Cancellation and Refunds</h2>
                <div className="text-lg">
                    <p>We understand that plans can change. Please refer to the following cancellation and refund policies:</p>
                    <ul className="list-disc pl-5 mt-2">
                        <li>Refunds will be provided for cancellations made at least 7 days before the course start date.</li>
                        <li>Cancellations made within 7 days of the course start date will not be eligible for a refund.</li>
                        <li>In case of unavoidable circumstances, we may offer rescheduling options for missed classes.</li>
                    </ul>
                </div>
            </div>

            {/* Privacy Policies Section */}
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
        </div>
    );
}

// Add , TandC, Cancellation and refunds, privacy policies