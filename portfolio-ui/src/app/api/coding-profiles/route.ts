import { getCodingProfiles, type CodingProfile } from "../../../lib/coding-profiles.mjs";

export const dynamic = "force-dynamic";

let cache: { profiles: CodingProfile[]; expires: number } | null = null;
let pending: Promise<CodingProfile[]> | null = null;

export async function GET() {
  if (!cache || cache.expires <= Date.now()) {
    pending ??= getCodingProfiles();
    try {
      const profiles = await pending;
      const complete = profiles.every((profile) => profile.status === "live");
      cache = { profiles, expires: Date.now() + (complete ? 15 * 60_000 : 60_000) };
    } finally { pending = null; }
  }
  return Response.json({ profiles: cache.profiles }, { headers: { "Cache-Control": "no-store" } });
}
