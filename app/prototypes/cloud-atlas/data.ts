import { Cloud, CloudFog, Wind } from "lucide-react";

export const observations = [
  { name: "Cumulus", note: "Soft towers, building slowly in the afternoon.", Icon: Cloud },
  { name: "Cirrus", note: "High, fine brushstrokes of ice in the blue.", Icon: Wind },
  { name: "Stratus", note: "A quiet gray blanket, spread low and wide.", Icon: CloudFog },
] as const;
