import { NextResponse } from "next/server";
import { getAdvertDetails } from "@/lib/firefish/advert";
import { firefishRequest } from "@/lib/firefish/client";

export async function GET() {
  try {
    // Existing Firefish advert reference (FF-4)
    const advert = await getAdvertDetails(4);

    const customFields = await firefishRequest(
  `/api/v1.0/jobs/${advert.JobRef}/custom-fields`
);

    return NextResponse.json({
  advert,
  customFields,
});
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}