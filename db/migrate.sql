BEGIN;
DROP TABLE IF EXISTS portfolio_content;
\i /db/schema.sql
COMMIT;
