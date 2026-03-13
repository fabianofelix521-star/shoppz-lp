# Supabase Backend — Shoppz LP

## Schema Overview

| Table          | Purpose                                                                 |
| -------------- | ----------------------------------------------------------------------- |
| `site_content` | Single-row JSONB storing all LP sections (navbar, hero, features, etc.) |
| `admin_users`  | Whitelist of users allowed to edit site content                         |

**Storage:** `portfolio` bucket (public, 5MB limit, images only)

## How to Apply

### Option A — Supabase Dashboard (quickest)

1. Go to **SQL Editor** in your Supabase project dashboard
2. Paste the contents of `schema.sql`
3. Click **Run**

### Option B — Supabase CLI

```bash
# From the lpshoppz directory
supabase link --project-ref <YOUR_PROJECT_REF>
supabase db push
```

The CLI will pick up `schema.sql` automatically.

### Option C — Migration file

```bash
# Create a timestamped migration
cp supabase/schema.sql supabase/migrations/$(date +%Y%m%d%H%M%S)_initial_schema.sql

# Push via CLI
supabase db push
```

## Post-Setup

### 1. Add your first admin

After a user signs up via Supabase Auth, manually promote them:

```sql
INSERT INTO public.admin_users (id, email, role)
VALUES ('<auth-user-uuid>', 'your@email.com', 'super_admin');
```

### 2. Env vars for the Next.js app

```env
NEXT_PUBLIC_SUPABASE_URL=https://<ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon-key>
```

## RLS Summary

| Table               | SELECT             | INSERT/UPDATE/DELETE |
| ------------------- | ------------------ | -------------------- |
| `site_content`      | Public (anyone)    | Only `admin_users`   |
| `admin_users`       | Only `admin_users` | Only `super_admin`   |
| `storage/portfolio` | Public             | Only `admin_users`   |
