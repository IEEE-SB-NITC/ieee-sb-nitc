-- Run this in your Supabase SQL editor to set up the schema.

create table societies (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  slug       text unique not null,
  created_at timestamptz default now()
);

-- Seed the 15 IEEE societies
insert into societies (name, slug) values
  ('Computer Society', 'cs'),
  ('Women in Engineering', 'wie'),
  ('Robotics & Automation Society', 'ras'),
  ('Power & Energy Society', 'pes'),
  ('Signal Processing Society', 'sps'),
  ('Communications Society', 'comsoc'),
  ('Industry Applications Society', 'ias'),
  ('Engineering in Medicine & Biology Society', 'embs'),
  ('Photonics Society', 'photonics'),
  ('Circuits & Systems Society', 'cas'),
  ('Control Systems Society', 'css'),
  ('Electron Devices Society', 'eds'),
  ('Magnetics Society', 'magnetics'),
  ('Oceanic Engineering Society', 'oes'),
  ('Aerospace & Electronic Systems Society', 'aess');

-- users doubles as the allowlist.
-- A row is created by an admin before the user ever logs in.
-- is_active flips to true on their first Google sign-in.
create table users (
  id         uuid primary key default gen_random_uuid(),
  email      text unique not null,
  name       text,
  role       text not null check (role in ('superuser', 'sb_admin', 'society_admin', 'society_member')),
  society_id uuid references societies (id) on delete set null,
  added_by   text,
  is_active  boolean default false,
  created_at timestamptz default now()
);

create index on users (email);
create index on users (society_id);

create table events (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  description text,
  date        timestamptz not null,
  society_id  uuid not null references societies (id) on delete cascade,
  created_by  text not null,
  created_at  timestamptz default now()
);

create index on events (society_id);
create index on events (date);
