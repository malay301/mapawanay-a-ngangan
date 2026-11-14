// ================= 雲端訪客簿設定 =================
// 玩家交出訪客簿時，答案會另外送一份到 Supabase 雲端資料庫，製作團隊在後台頁面（admin.html）集中查看。
// 兩格都空著時，遊戲照舊只把答案存在玩家的裝置上。
//
// url：Supabase 專案的 Project URL，例如 https://abcdefghijkl.supabase.co
// key：Supabase 的「Publishable key」（sb_publishable_ 開頭）或舊版的「anon public」金鑰。
//      這把金鑰本來就是公開的，資料表權限設定成它「只能新增、不能讀取」，放在網站上是安全的。
//      絕對不要把 secret key 或 service_role 金鑰貼到這裡。
window.GUESTBOOK_CLOUD = {
  url: '',
  key: ''
};
