#!/usr/bin/env bash
# ex_specos Pre-Commit Verification Hook
# Installed by SpecOS Scaffolding Engine

set -e

echo "[pre-commit] Running architecture and sibling verification..."

# 1. Run verify-system CLI if node is installed
if command -v node >/dev/null 2>&1; then
    if [ -f "tools/verify-specos.mjs" ]; then
        node tools/verify-specos.mjs verify-siblings || {
            echo "[pre-commit ERROR] Sibling dependency check failed. Staged files missing companion implementations." >&2
            exit 1
        }
        node tools/verify-specos.mjs verify-maps || {
            echo "[pre-commit ERROR] Architecture map check failed. Check for broken links or oversized slices." >&2
            exit 1
        }
    fi
fi

# 2. Check for unresolved git conflict markers
if git diff --cached | grep -E "^[<>=]{7}" >/dev/null 2>&1; then
    echo "[pre-commit ERROR] Merge conflict markers detected in staged files." >&2
    exit 1
fi

echo "[pre-commit OK] Verification passed."
exit 0
