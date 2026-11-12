# MeowCare Discovery V4

## GitHub Pages 發布準備

目標儲存庫：https://github.com/BoYang-BY/meowcare-discovery ，分支 `main`。
本次已獲使用者授權建立首次提交並推送；推送結果以 Git 回應及遠端 commit 比對為準，下方本機交付敘述為歷史紀錄。

- 首頁 `index.html` 位於根目錄；所有 HTML、CSS、ES modules 與本機素材沿用相對路徑，無後端、API 金鑰、資料庫或建置需求。內容使用 JS 物件，目前沒有必需的 JSON 檔。
- `.nojekyll` 停用 Jekyll 處理，直接發布靜態檔案；`.gitignore` 排除憑證、編輯器／代理本機設定、快取、依賴、日誌及測試產物，不排除網站素材與授權文件。
- 首次推送後，在儲存庫 **Settings → Pages → Build and deployment** 選 **Deploy from a branch**，分支選 **main**、資料夾選 **/(root)**，按 **Save**。
- 預期網址為 https://boyang-by.github.io/meowcare-discovery/ ，以 Pages 實際回報為準；設定完成後需另驗證首頁、四展區、觀察站、圖表及原型，不能僅以推送成功宣稱網站已上線。
- 部署準備掃描未發現常見私鑰／存取權杖／密碼賦值格式，未發現網站根路徑資源引用；這是掃描結果，不代表可保證偵測所有形式的敏感內容。沒有修改 V4 網頁設計或互動程式。

已將使用者確認的 `prototype.html` 視覺正式整合至 `index.html`，並延伸到四個展區。本機交付，未上傳 GitHub、未部署 Pages。下方 V3／V2／V1 內容為歷史紀錄，操作與規範以本節及 AGENTS.md 為準。

## 預覽正式網站

1. VS Code 開啟整個 `meowcare-carehub` 資料夾。
2. 右鍵 `index.html` → **Open with Live Server**，或按右下角 **Go Live**。
3. 若有快取，按 **Ctrl+Shift+R**。四展區可由頂部導覽或幾何入口進入。
4. 開啟 `prototype.html` 可對照原型；開啟 `tests/verify.html` 可重跑瀏覽器驗收。

使用標準 HTTP 靜態伺服器亦可，不需要建置或網站套件。ES modules 請勿用 `file://` 執行。測試用伺服器交付前會停止。

## V4 整合與操作

- 首頁保留原型中央輪廓貓咪、科技連線、軌道、超大標題、入場與視差；飲水／AI／健康觀察點切換內容與場景，健康模式可切換示範貓並查看完整數值表。
- 四展區入口由 topics 自動產生，不等尺寸與形狀沿用原型；新增第五區使用延伸列。原首頁故事、三種觀察角度與精簡 AI 流程保留。
- 飲水：水藍／薄荷；可切換集中／分散，還可選擇個別水碗，查看示意接近路線與提示。保留全部飲水科學內容。
- 環境：暖橘／奶油；空間拱形、三種情境及三個空間熱點，狀態反映通道、分散資源與休息區。
- AI：紫／深青綠；掃描框、節點、四步驟、ROI／身分／持續時間條件及待覆核紀錄。全部為前端示意，沒有執行模型。
- 健康：草綠／水藍；趨勢線描繪、兩隻示範貓、7／14天、資料表及就醫準備清單。模擬事件次數不等於飲水量或診斷。
- 四展區 Hero 共用中央標題、巨型序號、軌道、主題圖解與章節觀察入口；正文仍採 lead／gallery／wide 交錯版型。所有 V2 段落、情境、重點、提醒、來源與七篇文章保留。

## 檔案與重用

新增：

- `assets/js/observation-station.js`：原型與正式首頁共用三模式與圖表。
- `assets/js/exhibit-components.js`：資料驅動幾何入口、主題圖解、展區場景。

修改：

- `index.html`：原型構圖正式整合，保留原首頁相關功能。
- `assets/css/styles.css`：匯入既有 prototype.css 作為共用基礎，正式 tokens、導覽、展區及展品。次要文字調深至 #36574E 以符合主題底對比。
- `assets/js/app.js`、`topic.js`、`site.js`：首頁啟動、共用場景、品牌與導覽。
- `assets/js/interactions.js`：個別水碗與示意路線、可讀狀態；水碗保留 DOM 以支援位置轉場與焦點。
- `assets/js/animations.js`、`prototype.js`：共用 Reveal，原型啟動共用觀察站；reduced-motion 與設定變更皆有效。
- 四展區入口、`topic.html`：同步瀏覽器 theme-color，內容由共用模板呈現。原文章入口保留。
- `tests/browser-check.js`、`tests/verify.html`：V4 觀察站、幾何入口、水碗及第五展區驗收。
- `AGENTS.md`、`PROJECT_SPEC.md`、本文件：確認視覺、元件責任、主題差異、擴充與測試流程。

`prototype.html` 與 `prototype.css` 原始檔保留不變；原型 JS 改為呼叫共用模組，不複製互動邏輯。topics.js、content.js 的 SHA-256 仍與 V3 完全一致：

- topics.js：`4DD7ADFAC7D4E5F0DF89C1CA4CFC3944454DAEF88FAC6D87DD11B9FCB2A1BB93`
- content.js：`CD5DC037857846026FCA878A8C2799D0F35F61FF1E33061992CD2F5F064E1427`

