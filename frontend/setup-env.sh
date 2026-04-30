#!/usr/bin/env bash
set -euo pipefail

ENVIRONMENT="${1:-dev}"

doppler secrets substitute \
  --config "$ENVIRONMENT" \
  .env.tpl > .env

doppler secrets substitute \
  --config "$ENVIRONMENT" \
  .env.local.tpl > .env.local