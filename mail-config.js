// ================= 訪客簿寄信設定 =================
// 玩家交出訪客簿時，遊戲會在背景透過 FormSubmit（https://formsubmit.co ，免費、不用註冊）
// 把這一頁寄到製作團隊的信箱。to 空著時，遊戲照舊只把答案存在玩家的裝置上。
//
// to：收信信箱以 base64 編碼存放，避免被網路爬蟲直接抓走（瀏覽器用 atob 解回來）。
//     FormSubmit 啟用後寄來的信裡會附一串隨機代碼，之後可以把 to 換成那串代碼（不用編碼），信箱就完全不會出現在網站上。
window.GUESTBOOK_MAIL = {
  to: 'aW5nb28yNTA5OTAzOTdAZ21haWwuY29t'
};