## V4 已實測（2026-11-12）

- 已安裝 Live Server 伺服器引擎：**407 項全部通過**。
- 無 Live Server 注入的標準 HTTP 靜態伺服器，掛載 `/meowcare-carehub/`：**407 項全部通過**，驗證 Pages 子路徑。
- 內容 schema、逐段原文與重點、情境、來源連結屬性、七篇文章及未知 ID、共用導覽／頁尾、內部 HTTP 連結與頁內錨點均通過。
- 首頁三模式、示範貓圖表／資料表、原有觀點／AI預覽；飲水兩配置／三水碗，環境三情境／熱點，AI各步驟與條件分支，健康兩貓／兩區間／清單均可操作。
- 首頁、四展區與共用入口在 320／390／768／1440px 無水平溢出；原文章在320px可讀。系統繁中字體及桌面／手機字級通過檢查。
- 共用主題底與正文／次要文字對比均至少4.5:1；曾發現橘／紫底次要文字不足，已修正並重測。
- 瀏覽器記憶體新增第五區，驗證05序號、共用模板、互動、導覽與幾何延伸入口；未將假內容寫入正式資料。
- 額外鍵盤操作：Space 開啟手機選單，Escape 關閉並還原焦點，Space 切換首頁 AI 觀察點及個別水碗。
- 動態切換 reduced-motion 後，動畫名稱 none、隱藏章節0、運行動畫0；趨勢互動仍有效。原型 AI 與示範貓切換也通過回歸。
- 桌面首頁／飲水 Hero、手機首頁／環境互動區已截圖檢視。error／unhandledrejection 監聽未捕捉到網站 JavaScript 錯誤。

尚未驗證：Safari／Firefox、實體手機、完整螢幕閱讀器、人工醫療審稿、真實模型／攝影機、GitHub Pages 真實部署。自動測試使用已安裝的 Live Server 引擎，未自動操作 VS Code 右鍵選單。

## 依規範新增第五展區

讀 AGENTS.md、PROJECT_SPEC.md、topics.js、exhibit-components.js、topic.js、visuals.js 與 interactions.js。查證來源後，在 topics 新增完整物件：唯一 id、至少三節、可操作展品、情境、三點以上總結、提醒與來源；href 使用 `topic.html?id=<slug>`。選擇既有 tone（aqua／apricot／lavender／leaf）及 symbol（drop／home／scan／chart），序號、導覽、首頁入口與頁尾自動延伸。沿用模板與註冊展品，重跑 tests/verify.html、鍵盤／reduced-motion／手機及子路徑，記錄實測與未測。不要改寫已確認首頁構圖。

---
# MeowCare Discovery V3

**貓咪智慧照護互動展覽館。** 透過展區導覽、可操作展品與完整知識內容，從日常觀察走向智慧照護。這是目前生效的 Discovery 設計，取代先前的 Lab. 手帳風格；下方保留所有歷史交付紀錄。

交付狀態：本機版完成，未上傳 GitHub、未部署 GitHub Pages。純 HTML／CSS／原生 JavaScript ES modules，無後端、資料庫、API 金鑰、框架、建置或外部執行期依賴。

## 預覽與重測

1. 在 VS Code 開啟整個 meowcare-carehub 資料夾。
2. 對 index.html 按右鍵，選擇 **Open with Live Server**，或按右下角 **Go Live**。目前電腦已安裝 Ritwick Dey 的 Live Server 5.7.10。
3. 使用工具開啟的本機 HTTP 網址，連接埠以實際顯示為準。若仍看到舊版，按 Ctrl+Shift+R 強制重新整理。
4. 同樣開啟 tests/verify.html 可重跑驗收，結果會顯示於頁面。
5. 任意標準 HTTP 靜態伺服器也能使用；網站不需要 Live Server 注入的程式或 WebSocket，不要用 file:// 直接開啟 ES modules。

本次測試用伺服器已於交付前停止。請由 VS Code 啟動自己的預覽，不需安裝網站套件。

## 展館與互動展品

| 展區 | 檔案 | 操作 |
| --- | --- | --- |
| 展館入口 | index.html | 四區導覽器切換、觀察角度切換、精簡 AI 步驟預覽 |
| EXHIBIT 01 — 飲水的秘密 | water.html | 切換集中／分散飲水配置，查看位置與路線說明 |
| EXHIBIT 02 — 貓咪的世界 | environment.html | 共用通道／分散資源／安靜休息三情境，以及原有三個空間熱點 |
| EXHIBIT 03 — AI 的眼睛 | technology.html | 四步驟、掃描示意、ROI／身分／時間條件、候選事件與紀錄欄位示例 |
| EXHIBIT 04 — 健康的線索 | health.html | 兩隻示範貓、7／14天、圖表／資料表、就醫資訊清單 |

保留 topic.html?id=<slug> 共用展區入口與 article.html?id=<slug> 七篇舊文章。無效 ID 有友善提示。情境、AI 框線、貓名與圖表都是示意，不執行真實模型，不代表實際飲水量、健康分數或診斷。

## 與 V2 及先前 Lab. 版本的差異

