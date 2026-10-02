// Authored presentation cues: memories and quoted actions deliberately do not
// trigger present-day movement. Story decisions remain in index.html.
const EMOTIONS = { neutral: '平靜', happy: '開心', angry: '生氣', sad: '難過', surprised: '驚訝', worried: '不安', gentle: '溫柔', pain: '痛', smirk: '調侃', awkward: '尷尬', serious: '認真', thinking: '思考' };
function expressionFace(p, emotion) {
  const { set, hr, skD, lip, eyeC, brow } = p;
  if (emotion === 'happy' || emotion === 'gentle') {
    for (const x of [13, 23]) { hr(x, x + 3, 16, brow); hr(x, x + 3, 20, eyeC); set(x + 1, 19, eyeC); set(x + 2, 19, eyeC); }
    set(17, 26, lip); set(22, 26, lip); hr(18, 21, 28, lip);
    if (emotion === 'happy') { hr(17, 22, 27, lip); hr(18, 21, 27, '#fff2da'); }
  } else if (emotion === 'angry') {
    for (let i = 0; i < 5; i++) { set(13 + i, 16 + Math.floor(i / 2), brow); set(26 - i, 16 + Math.floor(i / 2), brow); }
    hr(13, 17, 20, eyeC); hr(22, 26, 20, eyeC); set(16, 21, eyeC); set(23, 21, eyeC);
    hr(18, 21, 26, lip); set(17, 27, lip); set(22, 27, lip); hr(18, 21, 28, lip);
  } else if (emotion === 'pain') {
    // 皺眉、眼睛擠緊、咬牙
    for (let i = 0; i < 4; i++) { set(13 + i, 17 - Math.floor(i / 2), brow); set(26 - i, 17 - Math.floor(i / 2), brow); }
    set(13, 19, eyeC); set(14, 20, eyeC); set(15, 20, eyeC); set(16, 21, eyeC);
    set(26, 19, eyeC); set(25, 20, eyeC); set(24, 20, eyeC); set(23, 21, eyeC);
    hr(17, 22, 26, lip); hr(17, 22, 28, lip); set(17, 27, lip); set(22, 27, lip); hr(18, 21, 27, '#f4efe2'); set(20, 27, lip);
    set(29, 16, '#a9d1d1'); set(29, 17, '#a9d1d1'); set(28, 18, '#a9d1d1');
  } else if (emotion === 'smirk') {
    hr(13, 16, 15, brow); hr(23, 26, 17, brow);
    hr(13, 16, 19, eyeC); hr(14, 15, 20, eyeC); hr(23, 26, 20, eyeC); set(24, 21, eyeC);
    hr(18, 21, 27, lip); set(22, 26, lip); set(23, 25, lip);
  } else if (emotion === 'awkward') {
    for (let i = 0; i < 4; i++) { set(13 + i, 17 - Math.floor(i / 3), brow); set(26 - i, 17 - Math.floor(i / 3), brow); }
    hr(13, 16, 20, eyeC); hr(23, 26, 20, eyeC);
    set(17, 27, lip); hr(18, 19, 26, lip); hr(20, 21, 27, lip); set(22, 26, lip);
    set(29, 15, '#a9d1d1'); set(29, 16, '#a9d1d1'); set(28, 17, '#a9d1d1');
    set(13, 23, '#e8a49a'); set(26, 23, '#e8a49a');
  } else if (emotion === 'serious') {
    hr(13, 16, 17, brow); hr(23, 26, 17, brow); set(16, 18, brow); set(23, 18, brow);
    hr(13, 16, 20, eyeC); hr(23, 26, 20, eyeC); set(14, 21, eyeC); set(15, 21, eyeC); set(24, 21, eyeC); set(25, 21, eyeC);
    hr(17, 22, 27, lip);
  } else if (emotion === 'thinking') {
    hr(13, 16, 16, brow); hr(23, 26, 15, brow); set(26, 16, brow);
    hr(13, 16, 19, eyeC); hr(23, 26, 19, eyeC); set(16, 20, eyeC); set(26, 20, eyeC);
    hr(19, 20, 27, lip); set(21, 26, lip);
  } else if (emotion === 'surprised') {
    hr(13, 16, 15, brow); hr(23, 26, 15, brow);
    for (const x of [14, 24]) { hr(x - 1, x + 2, 19, '#fff2df'); hr(x - 1, x + 2, 20, '#fff2df'); set(x, 19, eyeC); set(x, 20, eyeC); set(x, 21, eyeC); }
    hr(19, 21, 26, lip); hr(19, 21, 28, lip); set(19, 27, lip); set(21, 27, lip);
  } else {
    // Raised inner brows and downturned mouth, rather than a fixed smile.
    for (let i = 0; i < 4; i++) { set(13 + i, 18 - Math.floor(i / 2), brow); set(26 - i, 18 - Math.floor(i / 2), brow); }
    hr(13, 16, 20, eyeC); hr(23, 26, 20, eyeC);
    set(16, 21, eyeC); set(23, 21, eyeC); hr(18, 21, 27, lip); set(17, 28, lip); set(22, 28, lip);
    if (emotion === 'sad') { hr(13, 16, 22, skD); hr(23, 26, 22, skD); set(14, 23, skD); }
    else { set(28, 18, '#a9d1d1'); set(28, 19, '#a9d1d1'); }
  }
}

// Explicit line direction wins; unmarked lines return to a calm expression.
const LINE_EMOTIONS = new Map();
function directLines(emotion, lines) { for (const line of lines) LINE_EMOTIONS.set(line, emotion); }
directLines('happy', [
  '奕翔齁？我世昌啦，電話裡那個啦！本人有比較帥吧？',
  '那天我打給你，你還接起來問我是不是詐騙集團。我說對啊，我專門騙人回家的啦！',
  '沒辦法，記性好，是我們家的遺傳。', '奕翔，你長好高。',
  '我是建和，在國小教族語。也姓陳，不過不是你們家的，這一帶姓陳的太多了，丟一顆石頭就會打到三個。',
  '還不錯啦，比我教的學生差一點點。', '看什麼，你阿公自己也有。', '那你要接啊。', '有聽到就會接啦。'
]);
directLines('angry', [
  '你說「你們」是在說誰啊？', '你今天是回來整理你阿公的東西，還是想要吵架？',
  '不要一直拿東西往我面前放。', '不要拿給我看啦，我又沒興趣，收起來。',
  '整理就整理，沒用的東西就扔一扔，別又堆著。', '你們先別一起問啦，我越想越亂欸。',
  '所以我們問的時候，你們就只肯講那麼一點？', '可是我們不知道的事情，怎麼會知道要問？'
]);
directLines('sad', [
  '……不記得了。', '可是現在要找，也找不回來了。', '有，可是也來不及，我也不知道怎麼開口。',
  '他一直記著。', '……是啊，她哭著叫我不要亂動阿嬤的東西，可我那時候不肯聽。',
  '我想著，他沒提，我也不要提。拖到後來，更不知道怎麼開口了。',
  '她過世以後，我有時候會拿出來聽。尤其是前面她唱自己名字的那段。',
  '我那時候沒追問。現在想起來，有點後悔。', '沒有。我一直想說過幾天再去。',
  '後面我真的想不起來。', '……他十年前才過世，你們明明在這期間碰過那麼多次面。',
  '我那時候說……燒了吧。燒了，就沒有人再笑我們了。', '對。我那時候把這些事都怪到她身上。'
]);
directLines('surprised', [
  '……扳開了，啊——割到手指了。', '她是巫師？', '所以是你提的？', '沒了？',
  '……這是麴。我阿嬤以前拿來的，原來伯公還留著喔。', '等一下……好像有講名字。', '等等……前面的，好像是名字。'
]);
directLines('worried', [
  '我試一下……', '我也不確定。我怕一直跟著想，最後只是覺得很像。',
  '……我聽不太懂族語。', '她有說過名字的，但我現在想不起來怎麼念。',
  '我沒有一封封看，也沒弄清楚。我那時候覺得，只要有人名、地址，都可能被拿來問。'
]);
directLines('gentle', [
  '沒關係啦，我教的那些小朋友也聽不懂，他們甚至還要考試呢。',
  '先休息一下，不用現在想完。', '好，先想她那次在說什麼，不用急著把名字湊完整。',
  '那今天先留這一段。', '妳想到多少，再跟我們說就好。',
  '她說，名字不會不見。名字會等，等到有人願意再叫它的那一天。',
  '叔公，下次你想到什麼，可以打給我。', '如果我沒接到，我下班會回的。',
  '先打電話，臭小子。你每次都挑我去種田的時候來家裡。'
]);

