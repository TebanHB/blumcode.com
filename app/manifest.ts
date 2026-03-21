import type { MetadataRoute } from "next";

import {
  ORGANIZATION_LOGO_HEIGHT,
  ORGANIZATION_LOGO_PATH,
  ORGANIZATION_LOGO_WIDTH,
  SITE_NAME,
} from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: SITE_NAME,
    description:
      "Custom software, web and mobile development, integrations, and support for growing businesses.",
    start_url: "/es",
    display: "standalone",
    background_color: "#020617",
    theme_color: "#020617",
    lang: "es",
    categories: ["business", "technology", "software"],
    icons: [
      {
        src: ORGANIZATION_LOGO_PATH,
        sizes: `${ORGANIZATION_LOGO_WIDTH}x${ORGANIZATION_LOGO_HEIGHT}`,
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/blumcode-icon-fixed.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