- 從品牌文章／主題網站改為展館入口、探索路線、四個具名展區與互動展品。
- 首頁採沉浸式照片觀測舞台、可切換展區導覽器、參觀故事、觀察角度與 AI 預覽；不以一般卡片網格為主。
- 視覺使用深青綠文字與淺薄荷、水藍、暖橘、紫、草綠；移除點點、膠帶、貼紙、便條與吉祥物。舊素材僅保留歷史，不在網站載入。
- 系統繁中字體、大型標題；實測1440px首頁約82px、章節約46px、預覽標題30px、正文20px、導覽17px，手機正文18px。
- 展區採 lead／gallery／wide 三種版型，保留完整段落，避免每節重複左右雙欄。
- 環境展品加入情境切換；AI步驟切換會更新框線、重播短時掃描並顯示模擬紀錄欄位；趨勢圖切換有內容轉場。
- 支援減少動態、鍵盤、行動選單與文字狀態；沒有自動輪播或無限裝飾動畫。

## 規範與檔案

AGENTS.md、PROJECT_SPEC.md 已改為 Discovery 規範，定義展區命名、資料、共用模板、tokens、字級、動畫、模擬界線、第五區流程、子路徑及驗收。

主要修改：index.html、四個展區入口、topic.html、article.html、styles.css、app.js、site.js、topic.js、visuals.js、animations.js、interactions.js、article.js、測試與文件。

共用元件：exhibitFor（顯示名稱／自動序號／色彩）、icon（品牌與展區向量）、exhibit-selector／exhibit-preview（導覽與預覽）、observation-frame、chapter-index、exhibit-panel、takeaway-list、next-exhibit。互動註冊表沿用四種類型，首頁重用 compact AI 模式。

**topics.js 與 content.js 未修改，SHA-256 和改版前一致。** 原 V2 的標題作為展區導讀問題，原介紹、全部章節、情境、重點、注意事項、來源與延伸閱讀完整呈現；七篇文章仍可透過原 slug 開啟。

目前使用合法本機照片與原創簡潔向量圖示，來源見 assets/images/CREDITS.md。Discovery 使用系統繁中文字體，不載入歷史字型子集或外部字型。

## 已實際執行的驗收（2026-11-12）

- 在本機標準 HTTP 靜態伺服器的 /meowcare-carehub/ 子路徑，**374項檢查全部通過**。
- 以已安裝 Live Server 5.7.10 套件的伺服器引擎再測，**374項全部通過**。沒有宣稱自動點擊 VS Code 右鍵選單本身；標準伺服器實測也證明網站不依賴其特有功能。
- 首頁、四區與共用入口的標題、導覽、來源、圖片解碼、內部連結 HTTP、頁內錨點、無效 ID 正常；導覽前注入 error／unhandledrejection 監聽，未捕捉到網站 JS 錯誤。
- 主題每節段落與重點、情境及總結逐項和原資料比對；兩個知識資料檔雜湊保持不變。
- 展區入口、三情境、三熱點、飲水配置、AI各步驟與條件分支、等於門檻邊界、兩貓／兩區間、資料表及清單計數均可操作。
- 首頁／展區／共用入口於320、390、768、1440px無水平溢出；原七篇文章於320px可讀。
- 瀏覽器記憶體中新增第五展區，驗證05序號、共用模板、互動、自動導覽及首頁切換預覽；未把測試假內容寫入正式資料。
- 主文與五種淺底對比最低約6.67:1；次要文字最低約4.83:1，均達一般文字4.5:1門檻。
- 實際捲動後沒有遺留隱藏章節。減少動態設定變更後，入場／掃描停用、運行中動畫0，展區與AI步驟仍可切換。
- 鍵盤實測Tab先到跳至內容（3px焦點）；Enter開手機導覽、Escape關閉並返回按鈕；Enter切換環境情境；方向鍵將時間滑桿從5秒改為6秒且文字同步。
- 截圖檢視桌面／手機首頁、展區導覽器、飲水主視覺與手機環境展品。調整過手機標題斷行與主題圖示位置。

曾發現瀏覽器原生跨頁 View Transition 在嵌入式情境產生拒絕事件，因此移除；目前以可存取的入口預覽、Hero入場與展品狀態轉場呈現，不依賴該功能。

尚未驗證：Safari／Firefox、實體手機、完整螢幕閱讀器、人工醫療審稿、真實模型／攝影機、GitHub Pages真實部署。以上不宣稱通過。

## 如何新增第五展區

1. 讀AGENTS.md、PROJECT_SPEC.md、topics.js、topic.js、visuals.js及interactions.js，確認slug不重複、內容不重疊。
2. 查證來源，準備介紹、至少三節、展品、應用情境、三點以上總結、注意事項及延伸探索。
3. 在topics物件末尾新增完整物件，id用小寫kebab-case，href設 `topic.html?id=<slug>`。
4. 建議加上 `exhibit: { name: '新的展區名稱', tone: 'leaf', symbol: 'chart' }`。tone可為aqua/apricot/lavender/leaf；symbol可為drop/home/scan/chart。省略時也有預設。
5. 序號按資料順序自動成為EXHIBIT 05，導覽、首頁選擇器及頁尾自動加入，不需要複製HTML。relatedArticles及nextTopic須指向有效資料。
6. 選用對應既有展品；若新增互動類型，先說明最小改動，再擴充註冊表與分支測試。
7. 重跑tests/verify.html，檢查新展區、鍵盤、手機、來源及子路徑，在README記錄實測和未測項目。

建議提示詞：

