/**
 * @typedef {object} CodingProfile
 * @property {string} id
 * @property {string} name
 * @property {string} handle
 * @property {string} url
 * @property {number|null} rating
 * @property {number|null} peakRating
 * @property {number|null} solved
 * @property {string} rank
 * @property {string} ratingLabel
 * @property {'live'|'snapshot'|'partial'|'unavailable'} status
 * @property {string|null} checkedAt
 */

/** @type {CodingProfile[]} */
export const fallbackProfiles = [
  { id: "leetcode", name: "LeetCode", handle: "skyrix_rd", url: "https://leetcode.com/skyrix_rd/", rating: 1818, peakRating: null, solved: null, rank: "Résumé snapshot", ratingLabel: "Peak rating · résumé", status: "snapshot", checkedAt: null },
  { id: "codeforces", name: "Codeforces", handle: "SKYRIX_rd", url: "https://codeforces.com/profile/SKYRIX_rd", rating: 1438, peakRating: null, solved: null, rank: "Specialist · résumé", ratingLabel: "Rating · résumé", status: "snapshot", checkedAt: null },
  { id: "atcoder", name: "AtCoder", handle: "SKYRIX_rd", url: "https://atcoder.jp/users/SKYRIX_rd", rating: null, peakRating: null, solved: null, rank: "Rating unavailable", ratingLabel: "Algorithm rating", status: "unavailable", checkedAt: null },
];

/** @param {unknown} value */
const number = (value) => typeof value === "number" && Number.isFinite(value) && value >= 0;

/** Count unique accepted problems; repeated submissions must not inflate the total.
 * @param {{verdict?:string, problem?:{contestId?:number, problemsetName?:string, index?:string}}[]} submissions
 */
export function countSolved(submissions) {
  const solved = new Set();
  for (const { verdict, problem } of submissions) {
    if (verdict !== "OK" || !problem?.index) continue;
    const group = problem.contestId ?? problem.problemsetName;
    if (group === undefined) throw new Error("Unknown problem identity");
    solved.add(`${group}:${problem.index}`);
  }
  return solved.size;
}

/** @param {string} html */
export function parseAtCoder(html) {
  // Select the Algorithm table explicitly via the request URL, not the Heuristic graph.
  const rows = new Map(Array.from(html.matchAll(/<tr[^>]*>\s*<th[^>]*>([\s\S]*?)<\/th>\s*<td[^>]*>([\s\S]*?)<\/td>\s*<\/tr>/gi), ([, key, value]) => [key.replace(/<[^>]*>/g, "").trim(), value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim()]));
  const rating = rows.get("Rating")?.match(/^([\d,]+)\b/);
  const peak = rows.get("Highest Rating")?.match(/^([\d,]+)\b/);
  const rank = rows.get("Rank")?.match(/^([\d,]+)(?:st|nd|rd|th)?\b/);
  if (!rating || !peak || !rank) throw new Error("AtCoder profile format unavailable");
  return {
    rating: Number(rating[1].replaceAll(",", "")),
    peakRating: Number(peak[1].replaceAll(",", "")),
    rank: `Algorithm rank #${Number(rank[1].replaceAll(",", "")).toLocaleString("en-US")}`,
    ratingLabel: rows.get("Rating")?.includes("Provisional") ? "Rating · provisional" : "Algorithm rating",
  };
}

/** AtCoder Problems is a community index, not the official contest rank.
 * @param {unknown} payload
 */
export function parseAtCoderSolved(payload) {
  const count = /** @type {{count?:number}|null} */ (payload)?.count;
  if (!Number.isSafeInteger(count) || !number(count)) throw new Error("AtCoder solved count unavailable");
  return /** @type {number} */ (count);
}

