-- Query 1: Add an account for "Tony Stark"
INSERT INTO account (
        account_firstname,
        account_lastname,
        account_email,
        account_password
    )
VALUES (
        'Tony',
        'Stark',
        'tony@starkent.com',
        'Iam1ronM@n'
    );
-- Query 2: Change "Tony Stark" to an admin
UPDATE account
SET account_type = 'Admin'
WHERE account_firstname = 'Tony'
    AND account_lastname = 'Stark';
-- Query 3: 86 Tony Stark
DELETE FROM account
WHERE account_firstname = 'Tony'
    AND account_lastname = 'Stark';
-- Query 4: Update the description for the GM HUMMER
UPDATE inventory
SET inv_description = REPLACE(
        inv_description,
        'small interiors',
        'a huge interior'
    )
WHERE inv_make = 'GM'
    AND inv_model = 'Hummer';
-- Query 5: Display all "Sports" cars, with their make, model, and classification
SELECT i.inv_make AS Make,
    i.inv_model AS Model,
    c.classification_name AS Classification
FROM inventory i
    INNER JOIN classification c ON i.classification_id = c.classification_id
WHERE c.classification_name = 'Sport';
-- Query 6: Change all of the thumbnail paths to include /vehicles after /images
UPDATE inventory
SET inv_image = REPLACE(inv_image, '/images/', '/images/vehicles/'),
    inv_thumbnail = REPLACE(inv_thumbnail, '/images/', '/images/vehicles/');