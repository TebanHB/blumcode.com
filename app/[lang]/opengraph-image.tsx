import { ImageResponse } from "next/og";

import {
  SITE_NAME,
  getLocaleSeoContent,
  getSafeLocale,
} from "@/lib/seo";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";
export const alt = "BlumCode social preview";

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const safeLang = getSafeLocale(lang);
  const seo = getLocaleSeoContent(safeLang);

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          position: "relative",
          width: "100%",
          height: "100%",
          padding: "64px",
          background:
            "linear-gradient(135deg, #020617 0%, #0f172a 42%, #1d4ed8 100%)",
          color: "#f8fafc",
          fontFamily:
            "Segoe UI, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at top left, rgba(125, 211, 252, 0.28), transparent 28%), radial-gradient(circle at bottom right, rgba(59, 130, 246, 0.35), transparent 34%)",
          }}
        />

        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            height: "100%",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "40px",
            padding: "48px",
            background: "rgba(2, 6, 23, 0.42)",
            boxShadow: "0 30px 80px rgba(2, 6, 23, 0.45)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  width: "48px",
                  height: "48px",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "16px",
                  background: "linear-gradient(135deg, #60a5fa, #22d3ee)",
                  color: "#020617",
                  fontSize: "24px",
                  fontWeight: 700,
                }}
              >
                B
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    fontSize: "30px",
                    fontWeight: 700,
                    letterSpacing: "-0.03em",
                  }}
                >
                  {SITE_NAME}
                </div>
                <div
                  style={{
                    display: "flex",
                    fontSize: "18px",
                    color: "rgba(226, 232, 240, 0.8)",
                  }}
                >
                  {safeLang === "es" ? "Tecnologia para empresas" : "Technology for businesses"}
                </div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                borderRadius: "999px",
                border: "1px solid rgba(255,255,255,0.16)",
                padding: "12px 20px",
                fontSize: "20px",
                color: "rgba(255,255,255,0.88)",
                background: "rgba(15, 23, 42, 0.36)",
              }}
            >
              {safeLang.toUpperCase()}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              maxWidth: "860px",
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: "72px",
                fontWeight: 700,
                lineHeight: 1.02,
                letterSpacing: "-0.05em",
              }}
            >
              {seo.socialTitle}
            </div>
            <div
              style={{
                display: "flex",
                fontSize: "30px",
                lineHeight: 1.35,
                color: "rgba(226, 232, 240, 0.88)",
              }}
            >
              {seo.socialSubtitle}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "14px",
              }}
            >
              {seo.socialPills.map((pill) => (
                <div
                  key={pill}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "999px",
                    border: "1px solid rgba(255,255,255,0.14)",
                    padding: "12px 20px",
                    fontSize: "22px",
                    color: "#dbeafe",
                    background: "rgba(15, 23, 42, 0.42)",
                  }}
                >
                  {pill}
                </div>
              ))}
            </div>

            <div
              style={{
                display: "flex",
                fontSize: "22px",
                color: "rgba(191, 219, 254, 0.92)",
              }}
            >
              blumcode.com
            </div>
          </div>
        </div>
      </div>
    ),
    size
  );
}
