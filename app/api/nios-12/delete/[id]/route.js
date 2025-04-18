// File: /app/api/nios/edit/[id]/route.js or route.ts

import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { connectDB } from '@/app/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function DELETE(req, { params }) {
  const { id } = params;

  // Validate ObjectId
  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ error: 'Invalid ID format' }, { status: 400 });
  }

  try {
    await connectDB();

    const result = await mongoose.connection.db
      .collection('nios12assignments')
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Assignment not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Assignment deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