const Stage = {
  walk: (who, to, dir, map) => ({ type: 'walk', who, to, dir, map }),
  pose: (who, pose, emotion, duration = 700) => ({ type: 'pose', who, pose, emotion, duration }),
  prop: (who, item, action, at) => ({ type: 'prop', who, item, action, at, duration: 850 }),
  room: (map, at) => ({ type: 'room', map, at }),
  // 過場：畫面淡入淡出、停頓
  fade: (from, to, duration = 800) => ({ type: 'fade', from, to, duration }),
  wait: (duration = 600) => ({ type: 'wait', duration }),
  away: (map, who, at) => ({ type: 'away', map, who, at }),
  back: (who, at) => ({ type: 'back', who, at }),
  cast: (who, at, seated = false) => ({ type: 'cast', who, at, seated }),
  exit: who => ({ type: 'exit', who })
};
const NARRATIVE_CUES = new Map();
function directScene(text, ...steps) { NARRATIVE_CUES.set(text, steps); }
const swalk = Stage.walk, spose = Stage.pose, sprop = Stage.prop;
// Coordinates are authored against the room, hall and yard tile maps.
directScene('你把紙放在長桌的空位上。', swalk('you', [9, 4], 3), sprop('you', 'tengben', 'place', [136, 72]));
directScene('你把謄本摺好夾在手臂下，推開門走進堂屋。', sprop('you', 'tengben', 'fold'), swalk('you', [5, 7], 0), Stage.room('hall', [2, 2, 0]), swalk('you', [2, 4], 2));
directScene('床上躺著你的手機，你拿起來看，共有三十七則訊息未讀。', sprop('you', 'phone', 'take', [39, 49]));
directScene('你把手機蓋回床上。', sprop('you', 'phone', 'place', [39, 49]));
directScene('你把鐵盒放到地上，用面紙壓住割到的地方。', sprop('you', 'box', 'place', [150, 54]), spose('you', 'bow', 'worried'));
directScene('你把那張紙攤開。', sprop('you', 'tengben', 'open'));
directScene('你沒多想，隨後把它放回鐵盒。', sprop('you', 'hanky', 'place', [150, 54]));
directScene('一個戴棒球帽的男人站起來，朝你揮手。', spose('shichang', 'wave', 'happy')); // 「他坐回去」的動作已刪，所以這裡也不站起來，免得世昌一直站著
directScene('她笑了一下，把桌邊的一疊舊報紙推整齊。', spose('yuzhen', 'nod', 'happy'), sprop('yuzhen', 'paper', 'place', [104, 69]));
directScene('他推了一下眼鏡，把資料夾往腿上壓了壓。', spose('wenbin', 'glasses'), sprop('wenbin', 'archive', 'fold'));
directScene('你繞了桌子一圈，回到空著的那張紅椅子。', swalk('you', [2, 2]), swalk('you', [9, 2]), swalk('you', [9, 7]), swalk('you', [7, 6], 1), spose('you', 'sit'));
directScene('玉珍張了張嘴，卻沒有發出聲音。她皺起眉，低頭又看了一次紙上的字。', spose('yuzhen', 'bow', 'worried'));
directScene('文彬把你帶來的資料挪到影本旁邊，讓兩張紙並排。', sprop('wenbin', 'tengben', 'place', [88, 84]), sprop('wenbin', 'archive', 'place', [99, 84]));
directScene('你在床邊坐下來。', swalk('you', [3, 3], 3), spose('you', 'sit', 'sad'));
directScene('明德叔公轉身往屋裡走，你沒有立刻跟上。明德叔公走了兩步，接著停在門邊，背對著你，隨後又走了進去。', Stage.cast('mingde', [10, 1, 0]), swalk('mingde', [3, 2]), swalk('mingde', [3, 9]), swalk('mingde', [10, 8], 1), spose('mingde', 'pause'), Stage.exit('mingde'));
directScene('玉珍蹲在櫃子前，把幾個疊在一起的碗移出來。你替她扶住櫃門，隨後看見最裡面還放著一只舊鐵罐。', spose('yuzhen', 'bow'), sprop('yuzhen', 'bowl', 'take'), spose('you', 'reach'));
directScene('玉珍回頭看了一眼，伸手拿起鐵罐。她沿著邊緣慢慢扳開蓋子，裡面墊著一塊褪色的布，放著幾塊乾燥的米色小圓塊。', sprop('yuzhen', 'qu', 'take'), sprop('yuzhen', 'qu', 'open'));
directScene('她把鐵罐放到桌上，撥開卡在蓋子裡的布角。', sprop('yuzhen', 'qu', 'place', [39, 87]), sprop('yuzhen', 'qu', 'open'));
directScene('她蓋好鐵罐，留在桌上，沒有放進待丟的紙箱。', sprop('yuzhen', 'qu', 'fold'), sprop('yuzhen', 'qu', 'place', [39, 87]));
directScene('建和睜開眼睛，像是被抓到偷懶的學生。', spose('jianhe', 'nod', 'surprised'));
directScene('建和摘下一邊耳機，把手機螢幕轉過來。畫面停在一段沒有正式標題的錄音上，檔名只有日期。', spose('jianhe', 'glasses'), sprop('jianhe', 'phone', 'turn'));
directScene('他把錄音往前拉了一小段，將另一邊耳機遞過來。', sprop('jianhe', 'phone', 'turn'), spose('jianhe', 'reach', 'gentle'));
directScene('錄音檔播完後，建和按下暫停，把那幾句話的意思翻譯給你聽。', sprop('jianhe', 'phone', 'write'));
directScene('世昌把布包一層一層打開，動作慢到你懷疑他是不是在拖時間。', sprop('shichang', 'photo', 'open'));
directScene('世昌把照片翻過來，背面有一行鉛筆淡字：「昭和十四年　春」。', sprop('shichang', 'photo', 'turn'));
directScene('世昌愣了一下。', spose('shichang', 'pause', 'surprised'));
directScene('說到這裡，世昌笑了一下。', spose('shichang', 'nod', 'happy'));
directScene('他把照片放回布上，這次沒有立刻包起來。', sprop('shichang', 'photo', 'place', [253, 164]));
directScene('世昌想了一下，把布包的角摺回去。', sprop('shichang', 'photo', 'fold'));
directScene('文彬去門口喊了一聲，大家陸續回到桌邊。世昌先把桌旁的紙箱挪開，建和搬進一張椅子。',
  swalk('wenbin', [5, 7], 0), spose('wenbin', 'wave'), swalk('wenbin', [5, 6], 1), spose('wenbin', 'sit'),
  Stage.cast('shichang', [9, 7, 1]), swalk('shichang', [9, 3], 3), sprop('shichang', 'box', 'place', [162, 53]), swalk('shichang', [8, 3], 0), spose('shichang', 'sit'),
  Stage.cast('jianhe', [5, 7, 3]), sprop('jianhe', 'chair', 'take'), swalk('jianhe', [3, 7], 1), sprop('jianhe', 'chair', 'place', [55, 107]), swalk('jianhe', [3, 6], 1), spose('jianhe', 'sit'));
for (const line of ['玉珍把鐵罐帶進來，放在靠牆的小桌上。', '玉珍從廚房帶來一只鐵罐，放在靠牆的小桌上。'])
  directScene(line, swalk('yuzhen', [9, 2], 1), sprop('yuzhen', 'qu', 'place', [152, 25]), swalk('yuzhen', [6, 3], 0), spose('yuzhen', 'sit'));
directScene('明德最後進來，褲管沾著草籽，看見信便停在椅子旁。', Stage.cast('mingde', [6, 7, 1]), swalk('mingde', [2, 7]), swalk('mingde', [2, 2]), swalk('mingde', [4, 3], 0), spose('mingde', 'sit', 'worried'));
directScene('你把信放在明德叔公面前。他先看了一眼開頭，才拿起來把紙挪到燈下。', swalk('you', [3, 2], 2), sprop('you', 'letter', 'place', [76, 69]), sprop('mingde', 'letter', 'take', [76, 69]));
directScene('明德叔公看完，將信放回你面前。', sprop('mingde', 'letter', 'place', [84, 74]));
directScene('明德叔公把椅子往桌邊移了一點。', spose('mingde', 'lean', 'sad'));
directScene('文彬把一張空白紙移到世昌旁邊。', sprop('wenbin', 'paper', 'place', [133, 74]));
directScene('世昌把照片轉向明德。', sprop('shichang', 'photo', 'turn'));
for (const line of ['明德從口袋拿出一個小紙包，放到桌角。裡面是一片焦黑、邊緣捲曲的厚紙，已經看不出完整圖像。', '明德從口袋拿出小紙包，把焦黑的厚紙攤在桌上。'])
  directScene(line, sprop('mingde', 'fragment', 'take'), sprop('mingde', 'fragment', 'place', [68, 71]));
directScene('玉珍走到靠牆的小桌旁，掀開鐵罐蓋子。', swalk('yuzhen', [9, 2], 1), sprop('yuzhen', 'qu', 'open'));
directScene('她把鐵罐拿到桌邊，打開讓大家看。', sprop('yuzhen', 'qu', 'take', [152, 25]), swalk('yuzhen', [9, 4], 3), sprop('yuzhen', 'qu', 'place', [136, 80]), sprop('yuzhen', 'qu', 'open'));
directScene('玉珍把鐵罐放回靠牆的小桌，建和拿來一張乾淨的紙，整理剛才提過、還需要再問的事情。', swalk('yuzhen', [9, 2], 1), sprop('yuzhen', 'qu', 'place', [152, 25]), swalk('yuzhen', [6, 3], 0), spose('yuzhen', 'sit'), sprop('jianhe', 'paper', 'place', [62, 85]), sprop('jianhe', 'paper', 'write'));
directScene('你起身添水。', spose('you', 'stand'), sprop('you', 'cup', 'take'), swalk('you', [9, 4], 3), sprop('you', 'cup', 'place', [105, 69]));
directScene('玉珍接過杯子，看到旁邊的鐵罐，手停在半空。', sprop('yuzhen', 'cup', 'take', [105, 69]), spose('yuzhen', 'pause', 'surprised'));
directScene('明德原本放在膝上的手抬起來。', spose('mingde', 'reach', 'surprised'));
directScene('明德試了幾次，最後搖頭。', spose('mingde', 'shake', 'sad'));
directScene('你拿出手機放在桌上。', sprop('you', 'phone', 'take'), sprop('you', 'phone', 'place', [118, 83]));
directScene('世昌笑了。', spose('shichang', 'nod', 'happy'));
directScene('快十二點了。玉珍把杯子收進茶盤，建和蹲下去拔充電線。', sprop('yuzhen', 'cup', 'take'), spose('jianhe', 'bow'));
directScene('世昌在椅縫裡找到車鑰匙，又折回桌邊把照片放進硬紙夾。', spose('shichang', 'bow'), sprop('shichang', 'photo', 'take', [114, 73]), sprop('shichang', 'photo', 'fold'));
directScene('你把電話寫在便條上，放到他面前。', sprop('you', 'paper', 'write'), sprop('you', 'paper', 'place', [75, 71]));
directScene('明德叔公將便條摺好，收進口袋。', sprop('mingde', 'paper', 'take', [75, 71]), sprop('mingde', 'paper', 'fold'), sprop('mingde', 'paper', 'stow'));
directScene('明德喝了一口，稍微放鬆了一點。', sprop('mingde', 'cup', 'take'), spose('mingde', 'nod', 'gentle'));
directScene('世昌起身去車上，帶回包著照片的布包。',
  spose('shichang', 'stand'), swalk('shichang', [9, 7]), swalk('shichang', [6, 7], 0),
  Stage.away('out', 'shichang', [10, 8, 2]), swalk('shichang', [16, 9], 2), sprop('shichang', 'photo', 'take', [278, 151]), swalk('shichang', [10, 8], 1),
  Stage.back('shichang', [6, 7, 2]), swalk('shichang', [9, 7]), swalk('shichang', [9, 2]), swalk('shichang', [8, 3], 0), spose('shichang', 'sit'));
directScene('你端起茶盤走進廚房。玉珍將乾布遞給你，讓你把洗好的杯子一個個擦乾，放回櫃子。',
  spose('you', 'stand'), sprop('you', 'cup', 'take'), swalk('you', [2, 2], 1), Stage.room('room', [5, 7, 1]),
  Stage.cast('yuzhen', [9, 4, 0]), swalk('you', [9, 6], 1), sprop('yuzhen', 'hanky', 'take'), spose('yuzhen', 'reach', 'gentle'), sprop('you', 'cup', 'fold'), sprop('you', 'cup', 'place', [167, 86]));
directScene('你將裝著信的袋子放回阿公的房間，今晚先住在老屋。',
  swalk('you', [2, 2], 1, 'hall'), Stage.room('room', [5, 7, 1]), swalk('you', [3, 3], 3), sprop('you', 'letter', 'place', [38, 48]));
directScene('明德走到廚房門口，看見靠牆的鐵罐。', Stage.cast('mingde', [5, 7, 1]), swalk('mingde', [9, 5], 2), spose('mingde', 'bow', 'gentle'));
directScene('你把明德叔公面前冷掉的茶倒掉，重新倒了一杯，在他旁邊坐下。', swalk('you', [3, 2], 2), sprop('you', 'cup', 'take', [74, 69]), sprop('you', 'cup', 'place', [74, 69]), swalk('you', [3, 3], 0), spose('you', 'sit', 'gentle'));
directScene('建和自嘲地笑了一下。', spose('jianhe', 'nod', 'happy'));
directScene('他在筆記本上飛快寫了一行，畫了兩個圈。', sprop('shichang', 'notebook', 'write'));
directScene('玉珍翻看手機裡的舊照片，停在阿嬤的那一張。', sprop('yuzhen', 'phone', 'turn'), spose('yuzhen', 'bow', 'sad'));
directScene('你坐在世昌旁邊。他的筆記本上寫滿了名字和箭頭，箭頭最後指向一個空白的圓圈。', swalk('you', [7, 3], 0), spose('you', 'sit'), sprop('shichang', 'notebook', 'open'));
directScene('你看向流理臺旁的米缸，又低頭看了看罐裡的麴。', spose('you', 'bow', 'worried'));
directScene('文彬打開資料夾，取出一份舊戶籍影本，放到你的謄本旁邊。', sprop('wenbin', 'archive', 'open'), sprop('wenbin', 'archive', 'place', [99, 84]));
directScene('世昌把照片放回布上。', sprop('shichang', 'photo', 'place', [114, 73]));
directScene('玉珍點頭。', spose('yuzhen', 'nod', 'gentle'));
directScene('世昌把你的謄本與信放回你面前。', sprop('shichang', 'tengben', 'place', [111, 84]), sprop('shichang', 'letter', 'place', [122, 84]));
directScene('長輩說分頭整理。大家散進屋子的各個角落。',
  Stage.cast('mingde', [4, 3, 0], true), Stage.cast('yuzhen', [6, 3, 0], true), Stage.cast('shichang', [8, 3, 0], true), Stage.cast('jianhe', [3, 6, 1], true),
  spose('mingde', 'stand'), swalk('mingde', [2, 2]), swalk('mingde', [2, 7]), swalk('mingde', [6, 7], 0), Stage.exit('mingde'),
  spose('yuzhen', 'stand'), swalk('yuzhen', [2, 2], 1), Stage.exit('yuzhen'),
  spose('shichang', 'stand'), swalk('shichang', [9, 7]), swalk('shichang', [6, 7], 0), Stage.exit('shichang'),
  spose('jianhe', 'stand'), swalk('jianhe', [4, 7], 0), Stage.exit('jianhe'));

