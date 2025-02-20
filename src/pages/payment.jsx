import '../app/globals.css';
// 'use client';
// import React, { useState } from 'react';
// import axios from 'axios';
// import Script from 'next/script';
// import '../app/globals.css';

// const PaymentPage = () => {
//   const [name, setName] = useState('');
//   const [selectedClasses, setSelectedClasses] = useState([]);
//   const [totalAmount, setTotalAmount] = useState(0);
//   const [paymentStatus, setPaymentStatus] = useState('');

//   const classes = [
//     'Piano',
//     'Keyboard',
//     'Guitar',
//     'Violin',
//     'Drums',
//     'Recorder',
//     'Ukulele',
//     'Classical Vocals',
//     'Western Vocals',
//     'Dance',
//     'Other',
//   ];

//   const classCost = 2500;

//   const handleClassSelection = (className) => {
//     if (selectedClasses.includes(className)) {
//       setSelectedClasses(selectedClasses.filter((c) => c !== className));
//       setTotalAmount(totalAmount - classCost);
//     } else {
//       setSelectedClasses([...selectedClasses, className]);
//       setTotalAmount(totalAmount + classCost);
//     }
//   };

//   const loadRazorpayScript = () => {
//     return new Promise((resolve) => {
//       const script = document.createElement('script');
//       script.src = 'https://checkout.razorpay.com/v1/checkout.js';
//       script.onload = () => resolve(true);
//       script.onerror = () => resolve(false);
//       document.body.appendChild(script);
//     });
//   };

//   const initiatePayment = async () => {
//     if (!name || selectedClasses.length === 0) {
//       alert('Please enter your name and select at least one class.');
//       return;
//     }

//     const isRazorpayLoaded = await loadRazorpayScript();

//     if (!isRazorpayLoaded) {
//       alert('Failed to load payment gateway. Please try again.');
//       return;
//     }

//     try {
//       const response = await axios.post('/api/create-order', {
//         amount: totalAmount * 100, // Amount in paise
//       });

//       const { order_id } = response.data;

//       const options = {
//         key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Public key from Razorpay dashboard
//         amount: totalAmount * 100,
//         currency: 'INR',
//         name: 'Music School',
//         description: `Payment for ${selectedClasses.join(', ')}`,
//         order_id,
//         handler: async (response) => {
//           try {
//             const verifyResponse = await axios.post('/api/verify-payment', response);
//             if (verifyResponse.data.success) {
//               setPaymentStatus('Payment Successful!');
//             } else {
//               setPaymentStatus('Payment Verification Failed.');
//             }
//           } catch (err) {
//             console.error('Verification error:', err);
//             setPaymentStatus('Payment Verification Error.');
//           }
//         },
//         prefill: {
//           name,
//         },
//         theme: {
//           color: '#3B82F6',
//         },
//       };

//       const rzp = new window.Razorpay(options);
//       rzp.open();
//     } catch (error) {
//       console.error('Error initiating payment:', error);
//       setPaymentStatus('Error initiating payment.');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
//       <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
//       <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">
//         <h1 className="text-2xl font-bold text-center mb-6">Enroll in Music Classes</h1>

//         {/* Name Input */}
//         <div className="mb-6">
//           <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
//           <input
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             placeholder="Enter your name"
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
//         </div>

//         {/* Class Selection */}
//         <div className="mb-6">
//           <label className="block text-sm font-medium text-gray-700 mb-2">Select Classes</label>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//             {classes.map((className, index) => (
//               <button
//                 key={index}
//                 onClick={() => handleClassSelection(className)}
//                 className={`p-4 border rounded-lg text-center transition-all duration-200 ${
//                   selectedClasses.includes(className)
//                     ? 'bg-blue-500 text-white border-blue-500'
//                     : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
//                 }`}
//               >
//                 {className}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Total Amount */}
//         <div className="mb-6">
//           <p className="text-lg font-semibold text-gray-700">
//             Total Amount: <span className="text-blue-500">₹{totalAmount}</span>
//           </p>
//         </div>

//         {/* Payment Button */}
//         <div className="text-center mb-4">
//           <button
//             onClick={initiatePayment}
//             className="px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-all duration-200"
//           >
//             Pay via Razorpay
//           </button>
//         </div>

//         {/* Payment Status */}
//         {paymentStatus && (
//           <p className="text-center text-lg font-semibold mt-4">
//             {paymentStatus}
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PaymentPage;

export default function PaymentPage() {
    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">
                <h1 className="text-2xl font-bold text-center mb-6">Enroll in Music Classes</h1>
                <p className="text-lg font-semibold text-gray-700">
                    Payment is currently disabled, please contact the admin for more details.
                </p>
            </div>
        </div>
    );
}