-- Run this in Supabase Dashboard → SQL Editor if consumer_products table is missing.
-- Creates the table and RLS so Publish Product and Consumer Marketplace work.

create table if not exists public.consumer_products (
  id uuid primary key default gen_random_uuid(),
  business_user_id uuid not null references auth.users(id),
  company_name text,
  name text not null,
  category text not null,
  description text,
  story text,
  image_url text,
  price numeric not null,
  original_price numeric,
  waste_used text,
  co2_saved text,
  materials_source text,
  qr_code text,
  blockchain_tx_hash text,
  verified boolean default true,
  badge text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.consumer_products enable row level security;

-- Business users can insert/update/delete their own products
create policy "Business can manage own consumer_products"
  on public.consumer_products for all
  using (auth.uid() = business_user_id)
  with check (auth.uid() = business_user_id);

-- Anyone (including anonymous) can read – so Consumer Marketplace shows products without login
create policy "Anyone can read consumer_products"
  on public.consumer_products for select
  using (true);

create index if not exists idx_consumer_products_business_user on public.consumer_products(business_user_id);
create index if not exists idx_consumer_products_category on public.consumer_products(category);
create index if not exists idx_consumer_products_created_at on public.consumer_products(created_at desc);