// Animation state is transient. Only completed actor/prop positions are saved.
function stageActors() { return S.stageActors || (S.stageActors = {}); }
function stageProps() { return S.stageProps || (S.stageProps = {}); }
function stageActor(who) {
  if (who === 'you') return { x: P.x, y: P.y, dir: P.dir, seated: !!U.playerSeated };
  const saved = stageActors()[who];
  if (saved) return { ...saved };
  const e = ents().find(e => e.npc === who);
  if (!e) return null;
  return { x: e.tiles[0][0], y: e.tiles[0][1], dir: e.dir, seated: e.seated };
}
function placeActor(who, a) {
  if (who === 'you') {
    P.x = P.fx = a.x; P.y = P.fy = a.y; P.dir = a.dir; P.moving = false;
    U.playerSeated = !!a.seated;
    S.rpg = { map: curMap(), x: a.x, y: a.y, dir: a.dir, seated: !!a.seated };
  } else stageActors()[who] = { ...a };
}
function stagePath(who, from, to) {
  const M = MAPS[curMap()], key = (x, y) => x + ',' + y;
  const blockers = new Set();
  for (const e of ents()) {
    if (e.npc === who) continue;
    for (const [x, y] of e.tiles) {
      // An empty chair can be the final destination, never an intermediate tile.
      if (e.id.startsWith('stool') && x === to[0] && y === to[1]) continue;
      blockers.add(key(x, y));
    }
  }
  if (who !== 'you' && !U.hidePlayer) blockers.add(key(P.x, P.y));
  const start = key(from.x, from.y), goal = key(...to), prev = new Map([[start, null]]), q = [[from.x, from.y]];
  for (let i = 0; i < q.length; i++) {
    const [x, y] = q[i];
    if (key(x, y) === goal) {
      const route = []; let k = goal;
      while (k !== start) { const p = prev.get(k); route.unshift(p.at); k = p.from; }
      return route;
    }
    for (const [dx, dy] of DIRS) {
      const nx = x + dx, ny = y + dy, k = key(nx, ny);
      if (prev.has(k) || nx < 0 || ny < 0 || nx >= M.w || ny >= M.h || solidAt(curMap(), nx, ny) || DOORS[curMap()][k] || blockers.has(k)) continue;
      prev.set(k, { from: key(x, y), at: [nx, ny] }); q.push([nx, ny]);
    }
  }
  return null;
}
function startScene(steps) {
  if (!steps || !steps.length) return;
  held = null; P.path = []; P.goal = null; P.moving = false;
  U.cinema = { steps, index: 0, elapsed: 0, active: null, actor: null };
  nextStageStep();
  if (RM) finishScene();
}
function nextStageStep() {
  const c = U.cinema;
  while (c && c.index < c.steps.length) {
    const step = c.steps[c.index++];
    if (step.type === 'walk' && step.map && step.map !== curMap()) continue;
    if (step.type === 'away') {
      c.home = { rpg: { ...S.rpg }, actors: { ...stageActors() }, seated: U.playerSeated };
      setMap(step.map, ...step.at); U.hidePlayer = true;
      placeActor(step.who, { x: step.at[0], y: step.at[1], dir: step.at[2], seated: false }); continue;
    }
    if (step.type === 'back') {
      const home = c.home;
      setMap(home.rpg.map, home.rpg.x, home.rpg.y, home.rpg.dir);
      S.stageActors = home.actors; U.playerSeated = home.seated; U.hidePlayer = false;
      placeActor(step.who, { x: step.at[0], y: step.at[1], dir: step.at[2], seated: false }); continue;
    }
    if (step.type === 'room') { setMap(step.map, ...step.at); continue; }
    if (step.type === 'cast') { placeActor(step.who, { x: step.at[0], y: step.at[1], dir: step.at[2] || 0, seated: step.seated }); continue; }
    if (step.type === 'exit') { stageActors()[step.who] = { ...stageActor(step.who), hidden: true }; continue; }
    if (step.type === 'fade' || step.type === 'wait') { c.active = step; c.actor = null; c.elapsed = 0; c.duration = step.duration; if (step.type === 'fade') U.sceneDark = step.from; return; }
    const a = stageActor(step.who);
    if (!a || a.hidden) continue;
    if (step.emotion) { U.dlg.emotion = step.emotion; U.dlg.actor = step.who; }
    // 精簡演出：點頭、低頭、搖頭、伸手等小動作只換表情，不播放晃動；
    // 打開、摺起、翻面、寫字等不改變位置的物品動作也略過（不再跳出放大的物品框）。
    if (step.type === 'pose' && !['stand', 'sit'].includes(step.pose)) continue;
    if (step.type === 'prop' && !['take', 'place', 'stow'].includes(step.action)) continue;
    c.active = step; c.actor = a; c.elapsed = 0; c.duration = step.type === 'pose' ? 300 : step.type === 'prop' ? 450 : (step.duration || 700);
    if (step.type === 'walk') {
      let path = stagePath(step.who, a, step.to);
      // A player may already occupy a scripted destination. Stop beside them
      // instead of walking through them or abandoning the entire movement.
      if (path === null) for (const [dx, dy] of DIRS) {
        path = stagePath(step.who, a, [step.to[0] + dx, step.to[1] + dy]);
        if (path !== null) break;
      }
      if (path === null) { console.warn('Unreachable stage cue', step.who, step.to); continue; }
      c.route = [[a.x, a.y], ...path]; c.duration = Math.max(160, path.length * 150); a.seated = false;
    }
    if (step.type === 'prop') {
      const staged = S.stagedItems || (S.stagedItems = {});
      const items = staged[curMap()] || (staged[curMap()] = []);
      if (!items.includes(step.item)) items.push(step.item);
      const props = stageProps()[curMap()] || {};
      c.propStart = props[step.item] || step.at || [a.x * TS + 9, a.y * TS + 6];
      // Remove an old copy while it is in the actor's hand.
      if (step.action === 'take' || step.action === 'place') delete props[step.item];
    }
    return;
  }
  U.cinema = null; U.sceneDark = 0;
}
function completeStageStep() {
  const c = U.cinema, s = c.active;
  if (s.type === 'fade' || s.type === 'wait') { if (s.type === 'fade') U.sceneDark = s.to; return nextStageStep(); }
  const a = { ...c.actor };
  if (s.type === 'walk') { const to = c.route.at(-1); a.x = to[0]; a.y = to[1]; a.dir = s.dir ?? stageDirection(c.route.at(-2) || to, to, a.dir); a.seated = false; }
  if (s.type === 'pose') {
    if (s.pose === 'sit') a.seated = true;
    if (s.pose === 'stand') a.seated = false;
  }
  placeActor(s.who, a);
  if (s.type === 'prop') {
    const props = stageProps()[curMap()] || (stageProps()[curMap()] = {});
    const held = S.stageHeld || (S.stageHeld = {});
    if (s.action === 'place') props[s.item] = s.at || [a.x * TS + 8, a.y * TS + 10];
    if (s.action === 'take') delete props[s.item];
    if (s.action === 'place' || s.action === 'stow') delete held[s.who];
    else if (s.action !== 'flutter') held[s.who] = s.item;
  }
  nextStageStep();
}
function finishScene() {
  while (U.cinema) completeStageStep();
  if (U.dlg) U.dlg.n = U.dlg.t.length;
  // 沒有文字的過場，播完就自動接下一句
  if (U.dlg && U.dlg.w === '!') return flow();
  render();
}
function updateScene(dt) {
  const c = U.cinema;
  if (!c) return;
  c.elapsed += dt;
  if (c.active && c.active.type === 'fade') U.sceneDark = c.active.from + (c.active.to - c.active.from) * Math.min(1, c.elapsed / c.duration);
  if (c.elapsed >= c.duration) { completeStageStep(); if (!U.cinema && U.dlg && U.dlg.w === '!') return flow(); render(); }
}
// 台詞的表情：逐句指定 > 遊戲中組合出來的句子（提示、拿錯東西、推理更正）> 平靜
function emotionFor(who, t) {
  if (LINE_EMOTIONS.has(t)) return LINE_EMOTIONS.get(t);
  if (!emotionFor.ready && typeof BEATS !== 'undefined') {
    emotionFor.ready = true;
    for (const b of BEATS) {
      for (const [w, line] of Object.entries(b.hint || {})) if (!LINE_EMOTIONS.has(line)) LINE_EMOTIONS.set(line, w === 'shichang' ? 'smirk' : 'thinking');
      for (const line of Object.values(b.miss || {})) if (!LINE_EMOTIONS.has(line)) LINE_EMOTIONS.set(line, 'awkward');
    }
    for (const line of (WRONG.mingde || [])) LINE_EMOTIONS.set(line, 'angry');
    for (const line of (WRONG.wenbin || [])) LINE_EMOTIONS.set(line, 'awkward');
    if (typeof DEDUCE !== 'undefined') for (const d of DEDUCE) { LINE_EMOTIONS.set(d.bad, 'serious'); if (d.alt) LINE_EMOTIONS.set(d.alt, 'serious'); }
    if (typeof zy === 'function') { LINE_EMOTIONS.set(zy('md_mutter'), 'angry'); LINE_EMOTIONS.set(zy('jh_hello'), 'happy'); LINE_EMOTIONS.set(zy('jh_thanks'), 'gentle'); LINE_EMOTIONS.set(zy('jh_rec') + '……', 'gentle'); }
    if (LINE_EMOTIONS.has(t)) return LINE_EMOTIONS.get(t);
  }
  if (/^\$\{|，我們先/.test(t)) return 'gentle';
  return 'neutral';
}
function stageDirection(a, b, fallback) { return b[0] > a[0] ? 2 : b[0] < a[0] ? 3 : b[1] > a[1] ? 0 : b[1] < a[1] ? 1 : fallback; }
function sceneActorFrame(who) {
  const c = U.cinema;
  if (!c || !who || !c.actor || c.active.who !== who) return null;
  const a = { ...c.actor }, s = c.active, t = Math.min(1, c.elapsed / c.duration);
  a.frame = 0; a.ox = 0; a.oy = 0;
  if (s.type === 'walk') {
    const n = t * (c.route.length - 1), i = Math.min(Math.floor(n), c.route.length - 2);
    if (i >= 0) { const from = c.route[i], to = c.route[i + 1], f = n - i; a.x = from[0] + (to[0] - from[0]) * f; a.y = from[1] + (to[1] - from[1]) * f; a.dir = stageDirection(from, to, a.dir); a.frame = Math.floor(c.elapsed / 90) % 2 + 1; }
    a.seated = false;
  } else if (s.type === 'pose') {
    const wave = Math.sin(t * Math.PI);
    if (s.pose === 'shake') a.ox = Math.sin(t * Math.PI * 6) * 2;
    if (['bow', 'nod', 'lean'].includes(s.pose)) a.oy = wave * (s.pose === 'nod' ? 2 : 4);
    if (s.pose === 'stand') { a.seated = false; a.oy = -3 * (1 - t); }
    if (s.pose === 'sit') { a.seated = false; a.oy = -3 * t; }
  }
  return a;
}
function drawStageHand(g, who, x, y) {
  const c = U.cinema;
  const held = S.stageHeld && S.stageHeld[who];
  if (held && !(c && c.active.who === who && c.active.type === 'prop')) drawSmallProp(g, held, x + 10, y + 6);
  if (!c || c.active.who !== who || c.active.type === 'walk') return;
  const t = c.elapsed / c.duration, s = c.active;
  const reach = s.type === 'prop' || ['reach', 'wave', 'glasses'].includes(s.pose);
  if (!reach) return;
  const lift = s.pose === 'wave' ? Math.sin(t * Math.PI * 6) * 3 : Math.sin(t * Math.PI) * 4;
  R(g, CHAR[who].shirt, x + 10, y + 7 - lift, 4, 3);
  R(g, CHAR[who].skin, x + 13, y + 5 - lift, 3, 3);
}
function drawSmallProp(g, item, x, y) {
  x = Math.round(x); y = Math.round(y);
  const color = { tengben: '#d9c48f', letter: '#ece6d6', photo: '#70665d', fragment: '#302620', phone: '#23323e', cup: '#e8e2d2', qu: '#8d9b94', box: '#875d3c', chair: '#c24649', bowl: '#e6d8c0' }[item] || '#e2d7b9';
  R(g, PAL.ol, x - 1, y - 1, 10, 8); R(g, color, x, y, 8, 6);
  if (item === 'phone') R(g, '#82b6bc', x + 1, y + 1, 6, 3);
  else if (item === 'qu' || item === 'cup') R(g, '#c7c6af', x, y, 8, 2);
  else { R(g, '#968669', x + 1, y + 2, 6, 1); R(g, '#968669', x + 1, y + 4, 4, 1); }
}
const ENTITY_ITEMS = { room: ['box', 'hanky', 'phone', 'rice', 'betel'] };
function drawStageProps(g, cx, cy) {
  if (!S) return;
  // 地圖上已有實體的物品（例如鐵盒、手機），放下後不另外畫一份，避免出現點不到的複製品
  const owned = ENTITY_ITEMS[curMap()] || [];
  for (const [item, at] of Object.entries((S.stageProps || {})[curMap()] || {})) if (!owned.includes(item)) drawSmallProp(g, item, at[0] - cx, at[1] - cy);
  const c = U.cinema;
  if (!c || c.active.type !== 'prop') return;
  const s = c.active, a = c.actor, t = Math.min(1, c.elapsed / c.duration), hand = [a.x * TS + 12, a.y * TS + (a.seated ? 2 : 6)];
  const from = s.action === 'take' ? c.propStart : hand, to = s.action === 'place' ? s.at || hand : hand;
  drawSmallProp(g, s.item, from[0] + (to[0] - from[0]) * t - cx, from[1] + (to[1] - from[1]) * t - Math.sin(t * Math.PI) * 5 - cy);
  // （物品特寫框已移除：縮放畫面容易讓人不舒服）
}

// ===== 全劇表情與動作（照劇情順序；以原文對應，修改台詞時請一併修改這裡） =====
// 改表情：把句末的英文換掉（neutral 平靜 / happy 開心 / gentle 溫柔 / angry 生氣 / sad 難過 / surprised 驚訝 /
//         worried 不安 / pain 痛 / smirk 調侃 / awkward 尷尬 / serious 認真 / thinking 思考）
// 改動作：directScene("旁白原文", 步驟, 步驟…)；刪掉整行就沒有動作。說明見 docs/動畫修改指南.md

// —— 第一章｜阿公房間・手機 ——
directScene("最上面是公司群組，有人把主管的醉臉做成了貼圖，也有人在傳各種梗圖，大家狂按讚。", spose('you', 'bow', 'neutral'));
directScene("往下滑，主管私訊：「奕翔節哀。你的喪假到幾號？你這邊的客戶我先讓Jason擋著。」", spose('you', 'pause', 'worried'));
directScene("你又想起前陣子，同事一臉揶揄地問你：「所以你是原住民啊？哪一族啊？有沒有族名？」", spose('you', 'pause', 'worried'));

// —— 第一章｜阿公房間・衣櫃 ——
LINE_EMOTIONS.set("……扳開了，啊——割到手指了。", 'pain');

// —— 第一章｜阿公房間・手帕 ——
directScene("這是阿公的手帕，被阿公洗到發白，但四個角摺得整齊。", spose('you', 'bow', 'gentle'));
directScene("阿公他們那一代的男人，不知為何特別講究，口袋裡都會有一條這種手帕。", spose('you', 'pause', 'smirk'));
directScene("你小時候跌倒，他就是用這種手帕幫你擦膝蓋的血，擦完還罵你走路不看路。", spose('you', 'bow', 'sad'));

// —— 第一章｜阿公房間・抽屜 ——
directScene("即使現在想問，已經沒有人可以問了。", spose('you', 'bow', 'sad'));

// —— 第一章｜堂屋進場 ——
LINE_EMOTIONS.set("奕翔齁？我世昌啦，電話裡那個啦！本人有比較帥吧？", 'happy');
LINE_EMOTIONS.set("那天我打給你，你還接起來問我是不是詐騙集團。我說對啊，我專門騙人回家的啦！", 'smirk');
LINE_EMOTIONS.set("現在大家都到了。你先去跟每個人打個招呼！", 'happy');

// —— 第一章｜時間用完 ——
directScene("牆上的鐘響了一聲。世昌看了看手機。", spose('shichang', 'bow', 'worried'));
LINE_EMOTIONS.set("來不及一個一個聊了，我先講一件事，我阿公說五十多年前家裡燒過他阿嬤的東西。我有一張照片就是他從火堆裡撿回來的。", 'serious');
LINE_EMOTIONS.set("這個「胡」……我阿嬤好像提過。她可能是我們三個的高祖母，等一下再對。", 'thinking');

// —— 第一章｜分頭整理 ——
LINE_EMOTIONS.set("好啦，東西太多了，今晚是整理不完。我們先分頭，等一下再回來講。", 'awkward');
LINE_EMOTIONS.set("整理就整理，沒用的東西就扔一扔，別又堆著。", 'angry');
LINE_EMOTIONS.set("叔公——", 'awkward');
directScene("明德沒有回話。", spose('mingde', 'bow', 'angry'));

// —— 第一章｜和明德 ——
directScene("明德叔公坐在主位旁邊，兩隻手交握在桌上。手背上的皮皺得像曬乾的豆皮。", spose('mingde', 'pause', 'serious'));
LINE_EMOTIONS.set("叔公。", 'awkward');
LINE_EMOTIONS.set("嗯。吃飽沒？", 'serious');
LINE_EMOTIONS.set("吃了。", 'awkward');
LINE_EMOTIONS.set("騙人，你們這些小孩每次都說吃了，結果轉過頭回去就吃沒營養的泡麵。", 'smirk');
directScene("他看見你手臂下夾著的紙，眼神停了一下，很快又移開。", spose('mingde', 'pause', 'surprised'), spose('mingde', 'bow', 'serious'));
directScene("他說得很小聲，但是是說族語。", spose('mingde', 'bow', 'angry'));
directScene("你聽不懂，只聽出那個語氣跟你小時候亂翻阿公抽屜時，阿公罵你的語氣一樣。", spose('you', 'pause', 'awkward'));

// —— 第一章｜和玉珍 ——
directScene("玉珍坐在靠窗的位子，正把桌邊散開的雜物往紙箱裡收。", spose('yuzhen', 'reach', 'neutral'));
LINE_EMOTIONS.set("奕翔，你長好高。", 'happy');
LINE_EMOTIONS.set("玉珍姊，上次見是……", 'thinking');
LINE_EMOTIONS.set("我記得是你國中吧。過年我們在這間屋子過年，你一直躲在廁所打電動，打到大家要拍大合照才肯出來。", 'smirk');
LINE_EMOTIONS.set("……這個妳也記得。", 'awkward');
LINE_EMOTIONS.set("沒辦法，記性好，是我們家的遺傳。", 'smirk');

// —— 第一章｜和世昌 ——
LINE_EMOTIONS.set("找我幹嘛？去啊，先去打招呼。我又不會跑掉。", 'smirk');

// —— 第一章｜和建和 ——
directScene("靠門的位子坐著一個年輕男人，脖子上掛著耳機，手機螢幕朝下蓋在桌上。", spose('jianhe', 'glasses', 'neutral'));
LINE_EMOTIONS.set("我是建和，在國小教族語。也姓陳，不過不是你們家的，這一帶姓陳的太多了，丟一顆石頭就會打到三個。", 'happy');
LINE_EMOTIONS.set("我是被玉珍找來的，說是可能會用到族語，請我幫忙翻譯。", 'gentle');
LINE_EMOTIONS.set("……我聽不太懂族語。", 'worried');
LINE_EMOTIONS.set("沒關係啦，我教的那些小朋友也聽不懂，他們甚至還要考試呢。", 'gentle');

// —— 第一章｜和文彬 ——
directScene("桌尾坐著一個戴眼鏡的中年男人，資料夾放在腿上，坐得比所有人都直。", spose('wenbin', 'glasses', 'serious'));
LINE_EMOTIONS.set("你好，我姓李，李文彬。在大學裡做撒奇萊雅族文化的研究。", 'gentle');
LINE_EMOTIONS.set("我是世昌請我來的。", 'neutral');
LINE_EMOTIONS.set("那你研究二十年，那你應該比我還懂我們家的文化了吧。", 'smirk');
LINE_EMOTIONS.set("才不會。你做研究做越久，只會覺得自己懂得少。我們拿國科會、中研院的錢做研究，但生產最多的東西叫做「尚待查證」。", 'awkward');

// —— 第一章｜自我介紹一輪 ——
LINE_EMOTIONS.set("好了，既然人都打過招呼了。那一個人講一句，今晚為什麼來。不想講的，說「我先聽」也可以。", 'happy');
LINE_EMOTIONS.set("是你叫我來的。", 'serious');
LINE_EMOTIONS.set("叔公，你這不算啦。", 'awkward');
LINE_EMOTIONS.set("那就兩句，是你叫我來的，然後我就來了。", 'smirk');
LINE_EMOTIONS.set("……我阿嬤如果還在，她也會來。", 'sad');
LINE_EMOTIONS.set("我是玉珍找我的，她說可能會用到族語，需要我幫忙。", 'neutral');
LINE_EMOTIONS.set("世昌請我來的。我還帶了一份資料……不過它能說的，可能比你們想的少。", 'serious');
directScene("大家紛紛轉頭看向你。", spose('mingde', 'pause'), spose('yuzhen', 'pause'), spose('shichang', 'pause'), spose('jianhe', 'pause'), spose('wenbin', 'pause'), spose('you', 'pause', 'worried'));
LINE_EMOTIONS.set("我在整理阿公的東西時，有一個東西我搞不懂。", 'worried');
LINE_EMOTIONS.set("搞不懂就拿出來啊。我們這桌別的沒有，看不懂的人最多。", 'smirk');
LINE_EMOTIONS.set("我先聽。", 'neutral');
LINE_EMOTIONS.set("你們這些小輩就把東西收一收就好啦，翻那些死人骨頭做什麼。", 'angry');
LINE_EMOTIONS.set("叔公你別那麼急，你也先聽一下啦！", 'awkward');

// —— 第一章｜問：她是誰 ——
LINE_EMOTIONS.set("叔公，這張紙上的人，你認得嗎？", 'serious');
directScene("你把謄本攤在他面前。明德叔公看了一眼，接著視線就移到窗外去了。", sprop('you', 'tengben', 'place', [72, 70]), spose('mingde', 'pause', 'serious'));
LINE_EMOTIONS.set("……那是以前日治時期的戶籍資料啦，寫法跟現在不一樣，把這東西收起來。", 'serious');

// —— 第一章｜問：為什麼 ——
LINE_EMOTIONS.set("那為什麼從來沒有人提過她？", 'serious');
LINE_EMOTIONS.set("囡仔人問遮多衝啥？（Gín-á-lâng bīn tsiah tsuē tshòng-siánn?）", 'angry');
LINE_EMOTIONS.set("就是因為不懂。所以才問啊。", 'serious');
directScene("明德叔公沒有回答，不過他多看了你一眼。", spose('mingde', 'pause', 'thinking'));
LINE_EMOTIONS.set("是我不懂，還是你們這些長輩從來沒跟我說？", 'angry');
LINE_EMOTIONS.set("你說「你們」是在說誰啊？", 'angry');
directScene("你沒有立刻回答，但明德叔公抬起眼看向你。", spose('you', 'bow', 'worried'), spose('mingde', 'pause', 'angry'));
LINE_EMOTIONS.set("你今天是回來整理你阿公的東西，還是想要吵架？", 'angry');

// —— 第一章｜問：燒東西 ——
LINE_EMOTIONS.set("五十年前燒的？那是誰拿去燒的？", 'surprised');
LINE_EMOTIONS.set("……我拿出去的。", 'sad');
directScene("世昌看著他，張開嘴又閉上，不知該如何開口。", spose('shichang', 'pause', 'surprised'));
LINE_EMOTIONS.set("燒不燒應該家裡的人一起決定吧。", 'serious');
LINE_EMOTIONS.set("我阿公說，有人不同意，也有人把東西拿回屋裡。怎麼會是大家都決定好了？", 'serious');
directScene("明德叔公的下巴繃緊，不再說話。", spose('mingde', 'bow', 'angry'));

// —— 第一章｜阿公房間・米缸 ——
LINE_EMOTIONS.set("那阿公備那麼多糯米是要做什麼？", 'thinking');
LINE_EMOTIONS.set("他有提過要用。等一下再說，你先把東西收好。", 'serious');
LINE_EMOTIONS.set("你阿公就是這樣，先把東西備好，後面的事慢慢才講。", 'gentle');

// —— 第一章｜問：名字 ——
LINE_EMOTIONS.set("那她叫什麼？", 'thinking');
LINE_EMOTIONS.set("阿嬤教我的，是族語名字，不是這個漢名。紙上是不是同一個人，還要再對。", 'serious');
LINE_EMOTIONS.set("等一下……我有點忘記怎麼念了。", 'worried');
LINE_EMOTIONS.set("一點都不記得了嗎？", 'surprised');
LINE_EMOTIONS.set("呃……現在突然要我想起怎麼念就卡住了。", 'awkward');
LINE_EMOTIONS.set("好，我等妳想起來。想起多少，再跟我說就好。", 'gentle');
LINE_EMOTIONS.set("我再想想看，我記得阿嬤以前不只講過一次……說不定等我想起她那時候在講什麼，就會記得了。", 'thinking');
LINE_EMOTIONS.set("妳試著念看看？記得多少就說多少。", 'gentle');
LINE_EMOTIONS.set("我試一下……", 'worried');
LINE_EMOTIONS.set("一個音也想不起來嗎？", 'worried');
LINE_EMOTIONS.set("你們先別一起問啦，我越想越亂欸。", 'angry');
LINE_EMOTIONS.set("……讓我從阿嬤那時候跟我說的話，慢慢想。", 'thinking');

// —— 第一章｜問：為什麼找建和 ——
LINE_EMOTIONS.set("妳為什麼找建和來？", 'neutral');
LINE_EMOTIONS.set("我之前準備考族語中高級，有去旁聽他的課。這次是想找回阿嬤教過我的名字，可是有些音怎麼樣都想不起來，就問他能不能來幫我聽聽看。", 'thinking');
LINE_EMOTIONS.set("她之前有跟我提過，不過電話裡也說不太清楚。想說當面聊，可能比較容易。", 'gentle');
LINE_EMOTIONS.set("我只怕最後讓你白跑一趟。", 'worried');
LINE_EMOTIONS.set("沒關係啦。", 'gentle');

// —— 第一章｜問：為什麼 ——
LINE_EMOTIONS.set("你為什麼約大家？", 'neutral');
LINE_EMOTIONS.set("我在查我們家的事啊，都查了快十多年了。戶政事務所、舊相簿、還能講話的長輩，全都一個一個找，一個一個問。", 'serious');
LINE_EMOTIONS.set("現在戶政事務所的小姐齁，看到我都會先皺眉嘆氣，然後問我今天又要查什麼。", 'smirk');
LINE_EMOTIONS.set("照片裡是我阿公的阿嬤，這個我早就知道。可是阿公講的族語名字，我沒記完整，跟戶籍上的漢名也對不起來。這幾年就是卡在這裡。", 'worried');

// —— 第一章｜問：燒東西 ——
LINE_EMOTIONS.set("你說你也帶了東西？", 'surprised');
LINE_EMOTIONS.set("是啊，我阿公說，五十年前家裡燒過他阿嬤的東西。就是我們共同那位高祖母。", 'serious');
LINE_EMOTIONS.set("我有一張照片，是他從屋後的火堆裡撿回來的。照片在我車上，我等一下去拿給你看。", 'serious');

// —— 第一章｜問：名字 ——
LINE_EMOTIONS.set("你懂族語，那個名字……你有辦法幫她想起來嗎？", 'thinking');
LINE_EMOTIONS.set("我沒聽過她阿嬤當時怎麼念，不能直接告訴她答案。不過她想到一些音的話，我可以幫忙一起聽。", 'serious');
LINE_EMOTIONS.set("如果她想起幾個音，我可以幫忙聽，或者問問部落裡的其他老人家，看有沒有人聽過。", 'gentle');
LINE_EMOTIONS.set("所以現在還沒辦法知道？", 'worried');
LINE_EMOTIONS.set("對啊，還不能確定。有些名字念起來很像，總是要再核對一下。", 'serious');

// —— 第一章｜問：為什麼 ——
LINE_EMOTIONS.set("你平常在哪裡教族語？", 'neutral');
LINE_EMOTIONS.set("國小啊，不過最近比較多時間待在部落。我教族語教了三年了啦，那些小朋友齁，今天學，明天就還我，比信用卡還款還準時呢。", 'awkward');

// —— 第一章｜文彬的資料 ——
LINE_EMOTIONS.set("你帶了什麼資料？", 'thinking');
directScene("文彬打開資料夾，從幾份影本裡抽出一頁，轉向你。", sprop('wenbin', 'archive', 'open'), sprop('wenbin', 'archive', 'turn'));
LINE_EMOTIONS.set("我以前蒐集的一些舊戶籍資料。世昌來找我的時候，我回去翻了一下，然後找到這一頁。你看這裡，原來寫的名字被劃掉了，旁邊另外又補了字。", 'serious');
LINE_EMOTIONS.set("底下原本寫什麼，還看得出來嗎？", 'thinking');
LINE_EMOTIONS.set("有幾筆是還看得到啦，但字不完整。", 'serious');
LINE_EMOTIONS.set("可是至少能確定，她的名字是被改過的吧？", 'surprised');
LINE_EMOTIONS.set("這一欄確實改過。不過，我們還得先確認這兩份資料寫的是不是同一個人。至於為什麼改，這頁也沒有註明。", 'serious');
LINE_EMOTIONS.set("我還以為你這邊查到呢。", 'awkward');
LINE_EMOTIONS.set("怎麼可能。不過是有找到一些，只是還沒全部對上。你之前說親屬記載不一樣，是哪一欄？我們等等一起看。", 'smirk');

// —— 第一章｜玉珍的推理題 ——
LINE_EMOTIONS.set("我剛剛看過了。胡……應該就是阿嬤說的那位。", 'thinking');
LINE_EMOTIONS.set("玉珍姊，妳看這一格。", 'neutral');
LINE_EMOTIONS.set("胡……這個名字，我阿嬤好像有提過。", 'thinking');
LINE_EMOTIONS.set("你先看這欄寫的是「母」，你覺得這是誰的媽媽啊？", 'smirk');
LINE_EMOTIONS.set("我記得她好像是明仁伯公、明德叔公他們那一輩的阿嬤。所以……應該是我們三個的高祖母？", 'thinking');
LINE_EMOTIONS.set("所以是戶長的媽媽。戶長是你阿公的爸爸那一輩。", 'gentle');
LINE_EMOTIONS.set("稱謂是跟戶長的，所以這應該就是戶長的媽媽。", 'thinking');
LINE_EMOTIONS.set("也是。戶長是你阿公的爸爸那一輩，所以她再往上一代。", 'happy');

// —— 第一章｜和明德 ——
LINE_EMOTIONS.set("叔公，你看這一格。", 'neutral');
LINE_EMOTIONS.set("不要拿給我看啦，我又沒興趣，收起來。", 'angry');
LINE_EMOTIONS.set("這缸先留著。你阿公有提過要用，等一下再講。", 'serious');

// —— 第一章｜和玉珍 ——
LINE_EMOTIONS.set("……我不知道。你阿公沒跟我說過。", 'worried');

// —— 第一章｜和世昌 ——
LINE_EMOTIONS.set("民國前二十三年……我那張照片背面也有日期，等一下拿來一起看。不過只靠日期，應該還不能確定吧？", 'thinking');
LINE_EMOTIONS.set("這個我不知道，你阿公沒跟我提過要拿來做什麼。", 'awkward');

// —— 第一章｜和建和 ——
LINE_EMOTIONS.set("這是戶籍上的名字，不過我不知道她原本的名字。", 'thinking');

// —— 第一章｜和文彬 ——
LINE_EMOTIONS.set("這就是你在鐵盒裡找到的？", 'surprised');

// —— 第一章｜和明德 ——
LINE_EMOTIONS.set("……你阿公最後那陣子啊，常常講以前的事，但講到一半就不講了。", 'sad');

// —— 第一章｜和世昌 ——
LINE_EMOTIONS.set("我們家的人啊，都等到要躺進去了才肯講，但到那時候也講不出來了。", 'awkward');

// —— 第一章｜和建和 ——
directScene("你看到鎖定畫面一閃——是一張陌生老人家的照片，坐在門口瞇著眼睛笑，笑得祥和。", spose('jianhe', 'bow', 'gentle'));

// —— 第二章｜屋後・明德 ——
LINE_EMOTIONS.set("叔公？", 'worried');
LINE_EMOTIONS.set("……這裡，以前是燒東西的地方。", 'sad');
LINE_EMOTIONS.set("垃圾啊…落葉…還有不要的東西，全都拿來這裡燒。後來不燒了，大家就集資鋪了水泥。", 'serious');
LINE_EMOTIONS.set("……但鋪了以後還是看得出來痕跡。", 'sad');
LINE_EMOTIONS.set("……她每天天還沒亮的時候，就從這條小路去提水。", 'gentle');
LINE_EMOTIONS.set("我們這些小孩啊，都還在睡，就聽到水桶碰到門框的聲音。叩、叩。每天都一樣。", 'gentle');
LINE_EMOTIONS.set("有時候想裝睡、不想起來幫忙，她就自己把水提進去。", 'sad');
LINE_EMOTIONS.set("那晚到底怎麼了？", 'serious');
LINE_EMOTIONS.set("……進去再說。", 'worried');

// —— 第二章｜廚房・玉珍 ——
LINE_EMOTIONS.set("這個也拿出來嗎？", 'thinking');
LINE_EMOTIONS.set("……這是麴。我阿嬤以前拿來的，原來伯公還留著喔。", 'surprised');
LINE_EMOTIONS.set("拿來釀酒的？", 'thinking');
LINE_EMOTIONS.set("嗯。以前他們會一起做。後來次數越來越少，但阿嬤還是會拿做好的麴送給伯公。", 'gentle');
LINE_EMOTIONS.set("我有一次問阿嬤，又沒有人要釀酒，幹嘛還一直做。她就說太久沒做手會忘記。", 'gentle');
LINE_EMOTIONS.set("那妳有跟她學嗎？", 'neutral');
LINE_EMOTIONS.set("是有幫過忙，可是都是等她叫我做什麼，我才做什麼。現在要我自己從頭做一次，我也不會。", 'awkward');
LINE_EMOTIONS.set("阿公準備那些糯米，會不會也是想再做一次？", 'thinking');
LINE_EMOTIONS.set("有可能。不過這個麴放太久了，應該是不能拿來用了。", 'thinking');
LINE_EMOTIONS.set("等一下問問叔公吧。他以前也在，應該記得。", 'gentle');

// —— 第二章｜院子・建和的錄音 ——
LINE_EMOTIONS.set("你在聽什麼？", 'neutral');
LINE_EMOTIONS.set("我阿嬤以前唱的歌啦。那時候想留她的聲音，就拿手機錄下來了。", 'awkward');
LINE_EMOTIONS.set("她在唱什麼？", 'thinking');
LINE_EMOTIONS.set("有點像介紹自己……唱她叫什麼名字、是哪一家的人，住在哪裡什麼的。", 'gentle');
LINE_EMOTIONS.set("你聽看看。", 'gentle');
directScene("〔阿嬤的生活歌謠——♫～♫～♫〕", spose('jianhe', 'glasses', 'gentle'));
directScene("耳機裡先傳來一陣窸窣聲，接著才是老人家的歌聲。唱到某一處時，可以聽到老人家笑了一下，停了半拍又接著唱下去。建和聽到這裡，嘴角也跟著動了動。", spose('jianhe', 'nod', 'gentle'));
LINE_EMOTIONS.set("她剛剛唱到自己的名字。後面那句是在說她住哪裡。", 'happy');
LINE_EMOTIONS.set("阿嬤，以後要是沒有人會唱這首歌自我介紹的話，是不是那些名字也就不見了？", 'worried');
LINE_EMOTIONS.set("她說，名字不會不見。名字會等，等到有人願意再叫它的那一天。", 'gentle');
LINE_EMOTIONS.set("她過世以後，我有時候會拿出來聽。尤其是前面她唱自己名字的那段。", 'sad');

// —— 第二章｜院子・謝謝 ——
LINE_EMOTIONS.set("……可以教我一句族語嗎？「謝謝」怎麼說？", 'awkward');
directScene("建和看了你一下。", spose('jianhe', 'pause', 'smirk'));
directScene("你跟著念。", spose('you', 'nod', 'awkward'));
LINE_EMOTIONS.set("還不錯啦，比我教的學生差一點點。", 'smirk');

// —— 第二章｜院子・阿公的族語 ——
LINE_EMOTIONS.set("阿公兩年前也跟我說過一句族語。但我那時候不懂也沒問。", 'sad');
LINE_EMOTIONS.set("你記得任何一個音嗎？開頭、結尾都行。", 'serious');
LINE_EMOTIONS.set("……不記得了。", 'sad');
LINE_EMOTIONS.set("……", 'sad');

// —— 第二章｜廊下・照片 ——
LINE_EMOTIONS.set("我阿公有說，照片是他阿嬤。我拿去問別的老人，有人也認得，還會講她以前幫過誰。", 'serious');
LINE_EMOTIONS.set("可是問完整名字，有人忘了，有人念的我又不敢確定。戶籍上的字，跟他們講的也對不起來。", 'worried');
LINE_EMOTIONS.set("叔公以前看到這張，就叫我先收著。我不是沒問過。", 'sad');
LINE_EMOTIONS.set("你想要他說什麼？", 'thinking');
LINE_EMOTIONS.set("我想知道他記得的，跟我阿公講的是不是一樣。", 'serious');
LINE_EMOTIONS.set("還有，為什麼連照片都要燒？上面只有她。", 'sad');
LINE_EMOTIONS.set("我不知道。", 'worried');
LINE_EMOTIONS.set("我也不知道。但今天人都在，我還是想問清楚。", 'serious');

// —— 第二章｜廊下・吃飯的往事 ——
LINE_EMOTIONS.set("除了那晚的事，你阿公還說過她什麼？", 'thinking');
LINE_EMOTIONS.set("他說她嗓門很大。以前一群小孩跑出去玩，到了吃飯時間，她站在門口喊，隔幾間房子都聽得到。", 'happy');
LINE_EMOTIONS.set("……你阿公也在裡面？", 'smirk');
LINE_EMOTIONS.set("對啊，而且他每次都拖到最後，回來還想直接伸手拿東西吃。她就會打他的手，叫他先去洗。", 'happy');
LINE_EMOTIONS.set("阿公講這段的時候，還會學她的口氣。用族語講，講完自己一直笑。", 'happy');
LINE_EMOTIONS.set("你還記得他怎麼說嗎？", 'thinking');
LINE_EMOTIONS.set("不太記得了。那時候只覺得阿公又在講以前的事，沒仔細聽。", 'awkward');
LINE_EMOTIONS.set("後來我開始查這些，我一直問他照片哪裡來、那晚發生什麼事。這種吃飯、洗手的小事，反而沒再問過。", 'sad');

// —— 第二章｜廊下・那晚之前 ——
LINE_EMOTIONS.set("那晚之前，家裡有發生過什麼事嗎？你阿公有說嗎？", 'serious');
LINE_EMOTIONS.set("他提過一次，說那陣子有人來家裡問過話。那些人問了什麼，他沒講清楚，只說後來大家講話都很小心。", 'serious');
LINE_EMOTIONS.set("我那時候沒追問。現在想起來，有點後悔。", 'sad');

// —— 第一章｜和建和 ——
LINE_EMOTIONS.set("還想聽剛才那段嗎？", 'gentle');

// —— 第一章｜和世昌 ——
LINE_EMOTIONS.set("走吧，把找到的東西放一起。有些地方，我還想問叔公。", 'serious');

// —— 回堂屋｜回應說法 ——
LINE_EMOTIONS.set("叔公，你剛才自己說，東西是你拿出去的。", 'serious');
LINE_EMOTIONS.set("阿公的信，寫的不是這樣。", 'serious');
LINE_EMOTIONS.set("叔公，不是一樣都沒留下。", 'serious');
LINE_EMOTIONS.set("世昌哥說，他阿公提過那陣子有人來家裡問過話。", 'serious');
LINE_EMOTIONS.set("可是，廚房裡還有一罐麴。", 'thinking');
LINE_EMOTIONS.set("我沒問？叔公，我拿這張照片問過你，你叫我先收著。", 'angry');
LINE_EMOTIONS.set("我的謄本上也有出生日期跟出生別，可以對對看。", 'thinking');

// —— 回堂屋｜大家回到桌邊 ——
LINE_EMOTIONS.set("整理櫃子找到的，像是阿嬤以前送來的麴。先放這裡，等一下再看。", 'gentle');
LINE_EMOTIONS.set("在哪裡找到的？", 'serious');
LINE_EMOTIONS.set("阿公的鐵盒裡，它包在手帕裡。", 'neutral');
LINE_EMOTIONS.set("叔公，你剛才說東西是你拿出去的。阿公也寫到那晚，所以我想把事情問清楚。", 'serious');
LINE_EMOTIONS.set("阿公寫了五十年前燒東西的事。他說他也在。", 'serious');
LINE_EMOTIONS.set("好，那就從這裡開始吧。我們一件一件來，今天大家一起對。", 'serious');
LINE_EMOTIONS.set("要講什麼就講。不過我先說，那時候燒東西，是家裡一起決定的。", 'angry');

// —— 回堂屋｜讀信 ——
directScene("「那句話，我到今天，還是沒有辦法把它寫下來……」", spose('you', 'bow', 'sad'));
directScene("………", spose('you', 'bow', 'sad'));
directScene("最後一行是：「我想跟你說的是……」", spose('you', 'pause', 'sad'));
LINE_EMOTIONS.set("沒了？", 'surprised');
LINE_EMOTIONS.set("嗯，好像沒寫完。", 'sad');
LINE_EMOTIONS.set("他寫自己沒有攔。", 'sad');
LINE_EMOTIONS.set("嗯。所以我想問你，那時候發生什麼事？", 'serious');
LINE_EMOTIONS.set("他一直記著。", 'sad');
LINE_EMOTIONS.set("那你呢？", 'serious');

// —— 回堂屋｜是誰提議 ——
LINE_EMOTIONS.set("……我也記得。那時候阿嬤不在了，家裡在整理她的東西。", 'sad');
LINE_EMOTIONS.set("我先說，信不要留，拿去燒掉。", 'serious');
LINE_EMOTIONS.set("所以是你提的？", 'surprised');
LINE_EMOTIONS.set("對。也是我拿出去的。", 'serious');
LINE_EMOTIONS.set("可是燒掉的不只信吧？", 'serious');
directScene("明德看向桌上的空位。", spose('mingde', 'bow', 'sad'));
LINE_EMOTIONS.set("不只，後來我把其他東西也搬出去了。", 'sad');
LINE_EMOTIONS.set("她用過的東西也是？", 'surprised');
LINE_EMOTIONS.set("嗯。衣服、照片，還有她以前替人做事時會用到的東西。", 'sad');
LINE_EMOTIONS.set("為什麼？", 'worried');
LINE_EMOTIONS.set("我那時候說……燒了吧。燒了，就沒有人再笑我們了。", 'sad');
LINE_EMOTIONS.set("……我阿嬤說她有攔，她把東西拿回屋裡了，可你又搬出去。", 'angry');
LINE_EMOTIONS.set("……是啊，她哭著叫我不要亂動阿嬤的東西，可我那時候不肯聽。", 'sad');
LINE_EMOTIONS.set("我阿公那時候有說話嗎？", 'worried');
LINE_EMOTIONS.set("他說就先放著，明天再整理。我說留到明天也一樣。", 'sad');
LINE_EMOTIONS.set("然後他就沒再說。沒多久我搬出去，他也沒有攔。", 'sad');
LINE_EMOTIONS.set("你現在還覺得那些東西不該留嗎？", 'serious');
LINE_EMOTIONS.set("不會了。", 'sad');
LINE_EMOTIONS.set("可是現在要找，也找不回來了。", 'sad');

// —— 回堂屋｜怕什麼 ——
LINE_EMOTIONS.set("你們家當時遇到什麼事，我不能只靠大背景去推。明德叔公，你們那時候碰到了什麼？", 'serious');
LINE_EMOTIONS.set("……阿嬤以前是部落的巫師。有人要請她幫忙時，就會來家裡找她。", 'serious');
LINE_EMOTIONS.set("她是巫師？", 'surprised');
LINE_EMOTIONS.set("這個我阿嬤有講過。", 'gentle');
LINE_EMOTIONS.set("在我小時候，學校裡會有人拿這個笑我們。學她做儀式時的動作和話，說我們家奇奇怪怪。我回來還罵她不要再做這些。", 'sad');
LINE_EMOTIONS.set("她怎麼說？", 'worried');
LINE_EMOTIONS.set("她問我，外面的人笑，為什麼回來罵她？", 'sad');
LINE_EMOTIONS.set("後來還有另外一件事。有個人在家裡住過幾晚，再後來就有人拿著他的照片來問。", 'serious');
LINE_EMOTIONS.set("我阿公也說有人來問過。可是沒講清楚問什麼。", 'surprised');
LINE_EMOTIONS.set("問那個人住哪裡、跟誰說過話，有沒有寄信來。他們說在查政治案件，要查跟他往來的人。", 'worried');
LINE_EMOTIONS.set("那個人做了什麼？", 'worried');
LINE_EMOTIONS.set("我不知道，他們沒跟我講。我只記得人走了以後，你阿公叫我們出去不要亂說，有人問就回來告訴他。", 'worried');
LINE_EMOTIONS.set("所以你才想把信燒掉？", 'serious');
LINE_EMOTIONS.set("……嗯。問話在前面。後來阿嬤不在了，我們整理東西，又翻出那些信，我就想到以前來問的人。", 'sad');
LINE_EMOTIONS.set("那些信真的是借宿的人寫的？", 'thinking');
LINE_EMOTIONS.set("我沒有一封封看，也沒弄清楚。我那時候覺得，只要有人名、地址，都可能被拿來問。", 'worried');
LINE_EMOTIONS.set("可是連照片和她用過的東西都燒，就不只是怕了。我也不想再被人拿她的事來笑。", 'sad');
LINE_EMOTIONS.set("叔公記得的先寫下，其他的我們再慢慢查。", 'gentle');
LINE_EMOTIONS.set("你帶的資料找得到嗎？", 'thinking');
LINE_EMOTIONS.set("之後要另外找，現在也不能答應一定查得到。", 'serious');
LINE_EMOTIONS.set("來問話的人，有叫你們燒嗎？", 'serious');
LINE_EMOTIONS.set("沒有。燒是我提的。", 'serious');
LINE_EMOTIONS.set("她知道那個人的事嗎？", 'thinking');
LINE_EMOTIONS.set("我不知道她有沒有聽那個人講過什麼，我沒問過。", 'worried');
LINE_EMOTIONS.set("所以你是因為害怕，也不想再被笑？", 'serious');
LINE_EMOTIONS.set("對。我那時候把這些事都怪到她身上。", 'sad');

// —— 回堂屋｜火邊 ——
LINE_EMOTIONS.set("我再確認一下，照片裡的是我們阿公他們的阿嬤？", 'serious');
LINE_EMOTIONS.set("對。", 'serious');
LINE_EMOTIONS.set("是我們三個的高祖母。", 'gentle');
LINE_EMOTIONS.set("這是她，就是在舊屋前面拍的。", 'sad');
LINE_EMOTIONS.set("我阿公說，他看見照片也被丟出去燒，就跑過去撿起來。", 'serious');
LINE_EMOTIONS.set("你那時候有看到他嗎？", 'serious');
LINE_EMOTIONS.set("……我知道是他撿的。", 'sad');
LINE_EMOTIONS.set("我看見他把照片拿起來，那時候……我沒再去搶。", 'sad');
LINE_EMOTIONS.set("你們後來也沒講到這張照片？", 'serious');
LINE_EMOTIONS.set("沒有。", 'sad');
LINE_EMOTIONS.set("……他十年前才過世，你們明明在這期間碰過那麼多次面。", 'sad');
LINE_EMOTIONS.set("我想著，他沒提，我也不要提。拖到後來，更不知道怎麼開口了。", 'sad');
LINE_EMOTIONS.set("他也沒跟我說過後來有沒有找你談。我不知道他怎麼想的。", 'sad');
LINE_EMOTIONS.set("但這張照片他一直留著。", 'sad');
LINE_EMOTIONS.set("火快熄的時候，我撿了這個。", 'sad');
LINE_EMOTIONS.set("原本放在家裡。知道今天要整理，我出門前才把它找出來。", 'sad');
LINE_EMOTIONS.set("你後來有後悔嗎？", 'serious');
LINE_EMOTIONS.set("有，可是也來不及，我也不知道怎麼開口。", 'sad');
LINE_EMOTIONS.set("世昌，你還想問什麼？", 'gentle');
LINE_EMOTIONS.set("先讓我想一下。", 'thinking');

// —— 回堂屋｜留下的東西 ——
LINE_EMOTIONS.set("火快熄的時候我撿的。原本是什麼，我已經認不出來了。", 'sad');
LINE_EMOTIONS.set("這張是我阿公留的。他過世以後，家裡整理東西，就交給我保管。", 'gentle');
LINE_EMOTIONS.set("這個是後來做的，不是那場火留下來的。我阿嬤常拿來，跟伯公一起釀酒。", 'gentle');
LINE_EMOTIONS.set("所以燒了東西以後，他們還是有一起做？", 'surprised');
LINE_EMOTIONS.set("有啊，後來做得少了，但阿嬤還是會送麴過去。", 'gentle');
LINE_EMOTIONS.set("剛才拿進來的這罐麴，是阿嬤以前送來的。", 'gentle');
LINE_EMOTIONS.set("他們以前還會一起釀酒。", 'gentle');
LINE_EMOTIONS.set("那米缸裡的新糯米，是阿公想再釀酒？", 'thinking');
LINE_EMOTIONS.set("他有說想再做一次。叫我去問現在還有誰家在做麴。", 'sad');
LINE_EMOTIONS.set("你剛才問的就是這個。我那時候不想往下講，才叫你先收東西。", 'awkward');
LINE_EMOTIONS.set("你有去嗎？", 'thinking');
LINE_EMOTIONS.set("沒有。我一直想說過幾天再去。", 'sad');
LINE_EMOTIONS.set("不過這罐放太久了，不能直接拿來用。要做的話，還是得重新問。", 'worried');

// —— 回堂屋｜為什麼沒說 ——
LINE_EMOTIONS.set("……你們明明都記得她，那為什麼從沒告訴我們你們阿嬤的事情？", 'sad');
LINE_EMOTIONS.set("我阿嬤有講，只是每次講一點。做東西的時候提到，以前去哪裡的時候，想起了回憶時也會提到。", 'gentle');
LINE_EMOTIONS.set("那晚的事，她只說燒完以後，她氣得不想再跟大家說話，回房間哭了很久。", 'sad');
LINE_EMOTIONS.set("說什麼都沒有了，以後小孩問起要拿什麼給他們看？", 'sad');
LINE_EMOTIONS.set("她知道我阿公留了這張嗎？", 'surprised');
LINE_EMOTIONS.set("她大概是不知道吧。", 'thinking');
LINE_EMOTIONS.set("……", 'sad');
LINE_EMOTIONS.set("一開始，是我們叫小孩不要在外面講家裡的事。", 'sad');
LINE_EMOTIONS.set("後來是……不知道怎麼講。只要講到她的事，就會講到以前她做什麼、有人來查問，講到燒東西。", 'sad');
LINE_EMOTIONS.set("所以我們問的時候，你們就只肯講那麼一點？", 'angry');
LINE_EMOTIONS.set("那時候也想，如果你們沒問就算了。", 'awkward');
LINE_EMOTIONS.set("可是我們不知道的事情，怎麼會知道要問？", 'angry');
LINE_EMOTIONS.set("那今天總該先講點我們不知道的吧。", 'serious');
LINE_EMOTIONS.set("名字也是。我以前常聽我阿嬤說的，可是那時候以為，忘了再問阿嬤就好。", 'sad');
LINE_EMOTIONS.set("她有說過名字的，但我現在想不起來怎麼念。", 'worried');

// —— 回堂屋｜兩張紙 ——
directScene("文彬把影本重新攤開，移到你的謄本旁邊。", sprop('wenbin', 'archive', 'open'), sprop('wenbin', 'archive', 'place', [99, 84]));
LINE_EMOTIONS.set("我們先確認兩份資料能不能對起來，再看改寫的地方。", 'serious');
LINE_EMOTIONS.set("出生別都是三女。", 'thinking');
LINE_EMOTIONS.set("這一項是相符。", 'gentle');
LINE_EMOTIONS.set("一個是母，一個是妻，這樣算嗎？", 'thinking');
LINE_EMOTIONS.set("還得要看各自的戶長是誰。同一個人在不同的戶籍裡，可能有不同關係，不能只靠這兩個去判斷。", 'serious');
LINE_EMOTIONS.set("這兩欄記的事情不一樣，先找同一種資料來比。", 'serious');
LINE_EMOTIONS.set("一九一二減二十三，一八六七加二十二。都是一八八九，日期也一樣。", 'smirk');
LINE_EMOTIONS.set("都是一八八九年三月十日，同一天。", 'happy');
LINE_EMOTIONS.set("這兩項相符，但要確認完整關係，還得把戶長、親屬和前後頁一起看。", 'serious');
LINE_EMOTIONS.set("這裡只有寫昭和十四年春，沒寫年紀。所以只能知道哪年拍的？", 'thinking');
LINE_EMOTIONS.set("對，不能用拍攝年份算她幾歲。", 'serious');
LINE_EMOTIONS.set("那名字為什麼被劃掉？日本人改的？", 'serious');
LINE_EMOTIONS.set("這份資料是在日治時期建立的，不代表每一筆改動都發生在同一個時候。這裡看得出改寫，但原字不完整，也沒有註明原因。", 'serious');
LINE_EMOTIONS.set("跟後來有人來問話有沒有關係啊？", 'thinking');
LINE_EMOTIONS.set("現在沒有資料能把兩件事連起來，也還不能確定改寫發生在焚燒以前或以後。", 'serious');
LINE_EMOTIONS.set("先記下有改寫，時間與原因都還不知道。", 'gentle');

// —— 回堂屋｜整理桌面 ——
directScene("世昌把筆記本轉向你。", sprop('shichang', 'notebook', 'turn'), spose('shichang', 'reach', 'smirk'));
LINE_EMOTIONS.set("幫我看一下有沒有哪裡記錯。我一句一句念，你幫我填。", 'smirk');
directScene("你挪開茶盤，讓兩份影本可以並排。", sprop('you', 'cup', 'place', [138, 84]));
LINE_EMOTIONS.set("……你記得比我還清楚。", 'happy');
LINE_EMOTIONS.set("好，改過來了。", 'gentle');
directScene("關掉筆記本後，玉珍轉向明德。", spose('yuzhen', 'pause', 'gentle'));
LINE_EMOTIONS.set("叔公，你以前有聽過別人叫她的名字嗎？", 'gentle');

// —— 第三章｜開頭 ——
LINE_EMOTIONS.set("……都多久了，我都已經忘了差不多了。我們以前都叫她阿嬤。來找她的人，有些是會叫她的名字。", 'thinking');
LINE_EMOTIONS.set("你還記得嗎？", 'thinking');
LINE_EMOTIONS.set("我也一直想不完整。阿嬤以前叫我幫忙做麴，會一邊做、一邊講小時候的事，我想從那時候的話找找看。", 'thinking');
LINE_EMOTIONS.set("好，先想她那次在說什麼，不用急著把名字湊完整。", 'gentle');
LINE_EMOTIONS.set("妳說過，做麴的時候會講以前的事？", 'thinking');
directScene("玉珍看向靠牆的鐵罐。", spose('yuzhen', 'pause', 'thinking'));
LINE_EMOTIONS.set("有一次我幫她切葉子時沒做好，她叫我重切。她說她以前也這樣被她阿嬤念。", 'thinking');
LINE_EMOTIONS.set("等一下……好像有講名字。", 'surprised');
LINE_EMOTIONS.set("先休息一下，不用現在想完。", 'gentle');
LINE_EMOTIONS.set("我剛剛想到一件事。以前跟阿嬤做這個時，她說她小時候也被念過。", 'thinking');
LINE_EMOTIONS.set("那次她有講到名字。我想想前面那句話……", 'thinking');

// —— 第三章｜想起名字 ——
LINE_EMOTIONS.set("等等……前面的，好像是名字。", 'surprised');
LINE_EMOTIONS.set("後面我真的想不起來。", 'sad');
directScene("玉珍看向建和。", spose('yuzhen', 'pause', 'worried'));
LINE_EMOTIONS.set("我也不確定。我怕一直跟著想，最後只是覺得很像。", 'worried');
LINE_EMOTIONS.set("那今天先留這一段。", 'gentle');
LINE_EMOTIONS.set("可以錄嗎？把妳剛才記得的，還有哪裡不確定都一起留著。", 'gentle');
LINE_EMOTIONS.set("可以，可是前後也要留，不要剪成只有那幾個音。", 'serious');
LINE_EMOTIONS.set("今天想起來的是，阿嬤以前教我做麴的時候，說她小時候也被她阿嬤念過。那次她有講到名字。我現在記得前面一部分，後面還不確定。", 'serious');
LINE_EMOTIONS.set("先給建和幫忙聽。要再拿給別人聽前，先跟我說一下，我想知道是找誰問。", 'serious');
LINE_EMOTIONS.set("好。", 'gentle');
LINE_EMOTIONS.set("這樣對嗎？", 'thinking');
LINE_EMOTIONS.set("對，這張我可以帶回去嗎？我回去找看看阿嬤的日記，說不定還能找到別的。", 'gentle');
LINE_EMOTIONS.set("她的東西有幾箱放在舅舅家，我只記得看過那本，還不知道搬家以後收在哪裡。", 'worried');
LINE_EMOTIONS.set("我先拍一張，這張妳拿。", 'gentle');

// —— 第三章｜世昌 ——
LINE_EMOTIONS.set("我以前一直想把這個空格填起來。族語名字、紙上的漢名，還有中間幾代的資料，全部對在一起。", 'serious');
LINE_EMOTIONS.set("現在呢？", 'thinking');
LINE_EMOTIONS.set("現在還是想知道啊。只是今天才發現，我阿公以前講的那些小事，我也沒記多少。", 'awkward');
LINE_EMOTIONS.set("我一直問誰燒的、為什麼燒。反而他在講吃飯、洗手那些回憶時，我一直以為他在已讀亂回，想把話拉回來。", 'sad');
LINE_EMOTIONS.set("叔公，我下次還是會來問你。", 'happy');
LINE_EMOTIONS.set("先打電話，臭小子。你每次都挑我去種田的時候來家裡。", 'smirk');
LINE_EMOTIONS.set("那你要接啊。", 'happy');
LINE_EMOTIONS.set("有聽到就會接啦。", 'happy');
LINE_EMOTIONS.set("你現在還記得什麼？", 'gentle');
LINE_EMOTIONS.set("我阿公說，她叫小孩回來吃飯的時候，誰拖最久她都知道。有人把不喜歡的菜偷偷藏起來，她也知道藏在哪裡。", 'happy');
LINE_EMOTIONS.set("看什麼，你阿公自己也有。", 'smirk');
LINE_EMOTIONS.set("那先把今晚知道的寫上去。", 'gentle');

// —— 第三章｜建和 ——
directScene("建和把筆記轉向玉珍。", sprop('jianhe', 'notebook', 'turn'));
LINE_EMOTIONS.set("妳之後想到別的，可以先傳給我。我再問問我認識的長輩，看他願不願意幫忙。", 'gentle');
LINE_EMOTIONS.set("他會知道嗎？", 'thinking');
LINE_EMOTIONS.set("不一定，不過可能知道這個名字，也可能認識你們家，但都得問了才知道。", 'serious');
LINE_EMOTIONS.set("你阿嬤唱那首歌的時候，一開始就有講自己的名字。", 'gentle');
LINE_EMOTIONS.set("對啊，但你們還是要找認識你們這一家的人，才有可能會回想起記憶。", 'serious');
LINE_EMOTIONS.set("我有留自己阿嬤唱歌的錄音，她在裡面介紹自己。之後有空可以給你聽。你們家的名字，還是得另外找認識她的人問。", 'gentle');

// —— 第三章｜往後怎麼辦 ——
LINE_EMOTIONS.set("那接下來怎麼找？總不能每個人回去又各查各的。", 'thinking');
LINE_EMOTIONS.set("戶籍的部分，我可以再找完整的親屬資料，也可以教你們怎麼查資料、做系譜。", 'serious');
LINE_EMOTIONS.set("我回去找阿嬤的日記。她有幾箱東西放在舅舅家，那本是不是還在，要先問他。名字我也再想看看，但不要明天早上就跑來問我想起來沒有。", 'smirk');
directScene("世昌笑了一下。", spose('shichang', 'nod', 'happy'));
LINE_EMOTIONS.set("好啦。", 'awkward');
LINE_EMOTIONS.set("我先把手上的整理好。大家有找到什麼，再互相說。", 'gentle');
LINE_EMOTIONS.set("好。我找到日記後再拍給你們看。", 'gentle');
LINE_EMOTIONS.set("我會繼續查，有新的我再傳給你們。", 'serious');
directScene("你們互相確認電話，沒有再往下約日期。", sprop('you', 'phone', 'take'), spose('yuzhen', 'nod', 'gentle'), spose('shichang', 'nod', 'gentle'));
LINE_EMOTIONS.set("我今天知道的有點多。先不要幫我排下一次，我想帶回去看一看。", 'worried');
LINE_EMOTIONS.set("好。有想到要問什麼再傳給我。", 'gentle');
LINE_EMOTIONS.set("你把這兩份收好。之後有需要什麼，你再來問我。", 'gentle');
LINE_EMOTIONS.set("你今天睡這裡，還是要回去？", 'gentle');
LINE_EMOTIONS.set("太晚了，我今晚先住這裡。", 'gentle');
LINE_EMOTIONS.set("世昌哥，你方便幫忙聯絡嗎？我回去再把今天整理的傳給你。", 'gentle');
LINE_EMOTIONS.set("可以啊，可是你也要回訊息餒，不要跟叔公一樣，電話都不接。", 'smirk');
LINE_EMOTIONS.set("好。", 'awkward');
LINE_EMOTIONS.set("可以。我先把那個時間留著。", 'gentle');
LINE_EMOTIONS.set("要見面就在這裡吧。", 'gentle');
LINE_EMOTIONS.set("我先幫忙問。那天能不能到場，我還要看課表，不用為了等我改。", 'gentle');
LINE_EMOTIONS.set("我也是。資料先整理給你們，人能不能到再回覆。", 'gentle');

// —— 第三章｜收拾 ——
LINE_EMOTIONS.set("叔公，下次你想到什麼，可以打給我。", 'gentle');
LINE_EMOTIONS.set("白天可以打？啊你不是要上班？", 'surprised');
LINE_EMOTIONS.set("如果我沒接到，我下班會回的。", 'gentle');
LINE_EMOTIONS.set("照片下次可以再給我看嗎？你阿公講過的其他事，我也想聽。", 'gentle');
LINE_EMOTIONS.set("可以啊，你如果有想到你阿公講過什麼也跟我說。", 'happy');
LINE_EMOTIONS.set("妳想到多少，再跟我們說就好。", 'gentle');
LINE_EMOTIONS.set("你也是。你阿公以前有說過什麼，你也再想想看。", 'gentle');

// —— 結局前｜收尾 ——
LINE_EMOTIONS.set("糯米先不要丟，我明天去問，現在還有誰會做麴。", 'gentle');
LINE_EMOTIONS.set("你阿公買的糯米先留著齁。他以前說想再釀酒，我明天去問問看。", 'gentle');

// —— 其他 ——
LINE_EMOTIONS.set("等大家回來，我再講。", 'serious');
LINE_EMOTIONS.set("我在這裡等。你先去你阿公的房間看看吧，就在左上那扇門。", 'gentle');

// —— 回堂屋｜拿錯東西 ——
LINE_EMOTIONS.set("不要一直拿東西往我面前放。", 'angry');

// —— 其他 ——
directScene("桌子是舊的。桌面被擦得發亮，邊角都磨圓了。", spose('you', 'bow'));
directScene("遠處傳來文彬的聲音：「時間差不多了，大家先回堂屋吧！」", spose('you', 'pause', 'surprised'));

// —— 章節開頭 ——
directScene("阿公的東西還堆在房間裡。你站在門口，不知道要從哪裡開始。", Stage.cast('you', [5, 7, 1]), Stage.fade(1, 0, 900), swalk('you', [5, 5], 1), spose('you', 'pause', 'sad'));
directScene("走過去，看看房間裡的東西。", spose('you', 'pause', 'thinking'));
directScene("文彬留在桌邊。你可以去阿公的房間，也可以到屋外找人說話。準備好了，就回來找文彬。", spose('wenbin', 'glasses', 'gentle'));
LINE_EMOTIONS.set('§……', 'angry'); // 明德嘀咕的族語（目前留白）

// ===== 有動畫的旁白：只播動畫、不顯示文字 =====
// 有走位、坐下站起、拿起放下、進出場的旁白，預設不出現文字，只播動畫。
// 下面這份清單裡的旁白例外：它們帶著動畫演不出來的資訊，所以照常顯示文字。
// 想讓某句旁白也顯示文字，就把原文加進清單；想讓它不顯示，就從清單刪掉。
const KEEP_TEXT = new Set([
  "床上躺著你的手機，你拿起來看，共有三十七則訊息未讀。",
  "你把鐵盒放到地上，用面紙壓住割到的地方。",
  "他坐回去，翻開一本筆記本。筆記本很厚，貼滿了便利貼，邊邊都捲起來了。",
  "明德叔公端著茶杯的手停了一下。他沒有看你，只把杯子放回桌上，杯底磕出一聲響。",
  "玉珍抬頭看他，眉頭蹙得更緊。世昌原本向前傾著，見她低下頭，又慢慢坐回去。",
  "明德叔公轉身往屋裡走，你沒有立刻跟上。明德叔公走了兩步，接著停在門邊，背對著你，隨後又走了進去。",
  "玉珍蹲在櫃子前，把幾個疊在一起的碗移出來。你替她扶住櫃門，隨後看見最裡面還放著一只舊鐵罐。",
  "玉珍回頭看了一眼，伸手拿起鐵罐。她沿著邊緣慢慢扳開蓋子，裡面墊著一塊褪色的布，放著幾塊乾燥的米色小圓塊。",
  "她蓋好鐵罐，留在桌上，沒有放進待丟的紙箱。",
  "他把照片放回布上，這次沒有立刻包起來。",
  "明德最後進來，褲管沾著草籽，看見信便停在椅子旁。",
  "世昌把照片平放在桌上，燒焦的那一部分，朝著明德。",
  "明德從口袋拿出一個小紙包，放到桌角。裡面是一片焦黑、邊緣捲曲的厚紙，已經看不出完整圖像。",
  "明德從口袋拿出小紙包，把焦黑的厚紙攤在桌上。",
  "玉珍把鐵罐放回靠牆的小桌，建和拿來一張乾淨的紙，整理剛才提過、還需要再問的事情。",
  "玉珍接過杯子，看到旁邊的鐵罐，手停在半空。",
  "你在紙上寫下「做麴時做不好」「阿嬤說自己小時候也被念」「談到她阿嬤的名字」，把紙轉向玉珍。",
  "你把日期和要做的事寫下來，拍給大家。",
  "快十二點了。玉珍把杯子收進茶盤，建和蹲下去拔充電線。",
  "你把電話寫在便條上，放到他面前。",
  "明德喝了一口，稍微放鬆了一點。",
  "你將裝著信的袋子放回阿公的房間，今晚先住在老屋。",
  "他把米缸的蓋子重新放正，發現一邊卡住，先把它放在旁邊。",
  "你坐在世昌旁邊。他的筆記本上寫滿了名字和箭頭，箭頭最後指向一個空白的圓圈。",
  "你在建和旁邊坐下。他把手機翻過去，螢幕朝下。",
  "你跟玉珍說等一下再來幫忙。她點點頭，又把一疊碗搬出來。",
  "你把謄本攤在他面前。明德叔公看了一眼，接著視線就移到窗外去了。",
  "你們互相確認電話，沒有再往下約日期。",
  "阿公的東西還堆在房間裡。你站在門口，不知道要從哪裡開始。"
]);
const MOTION = s => ['walk', 'cast', 'exit', 'room', 'away', 'back', 'fade', 'wait'].includes(s.type) || (s.type === 'pose' && ['stand', 'sit'].includes(s.pose)) || (s.type === 'prop' && ['take', 'place', 'stow'].includes(s.action));
function silentNarration(t, steps) { return !!steps && !RM && !KEEP_TEXT.has(t) && steps.some(MOTION); }
