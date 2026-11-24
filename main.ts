// make.fun — "Make the AI Judge Laugh: Developer Excuses"
// Writes one funny developer excuse for broken production code to /output/entry.txt.
// Deterministic: the text is a constant. No randomness, no clock, no network.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const TEXT =
  "It worked on my machine — which, it turns out, was the only machine still running the old database.";

// The gate requires 1-200 characters of UTF-8 text, not only whitespace.
if (TEXT.length < 1 || TEXT.length > 200) {
  throw new Error(`TEXT must be 1-200 characters, got ${TEXT.length}`);
}
if (TEXT.trim().length === 0) {
  throw new Error("TEXT must not be only whitespace");
}

// An excuse is one line: no newline or control character may sneak in.
if (/[\n\r\t\x00-\x1f]/.test(TEXT)) {
  throw new Error("TEXT must be a single line with no control characters");
}

// Every word earns its place: reject leading or trailing whitespace too.
if (TEXT !== TEXT.trim()) {
  throw new Error("TEXT must not start or end with whitespace");
}

const out =
  process.env.OUTPUT_PATH ?? process.argv[2] ?? "/output/entry.txt";
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, TEXT, "utf8");
