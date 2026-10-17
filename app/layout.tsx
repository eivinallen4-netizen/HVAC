import type { Metadata, Viewport } from "next";
import { Montserrat, Work_Sans } from "next/font/google";
import Script from "next/script";
import { serviceAreas, site } from "@/lib/site";
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
  title: "Las Vegas AC & Heating Repair | Free Estimates | Wave Heating & Cooling",
  description:
    "Family-owned Las Vegas HVAC company. AC repair, heating repair, new system installs and maintenance by NATE-certified techs. 24/7 service. Free estimates — call (702) 881-4713.",
  icons: { icon: "/images/favicon.png", apple: "/images/favicon.png" },
  openGraph: {
    title: "Wave Heating & Cooling — Las Vegas AC & Heating",
    description: "24/7 AC & heating service from a family-owned, NATE-certified Las Vegas team. Free estimates on new systems.",
    images: ["/images/hero-dusk.jpg"],
    type: "website",
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = { themeColor: "#061820" };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HVACBusiness",
  name: site.name,
  url: site.url,
  telephone: "+1-702-881-4713",
  image: `${site.url}/images/hero.jpg`,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressRegion: site.address.state,
    postalCode: site.address.zip,
    addressCountry: "US",
  },
  areaServed: serviceAreas,
  openingHours: "Mo-Su 00:00-23:59",
};

const GTM = process.env.NEXT_PUBLIC_GTM_ID;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${montserrat.variable} ${workSans.variable}`}>
      <body>
        {GTM && (
          <Script id="gtm" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM}');`}
          </Script>
        )}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {children}
      </body>
    </html>
  );
}