> 請先閱讀AGENTS.md與PROJECT_SPEC.md，新增第五個有查證來源的貓咪照護展區。沿用Discovery展區資料、共用模板、tokens與互動註冊表，保留既有內容，完成後區分實測與未測項目。

---

# 歷史交付紀錄（以下非目前設計）

先前 Lab.、Interactive V2 與 CareHub V1 文件保留如下；當前品牌、規範與驗收以上方及AGENTS.md為準。

# MeowCare Lab. V3

可愛手帳貼紙 × 現代 Bento × 互動科技科普。跟著原創貓咪研究員，探索飲水、生活環境、AI 辨識與健康紀錄。V2 完整主題內容、互動與 V1 七篇文章保留，這次重構的是品牌、版型與視覺呈現。

**狀態：V3 本機版完成；未上傳 GitHub、未部署 GitHub Pages。**

## 在 VS Code 預覽

1. 使用「檔案 → 開啟資料夾」開啟整個 meowcare-carehub。
2. 目前電腦已安裝 Live Server（Ritwick Dey，5.7.10）。對 index.html 按右鍵，選擇 **Open with Live Server**，或按右下角 **Go Live**。
3. 在工具開啟的本機 HTTP 網址預覽，連接埠依工具實際顯示為準。不要使用直接雙擊 HTML 的 file:// 模式。
4. 修改後儲存可重新載入。若仍看到 V2 外觀，按 Ctrl+Shift+R 強制重新整理，確認開啟的是這個專案。
5. 同樣以 Live Server 開啟 tests/verify.html，可重跑瀏覽器驗收。測試結果顯示於頁面。

Live Server 是開發預覽工具；網站上線仍是純靜態檔案，沒有套件安裝、建置、後端、資料庫、金鑰或外部執行期依賴。

## V3 與 V2 的差異

| 項目 | V2 | V3 |
| --- | --- | --- |
| 品牌 | MeowCare Interactive | MeowCare Lab. 貓咪照護探索實驗室 |
| 主視覺 | 深綠照片 Hero | 奶油點點背景、角色 Hero、手帳貼紙 |
| 配色 | 森林綠與奶油白 | 藍／粉紅／淡黃／淡紫面板，深藍綠文字、珊瑚裝飾 |
| 字級 | 內文16px、較小導覽與輔助字 | 桌面正文20px、手機18px、桌面導覽17px、卡片30px、大型圓潤標題 |
| 主題探索 | 不對稱照片列表 | 大小不同的彩色 Bento 區塊與原創圖示 |
| 主題章節 | 主要使用雙欄 | notebook／split-note／field-notes 三種版型依主題組合 |
| 科技介紹 | 首頁靜態導讀、主題頁互動 | 首頁直接重用精簡版 AI 流程，主題保留完整規則模擬 |
| 動態 | 入場、Reveal、圖片 Hover | 增加有限次角色漂浮、足跡／貼紙入場、水滴、掃描、步驟淡入 |

V2 的介紹、全部主題段落、情境、重點、注意事項、來源與延伸文章均保留。topics.js 與 content.js 的 SHA-256 和改版前一致，並逐節比對了實際渲染文字。

## 新增的可重用元件

- visuals.js：mascot、sticker、doodle、chapterBadge、pawTrail、visualFor。
- mascot.svg：原創貓咪研究員，重用於首頁、品牌、主題照片與情境區。
- .bento-tile：主題大小組合、色彩、Hover 與手機版型；首頁入口仍自動讀取 topics。
- .sticker／.tape／.paw-trail：手帳標籤、膠帶與足跡；裝飾不攔截點擊。
- .scrapbook-image／.chapter-badge／.note-card：照片框、章節編號與彩色重點筆記。
- .lab-panel：四種互動的共同外框；AI 模組新增 compact 模式供首頁重用，不複製流程邏輯。
- topic.js：三種章節版型與四個主題色，自動組合完整內容。
- styles.css：V3 tokens、字級、斷點、有限次動畫及 reduced motion；不再保留 V2 深色樣式堆疊。

## 修改與新增檔案

修改：AGENTS.md、PROJECT_SPEC.md、README.md、首頁與各主題／相容頁 HTML、styles.css、app.js、site.js、topic.js、article.js、animations.js、interactions.js、素材來源紀錄及瀏覽器測試。

新增：assets/js/visuals.js、assets/images/mascot.svg、assets/fonts/huninn-lab-subset.ttf、OFL.txt、CHARACTERS.txt 與字型 README。

字型為合法 Huninn 標題子集，約63 KiB；font-display:swap，未涵蓋字元使用系統繁中備援。所有圖片、SVG 與字型均在本機，不需遠端連線。字型來源及授權見 assets/fonts/README.md；插畫與保留照片見 assets/images/CREDITS.md。

## V3 實測紀錄（2026-11-12）

已實際執行：

