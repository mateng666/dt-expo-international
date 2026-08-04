import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Force English: any /zh path redirects to the English equivalent.
  if (pathname === "/zh" || pathname.startsWith("/zh/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(/^\/zh(?=\/|$)/, "/en") || "/en";
    return NextResponse.redirect(url);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
