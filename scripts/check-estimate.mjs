#!/usr/bin/env node
/**
 * Checks the estimate form logic against Wave's price sheet (tech questionnaire, Nov 2026).
 *   node scripts/check-estimate.mjs      (Node 22.6+; Node 24 strips the TypeScript types itself)
 */
import assert from "node:assert/strict";
import {
  ageMessage,
  estimateText,
  monthlyFor,
  nextStep,
  rangeText,
  repairEstimate,
  replacementEstimate,
  route,
  showCompareBox,
  unsureCount,
  urgencyFor,
  zipStatus,
} from "../lib/estimate/logic.ts";
import { priceList, replacementText, unsureText } from "../lib/estimate/config.ts";

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

const base = { help: "repair", system: "split", age: "5to10", working: "yes", systems: "1", zip: "89101" };

/* Routing */
test("repair route", () =>
  assert.deepEqual(route({ help: "repair" }), ["help", "system", "age", "problem", "working", "systems", "zip"]));
test("replace route", () =>
  assert.deepEqual(route({ help: "replace", system: "split" }), ["help", "system", "age", "size", "scope", "ducts", "systems", "zip"]));
test("replace mini-split skips size and ducts", () =>
  assert.deepEqual(route({ help: "replace", system: "minisplit" }), ["help", "system", "age", "scope", "systems", "zip"]));
test("compare route has both", () =>
  assert.deepEqual(route({ help: "compare", system: "heatpump" }), [
    "help", "system", "age", "problem", "working", "size", "scope", "ducts", "systems", "zip",
  ]));
test("no location, history or zones steps", () =>
  assert.ok(!route({ help: "compare", system: "minisplit" }).some((s) => ["location", "history", "zones"].includes(s))));
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
test("heat pump + no heating adds defrost board only", () => {
  const l = repairEstimate({ ...base, system: "heatpump", problem: "noheat" }).lessCommon.join("|");
  assert.match(l, /Defrost board \(from \$390\)/);
  assert.doesNotMatch(l, /Reversing/);
});
test("reversing valve removed from the price list", () => assert.ok(!("reversingValve" in priceList)));
test("split + no heating has no heat pump parts", () =>
  assert.doesNotMatch(repairEstimate({ ...base, problem: "noheat" }).lessCommon.join("|"), /Defrost/));
test("replace-only has no repair estimate", () => assert.equal(repairEstimate({ ...base, help: "replace", problem: "nocool" }), null));
test("one Not sure still shows a repair price", () =>
  assert.deepEqual(repairEstimate({ ...base, age: "unsure", problem: "nocool" }).range, { low: 254, high: 829 }));
test("two Not sure → repair visit message", () => {
  const r = repairEstimate({ ...base, age: "unsure", working: "unsure", problem: "nocool" });
  assert.equal(r.range, null);
  assert.equal(r.message, unsureText.repair);
});

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

/* Compare box: over 15 only */
test("compare box: over 15", () => assert.equal(showCompareBox({ ...base, age: "gt15", problem: "nocool" }), true));
test("no compare box: 11–15", () => assert.equal(showCompareBox({ ...base, age: "11to15", problem: "nocool" }), false));
test("no compare box in compare mode", () => assert.equal(showCompareBox({ ...base, help: "compare", age: "gt15", problem: "nocool" }), false));

