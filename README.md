# 被遺忘的名字 Mapawanay a ngangan

整理阿公遺物時，找到一個沒人提起的名字。

- 線上遊玩：https://malay301.github.io/mapawanay-a-ngangan/
- 手機：Android 用 Chrome 打開後按「安裝成 App」；iPhone 用 Safari「分享 → 加入主畫面」。打開過一次即可離線遊玩。
- 劇中族語句子為原稿候選，正式演出前由族語協作者核定；生活歌謠的歌詞與旋律尚待核定，遊戲中不播放。
- 本劇家族、借宿與問話事件為虛構情節；具體歷史背景與文化內容須另行核定。
- 字型：俐方體11號（Cubic 11，SIL Open Font License 1.1）。背景音樂為程式即時合成的原創配樂。

部署與更新方式見〈部署說明.txt〉。

角色立繪與對話頭像會隨台詞切換表情；劇情中的走位、拿取、放置、翻閱與收拾動作會在地圖上播放。演出時可按「略過動作」或 Esc，略過後仍會保留正確的位置與物品。系統開啟「減少動態效果」時會直接顯示動作完成的結果。

本機開發：在專案目錄執行 `python3 -m http.server 8000`。不需要安裝套件或建置。

瀏覽器回歸檢查：`node tests/presentation-smoke.mjs`（需要 Node.js 22 以上與 Chromium；可用 `CHROMIUM` 指定執行檔）。測試會使用獨立的暫存瀏覽器資料，不會改動玩家存檔。

演出資料及擴充方式見 [劇情演出說明](docs/presentation.md)。部署時請一併上傳 `presentation.js` 與更新後的 `sw.js`。
