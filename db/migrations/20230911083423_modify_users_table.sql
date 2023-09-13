-- migrate:up
ALTER TABLE users MODIFY email VARCHAR(200) NOT NULL UNIQUE;

-- migrate:down
ALTER TABLE users MODIFY email VARCHAR(200) NOT NULL;
