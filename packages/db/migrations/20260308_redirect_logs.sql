-- M2 extension: redirect outcome logging

create table if not exists public.redirect_logs (
  id bigserial primary key,
  slug text,
  destination_url text,
  merchant text,
  status_code integer not null,
  reason text not null,
  resolver text,
  referrer text,
  user_agent text,
  ip_address text,
  created_at timestamptz not null default now()
);

create index if not exists idx_redirect_logs_slug on public.redirect_logs (slug);
create index if not exists idx_redirect_logs_created_at on public.redirect_logs (created_at desc);
create index if not exists idx_redirect_logs_reason on public.redirect_logs (reason);
