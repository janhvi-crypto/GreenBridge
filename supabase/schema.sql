-- GreenBridge: Business ↔ Government shared schema
-- Run this in Supabase Dashboard → SQL Editor

-- Optional: profiles (extends auth.users with company name etc.)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  company_name text,
  role text not null check (role in ('business', 'government')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Inventory: government adds; business sees available stock
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
  created_by uuid references auth.users(id),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Business requests: business submits; government sees in Company Requests and approves
create table if not exists public.business_requests (
  id uuid primary key default gen_random_uuid(),
  business_user_id uuid not null references auth.users(id),
  company_name text,
  material_type text not null,
  quantity numeric not null,
  quantity_unit text default 'MT',
  budget text,
  deadline date,
  status text not null default 'draft' check (status in ('draft', 'submitted', 'approved', 'rejected', 'mou_pending', 'in_delivery', 'delivered')),
  gov_notes text,
  submitted_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Collaborations: agreements/MOUs between business and gov (from GovHub / Approval Workflows)
create table if not exists public.collaborations (
  id uuid primary key default gen_random_uuid(),
  request_id uuid not null references public.business_requests(id) on delete cascade,
  title text,
  detail text,
  status text not null default 'pending' check (status in ('pending', 'approved', 'revision')),
  gov_user_id uuid references auth.users(id),
  document_urls text[] default '{}',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Orders: created when gov approves a request; both dashboards see orders
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  request_id uuid references public.business_requests(id),
  business_user_id uuid not null references auth.users(id),
  material_type text not null,
  quantity text not null,
  amount text,
  status text not null default 'processing' check (status in ('processing', 'quality_check', 'in_transit', 'delivered')),
  supplier text,
  delivery_date date,
  progress integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Activity log: for recent activity and analytics
create table if not exists public.activity_log (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id),
  actor_role text not null,
  action text not null,
  detail text,
  entity_type text,
  entity_id uuid,
  created_at timestamptz default now()
);

-- Enable RLS
alter table public.profiles enable row level security;
alter table public.inventory enable row level security;
alter table public.business_requests enable row level security;
alter table public.collaborations enable row level security;
alter table public.orders enable row level security;
alter table public.activity_log enable row level security;

-- Helper: current user's role from JWT
create or replace function public.user_role()
returns text as $$
  select coalesce(
    (auth.jwt() -> 'user_metadata' ->> 'role'),
    (select role from public.profiles where id = auth.uid())
  );
$$ language sql stable;

-- Inventory: government full access; business read available only
create policy "Gov can do all on inventory"
  on public.inventory for all
  using (public.user_role() = 'government')
  with check (public.user_role() = 'government');

create policy "Business can read available inventory"
  on public.inventory for select
  using (status = 'available' or public.user_role() = 'government');

-- Business requests: business own CRUD until submit; gov read all and update status
create policy "Business can manage own requests"
  on public.business_requests for all
  using (auth.uid() = business_user_id)
  with check (auth.uid() = business_user_id);

create policy "Government can read and update all requests"
  on public.business_requests for all
  using (public.user_role() = 'government');

-- Collaborations: business read own (via request); gov read/update all
create policy "Business can read own collaborations"
  on public.collaborations for select
  using (
    exists (
      select 1 from public.business_requests r
      where r.id = request_id and r.business_user_id = auth.uid()
    )
  );

create policy "Government can manage collaborations"
  on public.collaborations for all
  using (public.user_role() = 'government');

-- Orders: business read own; gov read all and update
create policy "Business can read own orders"
  on public.orders for select
  using (auth.uid() = business_user_id);

create policy "Government can manage orders"
  on public.orders for all
  using (public.user_role() = 'government');

-- Activity: both can insert; both can read (for dashboards)
create policy "Authenticated can insert activity"
  on public.activity_log for insert
  with check (auth.uid() is not null);

create policy "Authenticated can read activity"
  on public.activity_log for select
  using (auth.uid() is not null);

-- Profiles: users can read/update own
create policy "Users can read own profile"
  on public.profiles for select using (auth.uid() = id);
create policy "Users can update own profile"
  on public.profiles for update using (auth.uid() = id);
create policy "Users can insert own profile"
  on public.profiles for insert with check (auth.uid() = id);

-- Indexes
create index if not exists idx_inventory_status on public.inventory(status);
create index if not exists idx_business_requests_status on public.business_requests(status);
create index if not exists idx_business_requests_business_user on public.business_requests(business_user_id);
create index if not exists idx_orders_business_user on public.orders(business_user_id);
create index if not exists idx_activity_created_at on public.activity_log(created_at desc);

-- Optional: inventory description and image (AI-generated). Run if you already have inventory table.
alter table public.inventory add column if not exists description text;
alter table public.inventory add column if not exists image_url text;

-- Consumer products: companies publish finished products for end-consumer marketplace (shop)
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

create policy "Business can manage own consumer_products"
  on public.consumer_products for all
  using (auth.uid() = business_user_id)
  with check (auth.uid() = business_user_id);

create policy "Anyone can read published consumer_products"
  on public.consumer_products for select
  using (true);

create index if not exists idx_consumer_products_business_user on public.consumer_products(business_user_id);
create index if not exists idx_consumer_products_category on public.consumer_products(category);
create index if not exists idx_consumer_products_created_at on public.consumer_products(created_at desc);
