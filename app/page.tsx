import { ClassicHome } from "@/components/classic/ClassicHome";
import { Hub } from "@/components/game/Hub";
import { getServerMode } from "@/lib/mode-server";

export const dynamic = "force-dynamic";

export default function Home() {
  return getServerMode() === "game" ? <Hub /> : <ClassicHome />;
}
