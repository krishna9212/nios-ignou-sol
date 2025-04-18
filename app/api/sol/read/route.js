import { connectDB } from '@/app/lib/mongodb';
import Assignment from '@/app/lib/models/SOLAssignment';
import { NextResponse } from 'next/server'; // Correct import for sending response
export async function GET(req) {
  await connectDB();
  try {
    const assignments = await Assignment.find();
    return NextResponse.json(assignments);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: 'Error fetching assignments' },
      { status: 500 }
    );
  }
}

