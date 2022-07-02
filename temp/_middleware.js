import { NextResponse, NextRequest } from "next/server";
export async function middleware(req, ev) {
  const paths = ["login", "signup", "favicon.ico", ""];
  const { pathname, origin } = req.nextUrl;
  const pathArray = pathname.split("/");

  if (pathArray.length === 2 && !paths.includes(pathArray[1])) {
    return NextResponse.redirect(`${origin + pathname}/home`);
  }
  return NextResponse.next();
}
