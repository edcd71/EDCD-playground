import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { notFound } from "next/navigation";
import { prototypePages } from "@/lib/prototype-pages";
import type { PrototypeMetadata } from "@/lib/prototypes";

export function PrototypeRoute({ prototype, publicRoute = false }: { prototype: PrototypeMetadata; publicRoute?: boolean }) {
  const Page = prototypePages[prototype.slug];
  if (!Page) notFound();
  return <main className="prototype-route">
    <header className="prototype-bar"><Link href={publicRoute ? `/p/${prototype.slug}` : "/"} aria-label="Prototype playground"><span className="brand-mark size-6 scale-75"><i/><i/><i/><i/></span><span>fieldnotes</span></Link><span aria-hidden="true">/</span><span>{prototype.title}</span>{publicRoute && <span className="ml-auto inline-flex items-center gap-1 text-[10px]"><ExternalLink size={12}/> Public prototype</span>}</header>
    <section className="prototype-canvas"><Page/></section>
    {publicRoute && <footer className="px-5 pb-5 text-center font-mono text-[9px] tracking-widest text-muted-foreground">MADE IN FIELDNOTES</footer>}
  </main>;
}
