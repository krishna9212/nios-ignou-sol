import crypto from 'crypto';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { razorpayPaymentId, razorpayOrderId, razorpaySignature } = req.body;

    const secret = process.env.RAZORPAY_KEY_SECRET; // Your Razorpay secret key
    const body = `${razorpayOrderId}|${razorpayPaymentId}`;
    const generatedSignature = crypto
      .createHmac('sha256', secret)
      .update(body)
      .digest('hex');

    if (generatedSignature === razorpaySignature) {
      res.status(200).json({ success: true });
    } else {
      res.status(400).json({ success: false, error: 'Signature verification failed.' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
