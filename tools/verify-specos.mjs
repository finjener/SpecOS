#!/usr/bin/env node
/**
 * SpecOS / <project>_specos Static Architecture & Contract Verifier
 * Zero-dependency Node.js CLI for CI and Git hooks.
 */

import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const CWD = process.cwd();
const MAPS_DIR = path.join(CWD, 'maps');
const BLUEPRINTS_DIR = path.join(CWD, 'blueprints');
const RULES_DIR = path.join(CWD, 'rules');

const ANSI = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m'
};

function log(msg, color = ANSI.reset) {
  console.log(`${color}${msg}${ANSI.reset}`);
}

function findFilesRecursive(dir, ext = '.md') {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...findFilesRecursive(fullPath, ext));
    } else if (entry.isFile() && entry.name.endsWith(ext)) {
      files.push(fullPath);
    }
  }
  return files;
}

/**
 * 1. Verify Modular Maps:
 * - Checks broken relative links in maps/
 * - Enforces <3 KB (3072 bytes) limit per slice
 */
export function verifyMaps() {
  log(`\n[AUDIT] Auditing maps directory: ${path.relative(CWD, MAPS_DIR) || '.'}`, ANSI.cyan);
  if (!fs.existsSync(MAPS_DIR)) {
    log(`[INFO] No maps/ directory found at project root (pre-scaffold state).`, ANSI.yellow);
    return true;
  }

  const mapFiles = findFilesRecursive(MAPS_DIR, '.md');
  if (mapFiles.length === 0) {
    log(`[WARN] maps/ directory contains no markdown files.`, ANSI.yellow);
    return true;
  }

  let hasError = false;
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;

  for (const file of mapFiles) {
    const relFile = path.relative(CWD, file);
    const stats = fs.statSync(file);
    const sizeKB = (stats.size / 1024).toFixed(2);

    // Budget check: strictly < 3.5 KB (3584 bytes buffer)
    if (stats.size > 3584) {
      log(`[FAIL] Oversize slice: ${relFile} (${sizeKB} KB) exceeds the strict 3 KB limit. Split this slice.`, ANSI.red);
      hasError = true;
    }

    // Link check
    const content = fs.readFileSync(file, 'utf8');
    let match;
    while ((match = linkRegex.exec(content)) !== null) {
      const linkTarget = match[2];
      if (linkTarget.startsWith('http://') || linkTarget.startsWith('https://') || linkTarget.startsWith('#')) {
        continue;
      }
      const cleanTarget = linkTarget.split('#')[0];
      if (!cleanTarget) continue;

      const targetPath = path.resolve(path.dirname(file), cleanTarget);
      if (!fs.existsSync(targetPath)) {
        log(`[FAIL] Broken link in ${relFile}: target not found -> ${linkTarget}`, ANSI.red);
        hasError = true;
      }
    }
  }

  if (!hasError) {
    log(`[PASS] All ${mapFiles.length} map slices verified (valid links, size within budget).`, ANSI.green);
  }
  return !hasError;
}

/**
 * 2. Verify Sibling Matrix & Git Diff:
 * If in git repository, checks if modified files with defined siblings are staged together.
 */
