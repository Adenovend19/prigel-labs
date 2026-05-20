import { NextRequest, NextResponse } from "next/server";
import { getContent, saveContent, SiteContent } from "@/lib/contentService";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "adminprigel";

// Helper to check authorization
function isAuthorized(req: NextRequest): boolean {
  const passwordHeader = req.headers.get("x-admin-password");
  return passwordHeader === ADMIN_PASSWORD;
}

export async function GET() {
  try {
    const content = await getContent();
    return NextResponse.json({ success: true, content });
  } catch (error) {
    console.error("GET content error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to get content" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    if (!isAuthorized(req)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { content } = body;

    if (!content || typeof content !== "object") {
      return NextResponse.json(
        { success: false, error: "Invalid content body" },
        { status: 400 }
      );
    }

    const success = await saveContent(content as SiteContent);
    if (success) {
      return NextResponse.json({ success: true, message: "Content updated successfully" });
    } else {
      return NextResponse.json(
        { success: false, error: "Failed to save content" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("POST content error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