/** @param {unknown} payload */
export function parseLeetCode(payload) {
  // Validate upstream responses rather than treating an error or missing profile as zero.
  const data = /** @type {{errors?:unknown[],data?:{matchedUser?:{profile?:{ranking?:number},submitStatsGlobal?:{acSubmissionNum?:{difficulty:string,count:number}[]}},userContestRanking?:{rating?:number,globalRanking?:number}|null}}} */ (payload);
  const user = data?.data?.matchedUser;
  const solved = user?.submitStatsGlobal?.acSubmissionNum?.find((item) => item.difficulty === "All")?.count;
  if (data?.errors?.length || !user || !number(solved)) throw new Error("LeetCode profile unavailable");
  const contest = data.data?.userContestRanking;
  if (contest && (!number(contest.rating) || !number(contest.globalRanking))) throw new Error("Incomplete contest data");
  return { rating: contest ? Math.round(/** @type {number} */ (contest.rating)) : null, peakRating: null, solved: /** @type {number} */ (solved), rank: contest ? `Contest rank #${contest.globalRanking?.toLocaleString("en-US")}` : "Not yet contest-rated" };
}

const leetCodeQuery = "query userStats($username: String!) { matchedUser(username: $username) { profile { ranking } submitStatsGlobal { acSubmissionNum { difficulty count } } } userContestRanking(username: $username) { rating globalRanking } }";

/** @param {typeof fetch} fetcher @param {string} url @param {RequestInit} [options] */
async function request(fetcher, url, options) {
  const response = await fetcher(url, { ...options, signal: AbortSignal.timeout(10_000), cache: "no-store", headers: { "User-Agent": "ReeteshPortfolio/1.0", ...options?.headers } });
  if (!response.ok) throw new Error(`Profile service returned ${response.status}`);
  return response;
}

/** @param {typeof fetch} fetcher */
async function codeforces(fetcher) {
  const responses = await Promise.all([
    request(fetcher, "https://codeforces.com/api/user.info?handles=SKYRIX_rd"),
    request(fetcher, "https://codeforces.com/api/user.status?handle=SKYRIX_rd&from=1&count=10000"),
  ]);
  const [info, submissions] = await Promise.all(responses.map((response) => response.json()));
  const user = info?.result?.[0];
  if (info?.status !== "OK" || submissions?.status !== "OK" || !number(user?.rating) || !Array.isArray(submissions.result)) throw new Error("Codeforces unavailable");
  // Never present a partial submission history as a complete solved total.
  if (submissions.result.length >= 10000) throw new Error("Submission history requires pagination");
  return { rating: user.rating, peakRating: number(user.maxRating) ? user.maxRating : null, solved: countSolved(submissions.result), rank: typeof user.rank === "string" ? user.rank.replace(/^./, (/** @type {string} */ c) => c.toUpperCase()) : "Unranked" };
}

/** Preserve available AtCoder data when just one of its two sources is down.
 * @param {typeof fetch} fetcher
 */
async function atcoder(fetcher) {
  const [profile, solved] = await Promise.allSettled([
    request(fetcher, "https://atcoder.jp/users/SKYRIX_rd?contestType=algo&lang=en").then((response) => response.text()).then(parseAtCoder),
    request(fetcher, "https://kenkoooo.com/atcoder/atcoder-api/v3/user/ac_rank?user=SKYRIX_rd").then((response) => response.json()).then(parseAtCoderSolved),
  ]);
  if (profile.status === "rejected" && solved.status === "rejected") throw new Error("AtCoder sources unavailable");
  return {
    ...(profile.status === "fulfilled" ? profile.value : {}),
    solved: solved.status === "fulfilled" ? solved.value : null,
    status: /** @type {'live'|'partial'} */ (profile.status === "fulfilled" && solved.status === "fulfilled" ? "live" : "partial"),
  };
}

/** Each provider fails independently, retaining explicitly labeled résumé values.
 * @param {typeof fetch} [fetcher]
 * @returns {Promise<CodingProfile[]>}
 */
export async function getCodingProfiles(fetcher = fetch) {
  const loaders = [
    async () => parseLeetCode(await (await request(fetcher, "https://leetcode.com/graphql/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ query: leetCodeQuery, variables: { username: "skyrix_rd" } }) })).json()),
    async () => codeforces(fetcher),
    async () => atcoder(fetcher),
  ];
  return Promise.all(fallbackProfiles.map(async (fallback, index) => {
    try { return { ...fallback, ratingLabel: fallback.id === "atcoder" ? "Algorithm rating" : "Current rating", status: /** @type {const} */ ("live"), ...await loaders[index](), checkedAt: new Date().toISOString() }; }
    catch { return { ...fallback }; }
  }));
}
