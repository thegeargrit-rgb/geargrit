import { NextResponse, type NextRequest } from "next/server";

function unauthorizedResponse(): NextResponse {
  return new NextResponse("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="GearGrit Admin", charset="UTF-8"',
      "Cache-Control": "no-store",
    },
  });
}

function parseBasicAuth(
  authHeader: string,
): { user: string; pass: string } | null {
  if (!authHeader.startsWith("Basic ")) {
    return null;
  }

  const encoded = authHeader.slice(6);

  try {
    const decoded = atob(encoded);
    const separatorIndex = decoded.indexOf(":");

    if (separatorIndex < 0) {
      return null;
    }

    return {
      user: decoded.slice(0, separatorIndex),
      pass: decoded.slice(separatorIndex + 1),
    };
  } catch {
    return null;
  }
}

export function proxy(request: NextRequest): NextResponse {
  const expectedUser = process.env.ADMIN_BASIC_USER;
  const expectedPass = process.env.ADMIN_BASIC_PASS;

  if (!expectedUser || !expectedPass) {
    return new NextResponse("Admin auth is not configured", {
      status: 500,
      headers: { "Cache-Control": "no-store" },
    });
  }

  const authHeader = request.headers.get("authorization") ?? "";
  const credentials = parseBasicAuth(authHeader);

  if (!credentials) {
    return unauthorizedResponse();
  }

  const isAuthorized =
    credentials.user === expectedUser && credentials.pass === expectedPass;

  if (!isAuthorized) {
    return unauthorizedResponse();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
