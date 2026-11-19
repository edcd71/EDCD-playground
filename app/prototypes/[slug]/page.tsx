import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PrototypeRoute } from "@/components/prototype-route";
import { getPrototype } from "@/lib/prototypes";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const prototype = await getPrototype(slug);
  if (!prototype) return { title: "Prototype not found" };
  return { title: prototype.title, description: prototype.description, robots: { index: false, follow: false } };
}

export default async function PrivatePrototypePage({ params }: Props) {
  const { slug } = await params;
  const prototype = await getPrototype(slug);
  if (!prototype) notFound();
  return <PrototypeRoute prototype={prototype}/>;
}
