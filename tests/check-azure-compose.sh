#!/bin/sh
set -eu
cd "$(dirname "$0")/.."
grep -q 'name: teras-luhur_teras-net' compose.azure.yaml
grep -q 'container_name: neon_portfolio' compose.azure.yaml
grep -q 'DATABASE_URL' compose.azure.yaml
grep -q 'minio-init' compose.azure.yaml
grep -q 'http://minio:9000' media/init.sh
printf 'Azure compose contract OK\n'
