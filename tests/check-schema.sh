#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
[[ "$(docker exec tl-ops-pg psql -U postgres -d neon_portfolio -Atqc "SELECT count(*) FROM information_schema.columns WHERE data_type IN ('json','jsonb')")" = "0" ]]
[[ "$(docker exec tl-ops-pg psql -U postgres -d neon_portfolio -Atqc "SELECT count(*) FROM information_schema.tables WHERE table_schema='public' AND table_name IN ('profile','project','experience','skill')")" = "4" ]]
grep -q 'href={p.url}' client/src/main.jsx
grep -q "'PROJECTS'" db/schema.sql
echo 'relational schema and project links OK'
