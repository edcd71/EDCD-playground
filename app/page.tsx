import { getPrototypes } from "@/lib/prototypes";
import { PrototypeGallery } from "@/components/prototype-gallery";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const prototypes = await getPrototypes();
  return <PrototypeGallery prototypes={prototypes}/>;
}
