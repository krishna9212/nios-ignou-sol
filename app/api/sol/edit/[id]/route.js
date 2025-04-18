import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { connectDB } from '@/app/lib/mongodb';
import { ObjectId } from 'mongodb';
import Assignment from '@/app/lib/models/SOLAssignment';

// GET - Fetch assignment by ID
export async function GET(req, { params }) {
  const { id } = params;

  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ error: 'Invalid ID format' }, { status: 400 });
  }

  try {
    await connectDB();
    const assignment = await mongoose.connection.db
      .collection('solassignments')
      .findOne({ _id: new ObjectId(id) });

    if (!assignment) {
      return NextResponse.json({ error: 'Assignment not found' }, { status: 404 });
    }

    return NextResponse.json(assignment, { status: 200 });
  } catch (err) {
    console.error('Error fetching assignment:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// POST - Create new assignment
export async function POST(req) {
  try {
    const body = await req.json();

    // Basic validation of body fields
    if (!body.name || !body.description || !body.actualPrice || !body.price || !body.document?.link || !body.document?.fileName) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await connectDB();

    const assignment = new Assignment(body);
    await assignment.save();

    return NextResponse.json({ success: true, message: 'Assignment created successfully!' }, { status: 201 });
  } catch (error) {
    console.error('Error creating assignment:', error);
    return NextResponse.json({ success: false, message: 'Failed to create assignment' }, { status: 500 });
  }
}

// PUT - Update existing assignment
export async function PUT(req, context) {
  const { id } = await context.params;

  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ error: 'Invalid ID format' }, { status: 400 });
  }

  try {
    const body = await req.json();

    // Ensure the required fields for the document are present
    if (!body.document || !body.document.link || !body.document.fileName) {
      return NextResponse.json({ error: 'Document link and file name are required' }, { status: 400 });
    }

    await connectDB();

    // Update the document link and fileName while ensuring no conflicts
    const result = await mongoose.connection.db
      .collection('ignouassignments')
      .findOneAndUpdate(
        { _id: new ObjectId(id) },
        {
          $set: {
            name: body.name,
            description: body.description,
            actualPrice: body.actualPrice,
            price: body.price,
            hasPractical: body.hasPractical,
            language: body.language,
            'document.link': body.document.link,
            'document.fileName': body.document.fileName || '', // Default empty string if fileName is not provided
          },
        },
        { returnDocument: 'after' }
      );

    if (!result || !result.value) {
      return NextResponse.json({ error: 'Assignment not found or no update performed' }, { status: 404 });
    }

    return NextResponse.json(result.value, { status: 200 });
  } catch (err) {
    console.error('Error updating assignment:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
