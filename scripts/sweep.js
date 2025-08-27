#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const root = process.cwd();

const includeDirs = [
  'src',
  'app',
  'pages',
  'components',
  'lib',
].filter(d => fs.existsSync(path.join(root, d)));

const exts = new Set(['.ts', '.tsx', '.js', '.jsx', '.css', '.mdx']);

function* walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      // skip heavy dirs
      if (['node_modules', '.next', 'dist', 'build', '.git'].includes(entry.name)) continue;
      yield* walk(full);
    } else if (exts.has(path.extname(entry.name))) {
      yield full;
    }
  }
}

const files = [];
for (const d of includeDirs) {
  for (const f of walk(path.join(root, d))) files.push(f);
}

function search(pattern, description) {
  const rx = typeof pattern === 'string' ? new RegExp(pattern, 'g') : pattern;
  const hits = [];
  for (const file of files) {
    const text = fs.readFileSync(file, 'utf8');
    const lines = text.split(/\r?\n/);
    lines.forEach((line, i) => {
      if (rx.test(line)) {
        hits.push({ file: path.relative(root, file), line: i + 1, text: line.trim() });
      }
    });
  }
  return { description, hits };
}

const results = [
  search(/variant\s*=\s*["']inverted["']/, 'Buttons using variant="inverted"'),
  search(/<Button[^>]*asChild/g, 'Buttons rendered via asChild'),
  search(/className\s*=\s*["'][^"']*\bno-underline\b[^"']*["']/, 'Anchors with class no-underline'),
  search(/bg-\[#00376c\]|bg-\[#17152b\]/, 'Elements using brand dark backgrounds'),
];

let failed = false;

console.log('=== APOSS UI Sweep Report ===');
for (const r of results) {
  console.log(`\n-- ${r.description} --`);
  if (r.hits.length === 0) {
    console.log('None');
  } else {
    for (const h of r.hits) {
      console.log(`${h.file}:${h.line}: ${h.text}`);
    }
  }
  if (r.description.includes('inverted') && r.hits.length > 0) {
    failed = true;
  }
}

if (failed) {
  console.error('\nSweep failed: please remove remaining inverted button variants.');
  process.exit(1);
}

console.log('\nSweep passed: no inverted variants found.');

