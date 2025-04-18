import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { connectDB } from '@/app/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(req, { params }) {
  // Await the params before destructuring
  const { id } = await params;

  // Validate ObjectId
  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ error: 'Invalid ID format' }, { status: 400 });
  }

  try {
    await connectDB();

    const assignment = await mongoose.connection.db
      .collection('nios10assignments')
      .findOne({ _id: new ObjectId(id) });

    if (!assignment) {
      return NextResponse.json({ error: 'Assignment not found' }, { status: 404 });
    }

    return NextResponse.json(assignment, { status: 200 });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
