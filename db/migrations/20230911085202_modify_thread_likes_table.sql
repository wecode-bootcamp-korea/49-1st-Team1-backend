-- migrate:up
ALTER TABLE thread_likes ADD CONSTRAINT unique_user_post UNIQUE (user_id, thread_id);

-- migrate:down
ALTER TABLE thread_likes DROP CONSTRAINT unique_user_post;
