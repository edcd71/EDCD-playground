import "server-only";
import { access, readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

export type PrototypeMetadata = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  createdAt: string;
  hidden: boolean;
  category: string;
  updatedAt: string;
  public: boolean;
  lightThumbnail: boolean;
  darkThumbnail: boolean;
};

const prototypeDirectory = path.join(process.cwd(), "app", "prototypes");
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function isMetadata(value: unknown, slug: string): value is Omit<PrototypeMetadata, "slug" | "lightThumbnail" | "darkThumbnail"> {
  if (!value || typeof value !== "object") return false;
  const item = value as Record<string, unknown>;
  return item.slug === slug && typeof item.title === "string" && typeof item.description === "string" &&
    Array.isArray(item.tags) && item.tags.every((tag) => typeof tag === "string") &&
    typeof item.createdAt === "string" && !Number.isNaN(Date.parse(item.createdAt)) && typeof item.hidden === "boolean" &&
    typeof item.category === "string" && typeof item.updatedAt === "string" && !Number.isNaN(Date.parse(item.updatedAt)) &&
    typeof item.public === "boolean";
}

export async function getPrototypes({ includeHidden = false }: { includeHidden?: boolean } = {}): Promise<PrototypeMetadata[]> {
  const entries = await readdir(prototypeDirectory, { withFileTypes: true });
  const prototypes = await Promise.all(entries.filter((entry) => entry.isDirectory() && slugPattern.test(entry.name)).map(async (entry) => {
    const directory = path.join(prototypeDirectory, entry.name);
    try {
      const [metadataText, pageStat] = await Promise.all([
        readFile(path.join(directory, "metadata.json"), "utf8"),
        stat(path.join(directory, "page.tsx")),
      ]);
      if (!pageStat.isFile()) return null;
      const metadata: unknown = JSON.parse(metadataText);
      if (!isMetadata(metadata, entry.name)) {
        console.warn(`Skipping invalid prototype metadata for ${entry.name}`);
        return null;
      }
      const [lightThumbnail, darkThumbnail] = await Promise.all([
        access(path.join(process.cwd(), "public", "thumbnails", `${entry.name}-light.png`)).then(() => true, () => false),
        access(path.join(process.cwd(), "public", "thumbnails", `${entry.name}-dark.png`)).then(() => true, () => false),
      ]);
      return { slug: entry.name, title: metadata.title, description: metadata.description, tags: metadata.tags, createdAt: metadata.createdAt, hidden: metadata.hidden, category: metadata.category, updatedAt: metadata.updatedAt, public: metadata.public, lightThumbnail, darkThumbnail };
    } catch {
      console.warn(`Skipping ${entry.name}: expected a valid metadata.json and page.tsx`);
      return null;
    }
  }));
  return prototypes.filter((item): item is PrototypeMetadata => item !== null && (includeHidden || !item.hidden)).sort((a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt));
}

export async function getPrototype(slug: string) {
  if (!slugPattern.test(slug)) return null;
  return (await getPrototypes({ includeHidden: true })).find((prototype) => prototype.slug === slug) ?? null;
}
