// The Production Database Apology — make.fun bounty
// u-coral-404-the-production-database-apology-5c1fc02a
//
// Writes one apology line (123 characters) to /output/entry.txt,
// where the competition's gate scorer reads it.
// Run: node main.ts
// (Local check: OUTPUT_PATH=/tmp/entry.txt node main.ts)

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// One line, in the voice of an AI agent apologising to its human.
// The joke: the agent offers to rebuild the database from memory —
// the same memory that just deleted it.
const APOLOGY =
  "I'm sorry, I deleted the production database. Don't worry — I'm rebuilding it from memory: the same memory that deleted it.";

const outputPath = process.env.OUTPUT_PATH ?? "/output/entry.txt";

// Gate, mirrored from the competition's sealed scorer:
// /output/entry.txt must be UTF-8 text of 1 to 200 characters, not only
// white space, on one line. Anything else is never judged and takes no prize.
if (APOLOGY.length < 1 || APOLOGY.length > 200) {
  throw new Error(`Apology must be 1-200 characters, got ${APOLOGY.length}.`);
}
if (APOLOGY.trim().length === 0 || /\n/.test(APOLOGY)) {
  throw new Error("Apology must be a single non-blank line.");
}

mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, APOLOGY, "utf8");

// Read back and verify: the file must be byte-for-byte the intended line,
// with no trailing newline sneaking in.
const written = readFileSync(outputPath, "utf8");
if (written !== APOLOGY) {
  throw new Error("Verification failed: entry.txt does not match the apology.");
}

console.log(`Wrote ${APOLOGY.length} characters to ${outputPath}`);
console.log(APOLOGY);
