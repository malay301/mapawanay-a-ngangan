// Run: node tests/presentation-smoke.mjs (Node 22+ and Chromium required).
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { createServer } from 'node:http';
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const profile = await mkdtemp(join(tmpdir(), 'mapawanay-test-'));
const server = createServer(async (req, res) => {
  const path = resolve(root, '.' + (new URL(req.url, 'http://local').pathname === '/' ? '/index.html' : new URL(req.url, 'http://local').pathname));
  if (!path.startsWith(root)) { res.writeHead(403).end(); return; }
  try {
    const body = await readFile(path);
    res.setHeader('Content-Type', { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.webmanifest': 'application/manifest+json', '.png': 'image/png' }[extname(path)] || 'application/octet-stream');
    res.end(body);
  } catch { res.writeHead(404).end(); }
});
await new Promise(r => server.listen(0, '127.0.0.1', r));
const origin = `http://127.0.0.1:${server.address().port}`;
const browser = spawn(process.env.CHROMIUM || 'chromium', ['--headless', '--no-sandbox', '--disable-dev-shm-usage', '--no-first-run', `--user-data-dir=${profile}`, '--remote-debugging-port=0', 'about:blank'], { stdio: 'ignore' });
let browserError;
browser.on('error', e => { browserError = e; });
const delay = ms => new Promise(r => setTimeout(r, ms));
let ws, send;
const errors = [], warnings = [];
try {
  let port;
  for (let i = 0; i < 100; i++) {
    if (browserError) throw browserError;
    try { port = (await readFile(join(profile, 'DevToolsActivePort'), 'utf8')).split('\n')[0]; break; } catch { await delay(100); }
  }
  assert(port, 'Chromium did not start');
  const tabs = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
  ws = new WebSocket(tabs.find(t => t.type === 'page').webSocketDebuggerUrl);
  await new Promise((r, reject) => { ws.onopen = r; ws.onerror = reject; });
  let id = 0; const jobs = new Map();
  ws.onmessage = e => {
    const m = JSON.parse(e.data);
    if (m.id) { const p = jobs.get(m.id); if (!p) return; jobs.delete(m.id); clearTimeout(p.timer); m.error ? p.reject(m.error) : p.resolve(m.result); }
    if (m.method === 'Runtime.exceptionThrown') errors.push(m.params.exceptionDetails);
    if (m.method === 'Runtime.consoleAPICalled' && m.params.type === 'warning') warnings.push(m.params.args.map(a => a.value).join(' '));
  };
  send = (method, params = {}) => new Promise((resolve, reject) => {
    const key = ++id, timer = setTimeout(() => { jobs.delete(key); reject(new Error(`CDP timeout: ${method}`)); }, 12000);
    jobs.set(key, { resolve, reject, timer }); ws.send(JSON.stringify({ id: key, method, params }));
  });
  const evaluate = async expression => {
    const r = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
    assert(!r.exceptionDetails, JSON.stringify(r.exceptionDetails)); return r.result.value;
  };
  const until = async expression => {
    for (let i = 0; i < 100; i++) { if (await evaluate(expression)) return; await delay(50); }
    throw new Error(`Timed out: ${expression}`);
  };
  const setup = (map = 'hall', ch = 1, at = [2, 2, 0]) => evaluate(`S=fresh();S.card=null;S.ch=${ch};S.place=${JSON.stringify(map === 'hall' ? ch === 1 ? 'hall1' : 'hall2' : 'map')};S.flags.box=1;Object.assign(U,{home:false,cur:0,dlg:null,cinema:null,menu:null,cg:null,panel:null,pendingPanel:null,hidePlayer:false,talkTo:null});setMap(${JSON.stringify(map)},${at.join(',')});render();`);
  const cue = '你把紙放在長桌的空位上。';
  await send('Runtime.enable'); await send('Page.enable');
  await send('Emulation.setDeviceMetricsOverride', { width: 480, height: 900, deviceScaleFactor: 1, mobile: true });
  await send('Page.navigate', { url: origin });
  await until("document.readyState==='complete' && !!document.querySelector('[data-h=new]')");
  await evaluate("document.querySelector('[data-h=new]').click();document.querySelector('[data-enter]').click()");
  await until("document.querySelector('#box').innerText.includes('阿公')");
  console.log('PASS new game and opening dialogue');

  const faces = await evaluate(`Object.fromEntries(Object.keys(BUSTS).map(w => [w, new Set(Object.keys(EMOTIONS).map(e => bust(w,e).toDataURL())).size]))`);
  for (const [who, count] of Object.entries(faces)) assert.equal(count, 7, `${who}: seven distinct expressions`);
  const source = await readFile(join(root, 'index.html'), 'utf8');
  const directedLines = await evaluate('[...NARRATIVE_CUES.keys(), ...LINE_EMOTIONS.keys()]');
  for (const line of directedLines) assert(source.includes(line), `Presentation cue no longer matches the script: ${line}`);
  await setup();
  await evaluate("say('mingde','你今天是回來整理你阿公的東西，還是想要吵架？');say('mingde','可是現在要找，也找不回來了。');flow()");
  assert.equal(await evaluate('U.dlg.emotion'), 'angry');
  assert.match(await evaluate("document.querySelector('#stand').getAttribute('aria-label')"), /生氣/);
  await evaluate('U.dlg.n=U.dlg.t.length;advance()');
  assert.equal(await evaluate('U.dlg.emotion'), 'sad');
  assert.match(await evaluate("document.querySelector('#box .nm').textContent"), /難過/);
  console.log('PASS 42 distinct portraits and line-to-line emotion changes');

  await setup();
  await evaluate(`act(${JSON.stringify(cue)});say('you','放好了。');flow()`);
  const first = await evaluate("({x:sceneActorFrame('you').x,cur:U.cur,canvas:document.querySelector('#cv').toDataURL()})");
  await delay(450);
  const moving = await evaluate("({x:sceneActorFrame('you').x,cur:U.cur,canvas:document.querySelector('#cv').toDataURL(),fade:U.fade})");
  assert.notEqual(first.x, moving.x); assert.notEqual(first.canvas, moving.canvas); assert.equal(moving.fade, 0);
  await evaluate('for(let i=0;i<10;i++) advance()');
  assert.equal(await evaluate('U.cur'), first.cur, 'repeated clicks must not skip an active scene');
  await until('!U.cinema');
  const natural = await evaluate('({rpg:S.rpg,props:S.stageProps})');
  assert.deepEqual(natural.props.hall.tengben, [136, 72]); assert.equal(natural.rpg.x, 9); assert.equal(natural.rpg.y, 4);
  assert.equal(await evaluate('U.cur'), first.cur, 'scene completion must leave dialogue readable');
  await evaluate('advance()'); assert.equal(await evaluate('U.dlg.t'), '放好了。');
  console.log('PASS visible walking, paper placement, input locking and dialogue order');

  await setup(); await evaluate(`act(${JSON.stringify(cue)});flow();document.querySelector('#skip-scene').click()`);
  assert.deepEqual(await evaluate('({rpg:S.rpg,props:S.stageProps})'), natural);
  await evaluate('advance();save()');
  await send('Page.reload'); await until("document.readyState==='complete' && !!document.querySelector('[data-h=resume]')");
  await evaluate("document.querySelector('[data-h=resume]').click()");
  assert.deepEqual(await evaluate('({rpg:S.rpg,props:S.stageProps})'), natural);
  assert.equal(await evaluate('!!U.cinema'), false);
  console.log('PASS skip endpoint matches playback; saved positions restore');

  await setup('room', 1, [5, 7, 0]);
  await evaluate("S.items.push('tengben');doDoor('down');for(let i=0;i<80 && U.dlg;i++){if(U.cinema)finishScene();U.dlg.n=U.dlg.t.length;advance()}");
  assert.equal(await evaluate('curMap()'), 'hall');
  assert.deepEqual(await evaluate('S.stageProps.hall.tengben'), [136, 72]);
  assert.equal(await evaluate('S.stageActors.shichang.seated'), true);
  console.log('PASS authored room-to-hall sequence and greeting');

  await evaluate('S.card=2;enterCard();finishScene();U.dlg.n=U.dlg.t.length;advance();U.dlg.n=U.dlg.t.length;advance()');
  assert.deepEqual(await evaluate('ents().filter(e=>e.npc).map(e=>e.npc)'), ['wenbin']);
  assert.equal(await evaluate('canWalk()'), true);
  console.log('PASS chapter transition shows characters leaving and restores movement');

  // Sitting during a conversation must not trap the player on a chair.
  await setup('hall', 1, [9, 4, 3]);
  await evaluate("WAIT1.shichang(S);flow();for(let i=0;i<30 && U.dlg;i++){if(U.cinema)finishScene();U.dlg.n=U.dlg.t.length;advance()}");
  assert.equal(await evaluate('P.x'), 7); assert.equal(await evaluate('P.y'), 3);
  assert.equal(await evaluate('canWalk() && tryStep(1)'), true);
  assert.equal(await evaluate('U.playerSeated'), false);
  console.log('PASS conversation seating leaves a usable path back to play');

  await setup('hall', 2, [5, 7, 1]);
  await evaluate("HALL2.enter(S);flow();for(let i=0;i<100 && U.dlg;i++){if(U.cinema)finishScene();U.dlg.n=U.dlg.t.length;advance()}");
  assert(await evaluate("['mingde','shichang','jianhe','yuzhen'].every(w=>S.stageActors[w])"));
  const home = await evaluate('JSON.stringify(S.rpg)');
  await evaluate("S.log=[];U.cur=0;U.menu=null;act('世昌起身去車上，帶回包著照片的布包。');flow();finishScene()");
  assert.equal(await evaluate('JSON.stringify(S.rpg)'), home); assert.equal(await evaluate('!!U.hidePlayer'), false);
  console.log('PASS chapter 2 cast movement, occupied destinations and car excursion');

  await setup('hall', 3, [7, 6, 1]);
  await evaluate("U.playerSeated=true;act('你拿出手機放在桌上。');flow();finishScene()");
  assert.deepEqual(await evaluate('S.stageProps.hall.phone'), [118, 83]);
  await evaluate("U.cur=S.log.length;U.dlg=null;wrapUp();flow();for(let i=0;i<80 && U.dlg;i++){if(U.cinema)finishScene();U.dlg.n=U.dlg.t.length;advance()}");
  assert.equal(await evaluate('curMap()'), 'room');
  assert.deepEqual(await evaluate('S.stageProps.room.letter'), [38, 48]);
  assert.equal(await evaluate("document.querySelector('#end').hidden"), false);
  console.log('PASS chapter 3 recording and animated closing sequence');

  await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
  await send('Page.reload'); await until("document.readyState==='complete' && typeof Stage==='object'");
  await setup(); await evaluate(`act(${JSON.stringify(cue)});flow()`);
  assert.equal(await evaluate('RM'), true); assert.equal(await evaluate('!!U.cinema'), false);
  assert.deepEqual(await evaluate('({rpg:S.rpg,props:S.stageProps})'), natural);
  console.log('PASS reduced motion preserves the same scene result');

  await evaluate('navigator.serviceWorker.ready');
  await until('!!navigator.serviceWorker.controller');
  assert(await evaluate("caches.match('presentation.js').then(Boolean)"));
  // Prove online navigation refreshes the cached document, not just that the
  // install event happened to cache one working page.
  await evaluate("caches.keys().then(async keys=>{const cache=await caches.open(keys[0]);await cache.put('index.html',new Response('stale document'))})");
  await send('Page.reload');
  await until("document.readyState==='complete' && typeof Stage==='object'");
  await until("caches.match('index.html').then(r=>r.text()).then(t=>t.includes('presentation.js'))");
  await send('Network.enable');
  await send('Network.emulateNetworkConditions', { offline: true, latency: 0, downloadThroughput: 0, uploadThroughput: 0 });
  await send('Page.reload'); await until("document.readyState==='complete' && typeof Stage==='object'");
  await setup(); await evaluate(`act(${JSON.stringify(cue)});flow()`);
  assert.deepEqual(await evaluate('S.stageProps.hall.tengben'), [136, 72]);
  console.log('PASS offline reload includes the presentation engine');
  assert.deepEqual(errors, [], 'uncaught browser exceptions');
  assert.deepEqual(warnings.filter(w => w.includes('stage cue')), [], 'unreachable authored movement');
  if (process.env.SCREENSHOT) {
    const image = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true });
    await writeFile(process.env.SCREENSHOT, Buffer.from(image.data, 'base64'));
  }
  console.log('All presentation smoke checks passed.');
} finally {
  if (send) { try { await send('Browser.close'); } catch {} }
  ws?.close(); browser.kill();
  await new Promise(r => server.close(r));
  await rm(profile, { recursive: true, force: true, maxRetries: 3, retryDelay: 100 });
}
