BEGIN;
UPDATE social_link SET image_url = replace(image_url, 'http://192.168.1.4:9000/portfolio-assets/', 'https://assets.alvan.my.id/portfolio-assets/');
UPDATE project SET thumbnail_url = replace(thumbnail_url, 'http://192.168.1.4:9000/portfolio-assets/', 'https://assets.alvan.my.id/portfolio-assets/');
COMMIT;
