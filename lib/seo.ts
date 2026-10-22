import type { Metadata } from "next";
import { serviceAreas, site } from "./site";

/** Per-page metadata with canonical, Open Graph and Twitter tags */
export function buildMetadata({
  title,
  description,
  path,
  image = "/images/hero-dusk.jpg",
  type = "website",
  noindex = false,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  noindex?: boolean;
}): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: site.name,
      images: [image],
      type,
      locale: "en_US",
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}

const abs = (path: string) => (path.startsWith("http") ? path : `${site.url}${path}`);
const businessId = `${site.url}/#business`;

export function localBusinessLd() {
  return {
    "@context": "https://schema.org",
    "@type": "HVACBusiness",
    "@id": businessId,
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    telephone: "+1-702-881-4713",
    image: abs("/images/hero.jpg"),
    logo: abs("/images/logo-dark.png"),
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.state,
      postalCode: site.address.zip,
      addressCountry: "US",
    },
    geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
    hasMap: site.googleMapsUrl,
    areaServed: serviceAreas.map((name) => ({ "@type": "City", name: `${name}, NV` })),
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "00:00",
      closes: "23:59",
    },
    paymentAccepted: "Cash, Credit Card, Financing",
    sameAs: ["https://www.facebook.com/waveheatingandcooling", site.googleMapsUrl],
  };
}

export function serviceLd({ name, description, path, area = "Las Vegas, NV" }: { name: string; description: string; path: string; area?: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: abs(path),
    serviceType: name,
    provider: { "@id": businessId },
    areaServed: { "@type": "City", name: area },
  };
}

export function faqLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export type Crumb = { name: string; path: string };

export function breadcrumbLd(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...crumbs].map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: abs(c.path),
    })),
  };
}

export function blogPostingLd(post: { title: string; description: string; path: string; image: string; date: string; modified?: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: abs(post.image),
    datePublished: post.date,
    dateModified: post.modified ?? post.date,
    mainEntityOfPage: abs(post.path),
    author: { "@type": "Organization", name: site.name, url: site.url },
    publisher: { "@id": businessId },
  };
}

export function webAppLd({ name, description, path }: { name: string; description: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name,
    description,
    url: abs(path),
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    provider: { "@id": businessId },
  };
}