- 以 PowerShell／.NET 靜態伺服器在 /meowcare-carehub/ 子路徑跑完 **347 項**檢查，全部通過。
- 使用電腦已安裝之 VS Code Live Server 5.7.10 套件的伺服器引擎，於本機 127.0.0.1:5501 再跑 **347 項**檢查，全部通過。驗證 HTML、ES modules、SVG、照片、TTF 與來源資料實際載入；未宣稱自動操作了 VS Code 右鍵選單本身。
- 首頁、四主題及共用入口於320／390／768／1440px無水平溢出；七篇原文章在320px可讀。
- 原主題每節段落及重點逐一和資料比對，應用情境、延伸文章、來源保留。原兩個資料檔雜湊未變。
- 主題／文章有效與未知 ID、所有內部連結、頁內錨點、外部來源連結安全屬性正常。
- 首頁三觀點、四個 AI 步驟、兩種飲水配置、三個環境熱點、完整 AI 四步驟與所有條件分支、兩貓／兩區間趨勢、資料表及就醫準備清單正常。
- 新主題記憶體煙霧測試通過：新增資料可沿用模板、視覺預設、互動與自動導覽，不把測試內容寫入正式資料。
- 在1440px實測：Hero約82px、章節46px、卡片30px、內文20px、導覽17px；手機正文18px。Huninn本機字型成功載入。
- 標準文字與各粉彩底對比最低約5.78:1，次要文字最低約4.54:1；珊瑚色主要用於裝飾與圖表點，非小字正文。
- 實際捲動Reveal後沒有遺留隱藏章節；截圖檢視桌面首頁、Bento、飲水Hero／章節、320px首頁／環境互動、健康趨勢。
- reduced motion設定切換後：角色／足跡／水滴動畫停用、掃描隱藏、運行中動畫為0、Reveal直接可見；AI步驟與飲水配置仍可操作。
- 實際鍵盤事件：Tab先到跳至內容連結（3px焦點）、Enter開手機選單、Escape關閉並返回按鈕；互動使用原生button／select／range與文字狀態。
- 導覽前注入error／unhandledrejection監聽，兩輪網站驗收未捕捉到JavaScript錯誤。自行重跑時仍建議同時查看瀏覽器Console。

尚未驗證：Safari／Firefox、實體手機、完整螢幕閱讀器測試、人工醫療審稿、真實攝影機與模型、GitHub Pages實際部署。所有事件、貓名、圖表與門檻繼續明確標為模擬，不做診斷或真實辨識宣稱。

## 依 V3 規範新增主題

先讀 AGENTS.md、PROJECT_SPEC.md、topics.js、topic.js、visuals.js 與互動註冊表；檢查重疊、查證來源後，在 topics 新增完整資料，href 使用 topic.html?id=<slug>。

保留至少三節、互動、情境、重點、提醒、來源與延伸閱讀。可選填 `visual: { tone: 'pink', symbol: 'heart', label: '新的探索筆記' }`；省略時自動沿用通用貼紙與三種版型。沿用既有元件及tokens，不複製HTML或重新設計整站。

重新跑tests/verify.html並手動檢查新內容、手機與鍵盤。字型未涵蓋的新字元可安全回退；未經授權不將專案字元送往外部字型服務。若要擴充字型，採本機處理並保留授權。

---

# V2 與 V1 歷史紀錄

以下保留原交付紀錄。現行品牌、視覺與規範以上方及AGENTS.md為準。

# MeowCare Interactive V2

智慧照護探索網站。以完整品牌首頁、四個互動科普主題，連結貓咪照護、環境觀察、AI 專題架構與健康紀錄。全站使用 HTML、CSS、原生 JavaScript ES modules，無建置、後端、資料庫、API 金鑰或外部執行期依賴。

**交付狀態：本機版完成，未上傳 GitHub、未部署 GitHub Pages。** V1 七篇文章及舊 URL 保留為延伸閱讀。所有數據展示均為前端模擬，未運行 YOLOv8n／PetFace 或接入攝影機。

## 在 VS Code 預覽 V2

1. 選擇「檔案 → 開啟資料夾」，開啟整個 meowcare-carehub 專案。
2. 若尚未安裝預覽工具，安裝 **Live Server**（作者 Ritwick Dey、識別碼 ritwickdey.LiveServer）。這只是開發工具，網站本身沒有套件依賴。
3. 對 index.html 按右鍵，選擇 **Open with Live Server**，或按右下角 **Go Live**。
4. 在工具開啟的 HTTP 網址瀏覽網站，通常為 http://127.0.0.1:5500/index.html，依工具實際連接埠為準。
5. 儲存修改會自動重新載入。按狀態列連接埠可停止伺服器。

工具官方頁：https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer

請使用 HTTP 靜態伺服器；直接雙擊 HTML 的 file:// 模式可能阻擋 ES modules。若已有 Python 3，也可在根目錄執行 `python -m http.server 8000 --bind 127.0.0.1`，開啟 http://127.0.0.1:8000/ 。本次開發環境沒有可用 Node.js／Python，因此實測使用暫時的 PowerShell／.NET 靜態伺服器，不是網站後端。

## 頁面與操作

| 頁面 | 內容 | 可操作展示 |
| --- | --- | --- |
| index.html | 品牌故事、主題導讀、智慧照護與專題成果範圍 | 一口水／一個角落／一段紀錄觀點切換 |
| water.html | 水分來源、資源位置、飲水觀察與情境 | 集中／分散飲水配置切換 |
| environment.html | 多貓互動、安全空間、通行與環境資源 | 點選安全休息、飲水位置、通行動線 |
| technology.html | YOLOv8n、PetFace、手動 ROI／持續時間、歷史趨勢 | 四步驟流程、區域／身分／持續時間／門檻條件模擬 |
| health.html | 個體基準、趨勢限制、就醫準備 | 貓咪與 7／14 天切換、圖表／資料表、準備清單 |
| topic.html?id=water | 共用主題入口（適用未來新主題） | 同一模板及互動註冊表 |
| article.html?id=… | V1 七篇延伸文章 | 保留原 slug 與資料來源 |

