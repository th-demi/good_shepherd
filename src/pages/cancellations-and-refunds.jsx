// src/components/CancellationsAndRefunds.jsx

import "../app/globals.css";

export default function CancellationsAndRefunds() {
    return (
        <div className="mt-8 w-full max-w-lg text-gray-700">
            <h2 className="text-2xl font-semibold mb-4">Cancellations and Refunds</h2>
            <div className="text-lg">
                <h3 className="text-xl font-semibold mt-4">Returns</h3>
                <p>Our policy lasts 30 days. If 30 days have gone by since your purchase, unfortunately, we can’t offer you a refund or exchange.</p>
                <p>To be eligible for a return, your item must be unused and in the same condition that you received it. It must also be in the original packaging.</p>
                
                <h3 className="text-xl font-semibold mt-4">Non-returnable Items</h3>
                <ul className="list-disc pl-5 mt-2">
                    <li>Perishable goods such as food, flowers, newspapers, or magazines</li>
                    <li>Intimate or sanitary goods</li>
                    <li>Hazardous materials, or flammable liquids or gases</li>
                    <li>Gift cards</li>
                    <li>Downloadable software products</li>
                    <li>Some health and personal care items</li>
                </ul>

                <h3 className="text-xl font-semibold mt-4">Refunds</h3>
                <p>Once your return is received and inspected, we will notify you by email regarding the approval or rejection of your refund.</p>
                <p>If approved, your refund will be processed, and a credit will be applied to your credit card or original method of payment within a certain number of days.</p>

                <h3 className="text-xl font-semibold mt-4">Late or Missing Refunds</h3>
                <p>If you haven’t received a refund yet, please:</p>
                <ul className="list-disc pl-5 mt-2">
                    <li>Check your bank account again.</li>
                    <li>Contact your credit card company; it may take some time before your refund is officially posted.</li>
                    <li>Contact your bank; there may be some processing time before the refund is posted.</li>
                    <li>If you've done all of this and still have not received your refund, contact us at <a href="mailto:goodshepherdim@gmail.com" className="text-blue-500">goodshepherdim@gmail.com</a></li>
                </ul>

                <h3 className="text-xl font-semibold mt-4">Sale Items</h3>
                <p>Only regular priced items may be refunded; sale items cannot be refunded.</p>

                <h3 className="text-xl font-semibold mt-4">Exchanges</h3>
                <p>We only replace items if they are defective or damaged. If you need to exchange it for the same item, email us at <a href="mailto:goodshepherdim@gmail.com" className="text-blue-500">goodshepherdim@gmail.com</a> and send the item to: 622 Manglam Electronic Market, Jaipur, Rajasthan, India 302001.</p>

                <h3 className="text-xl font-semibold mt-4">Shipping</h3>
                <p>You are responsible for paying your own shipping costs for returning your item. Shipping costs are non-refundable. If you receive a refund, the return shipping cost will be deducted from your refund.</p>
                <p>Depending on your location, the time it may take for your exchanged product to reach you may vary.</p>
                <p>If you are shipping an item over $75, you should consider using a trackable shipping service or purchasing shipping insurance, as we do not guarantee that we will receive your returned item.</p>
            </div>
        </div>
    );
}
