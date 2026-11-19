import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PrototypeRoute } from "@/components/prototype-route";
import { getPrototype } from "@/lib/prototypes";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const prototype = await getPrototype(slug);
  if (!prototype?.public) return { title: "Not found", robots: { index: false, follow: false } };
  const shareRoute = `/p/${prototype.slug}`;
  return {
    title: prototype.title,
    description: prototype.description,
    robots: { index: true, follow: true },
    openGraph: { title: prototype.title, description: prototype.description, type: "website", images: [{ url: `${shareRoute}/opengraph-image`, width: 1200, height: 630, alt: prototype.title }], videos: [{ url: `${shareRoute}/opengraph-video`, type: "video/mp4" }] },
    twitter: { card: "summary_large_image", title: prototype.title, description: prototype.description, images: [`${shareRoute}/opengraph-image`] },
  };
}

export default async function PublicPrototypePage({ params }: Props) {
  const { slug } = await params;
  const prototype = await getPrototype(slug);
  if (!prototype?.public) notFound();
  return <PrototypeRoute prototype={prototype} publicRoute/>;
}
