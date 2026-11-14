// 離線快取：遊戲只有一個頁面，第一次打開後就能離線玩
const CACHE = 'bwjm-guestbook-3';
const FILES = ['./', './index.html', './presentation.js', './feedback.js', './cloud-config.js', './manifest.webmanifest', './icons/icon-192.png', './icons/icon-512.png', './icons/icon-180.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  const r = e.request, u = new URL(r.url); if (r.method !== 'GET' || u.origin !== location.origin) return;
  // 後台頁面不快取，也不能蓋掉遊戲頁的快取
  if (/\/admin\.html$/.test(u.pathname)) return;
  // 雲端設定：有網路就拿最新版，方便之後改網址或金鑰
  if (/\/cloud-config\.js$/.test(u.pathname)) { e.respondWith(fetch(r).then(res => { const cp = res.clone(); caches.open(CACHE).then(c => c.put(r, cp)); return res; }).catch(() => caches.match(r))); return; }
  // 頁面：有網路就拿最新版，沒網路用快取；其他檔案：快取優先
  if (r.mode === 'navigate') { e.respondWith(fetch(r).then(res => { const cp = res.clone(); caches.open(CACHE).then(c => c.put('./index.html', cp)); return res; }).catch(() => caches.match('./index.html'))); return; }
  e.respondWith(caches.match(r).then(hit => hit || fetch(r).then(res => { const cp = res.clone(); caches.open(CACHE).then(c => c.put(r, cp)); return res; })));
});
