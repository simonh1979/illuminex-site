import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json([
    {
      id: 1,
      title: "Senior Project Manager",
      location: "London",
      sector: "Professional Services",
    },
    {
      id: 2,
      title: "Healthcare Director",
      location: "Manchester",
      sector: "Healthcare",
    },
  ]);
}
