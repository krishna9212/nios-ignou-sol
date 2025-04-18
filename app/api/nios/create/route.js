import { NextResponse } from 'next/server';
import { connectDB } from '@/app/lib/mongodb';
import Assignment from '@/app/lib/models/NIOS10Assignment';

export async function POST(req) {
  try {
    const body = await req.json();
    await connectDB();

    // Create the assignment document
    const assignment = new Assignment({
      name: body.name,
      description: body.description,
      actualPrice: body.actualPrice,
      price: body.price,
      hasPractical: body.hasPractical,
      language: body.language,
      document: {
        link: body.document.link,    // Store the Google Drive link
        fileName: body.document.fileName,  // Store the filename
      },
    });

    // Save the assignment in the database
    await assignment.save();

    // Respond with success
    return NextResponse.json(
      { success: true, message: 'Assignment created successfully!' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating assignment:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create assignment' },
      { status: 500 }
    );
  }
}
