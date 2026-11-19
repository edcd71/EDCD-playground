"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowUpRight, Search, Blocks, FlaskConical, Gamepad2, Wrench } from "lucide-react";
import type { PrototypeMetadata } from "@/lib/prototypes";
import { Input } from "@/components/ui/input";
import { ThemeSwitcher } from "@/components/theme-switcher";

const categoryIcons: Record<string, typeof Blocks> = { Play: Gamepad2, Explore: FlaskConical, Tools: Wrench };
const formatDate = (date: string) => new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(new Date(date));

export function PrototypeGallery({ prototypes }: { prototypes: PrototypeMetadata[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All prototypes");
  const categories = useMemo(() => [...new Set(prototypes.map((item) => item.category))].sort(), [prototypes]);
  const visible = prototypes.filter((prototype) => {
    const matchesCategory = category === "All prototypes" || prototype.category === category;
    const matchesQuery = `${prototype.title} ${prototype.description} ${prototype.category} ${prototype.tags.join(" ")}`.toLowerCase().includes(query.trim().toLowerCase());
    return matchesCategory && matchesQuery;
  });
  const firstName = prototypes[0]?.title ?? "a new idea";

  return <div className="playground-shell">
    <aside className="playground-sidebar" aria-label="Workspace navigation">
      <Link className="brand-link" href="/" aria-label="Fieldnotes home"><span className="brand-mark" aria-hidden="true"><i/><i/><i/><i/></span><span className="brand-word">fieldnotes.</span></Link>
      <div className="side-heading">Workspace</div>
      <button className="side-link" aria-current={category === "All prototypes" ? "page" : undefined} onClick={() => setCategory("All prototypes")}><Blocks size={16}/><span>All prototypes</span><span className="ml-auto font-mono text-[10px]">{String(visible.length).padStart(2,"0")}</span></button>
      <div className="side-heading">Collections</div>
      <nav className="grid gap-1" aria-label="Collections">{categories.map((name) => {
        const Icon = categoryIcons[name] ?? Blocks;
        return <button key={name} className="side-link" aria-pressed={category === name} onClick={() => setCategory(category === name ? "All prototypes" : name)}><Icon size={15}/><span>{name}</span></button>;
      })}</nav>
      <div className="side-note"><div className="side-orbit" aria-hidden="true"/><p>Small ideas,<br/>room to grow.</p><span>A playground in progress</span></div>
      <div className="side-footer"><span className="online-dot"/> PRIVATE WORKSPACE</div>
    </aside>

    <main className="playground-main">
      <header className="topbar"><div className="crumb">Your space <span>/</span> Prototypes</div><div className="top-actions"><span className="hidden text-xs text-muted-foreground sm:block">{prototypes.length} small experiments</span><ThemeSwitcher/><span className="workspace-avatar" aria-label="Personal workspace">E</span></div></header>
      <section className="hero" aria-labelledby="page-title"><div className="hero-copy"><div className="eyebrow">A PLACE FOR WHAT-IFS</div><h1 id="page-title">The idea<br/>playground<span>.</span></h1><p>A growing collection of little things worth making.<br/>Pick one and see where it takes you.</p></div><div className="hero-art" aria-hidden="true"><i className="hero-orbit"/><i className="hero-orbit"/><i className="hero-orbit"/><div className="hero-sun"/><span className="tiny-label">IDEAS IN ORBIT</span></div></section>
      <section className="gallery-section" aria-labelledby="gallery-title"><div className="gallery-head"><div><h2 id="gallery-title">A few things to try</h2><p>{category === "All prototypes" ? `A little bit of everything · starting with ${firstName}` : `A little ${category.toLowerCase()} for your day`}</p></div><label className="gallery-controls"><span className="relative min-w-0 flex-1"><Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"/><span className="sr-only">Search prototypes</span><Input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Find something…" className="h-11 w-full pl-9 sm:w-56"/></span></label></div>
        <div className="gallery-grid" aria-live="polite">{visible.length ? visible.map((prototype) => <article className="gallery-card" key={prototype.slug}>
          <Link href={`/prototypes/${prototype.slug}`} className="block" aria-label={`Open ${prototype.title}`}>
            <div className="thumb" aria-hidden="true">
              {prototype.lightThumbnail ? <Image className="thumb-light" src={`/thumbnails/${prototype.slug}-light.png`} alt="" fill unoptimized sizes="(max-width: 480px) 90vw, (max-width: 1100px) 44vw, 28vw"/> : <div className="thumb-placeholder thumb-light"><b>?</b>No preview yet</div>}
              {prototype.darkThumbnail ? <Image className="thumb-dark" src={`/thumbnails/${prototype.slug}-dark.png`} alt="" fill unoptimized sizes="(max-width: 480px) 90vw, (max-width: 1100px) 44vw, 28vw"/> : <div className="thumb-placeholder thumb-dark"><b>?</b>No preview yet</div>}
            </div>
            <div className="card-copy"><div className="card-overline"><span className="eyebrow">{prototype.category}</span><span className="font-mono text-[9px] text-muted-foreground">{prototype.slug.toUpperCase().replaceAll("-"," · ")}</span></div><h3>{prototype.title}</h3><p>{prototype.description}</p><div className="card-foot"><span>UPDATED {formatDate(prototype.updatedAt).toUpperCase()}</span><span className="inline-flex items-center gap-1 text-primary">Open <ArrowUpRight size={12}/></span></div></div>
          </Link>
        </article>) : <div className="empty-gallery"><h3 className="font-serif text-xl text-foreground">No little things here yet.</h3><p className="mt-2 text-sm">Try another search or collection.</p><button className="mt-4 text-sm text-primary underline underline-offset-4" onClick={() => { setQuery(""); setCategory("All prototypes"); }}>Show everything</button></div>}</div>
      </section>
      <footer className="main-footer"><span>MADE FOR CURIOSITY</span><span>ONE IDEA AT A TIME</span></footer>
    </main>
  </div>;
}