所有互動可用鍵盤；模擬狀態以文字描述，不只依靠顏色。就醫清單僅在當頁記憶體中暫存，不儲存、不傳送資料。手機選單可用 Escape 關閉並回到選單按鈕。來源連結另開分頁。

## V2 檔案與共用架構

- 規範：AGENTS.md、PROJECT_SPEC.md 已從文章搜尋型網站改為互動品牌網站。
- 重構：index.html、article.html、assets/css/styles.css、assets/js/app.js、assets/js/article.js。
- 新頁面：water.html、environment.html、technology.html、health.html、topic.html。
- 新模組：topics.js（內容）、topic.js（主題模板）、site.js（導覽／頁尾）、dom.js（安全渲染）、animations.js（動畫）、interactions.js（互動註冊表），均位於 assets/js/。
- 素材：assets/images/ 三張已壓縮本機 JPEG 與 CREDITS.md；照片合計約 748 KiB，來源與授權可追溯。沒有遠端必載字型、圖片或 JavaScript。
- 測試：tests/verify.html、tests/browser-check.js；透過原生瀏覽器執行，無測試套件依賴。
- 保留：assets/js/content.js 的七篇原文與分類資料未修改，V1 擴充紀錄見本文件下方歷史區。

Design Tokens 集中於 styles.css 的 :root：主色、輔色、文字、間距、字級、版寬與動畫時間。主題資料用純文字，渲染使用 textContent／DOM API，沒有把資料當 HTML 插入。

## AI 與照護內容的界線

專題架構依使用者提供：YOLOv8n 貓咪偵測 → PetFace 身分辨識 → 手動 ROI 加持續時間 → 飲水歷史與趨勢。本網站只是解說與可操作教學，不具備實際辨識、監控、上傳或診斷功能。

候選事件不等於真實飲水，更不等於毫升數。模擬秒數不是專題實測門檻或獸醫標準；沒有宣稱準確率、FPS 或真實部署成果。PetFace 原始資料、程式及預訓練模型限非商業研究用途；本站不包含或分發它們。

2026-11-12 重新查閱 Cornell、AAFP／ISFM、PDSA、VCA、Ultralytics 與 PetFace 官方研究頁／程式庫，對應來源列於各主題。情境與筆記方法屬說明範例。健康內容仍需發佈前人工審閱；令人擔憂的症狀請諮詢獸醫。

## 未來依 AGENTS.md 新增主題

1. 讀 AGENTS.md、PROJECT_SPEC.md、topics.js、topic.js、interactions.js，先檢查 slug 與既有內容重疊。
2. 查證來源，準備完整介紹、至少三節段落、一個互動、應用情境、至少三個重點、注意事項、相關文章及下一主題。
3. 在 topics.js 的 topics 物件新增一筆完整資料。鍵與 id 相同，使用小寫 kebab-case；href 設為 `topic.html?id=你的-slug`。image 指向已取得合法素材的本機相對路徑。
4. interaction.type 從 resource-map、space-explorer、ai-pipeline、trend-chart 選擇符合主題的模組；若需新互動，先說明最小變動，再擴充註冊表。其他完整欄位格式見 AGENTS.md 第 5 節。
5. 不用複製 HTML／導覽／頁尾。首頁與導覽由 topics 自動產生；relatedArticles 必須指向已有文章，nextTopic 指向有效主題。
6. 本機確認新主題、首頁／導覽、互動、來源、未知 ID、鍵盤、320px 與子路徑。驗收程式會自動依 topics 數量檢查導覽與頁尾；若加入新互動，另外補上它的操作分支測試，再記錄結果。

可使用的擴充提示詞：

> 請先閱讀 AGENTS.md 與 PROJECT_SPEC.md，新增一個有查證來源的貓咪照護主題，沿用 topics.js 資料格式、topic.html 共用入口與既有互動模組，不重新設計全站。請先檢查內容重疊，完成後說明變更與實測／未測項目。

## V2 實測紀錄（2026-11-12）

以本機 HTTP 伺服器模擬 `/meowcare-carehub/` 專案子路徑，使用 Microsoft Edge 執行原生 ES modules 與瀏覽器驗收程式。

已實際執行：

- 五個主要頁面與共用主題入口：標題、完整資料、共用導覽／頁尾、所有頁面內的內部連結 HTTP 回應與頁內錨點、來源連結安全屬性。
- 三張本機照片實際解碼成功，沒有依賴無法載入的遠端圖片。
- 320、390、768、1440px 的首頁／主題／共用入口無水平溢出；原七篇文章在 320px 可讀且無溢出。
- 首頁三種觀點、兩種飲水配置、三個空間熱點、AI 四個步驟、候選成立／ROI 外／未知身分／時間不足／等於門檻分支。
- 兩隻示範貓與 7／14 天的全部組合，圖表點數、逐日資料與合計一致；資料表與清單 4/4 計數正常。
- 缺少／未知／__proto__ 主題 ID 與未知文章 ID 有正常提示。
- 暫時在瀏覽器記憶體中新增一個主題，確認共用模板、互動與自動導覽可延伸，沒有把測試假內容寫入 topics.js。
- 265 項自動檢查通過；網站頁面未捕捉到 JavaScript error／unhandledrejection。
- 捲動時 Reveal 實際顯示；桌面／320px 逐段捲動後無遺留隱藏章節。
- reduced motion 設定變更與重新載入：入場動畫停用、Scroll Reveal 內容直接可見、平滑捲動停用，技術互動仍可用。
- 桌面首頁、手機首頁與技術主題完整截圖檢視；互動與內容不是空白占位。
- 色彩對比計算：正文／奶油白約 12.67:1，次要文字／奶油白約 5.37:1，深色區正文約 9.25:1；淺綠情境區的細字改用森林綠。
- 實際鍵盤事件：Tab 首先到達跳至內容連結（3px 外框）；Enter 展開手機選單、Escape 關閉並返回按鈕；Space 切換飲水配置；方向鍵將持續時間從 5 秒調至 6 秒，文字同步更新。深色頁尾也有可見焦點顏色。

