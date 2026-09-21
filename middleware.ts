import { NextResponse, type NextRequest } from "next/server";

const access: Record<string, string[]> = {
  super_admin: ["/panel", "/panel/musteriler", "/panel/islemler", "/panel/subeler", "/panel/personel", "/panel/hizmetler", "/panel/kasa", "/panel/raporlar", "/panel/yetkiler", "/panel/ayarlar"],
  admin: ["/panel", "/panel/musteriler", "/panel/islemler", "/panel/subeler", "/panel/personel", "/panel/hizmetler", "/panel/kasa", "/panel/raporlar", "/panel/ayarlar"],
  branch_manager: ["/panel", "/panel/musteriler", "/panel/islemler", "/panel/personel", "/panel/hizmetler", "/panel/raporlar"],
  sales: ["/panel", "/panel/musteriler", "/panel/islemler"],
  finance: ["/panel", "/panel/kasa", "/panel/raporlar"],
};

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const role = request.cookies.get("novacrm_role")?.value;
  if (pathname.startsWith("/panel")) {
    if (!role || !access[role]) return NextResponse.redirect(new URL("/login", request.url));
    const allowed = pathname === "/panel" || access[role].some((route) => route !== "/panel" && (pathname === route || pathname.startsWith(route + "/")));
    if (!allowed) return NextResponse.redirect(new URL("/panel", request.url));
  }
  if (pathname === "/login" && role && access[role]) return NextResponse.redirect(new URL("/panel", request.url));

  const response = NextResponse.next({ request });
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  return response;
}

export const config = { matcher: ["/panel/:path*", "/login"] };

