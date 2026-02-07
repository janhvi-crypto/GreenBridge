-- Run this in Supabase Dashboard → SQL Editor if the inventory table is missing or Add to inventory fails.
-- Creates inventory table and RLS so Government can add batches and Business can see available stock.

create table if not exists public.inventory (
  id uuid primary key default gen_random_uuid(),
  category text not null,
  quantity numeric not null,
  unit text not null default 'MT',
  grade text not null check (grade in ('A', 'B', 'C')),
  price_min numeric,
  price_max numeric,
  location text,
  status text not null default 'available' check (status in ('available', 'reserved', 'processing')),
  qr_code text,
  description text,
  image_url text,
  created_by uuid references auth.users(id),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.inventory enable row level security;

-- Helper: current user's role from JWT. Set user_metadata.role = 'government' for gov users in Supabase Auth → Users.
create or replace function public.user_role()
returns text as $$
  select auth.jwt() -> 'user_metadata' ->> 'role';
$$ language sql stable security definer;

-- Government can do everything on inventory
drop policy if exists "Gov can do all on inventory" on public.inventory;
create policy "Gov can do all on inventory"
  on public.inventory for all
  using (public.user_role() = 'government')
  with check (public.user_role() = 'government');

-- Business can read available rows (and gov can read all)
drop policy if exists "Business can read available inventory" on public.inventory;
create policy "Business can read available inventory"
  on public.inventory for select
  using (status = 'available' or public.user_role() = 'government');

-- If inventory already existed without description/image_url, add them
alter table public.inventory add column if not exists description text;
alter table public.inventory add column if not exists image_url text;

create index if not exists idx_inventory_status on public.inventory(status);