可重跑：啟動本機伺服器後開啟 `tests/verify.html`。結果會顯示於頁面，不需 Node.js。測試的 JavaScript 錯誤捕捉在本次 Edge 自動化中由導覽前的監聽器注入；單獨開啟測試頁時仍應同時檢查開發工具 Console。

尚未驗證：Safari／Firefox、實體手機與完整螢幕閱讀器操作、實際模型與攝影機、醫療專業審稿、GitHub Pages 真實上線。上述均不宣稱通過。

## 部署狀態

依使用者指示，本次僅交付本機版，未初始化／推送 Git 儲存庫，也未部署。確認成果後再指定 GitHub 儲存庫、上傳原始碼、設定 Pages 分支根目錄並重測公開網址。網站相對路徑已在本機專案子路徑驗證。

---

# V1 歷史紀錄（以下保留原交付文件）

以下是 V1 當時的設計與驗收，不代表 V2 仍以搜尋或分類卡片為首頁。V2 的現行規範與狀態以上方及 AGENTS.md 為準。

# MeowCare CareHub

繁體中文（臺灣）的貓咪照護知識中心，面向一般飼主、初次養貓者與多貓家庭。提供一般教育資訊，不取代獸醫診療，也不包含影像辨識或飲水監測。

## V1 狀態

已完成本機版：六篇初始文章與一篇規範擴充文章、四類篩選、即時搜尋、共用文章頁、無結果與無效 ID 提示。2026-11-12 已用本機靜態伺服器與 Microsoft Edge 驗收。

依使用者要求，目前不進行 GitHub 上傳或 GitHub Pages 部署，尚無公開網址。待使用者確認網站成果後再處理。

## 在 VS Code 預覽

1. 在 VS Code 選擇「檔案 → 開啟資料夾」，開啟 `meowcare-carehub` 整個專案。
2. 若尚未安裝預覽工具，在擴充功能搜尋 **Live Server**，確認作者為 **Ritwick Dey**（識別碼 `ritwickdey.LiveServer`），再自行安裝。這是開發時使用的靜態伺服器，不是網站執行期依賴。
3. 在檔案總管對 `index.html` 按右鍵，選擇 **Open with Live Server**；也可以按視窗右下角 **Go Live**。
4. 瀏覽器會開啟本機網址，通常為 `http://127.0.0.1:5500/index.html`，實際連接埠以工具顯示為準。
5. 修改並儲存檔案後，Live Server 會重新載入頁面。使用完畢可按狀態列的連接埠項目停止伺服器。

工具頁面：https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer

請透過 `http://` 本機網址預覽，不要直接雙擊 HTML 使用 `file://`：本網站使用 ES modules，瀏覽器可能限制直接從檔案載入模組。

其他靜態伺服器也可使用。例如開發電腦已安裝 Python 3 時，在專案根目錄執行：

```powershell
python -m http.server 8000 --bind 127.0.0.1
```

接著開啟 `http://127.0.0.1:8000/`，按 `Ctrl+C` 停止。Python 並非網站必要依賴，本次環境未安裝可用的 Python，驗收時使用暫時的 PowerShell／.NET 靜態伺服器。

## 檔案結構

```text
index.html                 首頁、搜尋、分類與文章列表
article.html               共用文章頁，?id=<slug>
assets/css/styles.css      配色、元件、響應式排版與焦點樣式
assets/js/app.js           首頁渲染、即時搜尋與組合篩選
assets/js/article.js       文章渲染、來源連結與找不到文章提示
assets/js/content.js       categories 與 articles 資料
AGENTS.md                  AI 開發規範（保留原文）
PROJECT_SPEC.md            專案規格（保留原文）
README.md                  預覽、維護、部署與驗收紀錄
```

插畫以本機 CSS 繪製，目前不需要 `assets/images/`。沒有框架、建置流程、遠端字型、第三方執行期程式、API 或資料庫。

## 操作與維護

- 四個分類固定為 `water` 飲水照護、`nutrition` 飲食營養、`environment` 環境管理、`health` 健康觀察。
- 搜尋比對標題、摘要與標籤，可和分類一起使用。無結果時可按「顯示全部文章」清除條件。
- 點擊文章標題開啟 `article.html?id=<slug>`；返回連結會回到首頁文章區，目前不保留先前查詢條件。
- 新增文章前閱讀 `AGENTS.md`、檢查 slug 與內容重疊，僅新增完整文章物件，沿用共用模板。
- 每篇物件包含 `id`、`title`、`category`、`summary`、`tags`、`updatedAt`、`sections`、`cautions`、`sources`。摘要 40–100 字、標籤 2–5 個、更新日期為實際編輯日期。
- 內容使用純文字，透過安全 DOM API 呈現。來源須為已查證的相關 HTTPS 頁面；未確認時留下明確待查證註記，不捏造引文。
- 資料不是獸醫診斷或處方。發現令人擔憂的症狀時，應諮詢獸醫。

