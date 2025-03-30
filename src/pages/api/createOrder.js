import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { amount, currency, receipt } = req.body;

    try {
      const order = await razorpay.orders.create({
        amount,
        currency,
        receipt,
      });

      res.status(200).json(order);
    } catch (error) {
      console.error('Error creating Razorpay order:', error);
      res.status(500).json({ error: 'Failed to create order' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}