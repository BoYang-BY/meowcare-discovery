# 歷史 Lab. 版本標題圓體（Discovery 未載入）

目前 Discovery 使用系統繁中字體，本目錄僅保留歷史素材與授權。以下為舊版字體紀錄。

字體：Huninn，justfont／Huninn Project Authors；來源：https://github.com/justfont/Huninn 及 Google Fonts：https://fonts.google.com/specimen/Huninn 。SIL Open Font License 1.1，完整原文見 OFL.txt。

2026-11-12 透過 Google Fonts 官方 CSS 的 text 子集服務下載公開網站標題／介面字元，再由 fonts.gstatic.com 保存為本機字型。未改動字型輪廓；子集清單見 CHARACTERS.txt。檔案約63 KiB，不載入完整多 MB 繁中字庫。

styles.css 使用本機 @font-face 與 font-display:swap。只套用標題、品牌與短標；正文使用系統繁中無襯線。新增字元未涵蓋時自動回退系統字型，功能與閱讀不受阻。若擴充子集，保留來源與 OFL，更新字元清單並在瀏覽器檢查載入；不要改成遠端執行期字體依賴。

未經授權不將專案標題或內文字元傳送至外部字型服務。若未來要補字，優先使用系統備援，或在本機對合法取得字型進行處理，並保留授權。
