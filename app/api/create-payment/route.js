import Razorpay from 'razorpay';
import { NextResponse } from 'next/server';

// CORS Preflight handler
export async function OPTIONS() {
  const headers = new Headers({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  });
  return new NextResponse(null, { status: 204, headers });
}

// Handle Razorpay order creation
export async function POST(req) {
  try {
    const { amount, currency } = await req.json();

    if (!amount || !currency) {
      return NextResponse.json(
        { error: 'Amount and currency are required.' },
        { status: 400 }
      );
    }

    const razorpayKeyId = process.env.RAZORPAY_KEY_ID;
    const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!razorpayKeyId || !razorpayKeySecret) {
      console.error('❌ Missing Razorpay keys in environment');
      return NextResponse.json(
        { error: 'Server configuration error.' },
        { status: 500 }
      );
    }

    const razorpay = new Razorpay({
      key_id: razorpayKeyId,
      key_secret: razorpayKeySecret,
    });

    const order = await razorpay.orders.create({
      amount,
      currency,
    });

    return NextResponse.json(order, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    console.error('❌ Error creating Razorpay order:', error);
    return NextResponse.json(
      { error: 'Failed to create Razorpay order', details: error.message },
      { status: 500 }
    );
  }
}
