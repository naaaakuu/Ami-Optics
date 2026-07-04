import { ImageResponse } from "next/og";
import { googleRating } from "@/content/stats";

export const alt = "Ami Optics — Clear vision, honest advice, since 1996";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Generate on request rather than at build time. This avoids the build-time
// prerender of the metadata image route (the step that was failing) while the
// image still renders correctly whenever a crawler fetches it.
export const dynamic = "force-dynamic";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          backgroundColor: "#16120b",
          color: "#f6f1e7",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 30,
            letterSpacing: "0.22em",
            color: "#e3cf9f",
          }}
        >
          FAMILY OPTICIANS / VIRAR / SINCE 1996
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 132, fontWeight: 700, lineHeight: 1 }}>
            Ami Optics
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 44,
              marginTop: 28,
              color: "rgba(246,241,231,0.82)",
            }}
          >
            Clear vision. Honest advice. Since 1996.
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              width: 70,
              height: 44,
              borderRadius: 16,
              backgroundColor: "#e1251b",
            }}
          />
          <div
            style={{
              display: "flex",
              width: 70,
              height: 44,
              borderRadius: 16,
              backgroundColor: "#1e2a78",
              marginLeft: 14,
            }}
          />
          <div
            style={{
              display: "flex",
              marginLeft: 28,
              fontSize: 30,
              color: "rgba(246,241,231,0.65)",
            }}
          >
            {googleRating.rating} / 5 on Google ({googleRating.count}+ reviews)
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
