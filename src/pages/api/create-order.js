// import Razorpay from 'razorpay';

// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// export default async function handler(req, res) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ message: 'Method not allowed' });
//   }

//   const { amount } = req.body;

//   try {
//     const options = {
//       amount, // Amount in paise
//       currency: 'INR',
//       receipt: `receipt_${Date.now()}`,
//     };

//     const order = await razorpay.orders.create(options);
//     return res.status(200).json({ order_id: order.id });
//   } catch (error) {
//     console.error('Order creation error:', error);
//     return res.status(500).json({ message: 'Failed to create order' });
//   }
// }