import type { Metadata, Viewport } from "next";
import { Montserrat, Work_Sans } from "next/font/google";
import Script from "next/script";
import { ArtDefs } from "@/components/Art";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { RevealOnScroll } from "@/components/Reveal";
import { Footer, StickyBar } from "@/components/Sections";
import { localBusinessLd } from "@/lib/seo";
import { site } from "@/lib/site";
import { themeInitScript } from "@/lib/theme";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-display",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-body",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Las Vegas AC & Heating Repair | Same-Day | Wave Heating & Cooling",
    template: "%s | Wave Heating & Cooling",
  },
  description:
    "Family-owned Las Vegas HVAC company. AC & heating repair, installs and tune-ups by a NATE-certified team. Same-day service, book online. (702) 881-4713.",
  applicationName: site.name,
  icons: { icon: "/images/favicon.png", apple: "/images/favicon.png" },
  openGraph: { siteName: site.name, locale: "en_US", type: "website" },
  formatDetection: { telephone: false },
  verification: process.env.NEXT_PUBLIC_GSC_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION }
    : undefined,
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#061820" },
    { media: "(prefers-color-scheme: light)", color: "#f4f8fa" },
  ],
};

const GTM = process.env.NEXT_PUBLIC_GTM_ID;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${montserrat.variable} ${workSans.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        {GTM && (
          <>
            <Script id="gtm" strategy="afterInteractive">
              {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM}');`}
            </Script>
            <noscript>
              <iframe
                src={`https://www.googletagmanager.com/ns.html?id=${GTM}`}
                height="0"
                width="0"
                style={{ display: "none", visibility: "hidden" }}
                title="Google Tag Manager"
              />
            </noscript>
          </>
        )}
        <JsonLd data={localBusinessLd()} />
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <ArtDefs />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <StickyBar />
        <RevealOnScroll />
      </body>
    </html>
  );
}
