#!/usr/bin/env bash
set -euo pipefail

ENVIRONMENT="${1:-dev}"

doppler secrets substitute \
  --config "$ENVIRONMENT" \
  infra/.env.tpl > infra/.env

doppler secrets substitute \
  --config "$ENVIRONMENT" \
  src/main/resources/application-${ENVIRONMENT}.properties.tpl \
  > src/main/resources/application-${ENVIRONMENT}.properties