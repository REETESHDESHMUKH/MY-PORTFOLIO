import test from "node:test";
import assert from "node:assert/strict";
import { countSolved, parseAtCoder, parseAtCoderSolved, parseLeetCode, getCodingProfiles } from "./coding-profiles.mjs";

const atCoderHtml = `<table><tr><th class="no-break">Rank</th><td>58604th <span class="gray">(Top 46%)</span></td></tr><tr><th>Rating</th><td><img src="rating.png"><span class="user-gray">132</span> <span>(Provisional)</span></td></tr><tr><th>Highest Rating</th><td><span>197</span> — <span>10 Kyu</span></td></tr></table>`;

test("Codeforces counts unique accepted problems, not submissions or failed attempts", () => {
  assert.equal(countSolved([
    { verdict: "OK", problem: { contestId: 1, index: "A" } },
    { verdict: "OK", problem: { contestId: 1, index: "A" } },
    { verdict: "WRONG_ANSWER", problem: { contestId: 2, index: "A" } },
    { verdict: "OK", problem: { contestId: 2, index: "A" } },
    { verdict: "OK", problem: { problemsetName: "acmsguru", index: "1" } },
  ]), 3);
  assert.throws(() => countSolved([{ verdict: "OK", problem: { index: "A" } }]));
});

test("AtCoder separates current, peak, provisional status, and official algorithm rank", () => {
  assert.deepEqual(parseAtCoder(atCoderHtml), { rating: 132, peakRating: 197, rank: "Algorithm rank #58,604", ratingLabel: "Rating · provisional" });
  assert.equal(parseAtCoder(atCoderHtml.replace("(Provisional)", "")).ratingLabel, "Algorithm rating");
  assert.throws(() => parseAtCoder("<html>Access denied</html>"));
  assert.throws(() => parseAtCoder(atCoderHtml.replace("Highest Rating", "Other value")));
});

test("AtCoder Problems uses the accepted count, not its separate community ranking", () => {
  assert.equal(parseAtCoderSolved({ count: 31, rank: 148006 }), 31);
  assert.equal(parseAtCoderSolved({ count: 0 }), 0);
  for (const invalid of [null, {}, { count: "31" }, { count: -1 }, { count: 1.5 }]) {
    assert.throws(() => parseAtCoderSolved(invalid));
  }
});

test("LeetCode uses the All total and contest ranking, and supports unrated users", () => {
  const matchedUser = { submitStatsGlobal: { acSubmissionNum: [{ difficulty: "Easy", count: 84 }, { difficulty: "All", count: 385 }] } };
  assert.deepEqual(parseLeetCode({ data: { matchedUser, userContestRanking: { rating: 1748.916, globalRanking: 93041 } } }), { rating: 1749, peakRating: null, solved: 385, rank: "Contest rank #93,041" });
  assert.equal(parseLeetCode({ data: { matchedUser, userContestRanking: null } }).rating, null);
  assert.throws(() => parseLeetCode({ errors: [{ message: "blocked" }] }));
  assert.throws(() => parseLeetCode({ data: { matchedUser: null } }));
});

test("Provider failures keep unknown solved counts null and never label fallback data live", async () => {
  const profiles = await getCodingProfiles(async () => { throw new Error("offline"); });
  assert.equal(profiles.length, 3);
  assert.ok(profiles.every((profile) => profile.status !== "live" && profile.checkedAt === null && profile.solved === null));
  assert.equal(profiles[2].id, "atcoder");
  assert.equal(profiles[2].status, "unavailable");
  assert.equal(profiles[2].rating, null);
  assert.ok(profiles.every((profile) => profile.id !== "codechef"));
});

test("One successful provider still updates when the other providers fail", async () => {
  const profiles = await getCodingProfiles(async (url) => {
    if (!url.includes("leetcode.com")) throw new Error("unavailable");
    return new Response(JSON.stringify({ data: { matchedUser: { submitStatsGlobal: { acSubmissionNum: [{ difficulty: "All", count: 0 }] } }, userContestRanking: null } }));
  });
  assert.equal(profiles[0].status, "live");
  assert.equal(profiles[0].solved, 0);
  assert.equal(profiles[0].rating, null);
  assert.ok(profiles[0].checkedAt);
  assert.equal(profiles[1].status, "snapshot");
});

test("A truncated Codeforces submission history never becomes a live solved count", async () => {
  const profiles = await getCodingProfiles(async (url) => {
    if (url.includes("user.info")) return new Response(JSON.stringify({ status: "OK", result: [{ rating: 1438, maxRating: 1438, rank: "specialist" }] }));
    if (url.includes("user.status")) return new Response(JSON.stringify({ status: "OK", result: Array.from({ length: 10000 }, () => ({ verdict: "OK", problem: { contestId: 1, index: "A" } })) }));
    throw new Error("unavailable");
  });
  assert.equal(profiles[1].status, "snapshot");
  assert.equal(profiles[1].solved, null);
});

test("AtCoder combines first-party rating with the community solved count", async () => {
  const profiles = await getCodingProfiles(async (url) => {
    if (url.includes("atcoder.jp")) {
      assert.ok(url.includes("contestType=algo"));
      return new Response(atCoderHtml);
    }
    if (url.includes("kenkoooo.com")) return new Response(JSON.stringify({ count: 31, rank: 148006 }));
    throw new Error("unavailable");
  });
  assert.equal(profiles[2].status, "live");
  assert.equal(profiles[2].solved, 31);
  assert.equal(profiles[2].rating, 132);
  assert.equal(profiles[2].ratingLabel, "Rating · provisional");
  assert.equal(profiles[2].rank, "Algorithm rank #58,604");
});

test("AtCoder retains live rating when the solved-count index is unavailable", async () => {
  const profiles = await getCodingProfiles(async (url) => {
    if (url.includes("atcoder.jp")) return new Response(atCoderHtml);
    throw new Error("unavailable");
  });
  assert.equal(profiles[2].status, "partial");
  assert.equal(profiles[2].rating, 132);
  assert.equal(profiles[2].solved, null);
  assert.ok(profiles[2].checkedAt);
});

test("AtCoder retains solved count when its official profile is unavailable", async () => {
  const profiles = await getCodingProfiles(async (url) => {
    if (url.includes("kenkoooo.com")) return new Response(JSON.stringify({ count: 31, rank: 148006 }));
    throw new Error("unavailable");
  });
  assert.equal(profiles[2].status, "partial");
  assert.equal(profiles[2].rating, null);
  assert.equal(profiles[2].solved, 31);
  assert.equal(profiles[2].rank, "Rating unavailable");
});
