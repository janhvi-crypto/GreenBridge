# Supabase setup for GreenBridge (Business vs Government login)

This app uses **one account type per email**: Business users can only use the Business dashboard, and Government users only the Government dashboard. Role is stored in Supabase Auth **user metadata** and set **only at signup**.

---

## 0. Create tables (required)

In [Supabase Dashboard](https://supabase.com/dashboard) → your project → **SQL Editor**:

1. Run **`supabase/schema.sql`** to create all tables (inventory, business_requests, collaborations, orders, activity_log, consumer_products, etc.) and RLS.
2. If **Add to inventory** fails (e.g. "relation 'inventory' does not exist"), run **`supabase/create_inventory.sql`** in the SQL Editor.
3. If only **`consumer_products`** is missing, run **`supabase/create_consumer_products.sql`** instead.

Without `inventory`, **Add to inventory** will show "Add failed". Without `consumer_products`, **Publish Product** will fail and the **Consumer Marketplace** will only show sample products. Ensure Government users have **user_metadata.role** = `"government"` in Supabase Auth → Users.

---

## 1. Auth in Supabase

- In [Supabase Dashboard](https://supabase.com/dashboard) → your project → **Authentication** → **Providers**: ensure **Email** is enabled.
- (Optional) **Authentication** → **Email Templates**: customize "Confirm signup" if you use email confirmation.

---

## 2. Where the role is stored

- Role is saved in **user metadata** when a user signs up via **Become a Partner** → **Signup** (`/signup`).
- `user_metadata.role` is either `"business"` or `"government"` and is **not** changed on login.
- Login checks this stored role: if the user opens "Government" login but their account is Business (or the other way around), they see an error and must use the correct portal.

---

## 3. Existing users (created before this flow)

If you already have users that were created without a role:

1. Go to **Authentication** → **Users** in the Supabase Dashboard.
2. Open a user.
3. Under **User Metadata** (or **Raw User Meta Data**), add:
   - Key: `role`
   - Value: `business` or `government` (lowercase, no quotes in the JSON).
4. Save.

Example metadata:

```json
{
  "role": "business"
}
```

After that, they can log in only from the matching portal (Business or Government).

---

## 4. Optional: require email confirmation

- **Authentication** → **Providers** → **Email** → turn **Confirm email** ON if you want users to confirm before signing in.
- If confirmation is ON, after signup the app tells them to check their email; they then use the **Login** page and select the same account type (Business or Government) they chose at signup.

---

## 5. Optional: profiles table (for more fields later)

Right now role is only in `user_metadata`. If you later want a `profiles` table (e.g. company name, department):

1. In **SQL Editor** run something like:

```sql
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  role text not null check (role in ('business', 'government')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Optional: trigger to create profile on signup (then set role from user_metadata or a separate API)
-- For now, role in user_metadata is enough.
```

2. Enable RLS and add policies so users can read/update their own row. The app can keep using `user_metadata.role` for auth until you switch to reading `profiles.role`.

---

## Summary

| Step | What to do |
|------|------------|
| New users | Sign up via **Become a Partner** → choose Business or Government → role is set once. |
| Login | User must open the **same** portal (Business or Government) they signed up as; otherwise they get an error. |
| Existing users | In Supabase **Authentication** → **Users**, set `user_metadata.role` to `"business"` or `"government"` for each user. |
