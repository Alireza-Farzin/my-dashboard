import type { NextRequest, NextMiddleware } from "next/server";
import { NextResponse } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;

export const middleware: NextMiddleware = (request: NextRequest) => {
  const pathname = request.nextUrl.pathname;
  const token = request.cookies.get("authToken")?.value;
  if (PUBLIC_FILE.test(pathname)) {
    return NextResponse.next();
  }

  if (!token && pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|login).*)"],
};
