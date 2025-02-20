// src/components/CancellationsAndRefunds.jsx

import "../app/globals.css";

export default function CancellationsAndRefunds() {
    return (
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
    );
}
