#!/usr/bin/env node
/**
 * Checks the estimate form logic against Wave's price sheet.
 *   node scripts/check-estimate.mjs      (Node 22.6+; Node 24 strips the TypeScript types itself)
 */
import assert from "node:assert/strict";
import {
  ageMessage,
  estimateText,
  nextStep,
  repairEstimate,
  replacementEstimate,
  route,
  showCompareBox,
  urgencyFor,
  zipStatus,
} from "../lib/estimate/logic.ts";
import { replacement, replacementText } from "../lib/estimate/config.ts";

let passed = 0;
const test = (name, fn) => {
  try {
    fn();
    passed++;
  } catch (e) {
    console.error(`✗ ${name}\n  ${e.message}`);
    process.exitCode = 1;
  }
};

const base = { help: "repair", system: "split", age: "5to10", working: "yes", history: "none", systems: "1", zip: "89101" };

/* Routing */
test("repair route", () =>
  assert.deepEqual(route({ help: "repair" }), ["help", "system", "age", "problem", "working", "history", "systems", "zip"]));
test("not sure uses the repair route", () => assert.deepEqual(route({ help: "unsure" }), route({ help: "repair" })));
test("replace route", () =>
  assert.deepEqual(route({ help: "replace", system: "split" }), ["help", "system", "age", "size", "location", "scope", "systems", "zip"]));
test("replace mini-split asks zones", () => assert.ok(route({ help: "replace", system: "minisplit" }).includes("zones")));
test("repair mini-split doesn't ask zones", () => assert.ok(!route({ help: "repair", system: "minisplit" }).includes("zones")));
test("compare route has both", () =>
  assert.deepEqual(route({ help: "compare", system: "heatpump" }), [
    "help", "system", "age", "problem", "working", "history", "size", "location", "scope", "systems", "zip",
  ]));
test("compare-box switch jumps to size", () => assert.equal(nextStep({ ...base, problem: "nocool", help: "compare" }), "size"));
test("all answered → result", () => assert.equal(nextStep({ ...base, problem: "nocool" }), null));

/* Repair ranges */
const ranges = {
  nocool: [254, 829], noheat: [89, 520], nostart: [297, 349], airflow: [89, 490], noise: [490, 829], water: [247, 799],
};
for (const [problem, [low, high]] of Object.entries(ranges)) {
  test(`range ${problem}`, () => assert.deepEqual(repairEstimate({ ...base, problem }).range, { low, high }));
}
test("no cooling less common", () =>
  assert.deepEqual(repairEstimate({ ...base, problem: "nocool" }).lessCommon, [
    "Refrigerant top-off, up to 2 lb ($424)",
    "Refrigerant leak search ($297–$499)",
    "Refrigerant leak repair (from $535)",
    "Compressor ($2,900–$4,500)",
  ]));
test("other has no range", () => {
  const r = repairEstimate({ ...base, problem: "other" });
  assert.equal(r.range, null);
  assert.equal(r.message, "$89 diagnostic visit. We'll give you an exact price before any work.");
});
test("mini-split repair has no range", () => {
  const r = repairEstimate({ ...base, system: "minisplit", problem: "nocool" });
  assert.equal(r.range, null);
  assert.match(r.messageSub, /Mini-split repairs are priced at your visit/);
});
test("heat pump + no heating adds defrost board and reversing valve", () => {
  const l = repairEstimate({ ...base, system: "heatpump", problem: "noheat" }).lessCommon.join("|");
  assert.match(l, /Defrost board \(from \$390\)/);
  assert.match(l, /Reversing valve \(from \$594\)/);
});
test("split + no heating has no heat pump parts", () =>
  assert.doesNotMatch(repairEstimate({ ...base, problem: "noheat" }).lessCommon.join("|"), /Defrost|Reversing/));
test("replace-only has no repair estimate", () => assert.equal(repairEstimate({ ...base, help: "replace", problem: "nocool" }), null));

/* Urgency and safety */
test("checks: no", () => assert.equal(urgencyFor({ ...base, working: "no", problem: "nocool" }).checks.length, 4));
test("checks: partial", () => assert.equal(urgencyFor({ ...base, working: "partial", problem: "nocool" }).checks[0], "Check the thermostat batteries"));
test("safety prominent for water", () => assert.equal(urgencyFor({ ...base, problem: "water" }).prominent, true));
test("safety prominent for noise", () => assert.equal(urgencyFor({ ...base, problem: "noise" }).prominent, true));
test("safety normal for no cooling", () => assert.equal(urgencyFor({ ...base, problem: "nocool" }).prominent, false));

