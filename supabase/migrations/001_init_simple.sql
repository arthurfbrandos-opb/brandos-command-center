-- Rodar no Supabase SQL Editor

create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  emoji text,
  description text,
  status text default 'active',
  progress integer default 0,
  deadline timestamp,
  created_by text not null,
  created_at timestamp default now(),
  updated_at timestamp default now()
);

create table if not exists sprints (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete cascade,
  name text not null,
  start_date timestamp not null,
  end_date timestamp not null,
  status text default 'active',
  created_at timestamp default now()
);

create table if not exists tasks (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete cascade,
  sprint_id uuid references sprints(id) on delete set null,
  title text not null,
  description text,
  status text default 'todo',
  priority text default 'medium',
  assignee text,
  deadline timestamp,
  created_by text not null,
  created_at timestamp default now(),
  updated_at timestamp default now()
);

create table if not exists agents (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  emoji text,
  project_id uuid references projects(id),
  allocation integer default 0,
  status text default 'offline',
  created_at timestamp default now()
);

create table if not exists metrics (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete cascade,
  metric_name text not null,
  value numeric not null,
  week integer,
  created_at timestamp default now()
);

-- Dados iniciais
insert into projects (name, emoji, description, status, progress, deadline, created_by) values
  ('Negócio Simples', '🎓', 'SaaS + Mentoria para donos de agência', 'active', 36, '2026-03-22', 'arthur'),
  ('CliniSales', '🏥', 'Assessoria Comercial para Clínicas', 'active', 62, '2026-03-22', 'arthur'),
  ('PowerHouse', '⚡', 'Marketplace de Agentes IA', 'active', 19, '2026-05-22', 'arthur');
