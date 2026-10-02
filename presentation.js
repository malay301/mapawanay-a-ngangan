// Authored presentation cues: memories and quoted actions deliberately do not
// trigger present-day movement. Story decisions remain in index.html.
const EMOTIONS = { neutral: '平靜', happy: '開心', angry: '生氣', sad: '難過', surprised: '驚訝', worried: '不安', gentle: '溫柔' };
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
directScene('衣櫃門一拉開，樟腦丸的味道整個撲上來。', spose('you', 'reach'), sprop('you', 'box', 'open'));
directScene('最底層壓著一個生鏽的鐵盒。鏽把盒蓋咬得很緊，你用指甲去扳。', sprop('you', 'box', 'open'));
directScene('你把鐵盒放到地上，用面紙壓住割到的地方。', sprop('you', 'box', 'place', [151, 60]), spose('you', 'bow', 'worried'));
directScene('你把那張紙攤開。', sprop('you', 'tengben', 'open'));
directScene('你沒多想，隨後把它放回鐵盒。', sprop('you', 'hanky', 'place', [151, 60]));
directScene('你掀開後，發現米缸是滿的，而且還是新糯米，白得發亮，甚至還帶有一點糯米糠的香。', sprop('you', 'rice', 'open'));
directScene('一個戴棒球帽的男人站起來，朝你揮手。', spose('shichang', 'stand', 'happy'), spose('shichang', 'wave', 'happy'));
directScene('他坐回去，翻開一本筆記本。筆記本很厚，貼滿了便利貼，邊邊都捲起來了。', spose('shichang', 'sit'), sprop('shichang', 'notebook', 'open'));
directScene('玉珍拿起你放在桌上的謄本看了一眼。', sprop('yuzhen', 'tengben', 'take', [136, 72]));
directScene('她笑了一下，把桌邊的一疊舊報紙推整齊。', spose('yuzhen', 'nod', 'happy'), sprop('yuzhen', 'paper', 'place', [104, 69]));
directScene('他推了一下眼鏡，把資料夾往腿上壓了壓。', spose('wenbin', 'glasses'), sprop('wenbin', 'archive', 'fold'));
directScene('你繞了桌子一圈，回到空著的那張紅椅子。', swalk('you', [2, 2]), swalk('you', [9, 2]), swalk('you', [9, 7]), swalk('you', [7, 6], 1), spose('you', 'sit'));
directScene('明德叔公端著茶杯的手停了一下。他沒有看你，只把杯子放回桌上，杯底磕出一聲響。', spose('mingde', 'pause', 'angry'), sprop('mingde', 'cup', 'place', [74, 69]));
directScene('玉珍張了張嘴，卻沒有發出聲音。她皺起眉，低頭又看了一次紙上的字。', spose('yuzhen', 'bow', 'worried'));
directScene('她吸了一口氣，聲音到了嘴邊，又停住。', spose('yuzhen', 'bow', 'worried'));
directScene('玉珍抬頭看他，眉頭蹙得更緊。世昌原本向前傾著，見她低下頭，又慢慢坐回去。', spose('yuzhen', 'shake', 'angry'), spose('shichang', 'sit', 'worried'));
directScene('她將杯子放回桌上，低頭想了一會兒。', sprop('yuzhen', 'cup', 'place', [105, 68]), spose('yuzhen', 'bow', 'worried'));
directScene('文彬把你帶來的資料挪到影本旁邊，讓兩張紙並排。', sprop('wenbin', 'tengben', 'place', [88, 84]), sprop('wenbin', 'archive', 'place', [99, 84]));
directScene('你把手帕一層一層打開。', sprop('you', 'hanky', 'open'), sprop('you', 'letter', 'take'));
directScene('你在床邊坐下來。', swalk('you', [3, 3], 3), spose('you', 'sit', 'sad'));
directScene('明德叔公摸了摸口袋裡的小紙包，沒有拿出來。', spose('mingde', 'bow', 'sad'));
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
directScene('明德原本坐在桌邊，看見你把信放下，將椅子移近。', sprop('you', 'letter', 'place', [75, 74]), spose('mingde', 'lean'));
directScene('明德最後進來，褲管沾著草籽，看見信便停在椅子旁。', Stage.cast('mingde', [6, 7, 1]), swalk('mingde', [2, 7]), swalk('mingde', [2, 2]), swalk('mingde', [4, 3], 0), spose('mingde', 'sit', 'worried'));
directScene('世昌把筆記本放到桌上，挪開旁邊的茶杯。', sprop('shichang', 'notebook', 'place', [132, 71]), sprop('shichang', 'cup', 'place', [140, 80]));
directScene('你把信攤開，從第一行開始念。', sprop('you', 'letter', 'open'));
directScene('你翻過信紙，背面沒有其他字。', sprop('you', 'letter', 'turn'));
directScene('（安靜。）電扇轉過來，把信紙的一角吹起又落下。', sprop('you', 'letter', 'flutter', [89, 83]));
directScene('明德伸手，把被電扇吹起的紙角壓住。', sprop('mingde', 'letter', 'place', [89, 83]));
directScene('你把信放在明德叔公面前。他先看了一眼開頭，才拿起來把紙挪到燈下。', swalk('you', [3, 2], 2), sprop('you', 'letter', 'place', [76, 69]), sprop('mingde', 'letter', 'take', [76, 69]));
directScene('過了很久，他才用兩隻手把紙攤平。他看字的時候嘴唇會動，一行一行，像在數著什麼。', sprop('mingde', 'letter', 'open'), spose('mingde', 'bow', 'sad'));
directScene('明德叔公看完，將信放回你面前。', sprop('mingde', 'letter', 'place', [84, 74]));
directScene('明德叔公把椅子往桌邊移了一點。', spose('mingde', 'lean', 'sad'));
directScene('明德低頭搓了搓手指。', spose('mingde', 'bow', 'sad'), spose('mingde', 'reach', 'sad'));
directScene('大家沉默著。', spose('mingde', 'bow', 'sad'), spose('yuzhen', 'bow', 'sad'));
directScene('你低頭看了一眼信，把摺起來的紙角重新壓平。', sprop('you', 'letter', 'place', [90, 85]));
directScene('文彬把一張空白紙移到世昌旁邊。', sprop('wenbin', 'paper', 'place', [133, 74]));
directScene('世昌把照片平放在桌上，燒焦的那一部分，朝著明德。', sprop('shichang', 'photo', 'place', [114, 73]));
directScene('世昌把照片轉向明德。', sprop('shichang', 'photo', 'turn'));
for (const line of ['明德從口袋拿出一個小紙包，放到桌角。裡面是一片焦黑、邊緣捲曲的厚紙，已經看不出完整圖像。', '明德從口袋拿出小紙包，把焦黑的厚紙攤在桌上。'])
  directScene(line, sprop('mingde', 'fragment', 'take'), sprop('mingde', 'fragment', 'place', [68, 71]));
