import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import ts from "typescript";

// Load the actual content module without adding a TypeScript test-runner dependency.
const source = readFileSync(new URL("./portfolio.ts", import.meta.url), "utf8");
const { outputText } = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 },
});
const { projects } = await import(`data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`);
const busPrix = projects.find((project) => project.id === "bus-prix");

test("The featured BUS PRIX card uses the resume stack and booking features", () => {
  assert.equal(projects[0].id, "bus-prix");
  assert.deepEqual(busPrix.tags, ["Python", "Django", "React", "PostgreSQL", "Redis", "REST APIs"]);
  for (const feature of ["route search", "seat selection", "user login", "booking history", "cancellations"]) {
    assert.ok(busPrix.description.includes(feature), `Missing ${feature} in the visible description`);
  }
  assert.doesNotMatch(busPrix.description, /MySQL|Bootstrap|bus-manager/i);
});

test("BUS PRIX details retain the resume's backend contributions", () => {
  const details = busPrix.details.join(" ");
  assert.match(details, /Django REST APIs.*trip schedules.*seat availability/);
  assert.match(details, /PostgreSQL.*transaction-safe seat locking.*prevent duplicate/);
  assert.match(details, /Cached.*route and schedule.*Redis.*reduce database load/);
});

test("The original BUS PRIX repository is clearly labeled as an earlier version", () => {
  assert.equal(busPrix.githubLabel, "Earlier version");
  assert.equal(busPrix.github, "https://github.com/REETESHDESHMUKH/BUS-TICKET-BOOKING-SYSTEM");
  assert.ok(busPrix.details.some((detail) => detail.includes("earlier Django/MySQL implementation")));
});
