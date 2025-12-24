import { NextRequest, NextResponse } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  let token: string | undefined;

  if (req.cookies.has("FT_TOKEN")) {
    token = req.cookies.get("FT_TOKEN")?.value;
  } else if (req.headers.get("Authorization")?.startsWith("Bearer ")) {
    token = req.headers.get("Authorization")?.slice(7);
  }

  if (
    pathname === "/" ||
    pathname.startsWith("/news") ||
    pathname.startsWith("/projects") ||
    pathname.startsWith("/who-we-work-with") ||
    pathname.startsWith("/invest") ||
    pathname.startsWith("/contact-us")
  ) {
    return NextResponse.next();
  }

  if (pathname === "/godmode") {
    if (token) {
      return NextResponse.redirect(new URL("/godmode/projects", req.url));
    }
    return NextResponse.next();
  }


  if (pathname.startsWith("/godmode")) {
    if (!token) {
      return NextResponse.redirect(
        new URL(
          `/godmode?${new URLSearchParams({
            error: "unauthorized",
          })}`,
          req.url
        )
      );
    }

    const headers = new Headers(req.headers);
    headers.set("Authorization", `Bearer ${token}`);

    return NextResponse.next({
      request: { headers },
    });
  }

  return NextResponse.next();
}