directScene('你把空杯子挪開，讓世昌把剛才聽見的記進本子。', sprop('you', 'cup', 'place', [138, 84]), sprop('shichang', 'notebook', 'write'));
directScene('玉珍走到靠牆的小桌旁，掀開鐵罐蓋子。', swalk('yuzhen', [9, 2], 1), sprop('yuzhen', 'qu', 'open'));
directScene('她把鐵罐拿到桌邊，打開讓大家看。', sprop('yuzhen', 'qu', 'take', [152, 25]), swalk('yuzhen', [9, 4], 3), sprop('yuzhen', 'qu', 'place', [136, 80]), sprop('yuzhen', 'qu', 'open'));
directScene('明德點頭。', spose('mingde', 'nod', 'sad'));
directScene('玉珍把鐵罐放回靠牆的小桌，建和拿來一張乾淨的紙，整理剛才提過、還需要再問的事情。', swalk('yuzhen', [9, 2], 1), sprop('yuzhen', 'qu', 'place', [152, 25]), swalk('yuzhen', [6, 3], 0), spose('yuzhen', 'sit'), sprop('jianhe', 'paper', 'place', [62, 85]), sprop('jianhe', 'paper', 'write'));
directScene('明德往椅背靠了一下，想了幾秒。', spose('mingde', 'lean', 'worried'));
directScene('明德張了張嘴，又停住。', spose('mingde', 'pause', 'worried'));
directScene('你起身添水。', spose('you', 'stand'), sprop('you', 'cup', 'take'), swalk('you', [9, 4], 3), sprop('you', 'cup', 'place', [105, 69]));
directScene('玉珍接過杯子，看到旁邊的鐵罐，手停在半空。', sprop('yuzhen', 'cup', 'take', [105, 69]), spose('yuzhen', 'pause', 'surprised'));
directScene('玉珍低聲試著念了一小段，到了中間，皺起眉停下來。', spose('yuzhen', 'bow', 'worried'));
directScene('明德原本放在膝上的手抬起來。', spose('mingde', 'reach', 'surprised'));
directScene('明德試了幾次，最後搖頭。', spose('mingde', 'shake', 'sad'));
directScene('你拿出手機放在桌上。', sprop('you', 'phone', 'take'), sprop('you', 'phone', 'place', [118, 83]));
directScene('你點頭，等她準備好才按下錄音。', spose('you', 'nod', 'gentle'), sprop('you', 'phone', 'write'));
directScene('你停下錄音，先播放給她聽。', sprop('you', 'phone', 'write'), sprop('you', 'phone', 'turn'));
directScene('你在紙上寫下「做麴時做不好」「阿嬤說自己小時候也被念」「談到她阿嬤的名字」，把紙轉向玉珍。', sprop('you', 'paper', 'write'), sprop('you', 'paper', 'place', [104, 72]));
directScene('世昌把筆記本翻回前面。有幾頁貼著便條，旁邊寫滿名字與箭頭。', sprop('shichang', 'notebook', 'open'));
directScene('世昌笑了。', spose('shichang', 'nod', 'happy'));
directScene('世昌在原本就寫著「阿公的阿嬤」的那一頁，補上今晚聽見的幾件事。名字的空格旁，他加註「部分發音待核對」。', sprop('shichang', 'notebook', 'write'));
directScene('你把日期和要做的事寫下來，拍給大家。', sprop('you', 'paper', 'write'), sprop('you', 'phone', 'take'));
directScene('快十二點了。玉珍把杯子收進茶盤，建和蹲下去拔充電線。', sprop('yuzhen', 'cup', 'take'), spose('jianhe', 'bow'));
directScene('世昌在椅縫裡找到車鑰匙，又折回桌邊把照片放進硬紙夾。', spose('shichang', 'bow'), sprop('shichang', 'photo', 'take', [114, 73]), sprop('shichang', 'photo', 'fold'));
directScene('你把電話寫在便條上，放到他面前。', sprop('you', 'paper', 'write'), sprop('you', 'paper', 'place', [75, 71]));
directScene('明德叔公將便條摺好，收進口袋。', sprop('mingde', 'paper', 'take', [75, 71]), sprop('mingde', 'paper', 'fold'), sprop('mingde', 'paper', 'stow'));
directScene('明德叔公把椅子往後推了一點。', spose('mingde', 'lean', 'angry'));
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
directScene('他把米缸的蓋子重新放正，發現一邊卡住，先把它放在旁邊。', sprop('mingde', 'rice', 'open'), sprop('mingde', 'lid', 'place', [153, 103]));
directScene('你把明德叔公面前冷掉的茶倒掉，重新倒了一杯，在他旁邊坐下。', swalk('you', [3, 2], 2), sprop('you', 'cup', 'take', [74, 69]), sprop('you', 'cup', 'place', [74, 69]), swalk('you', [3, 3], 0), spose('you', 'sit', 'gentle'));
directScene('這張書桌的抽屜永遠卡的不得了，拉開時總是要先往上抬一點。', spose('you', 'reach'), sprop('you', 'betel', 'open'));
directScene('世昌點點頭，沒有逼你。', spose('shichang', 'nod', 'gentle'));
directScene('玉珍看了你一下，點點頭。', spose('yuzhen', 'nod', 'gentle'));
directScene('建和把膝上的小冊子翻開，停在一張夾著書籤的空白頁。', sprop('jianhe', 'notebook', 'open'));
directScene('建和自嘲地笑了一下。', spose('jianhe', 'nod', 'happy'));
directScene('玉珍低頭看那張紙，但她沒有伸手碰。', spose('yuzhen', 'bow', 'sad'));
directScene('他在筆記本上飛快寫了一行，畫了兩個圈。', sprop('shichang', 'notebook', 'write'));
directScene('玉珍翻看手機裡的舊照片，停在阿嬤的那一張。', sprop('yuzhen', 'phone', 'turn'), spose('yuzhen', 'bow', 'sad'));
directScene('你坐在世昌旁邊。他的筆記本上寫滿了名字和箭頭，箭頭最後指向一個空白的圓圈。', swalk('you', [7, 3], 0), spose('you', 'sit'), sprop('shichang', 'notebook', 'open'));
directScene('你在建和旁邊坐下。他把手機翻過去，螢幕朝下。', swalk('you', [4, 6], 1), spose('you', 'sit'), sprop('jianhe', 'phone', 'turn'));
directScene('明德叔公原本望著小路，聽見這句話，低頭拍了拍停在手背上的蚊子。', spose('mingde', 'bow', 'worried'), spose('mingde', 'reach'));
directScene('你看向流理臺旁的米缸，又低頭看了看罐裡的麴。', spose('you', 'bow', 'worried'));
directScene('你跟玉珍說等一下再來幫忙。她點點頭，又把一疊碗搬出來。', spose('yuzhen', 'nod'), sprop('yuzhen', 'bowl', 'take'));
directScene('建和正把耳機收進口袋，見你走過來，又將手機拿在手上。', spose('jianhe', 'glasses'), sprop('jianhe', 'phone', 'take'));
directScene('文彬打開資料夾，取出一份舊戶籍影本，放到你的謄本旁邊。', sprop('wenbin', 'archive', 'open'), sprop('wenbin', 'archive', 'place', [99, 84]));
directScene('世昌在空白處寫下兩個算式。', sprop('shichang', 'paper', 'write'));
directScene('世昌翻到照片背面。', sprop('shichang', 'photo', 'turn'));
directScene('世昌把照片放回布上。', sprop('shichang', 'photo', 'place', [114, 73]));
directScene('玉珍點頭。', spose('yuzhen', 'nod', 'gentle'));
directScene('世昌把你的謄本與信放回你面前。', sprop('shichang', 'tengben', 'place', [111, 84]), sprop('shichang', 'letter', 'place', [122, 84]));
directScene('你沒有說話，就坐在明德叔公旁邊。', swalk('you', [3, 3], 0), spose('you', 'sit', 'gentle'));
directScene('你沒有追問，只是坐著。', swalk('you', [7, 3], 0), spose('you', 'sit'));
directScene('你坐到文彬旁邊。', swalk('you', [6, 6], 1), spose('you', 'sit'));
directScene('他趁沒人注意，把椅子往後挪了半寸。', spose('wenbin', 'lean', 'worried'));
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
    const a = stageActor(step.who);
    if (!a || a.hidden) continue;
    c.active = step; c.actor = a; c.elapsed = 0; c.duration = step.duration || 700;
    if (step.emotion) { U.dlg.emotion = step.emotion; U.dlg.actor = step.who; }
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
  U.cinema = null;
}
function completeStageStep() {
  const c = U.cinema, s = c.active, a = { ...c.actor };
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
  render();
}
function updateScene(dt) {
  const c = U.cinema;
  if (!c) return;
  c.elapsed += dt;
  if (c.elapsed >= c.duration) { completeStageStep(); render(); }
}
function stageDirection(a, b, fallback) { return b[0] > a[0] ? 2 : b[0] < a[0] ? 3 : b[1] > a[1] ? 0 : b[1] < a[1] ? 1 : fallback; }
function sceneActorFrame(who) {
  const c = U.cinema;
  if (!c || c.active.who !== who) return null;
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
function drawStageProps(g, cx, cy) {
  if (!S) return;
  for (const [item, at] of Object.entries((S.stageProps || {})[curMap()] || {})) drawSmallProp(g, item, at[0] - cx, at[1] - cy);
  const c = U.cinema;
  if (!c || c.active.type !== 'prop') return;
  const s = c.active, a = c.actor, t = Math.min(1, c.elapsed / c.duration), hand = [a.x * TS + 12, a.y * TS + (a.seated ? 2 : 6)];
  const from = s.action === 'take' ? c.propStart : hand, to = s.action === 'place' ? s.at || hand : hand;
  drawSmallProp(g, s.item, from[0] + (to[0] - from[0]) * t - cx, from[1] + (to[1] - from[1]) * t - Math.sin(t * Math.PI) * 5 - cy);
  // A moving hand and object close-up makes small manipulations legible on phones.
  if (['open', 'fold', 'turn', 'write', 'flutter'].includes(s.action)) {
    g.save(); g.translate(118, 88);
    R(g, '#17121f', -2, -2, 73, 52); R(g, '#6b4128', 0, 0, 69, 48);
    const scale = s.action === 'turn' ? Math.max(.08, Math.abs(Math.cos(t * Math.PI))) : s.action === 'open' ? .35 + .65 * t : s.action === 'fold' ? 1 - .65 * t : 1;
    g.save(); g.translate(34, 23); g.scale(scale, 1);
    if (ART[s.item]) g.drawImage(artCanvas(s.item), -29, -21, 58, 42);
    else { g.scale(5, 5); drawSmallProp(g, s.item, -4, -3); }
    g.restore();
    const hx = s.action === 'write' ? 14 + t * 34 : 12 + Math.sin(t * Math.PI) * 18;
    const hy = s.action === 'flutter' ? 29 - Math.sin(t * Math.PI * 4) * 3 : 30 + Math.sin(t * Math.PI * 4) * 2;
    R(g, CHAR[s.who].shirt, hx - 8, hy + 4, 16, 10); R(g, CHAR[s.who].skin, hx, hy, 10, 6);
    if (s.action === 'write') R(g, '#25212a', hx + 7, hy - 7, 2, 12);
    g.restore();
  }
}
