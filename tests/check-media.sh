#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
[[ "$(docker exec tl-ops-pg psql -U postgres -d neon_portfolio -Atqc "SELECT count(*) FROM information_schema.tables WHERE table_schema='public' AND table_name='project_metric'")" = "0" ]]
[[ "$(docker exec tl-ops-pg psql -U postgres -d neon_portfolio -Atqc "SELECT count(*) FROM information_schema.columns WHERE table_name IN ('project','social_link') AND column_name IN ('thumbnail_url','image_url')")" = "2" ]]
[[ "$(docker exec tl-ops-pg psql -U postgres -d neon_portfolio -Atqc "SELECT count(*) FROM (SELECT image_url AS url FROM social_link UNION ALL SELECT thumbnail_url FROM project) assets WHERE url LIKE 'https://assets.alvan.my.id/%'")" = "6" ]]
! grep -R -q '192\.168\.1\.4:9000' db server client
echo 'media schema and UI contract OK'
