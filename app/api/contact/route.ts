import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendTelegramNotification } from "@/lib/telegram";

// Simple server-side rate tracking for form submissions
const formSubmissions = new Map<
  string,
  { count: number; resetTime: number }
>();

function sanitize(input: string): string {
  return input
    .replace(/[<>]/g, "") // strip HTML angle brackets
    .replace(/javascript:/gi, "") // strip JS protocol
    .replace(/on\w+\s*=/gi, "") // strip event handlers
    .trim()
    .slice(0, 1000); // limit length
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
}

function validatePhone(phone: string): boolean {
  // Allow UK phone formats
  const phoneRegex = /^[\d\s\+\-()]{7,20}$/;
  return phoneRegex.test(phone);
}

export async function POST(request: NextRequest) {
  try {
    // CSRF protection: verify request origin
    const origin = request.headers.get("origin");
    const referer = request.headers.get("referer");
    const allowedOrigins = [
      "https://urbancodestudios.com",
      "https://www.urbancodestudios.com",
    ];
    // In development, also allow localhost
    if (process.env.NODE_ENV === "development") {
      allowedOrigins.push("http://localhost:3000");
    }
    const requestOrigin = origin || (referer ? new URL(referer).origin : null);
    if (!requestOrigin || !allowedOrigins.includes(requestOrigin)) {
      return NextResponse.json(
        { error: "Forbidden: invalid origin." },
        { status: 403 }
      );
    }

    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    // Rate limit: max 3 form submissions per 10 minutes per IP
    const now = Date.now();
    const entry = formSubmissions.get(ip);
    if (entry && now < entry.resetTime) {
      entry.count++;
      if (entry.count > 3) {
        return NextResponse.json(
          { error: "Too many submissions. Please try again later." },
          { status: 429 }
        );
      }
    } else {
      formSubmissions.set(ip, { count: 1, resetTime: now + 10 * 60 * 1000 });
    }

    const body = await request.json();

    // Honeypot check — if the hidden field is filled, it's a bot
    if (body.website && body.website.length > 0) {
      // Silently accept but don't process (so bots think it worked)
      return NextResponse.json({ success: true });
    }

    // Validate required fields
    const { name, business, email, phone, message, consent } = body;

    if (!name || !business || !email || !phone) {
      return NextResponse.json(
        { error: "All required fields must be filled out." },
        { status: 400 }
      );
    }

    if (!consent) {
      return NextResponse.json(
        { error: "You must consent to be contacted." },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const sanitizedData = {
      name: sanitize(name),
      business: sanitize(business),
      email: sanitize(email).toLowerCase(),
      phone: sanitize(phone),
      message: sanitize(message || ""),
    };

    // Validate formats
    if (!validateEmail(sanitizedData.email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (!validatePhone(sanitizedData.phone)) {
      return NextResponse.json(
        { error: "Please provide a valid phone number." },
        { status: 400 }
      );
    }

    if (sanitizedData.name.length < 2 || sanitizedData.name.length > 100) {
      return NextResponse.json(
        { error: "Name must be between 2 and 100 characters." },
        { status: 400 }
      );
    }

    // Store lead in database
    const lead = await prisma.lead.create({
      data: {
        name: sanitizedData.name,
        email: sanitizedData.email,
        phone: sanitizedData.phone,
        company: sanitizedData.business,
        source: "website",
        status: "NEW",
      },
    });

    // Send Telegram notification (non-blocking)
    sendTelegramNotification(
      `<b>New Lead from Website</b>\n\n` +
        `<b>Name:</b> ${sanitizedData.name}\n` +
        `<b>Business:</b> ${sanitizedData.business}\n` +
        `<b>Email:</b> ${sanitizedData.email}\n` +
        `<b>Phone:</b> ${sanitizedData.phone}\n` +
        `<b>Message:</b> ${sanitizedData.message || "No message"}\n\n` +
        `<b>Lead ID:</b> ${lead.id}`
    ).catch(() => {});

    // Log without PII for GDPR compliance
    console.log("New lead created:", {
      leadId: lead.id,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: "Thank you! We'll get back to you within 24 hours.",
    });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
