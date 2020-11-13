CREATE TABLE thingful_users (
  id SERIAL PRIMARY KEY,
  fullname TEXT NOT NULL,
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  nickname TEXT,
  date_created TIMESTAMPTZ NOT NULL DEFAULT now(),
  date_modified TIMESTAMPTZ
);

ALTER TABLE thingful_things
  ADD COLUMN
    user_id INTEGER REFERENCES thingful_users(id)
    ON DELETE SET NULL;