/* Ages */
for (const age of ["lt5", "5to10", "11to15", "gt15", "unsure"]) {
  test(`age message ${age}`, () => assert.ok(ageMessage({ age }).main.length > 10));
}
test("age extras", () => {
  assert.ok(ageMessage({ age: "lt5" }).extra);
  assert.ok(ageMessage({ age: "5to10" }).extra);
  assert.ok(!ageMessage({ age: "11to15" }).extra);
  assert.match(ageMessage({ age: "gt15" }).extra, /R-22/);
});

/* Compare box */
test("compare box: over 15", () => assert.equal(showCompareBox({ ...base, age: "gt15", problem: "nocool" }), true));
test("compare box: 11–15 + multiple", () => assert.equal(showCompareBox({ ...base, age: "11to15", history: "multiple", problem: "nocool" }), true));
test("no compare box: 11–15 + once", () => assert.equal(showCompareBox({ ...base, age: "11to15", history: "once", problem: "nocool" }), false));
test("no compare box: 5–10", () => assert.equal(showCompareBox({ ...base, problem: "nocool" }), false));
test("no compare box in compare mode", () => assert.equal(showCompareBox({ ...base, help: "compare", age: "gt15", problem: "nocool" }), false));

/* Replacement: empty slots → visit message, never $0 */
const rep = { help: "replace", system: "split", age: "gt15", size: "1801to2400", location: "attic", scope: "complete", systems: "1", zip: "89101" };
test("empty slots → visit message", () => {
  const n = replacementEstimate(rep);
  assert.equal(n.range, null);
  assert.equal(n.message, replacementText.visitMessage);
});
test("partial adds refrigerant note", () => assert.match(replacementEstimate({ ...rep, scope: "outdoor" }).partialNote, /R-22 → R-410A/));
test("no $0 in summary", () => assert.doesNotMatch(estimateText(rep), /\$0\b/));

/* Replacement math with temporary test numbers (restored afterwards; never shipped) */
test("replacement math once filled", () => {
  const snap = JSON.stringify(replacement);
  try {
    replacement.sizeMap["1801to2400"] = "3.5";
    replacement.systemPrice.split["3.5"] = { low: 1000, high: 2000 };
    replacement.locationAdder.attic = { low: 100, high: 200 };
    replacement.extraSystems.two = { lowFactor: 2, highFactor: 1.5 };
    assert.deepEqual(replacementEstimate(rep).range, { low: 1100, high: 2200 });
    assert.deepEqual(replacementEstimate({ ...rep, systems: "2" }).range, { low: 2200, high: 3300 });
    assert.equal(replacementEstimate({ ...rep, systems: "3plus" }).range, null, "3+ slot still empty");
    assert.equal(replacementEstimate({ ...rep, location: "unsure" }).range, null, "Not sure location");
    assert.equal(replacementEstimate({ ...rep, size: "unsure" }).range, null, "Not sure size");
    replacement.systemPrice.split["3.5"] = { low: 0, high: 0 };
    assert.equal(replacementEstimate(rep).range, null, "$0 is never shown");
    replacement.miniSplit.singleZone = { low: 500, high: 700 };
    replacement.miniSplit.addedZone = { low: 300, high: 400 };
    const ms = { ...rep, system: "minisplit", zones: "3" };
    assert.deepEqual(replacementEstimate(ms).range, { low: 1100, high: 1500 });
    assert.equal(replacementEstimate({ ...ms, zones: "4plus" }).range, null);
  } finally {
    Object.assign(replacement, JSON.parse(snap));
  }
});

/* ZIPs */
test("zip 89101 in", () => assert.equal(zipStatus("89101"), "in"));
test("zip 89052 Henderson in", () => assert.equal(zipStatus("89052"), "in"));
test("zip 89031 North Las Vegas in", () => assert.equal(zipStatus("89031"), "in"));
test("zip 90210 out", () => assert.equal(zipStatus("90210"), "out"));
test("zip 8910 invalid", () => assert.equal(zipStatus("8910"), "invalid"));

console.log(`${passed} checks passed${process.exitCode ? ", some FAILED" : ""}`);
