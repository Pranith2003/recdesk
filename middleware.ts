import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";

export async function middleware(req: NextRequest, res: NextResponse) {
  console.log("Middleware is running!!...", req, res);
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  console.log("Sessions", session);
  if (!session) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|sign-in|assets).*)"],
};
