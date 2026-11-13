// ================= 結局後的回饋問卷 =================
// 每位玩家拿到一個隨機的「借來的名字」，只用來區分回饋，不收真實姓名。
// 問卷在遊戲裡進行（文彬的訪客簿），不連外部表單；寫好的每一頁存在這台裝置上，
// 可以複製或下載成文字檔，活動結束時把整台裝置的訪客簿一次下載。
const FEEDBACK = (() => {

  const NAME_A = ['提水的', '守著米缸的', '坐在廊下的', '聽歌的', '翻謄本的', '記筆記的', '等麴的', '夜裡醒著的', '找名字的', '看照片的', '收好信的', '扶著米缸的', '數星星的', '慢慢問的', '把話記下的', '走過院子的'];
  const NAME_B = ['旅人', '聽者', '記錄者', '來訪者', '問路人', '守夜人', '拾字人', '提燈人', '傳話人', '鄰居'];
  const QS = [
    { id: 'overall', type: 'scale', label: '整體來說，你喜歡這個遊戲嗎？', lo: '不太喜歡', hi: '非常喜歡' },
    { id: 'story', type: 'scale', label: '故事的發展清楚、好懂嗎？', lo: '很難懂', hi: '很清楚' },
    { id: 'moment', type: 'text', label: '哪一段最讓你有感覺？為什麼？' },
    { id: 'culture', type: 'text', label: '關於族語、名字或文化，你從遊戲裡知道了什麼？還想多知道什麼？' },
    { id: 'ask', type: 'pick', label: '玩完之後，你會想去問家人關於名字或家族的事嗎？', opts: ['會', '也許', '不會'] },
    { id: 'stuck', type: 'text', label: '有沒有哪裡卡住、看不懂，或操作不順的地方？' },
    { id: 'other', type: 'text', label: '還有什麼想對製作團隊說的？' }
  ];
  const KEY = 'bwjm.rpg2.feedback';
  const load = () => { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch { return {}; } };
  const store = d => { try { localStorage.setItem(KEY, JSON.stringify(d)); } catch {} };
  const pick = a => a[Math.floor(Math.random() * a.length)];
  const newName = old => { let n; do n = pick(NAME_A) + pick(NAME_B); while (n === old && NAME_A.length * NAME_B.length > 1); return n; };
  const newCode = () => String(Math.floor(100 + Math.random() * 900));
  const h = t => String(t ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  // 每一局的草稿：結局畫面出現時才給名字，從頭再玩會換一局
  function draft(run) {
    const d = load();
    if (!d.cur || d.cur.run !== run) { d.cur = { run, name: newName(), code: newCode(), a: {}, sent: false }; store(d); }
    return d;
  }
  function context() {
    const ending = typeof endingKind === 'function' ? endingKind() : '';
    const missed = typeof MISSED !== 'undefined' && typeof S !== 'undefined' && S ? MISSED.filter(m => m[0](S)).length : '';
    return `結局 ${ending}｜未走到的對話 ${missed} 段｜${new Date().toLocaleString('zh-TW', { hour12: false })}`;
  }
  function asText(cur) {
    const lines = [`《被遺忘的名字》訪客簿`, `名字：${cur.name}（編號 ${cur.code}）`, cur.ctx || context(), ''];
    QS.forEach((q, i) => lines.push(`${i + 1}. ${q.label}`, `   ${cur.a[q.id] || '（沒有寫）'}`));
    return lines.join('\n');
  }

  const LOG = 'bwjm.rpg2.guestbook';
  const book = () => { try { return JSON.parse(localStorage.getItem(LOG)) || []; } catch { return []; } };
  const qHTML = cur => QS.map((x, i) => {
    const v = cur.a[x.id] || '', n = `${i + 1}. ${h(x.label)}`;
    if (x.type === 'scale') return `<fieldset class="fbq"><legend>${n}</legend><div class="fbscale">${[1, 2, 3, 4, 5].map(k => `<label><input type="radio" name="fb-${x.id}" value="${k}"${String(v) === String(k) ? ' checked' : ''}><span>${k}</span></label>`).join('')}</div><div class="fbends"><span>1 ${h(x.lo)}</span><span>5 ${h(x.hi)}</span></div></fieldset>`;
    if (x.type === 'pick') return `<fieldset class="fbq"><legend>${n}</legend><div class="fbscale">${x.opts.map(o => `<label><input type="radio" name="fb-${x.id}" value="${h(o)}"${v === o ? ' checked' : ''}><span>${h(o)}</span></label>`).join('')}</div></fieldset>`;
    return `<label class="fbq"><span>${n}</span><textarea name="fb-${x.id}" rows="3" maxlength="1000">${h(v)}</textarea></label>`;
  }).join('');

  function html(run) {
    const cur = draft(run).cur, n = book().length;
    const tools = `<div class="ph"><button class="pbtn" data-fb="copy" type="button">複製這一頁</button><button class="pbtn" data-fb="download" type="button">下載這一頁</button>${n > 1 ? `<button class="pbtn" data-fb="all" type="button">下載這台裝置上全部的訪客簿（${n} 頁）</button>` : ''}</div><p class="small" id="fbmsg" aria-live="polite"></p>`;
    if (cur.sent) return `<div class="fb" id="fb">
      <h3>文彬的訪客簿</h3>
      <p class="lastline"><b>文彬</b>收到了，${h(cur.name)}。我會跟今晚的筆記放在一起。</p>
      <div class="letterdoc fbpage"><p class="small" style="color:#6b5a3a">訪客簿｜${h(cur.name)}　編號 ${h(cur.code)}</p>${QS.map((q, i) => `<p><b>${i + 1}. ${h(q.label)}</b><br>${h(cur.a[q.id] || '（沒有寫）')}</p>`).join('')}</div>
      <p class="small">這一頁存在這台裝置上。帶活動的人可以用下面的按鈕把訪客簿複製或下載下來。</p>
      ${tools}
      <div class="ph"><button class="pbtn" data-fb="again" type="button">翻回去改一改</button></div>
    </div>`;
    return `<div class="fb" id="fb">
      <h3>文彬的訪客簿</h3>
      <p class="lastline"><b>文彬</b>要走之前，在這本簿子上留幾句話吧。名字不用寫真的，今晚先借你一個。</p>
      <p class="fbname">你借來的名字：<b>${h(cur.name)}</b><span class="small">編號 ${h(cur.code)}</span><button class="pbtn" data-fb="rename" type="button">換一個名字</button></p>
      <p class="small">這個名字只用來把每個人寫的頁面分開。請不要在回答裡留下真實姓名或聯絡方式；每一題都可以跳過。</p>
      ${qHTML(cur)}
      <div class="ph"><button class="pbtn pri" data-fb="send" type="button">寫好了，交給文彬</button></div>
      <p class="small" id="fbmsg" aria-live="polite"></p>
    </div>`;
  }

  function save(ev) {
    const t = ev.target; if (!t.name || !t.name.startsWith('fb-')) return;
    const d = load(); if (!d.cur || d.cur.sent) return;
    d.cur.a[t.name.slice(3)] = t.value.trim() ? t.value : ''; store(d);
  }
  function msg(t) { const m = document.getElementById('fbmsg'); if (m) m.textContent = t; }
  function redraw(run) { const el = document.getElementById('fb'); if (el) el.outerHTML = html(run); }
  function file(name, text) {
    const url = URL.createObjectURL(new Blob([text], { type: 'text/plain;charset=utf-8' }));
    const link = Object.assign(document.createElement('a'), { href: url, download: name });
    document.body.appendChild(link); link.click(); link.remove(); setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  async function act(a, run) {
    const d = load(); const cur = d.cur; if (!cur) return;
    if (a === 'rename') { cur.name = newName(cur.name); cur.code = newCode(); store(d); return redraw(run); }
    if (a === 'again') { cur.sent = false; store(d); return redraw(run); }
    if (a === 'send') {
      if (!QS.some(q => cur.a[q.id])) return msg('至少寫一題再交給文彬。');
      cur.sent = true; cur.ctx = context(); store(d);
      const b = book().filter(e => e.run !== cur.run); b.push({ run: cur.run, text: asText(cur) });
      try { localStorage.setItem(LOG, JSON.stringify(b)); } catch {}
      redraw(run); return document.getElementById('fb').scrollIntoView({ block: 'start', behavior: 'smooth' });
    }
    if (a === 'copy') {
      try { await navigator.clipboard.writeText(asText(cur)); msg('已複製，可以貼到訊息裡傳出去。'); }
      catch { msg('這個瀏覽器不能自動複製，請改用「下載這一頁」。'); }
      return;
    }
    if (a === 'download') { file(`被遺忘的名字_訪客簿_${cur.name}${cur.code}.txt`, asText(cur)); return msg('已下載這一頁。'); }
    if (a === 'all') { const b = book(); file(`被遺忘的名字_訪客簿_全部${b.length}頁.txt`, b.map(e => e.text).join('\n\n──────────\n\n')); return msg(`已下載 ${b.length} 頁。`); }
  }

  document.addEventListener('input', save);
  document.addEventListener('change', save);
  document.addEventListener('click', ev => { const b = ev.target.closest && ev.target.closest('[data-fb]'); if (b) { ev.preventDefault(); act(b.dataset.fb, FEEDBACK.run()); } });

  return { html, run: () => (typeof S !== 'undefined' && S && S.runId) || 'run', QS, NAME_A, NAME_B, asText, book };
})();
