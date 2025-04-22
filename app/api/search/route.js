import { connectDB } from "@/app/lib/mongodb";
import IGNOUAssignment from "@/app/lib/models/IGNOUAssignment";
import SOLAssignment from "@/app/lib/models/SOLAssignment";
import NIOS10Assignment from "@/app/lib/models/NIOS10Assignment";
import NIOS12Assignment from "@/app/lib/models/NIOS12Assignment";
import { NextResponse } from 'next/server';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name");

  if (!name) {
    return NextResponse.json({ error: "Please provide a name to search" }, { status: 400 });
  }

  const query = { name: { $regex: `^${name}`, $options: "i" } };

  try {
    await connectDB();
    const [ignou, sol, nios10, nios12] = await Promise.all([
      IGNOUAssignment.find(query),
      SOLAssignment.find(query),
      NIOS10Assignment.find(query),
      NIOS12Assignment.find(query),
    ]);

    const result = [
      ...ignou.map(item => ({ ...item._doc, source: "IGNOU" })),
      ...sol.map(item => ({ ...item._doc, source: "SOL" })),
      ...nios10.map(item => ({ ...item._doc, source: "NIOS10" })),
      ...nios12.map(item => ({ ...item._doc, source: "NIOS12" })),
    ];

    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    console.error("API Error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
