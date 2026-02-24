import { NextResponse } from "next/server";
import { getTransport, fromAddress } from "@/lib/mailer";

export const runtime = "nodejs";

const MAX_FILE_MB = 8;
const ALLOWED_MIME = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export async function POST(req: Request) {
  try {
    const form = await req.formData();

    // Honeypot field (keep empty)
    const website = String(form.get("website") || "");
    if (website.trim().length > 0) {
      return NextResponse.json({ ok: true });
    }

    const name = String(form.get("name") || "").trim();
    const email = String(form.get("email") || "").trim();
    const phone = String(form.get("phone") || "").trim();
    const notes = String(form.get("notes") || "").trim();

    if (name.length < 2) {
      return NextResponse.json({ ok: false, error: "Name is too short." }, { status: 400 });
    }
    if (!isEmail(email)) {
      return NextResponse.json({ ok: false, error: "Enter a valid email address." }, { status: 400 });
    }

    const file = form.get("cv");
    if (!(file instanceof File)) {
      return NextResponse.json({ ok: false, error: "Please attach your CV." }, { status: 400 });
    }

    if (!ALLOWED_MIME.has(file.type)) {
      return NextResponse.json(
        { ok: false, error: "CV must be PDF or Word (.doc/.docx)." },
        { status: 400 }
      );
    }

    const sizeMb = file.size / (1024 * 1024);
    if (sizeMb > MAX_FILE_MB) {
      return NextResponse.json(
        { ok: false, error: `CV too large. Max ${MAX_FILE_MB}MB.` },
        { status: 400 }
      );
    }

    const to = process.env.APPLY_TO;
    if (!to) {
      return NextResponse.json(
        { ok: false, error: "APPLY_TO not set on server." },
        { status: 500 }
      );
    }

    const bytes = Buffer.from(await file.arrayBuffer());

    const transport = getTransport();

    await transport.sendMail({
      from: fromAddress(),
      to,
      replyTo: email,
      subject: `New candidate application — ${name}`,
      text:
`New candidate application:

Name: ${name}
Email: ${email}
Phone: ${phone || "-"}

Notes:
${notes || "-"}

Attached: ${file.name} (${file.type}, ${Math.round(sizeMb * 10) / 10}MB)
`,
      attachments: [
        {
          filename: file.name || "cv",
          content: bytes,
          contentType: file.type,
        },
      ],
    });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message || "Server error." },
      { status: 500 }
    );
  }
}