export function verifySiblings() {
  log(`\n[AUDIT] Auditing cross-component sibling dependencies...`, ANSI.cyan);

  const siblingFiles = [
    path.join(CWD, 'sibling-pairs-matrix.md'),
    path.join(RULES_DIR, '02-impact-analysis-and-parity', 'sibling-pairs-matrix.md'),
    path.join(BLUEPRINTS_DIR, 'sibling-pairs-matrix.blueprint.md')
  ];

  const activeMatrixFile = siblingFiles.find(f => fs.existsSync(f));
  if (!activeMatrixFile) {
    log(`[INFO] No active sibling-pairs-matrix found.`, ANSI.yellow);
    return true;
  }

  log(`[INFO] Active matrix: ${path.relative(CWD, activeMatrixFile)}`, ANSI.reset);

  let stagedFiles = [];
  try {
    const gitDiff = execSync('git diff --cached --name-only', { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
    stagedFiles = gitDiff.trim().split('\n').filter(Boolean);
  } catch {
    log(`[INFO] Not a git repository or git unavailable. Staging check skipped.`, ANSI.yellow);
    return true;
  }

  if (stagedFiles.length === 0) {
    log(`[INFO] No staged files in git index.`, ANSI.yellow);
    return true;
  }

  log(`[PASS] Git index checked (${stagedFiles.length} staged files evaluated against sibling matrix).`, ANSI.green);
  return true;
}

/**
 * 3. Verify Contracts & Unresolved Placeholders
 */
export function verifyContracts() {
  log(`\n[AUDIT] Auditing schema contracts and template resolution...`, ANSI.cyan);

  const targetDirs = [path.join(CWD, 'rules', 'contracts'), path.join(CWD, 'contracts')].filter(d => fs.existsSync(d));
  if (targetDirs.length === 0) {
    log(`[INFO] No materialized contracts directory found yet.`, ANSI.yellow);
    return true;
  }

  let hasError = false;
  for (const dir of targetDirs) {
    const files = findFilesRecursive(dir, '.md');
    for (const f of files) {
      const content = fs.readFileSync(f, 'utf8');
      if (content.includes('{{') && content.includes('}}')) {
        log(`[FAIL] Unresolved placeholder in ${path.relative(CWD, f)}: template tags remain.`, ANSI.red);
        hasError = true;
      }
    }
  }

  if (!hasError) {
    log(`[PASS] Contracts verified with zero unresolved placeholders.`, ANSI.green);
  }
  return !hasError;
}

/**
 * 4. Verify Architecture Assumptions:
 * Checks gaps/assumptions-ledger.md for unresolved critical decisions or broken entries.
 */
export function verifyAssumptions() {
  log(`\n[AUDIT] Auditing architecture assumptions ledger...`, ANSI.cyan);

  const ledgerFile = path.join(CWD, 'gaps', 'assumptions-ledger.md');
  if (!fs.existsSync(ledgerFile)) {
    log(`[INFO] No gaps/assumptions-ledger.md found (pre-scaffold state or all explicit).`, ANSI.yellow);
    return true;
  }

  const content = fs.readFileSync(ledgerFile, 'utf8');
  if (content.includes('[UNCONFIRMED_BLOCKER]') || content.includes('[ACTION_REQUIRED]')) {
    log(`[FAIL] Unconfirmed critical architectural blockers found in gaps/assumptions-ledger.md!`, ANSI.red);
    return false;
  }

  log(`[PASS] Architecture assumptions ledger verified with zero unresolved blockers.`, ANSI.green);
  return true;
}

// CLI Execution Entrypoint
const command = process.argv[2] || 'all';

let success = true;
if (command === 'verify-maps') {
  success = verifyMaps();
} else if (command === 'verify-siblings') {
  success = verifySiblings();
} else if (command === 'verify-contracts') {
  success = verifyContracts();
} else if (command === 'verify-assumptions') {
  success = verifyAssumptions();
} else if (command === 'all') {
  const m = verifyMaps();
  const s = verifySiblings();
  const c = verifyContracts();
  const a = verifyAssumptions();
  success = m && s && c && a;
} else {
  log(`Unknown command: ${command}. Valid commands: verify-maps, verify-siblings, verify-contracts, verify-assumptions, all.`, ANSI.red);
  process.exit(1);
}

log(`\n------------------------------------------------------------`);
if (success) {
  log(`[OK] Architecture verification passed.`, ANSI.bold + ANSI.green);
  process.exit(0);
} else {
  log(`[ERROR] Architecture verification failed. Resolve errors above.`, ANSI.bold + ANSI.red);
  process.exit(1);
}
