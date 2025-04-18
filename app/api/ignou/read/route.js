import { connectDB } from '@/app/lib/mongodb';
import Assignment from '@/app/lib/models/IGNOUAssignment';
import { NextResponse } from 'next/server'; // Correct import for sending response

export async function GET(req) {
  await connectDB(); // Ensure you're connected to the database

  try {
    const assignments = await Assignment.find(); // Fetch all assignments from the database
    return NextResponse.json(assignments); // Send assignments as JSON response
  } catch (err) {
    console.error(err); // Log the error for debugging
    return NextResponse.json(
      { message: 'Error fetching assignments' },
      { status: 500 }
    ); // Return a 500 error if fetching fails
  }
}