/* Replacement prices */
const rep = { help: "replace", system: "split", age: "gt15", size: "lt1400", scope: "complete", ducts: "good", systems: "1", zip: "89101" };
const R = (a) => replacementEstimate({ ...rep, ...a });
const table = {
  split: { lt1400: [9800, 14500], "1401to1800": [9800, 15900], "1801to2300": [11600, 15900], gt2300: [11600, 15900] },
  package: { lt1400: [10900, 14900], "1401to1800": [10900, 17400], "1801to2300": [13900, 17400], gt2300: [13900, 17400] },
  heatpump: { lt1400: [10400, 14300], "1401to1800": [10400, 16100], "1801to2300": [12900, 16100], gt2300: [12900, 16100] },
  unsure: { lt1400: [9800, 14900], "1401to1800": [9800, 17400], "1801to2300": [11600, 17400], gt2300: [11600, 17400] },
};
for (const [system, sizes] of Object.entries(table)) {
  for (const [size, [low, high]] of Object.entries(sizes)) {
    test(`replace ${system} ${size}`, () => assert.deepEqual(R({ system, size }).range, { low, high }));
  }
}
test("Not sure size = under 1,400", () => assert.deepEqual(R({ size: "unsure" }).range, { low: 9800, high: 14500 }));
test("high end shows +", () => assert.equal(rangeText(R({}).range, R({}).plus), "$9,800–$14,500+"));
test("big home note", () => assert.ok(R({ size: "gt2300" }).notes.includes(replacementText.bigHomeNote)));
test("2 systems ×2", () => assert.deepEqual(R({ systems: "2" }).range, { low: 19600, high: 29000 }));
test("3+ systems ×3 with visit note", () => {
  const n = R({ systems: "3plus" });
  assert.deepEqual(n.range, { low: 29400, high: 43500 });
  assert.ok(n.notes.includes(replacementText.threePlusNote));
});
test("Not sure systems = 1", () => assert.deepEqual(R({ systems: "unsure" }).range, { low: 9800, high: 14500 }));
test("mini-split single zone", () => {
  const n = R({ system: "minisplit", size: undefined, ducts: undefined });
  assert.deepEqual(n.range, { low: 4900, high: 7900 });
  assert.ok(n.notes.includes(replacementText.miniSplitNote));
});
test("partial → visit message + refrigerant note", () => {
  const n = R({ scope: "outdoor" });
  assert.equal(n.range, null);
  assert.equal(n.message, replacementText.partialMessage);
  assert.match(n.notes[0], /R-22 → R-410A/);
});
test("Not sure scope → visit message", () => assert.equal(R({ scope: "unsure" }).message, replacementText.visitMessage));
test("two Not sure → replacement visit message", () => {
  assert.equal(unsureCount({ ...rep, system: "unsure", size: "unsure" }), 2);
  const n = R({ system: "unsure", size: "unsure" });
  assert.equal(n.range, null);
  assert.equal(n.message, unsureText.replacement);
});

/* Ducts */
test("old ducts add a separate duct line", () =>
  assert.equal(R({ ducts: "old", size: "1401to1800" }).ductLine, replacementText.ductLine("$8,400–$10,500")));
test("old ducts on a big home → priced at visit", () => assert.equal(R({ ducts: "old", size: "gt2300" }).ductLine, replacementText.ductVisit));
test("good ducts → no duct line", () => assert.equal(R({}).ductLine, undefined));
test("duct line isn't added to the total", () => assert.deepEqual(R({ ducts: "old" }).range, R({}).range));

/* Financing: $114/mo per $10k, on the high end, $1,500 minimum */
test("monthly on high end", () => assert.equal(monthlyFor({ low: 9800, high: 14500 }), 166));
test("monthly line shown", () => assert.equal(R({}).monthly, "Or about $166/mo with approved credit"));
test("no monthly under $1,500", () => assert.equal(monthlyFor({ low: 254, high: 829 }), null));

/* Summary */
test("no $0 in summary", () => assert.doesNotMatch(estimateText({ ...rep, help: "compare", problem: "nocool", working: "yes" }), /\$0\b/));
test("replacement fine print doesn't say free", () => assert.doesNotMatch(estimateText(rep), /\bfree\b/i));

/* ZIPs */
test("zip 89101 in", () => assert.equal(zipStatus("89101"), "in"));
test("zip 89052 Henderson in", () => assert.equal(zipStatus("89052"), "in"));
test("zip 89033 North Las Vegas in", () => assert.equal(zipStatus("89033"), "in"));
test("zip 90210 out", () => assert.equal(zipStatus("90210"), "out"));
test("zip 8910 invalid", () => assert.equal(zipStatus("8910"), "invalid"));

console.log(`${passed} checks passed${process.exitCode ? ", some FAILED" : ""}`);