來源於 2026-11-12 開啟查證，包括 Cornell Feline Health Center、AAFP／ISFM 環境指引、PDSA 與 VCA，各篇詳情頁列出對應連結。居家筆記、清單與位置圖是整理資訊的實務建議，不是經驗證的健康評估工具。發佈前仍應由人工檢視文章與來源。

## 驗收紀錄

日期：2026-11-12。方法：本機 HTTP 靜態伺服器、Edge 實際執行 ES modules、DOM 與版面檢查、鍵盤輸入測試、桌面與手機截圖檢視。使用 `/meowcare-carehub/` 子路徑模擬 GitHub Pages 專案路徑。

- [x] 首頁與共用文章模板可透過本機伺服器載入。
- [x] 四個分類、全部文章、標題／摘要／標籤搜尋、組合搜尋、無結果提示及重設正常。
- [x] 七篇文章標題、段落、注意事項與來源正常渲染；文章連結以 Enter 可開啟對應文章。
- [x] 缺少 ID、未知 ID 與包含標記字串的 ID 均顯示找不到文章提示。
- [x] 兩個頁面、CSS 與三個 JS 在專案子路徑均回傳 HTTP 200，無遠端必載資源。
- [x] 首頁於 320／640／1280px、所有文章於 320px 未發現水平溢出；已檢視桌面與手機版截圖。
- [x] Tab 可依序到達跳至內容、品牌、導覽、搜尋、分類及文章連結；焦點外框為 3px，Space 可切換分類，Enter 可開啟文章。
- [x] 搜尋有 label、頁面有語言與標題層級、結果有即時狀態，來源連結具 `target="_blank"` 與 `rel="noopener noreferrer"`。
- [x] 一般文字配色檢查後調深次要文字，避免淺綠底對比不足；裝飾圖形不作為唯一資訊來源。
- [x] 七篇資料格式、摘要長度、標籤數量、slug 唯一性與 HTTPS 來源格式通過檢查。
- [x] README 已記錄執行方式、部署步驟及擴充驗證。

驗證範圍限制：未進行完整螢幕閱讀器測試、跨所有瀏覽器測試或真實 GitHub Pages 上線驗證。來源已透過瀏覽查證；健康內容仍待發佈前人工審閱。

### 手動重測方式

1. 首頁應顯示七篇文章；四類篇數依序為 3、1、1、2。
2. 搜尋「資源分配」應找到多貓飲水資源文章；搜尋「和平常有什麼不同」應找到健康紀錄文章。
3. 選擇飲水照護再搜尋「多貓」，應找到多貓飲水資源文章。
4. 搜尋不存在的文字，應出現無結果提示；按「顯示全部文章」後回到七篇並將焦點移回搜尋欄。
5. 逐一開啟文章並檢查來源，另開啟 `article.html?id=missing` 確認錯誤提示。
6. 用 Tab、Space 與 Enter 操作，並在瀏覽器開發工具切換 320px 與桌面寬度。

## 規範擴充驗證

日期：2026-11-12。初始六篇完成並通過瀏覽器檢查後，交由另一個 AI 代理執行以下要求：

> 請先閱讀 AGENTS.md，依照既有規範新增一篇『如何安排貓咪飲水點』文章，不修改整體設計，並說明修改檔案與測試結果。

另提供工作範圍：只新增一個文章物件、檢查 slug 及內容重疊、重新查證來源、保持原六篇不變，將瀏覽器驗收留給主代理。

- 文章修改檔案：`assets/js/content.js`；本節紀錄由主代理補入 `README.md`。
- 新文章：〈如何安排貓咪飲水點〉，slug 為 `arrange-cat-water-stations`，61 字摘要、4 個標籤、更新日期 `2026-11-12`。
- 重疊檢查：既有〈多貓家庭如何安排飲水資源？〉重點在貓群間的可近性與競爭；新文章聚焦單貓也適用的位置、通行及補水檢查。
- 來源：重新查閱既有 AAFP／ISFM 環境指引與 Cornell Hydration，沿用已核實的來源物件。
- 未修改頁面模板或設計；原六篇保留。擴充後重跑搜尋、篩選、七篇文章、來源屬性、無效 ID、資料格式與手機溢出檢查，均通過。
- 上方接受清單已反映擴充後結果。發佈前人工內容審閱尚待完成，目前僅交付本機版。

## 未來 GitHub Pages 部署

以下為待使用者確認成果後才執行的步驟，本次未執行：

1. 建立或選擇 GitHub 儲存庫，將本專案原始碼放在儲存庫根目錄。
2. 提交並推送原始碼，避免上傳測試瀏覽器設定、暫存截圖、密鑰及個人資料。
3. 於儲存庫 Settings → Pages 選擇從分支部署，指定存放網站的分支及根目錄。
4. 取得 GitHub 回報的公開網址後，重測首頁、搜尋、篩選、文章與無效 ID，以及資源路徑。

本網站使用相對路徑，適用 GitHub Pages 專案子路徑；不需要建置、環境變數或額外後端。
