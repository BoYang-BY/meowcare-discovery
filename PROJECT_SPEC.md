# MeowCare Discovery V4 — 網站規格書

## V4 正式整合
已確認的prototype.html為視覺基準，保留原型。正式首頁採中央輪廓貓咪觀察場景、科技線條與軌道、72–96px標題、飲水／AI／健康三模式、可切換示範貓的圖表及不等尺寸幾何展區入口；保留原首頁故事、觀點切換與完整AI預覽功能。

色彩統一為paper #F4F3EA、ink #193E35、muted #36574E、水藍 #BBDDEB、薄荷 #E1EDF0、橘 #F3C3A3、紫 #CDC4EA、草綠 #C6E5A7。展區標題52–72px、章節40–56px、正文20px／手機18px、導覽17px。展區Hero以中央編輯標題、巨型序號及主題圖解呈現；01水波、02空間、03掃描節點、04趨勢時間軸，避免四套重複樣式。

共用prototype.css基礎視覺、styles.css正式元件、observation-station.js觀察站、animations.js動畫、site.js導覽與頁尾、topic.js展區模板、topics.js完整知識資料及interactions.js展品註冊表。新增第五區自動取得序號、首頁幾何入口、導覽及頁尾；共用模板與現有展品，不需新增HTML。

所有V2知識與七篇文章保留；水碗個別觀察、環境情境、AI步驟／條件、健康兩貓／區間／表格均可操作。AI效果及數據明示模擬，網頁不執行模型。動畫支援鍵盤、行動與reduced-motion。正式驗收包含Live Server及標準HTTP子路徑、資料／連結／互動／版面／JS錯誤／第五區延伸；README區分實測與未測。本次仍僅本機交付。

## 定位
MeowCare Discovery — 貓咪智慧照護互動展覽館。讓訪客像走進線上展館，透過展區、可操作展品與視覺化內容，理解照護及AI科技。採現代展覽與編輯設計，取代前版Lab.手帳風；保留V2完整內容。

## 頁面與展品
| 展區 | 入口 | 核心內容與操作 |
| --- | --- | --- |
| 展館入口 | index.html | 中央貓咪觀察站、三模式與示範圖表、幾何展區入口、捲動故事、AI互動預覽及CTA |
| EXHIBIT 01 飲水的秘密 | water.html | 飲水習慣、觀察、多貓資源；集中／分散水碗配置 |
| EXHIBIT 02 貓咪的世界 | environment.html | 資源競爭、安全空間與行為；情境切換＋空間熱點 |
| EXHIBIT 03 AI 的眼睛 | technology.html | YOLOv8n、PetFace、手動ROI、時間條件、事件與紀錄；步驟掃描與規則模擬 |
| EXHIBIT 04 健康的線索 | health.html | 歷史、趨勢、日常紀錄與就醫準備；貓咪／區間切換圖表與資料表 |

每區有主視覺、背景、至少三節完整內容、可操作展品、實際情境、重點、提醒與來源。原七篇文章及舊URL保留為延伸閱讀。新展區使用topic.html?id=<slug>與共用模板；錯誤ID顯示友善提示。

## 設計
互動式數位展覽館 × 活潑現代編輯排版 × 科技科普。深青綠#193E35、薄荷#E1EDF0、水藍#BBDDEB、暖橘#F3C3A3、紫#CDC4EA、草綠#C6E5A7；清晰系統繁中文字體。首頁Hero72–96px、展區52–72px、章節40–56px、卡片24–30px、正文18–20px、導覽16–18px，手機響應式且正文至少18px。

使用中央觀察場景、軌道、科技連線、幾何展區入口與巨型編號建立記憶點，不用點點、貼紙、膠帶、便條紙、幼稚卡通或大片深綠底。首頁不是一般卡片網格；章節使用lead／gallery／wide組合，避免重複左右雙欄，控制行長與不必要留白。

## 動態與技術
Hero入場、Reveal、展區入口Hover、切換轉場、AI掃描、互動圖表與展品狀態回饋。支援reduced motion、鍵盤及手機，無捲動劫持或無限裝飾動畫。

純HTML／CSS／原生ES modules，不需後端或建置；任何HTTP靜態伺服器皆可用，不依賴Live Server特有功能。相對路徑支援GitHub Pages專案子路徑。共用導覽、頁尾、topics資料、topic模板、visuals展區資訊與interactions註冊表。

技術架構依使用者提供：YOLOv8n貓咪偵測→PetFace身分辨識→手動ROI加持續時間→候選飲水事件→歷史與趨勢。本站不執行模型或接攝影機，效果及數據為模擬，不編造成效、不診斷、不開處方；有疑慮請獸醫評估。

## 交付及驗收
先修訂規範再實作。交付五個主要頁面、共用入口、相容文章、合法本機素材、可重跑測試與README。檢查內容、全部導覽、各展品分支、字級、動畫、鍵盤、320px／桌面、JS錯誤、專案子路徑及第五區延伸，區分已測與未測。

使用者現已授權 V4 首次 Git 提交與推送：遠端 https://github.com/BoYang-BY/meowcare-discovery.git、main 分支。GitHub Pages 設定為 Deploy from a branch → main → /(root)，保留 .nojekyll；不強制推送、不刪除原型或既有內容。推送結果與公開部署須分別驗證，不能將本機測試當成公開網站已上線。
