-- ============================================================
-- 《被遺忘的名字》雲端訪客簿：Supabase 資料表與權限
-- 用法：Supabase 後台 → SQL Editor → New query → 整份貼上
--       → 先把最下面的「你的Email@example.com」換成你登入後台要用的 Email → Run
-- 這份可以重複執行，不會刪掉已經收到的資料。
-- ============================================================

create table if not exists public.guestbook (
  id          bigint generated always as identity primary key,
  created_at  timestamptz not null default now(),
  entry_id    text not null check (char_length(entry_id) between 8 and 64),
  name        text not null check (char_length(name) <= 40),
  code        text check (char_length(code) <= 10),
  ending      text check (char_length(ending) <= 40),
  missed      int  check (missed between 0 and 500),
  played_at   text check (char_length(played_at) <= 60),
  answers     jsonb not null check (jsonb_typeof(answers) = 'object' and octet_length(answers::text) <= 40000),
  version     text check (char_length(version) <= 20)
);

-- 開啟列層級安全：沒有明確允許的事一律不行
alter table public.guestbook enable row level security;

-- 公開金鑰（anon）只能「新增」指定欄位，不能讀、改、刪
revoke all on table public.guestbook from anon, authenticated;
grant insert (entry_id, name, code, ending, missed, played_at, answers, version) on table public.guestbook to anon;
-- 登入的管理者可以讀（實際看不看得到，還要通過最下面的 Email 檢查）
grant select on table public.guestbook to authenticated;

drop policy if exists "玩家只能新增" on public.guestbook;
create policy "玩家只能新增" on public.guestbook for insert to anon with check (true);

-- 防濫用：全站每分鐘最多 60 筆、總數最多 20000 筆，超過就拒收（遊戲會自動排隊稍後再送）
create or replace function public.guestbook_throttle() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if (select count(*) from public.guestbook where created_at > now() - interval '1 minute') >= 60 then
    raise exception 'guestbook: too many submissions, try later';
  end if;
  if (select count(*) from public.guestbook) >= 20000 then
    raise exception 'guestbook: full';
  end if;
  return new;
end $$;
revoke all on function public.guestbook_throttle() from public, anon, authenticated;
drop trigger if exists guestbook_throttle on public.guestbook;
create trigger guestbook_throttle before insert on public.guestbook
  for each row execute function public.guestbook_throttle();

-- ↓↓↓ 只有這個 Email 登入後台時才看得到資料（換成你的 Email）↓↓↓
drop policy if exists "只有管理者能看" on public.guestbook;
create policy "只有管理者能看" on public.guestbook for select to authenticated
  using (lower(auth.jwt() ->> 'email') = lower('你的Email@example.com'));
