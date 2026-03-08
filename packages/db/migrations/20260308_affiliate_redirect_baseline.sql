-- M2 baseline for affiliate redirects and click tracking

create table if not exists public.affiliate_links (
  id bigserial primary key,
  slug text not null unique,
  destination_url text not null,
  merchant text,
  is_active boolean not null default true,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.click_events (
  id bigserial primary key,
  slug text not null,
  destination_url text not null,
  merchant text,
  referrer text,
  user_agent text,
  ip_address text,
  clicked_at timestamptz not null default now()
);

create index if not exists idx_click_events_slug on public.click_events (slug);
create index if not exists idx_click_events_clicked_at on public.click_events (clicked_at desc);

-- Optional helper trigger for updated_at
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_affiliate_links_updated_at on public.affiliate_links;
create trigger trg_affiliate_links_updated_at
before update on public.affiliate_links
for each row
execute function public.set_updated_at();
