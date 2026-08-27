BEGIN;
UPDATE social_link SET image_url = regexp_replace(image_url, '^https?://[^/]+/portfolio-assets/', 'https://minio.alvan.my.id/portfolio-assets/');
UPDATE project SET thumbnail_url = regexp_replace(thumbnail_url, '^https?://[^/]+/portfolio-assets/', 'https://minio.alvan.my.id/portfolio-assets/');
COMMIT;
