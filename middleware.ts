import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

// Simple in-memory rate limiter
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 60; // max requests per window
const FORM_MAX_REQUESTS = 5; // max form submissions per window
const LOGIN_MAX_REQUESTS = 5; // max login attempts per window

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");
  return forwarded?.split(",")[0]?.trim() || realIp || "unknown";
}

function isRateLimited(key: string, maxRequests: number): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(key);

  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return false;
  }

  entry.count++;
  return entry.count > maxRequests;
}

// Clean up old entries periodically
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of rateLimitMap.entries()) {
      if (now > entry.resetTime) {
        rateLimitMap.delete(key);
      }
    }
  }, 60000);
}

export async function middleware(request: NextRequest) {
  const ip = getClientIp(request);
  const path = request.nextUrl.pathname;

  // Rate limit login / auth endpoints (brute-force protection)
  if (path.startsWith("/api/auth")) {
    const loginKey = `login:${ip}`;
    if (isRateLimited(loginKey, LOGIN_MAX_REQUESTS)) {
      return NextResponse.json(
        { error: "Too many login attempts. Please try again later." },
        { status: 429 }
      );
    }
  }

  // Stricter rate limiting for form/API endpoints (excluding auth)
  if (path.startsWith("/api/") && !path.startsWith("/api/auth")) {
    const formKey = `form:${ip}`;
    if (isRateLimited(formKey, FORM_MAX_REQUESTS)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }
  }

  // General rate limiting
  const generalKey = `general:${ip}`;
  if (isRateLimited(generalKey, MAX_REQUESTS)) {
    return new NextResponse("Too Many Requests", { status: 429 });
  }

  // Redirect authenticated users away from login page
  if (path === "/admin/login") {
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
    if (token) {
      return NextResponse.redirect(new URL("/admin/leads", request.url));
    }
  }

  // Auth protection for /admin routes (except login page)
  if (path.startsWith("/admin") && path !== "/admin/login") {
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  // Auth protection for /api/admin/* routes
  if (path.startsWith("/api/admin")) {
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  const response = NextResponse.next();

  // Add security headers to every response
  response.headers.set("X-DNS-Prefetch-Control", "on");
  response.headers.set(
    "X-Permitted-Cross-Domain-Policies",
    "none"
  );

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico (favicon)
     * - public folder assets
     */
    "/((?!_next/static|_next/image|favicon.ico|images/).*)",
  ],
};
