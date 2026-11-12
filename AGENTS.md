# MeowCare Discovery V4 — AI 開發規範

## V4 已確認的視覺基準
- `prototype.html` 是使用者已確認的構圖基準，保留為設計演進紀錄。正式 `index.html` 使用相同中央輪廓貓咪、軌道／科技連線、三個觀察點、超大標題與不等尺寸幾何展區入口；不得回復左文右照片 Hero、等尺寸圓角卡片首頁或重新提案。
- `assets/css/prototype.css` 是原型與正式網站共用的基礎視覺層；正式 `styles.css` 匯入它並定義語意 tokens、導覽、展區及展品樣式。修改共享基礎時需同時回歸原型。不要複製一份原型 CSS 再各自維護。
- `observation-station.js` 封裝三模式觀察站與示範圖表；`prototype.js` 是原型啟動器，`app.js` 是正式首頁啟動器。共享 `animations.js` 處理 Reveal；共用 `site.js` 負責正式導覽與頁尾。
- 共用色彩對應：paper/canvas #F4F3EA、ink #193E35、muted #36574E、aqua/blue #BBDDEB、mint #E1EDF0、apricot/peach #F3C3A3、lavender/lilac #CDC4EA、leaf/lime #C6E5A7。正文與主題底對比至少4.5:1，焦點3px可見；深色僅用文字、線條、小型控制。
- 桌面首頁標題72–96px、展區52–72px、章節40–56px、展品24–30px、正文20px、導覽17px。手機標題40–48px、章節30–36px、正文18px；來源與重要提醒至少16px。使用本機系統繁中字體，無遠端載入。
- 展區 Hero 使用中央標題、超大展區序號、軌道及主題圖解組成完整場景，不採兩欄照片 Hero。章節沿用lead/gallery/wide交錯版型與完整正文；展品可左右排列，但不能所有章節套同一雙欄。
- 01水藍＋薄荷：水滴／水波／水碗；02暖橘＋奶油：拱形空間／資源點；03紫＋深青綠：掃描框／節點／連線；04草綠＋水藍：曲線／時間軸。共用同一模板，差異由exhibitFor與主題tokens產生，不另建四套CSS。
- 展區入口由topics自動產生`.exhibit-door`，序號自動補零；前四區使用不等尺寸網格，05起使用共用延伸列，禁止硬編碼只容納四區。新增資料後同步更新導覽、入口與頁尾。
- 原生button作觀察點，aria-pressed／aria-controls與可讀狀態同步；圖表必有模擬標記及資料表。水碗可切換配置與個別觀察點；環境切換情境與熱點；AI保留完整規則條件；健康保留兩貓與7／14天。
- 入場包含標題裁切位移與場景展開；切換包含水波／掃描／曲線；Hover與視差只用小幅transform。動畫有限次，不自動輪播；離屏不持續requestAnimationFrame。reduced-motion及設定變更停用動態與遮蔽，功能仍可用。
- 每次修改必跑tests/verify.html，檢查首頁觀察點／圖表／入口、四展品分支、正文與sources完整、未知ID、320/390/768/1440px、鍵盤、錯誤監聽、所有相對路徑，並在HTTP專案子路徑重跑。真實部署／實機／其他瀏覽器未執行需明記。
- 內容資料、舊文章與原型不得因視覺整理刪除；不得編造醫療資訊、AI指標或模擬偵測成果。新增展區仍依下方schema與流程，但首頁使用幾何入口而非舊選擇器。

## 1. 定位
MeowCare Discovery — 貓咪智慧照護互動展覽館。以線上展覽館的入口、路線與可操作展品，引導貓飼主、多貓家庭與專題訪客探索照護知識及 AI 技術。當前規範取代先前 Lab. 貼紙風格；保留 V2 的完整知識與互動，不回復文章搜尋型首頁。

## 2. 技術與交付
- HTML5、CSS3、原生 JavaScript ES modules，可使用 JSON／JS 物件。無框架、建置、後端、資料庫、LLM API、金鑰或外部執行期依賴。
- 所有內部連結、模組與素材使用相對路徑，支援 GitHub Pages 專案子路徑。
- UTF-8、zh-Hant-TW、語意化 HTML。本機以任何標準 HTTP 靜態伺服器預覽；不依賴 Live Server 注入程式、WebSocket 或專屬功能，不使用 file:// 作為執行要求。
- 使用者已授權將 V4 提交並推送至 https://github.com/BoYang-BY/meowcare-discovery.git 的 main 分支；不得強制推送或刪除專案檔案。GitHub Pages 使用 main / (root)，根目錄保留 index.html 與 .nojekyll。後續發布仍依使用者當次授權。保留重要文件、四主題所有文字、七篇舊文章及 article.html?id=<slug> URL。
- 不提交憑證、私人資料、瀏覽器設定或暫存測試產物。不將專案內容傳送至外部字型／圖片服務。

## 3. 展區命名與資訊架構
四個主要展區依序為：
1. EXHIBIT 01 — 飲水的秘密，water.html，id water。
2. EXHIBIT 02 — 貓咪的世界，environment.html，id environment。
3. EXHIBIT 03 — AI 的眼睛，technology.html，id technology。
4. EXHIBIT 04 — 健康的線索，health.html，id health。

展區顯示名稱與序號由 visuals.js 的 exhibitFor() 產生，序號依 topics 順序自動補零，不手寫第五展區編號。既有 topics.js 的 V2 標題保留為導讀問題。新展區使用唯一小寫 ASCII kebab-case id，預設走 topic.html?id=<slug>。名稱簡潔、能表達探索問題，避免廣告式功效宣稱。

## 4. 檔案與共用責任
```
index.html                    已確認的中央觀察站、幾何展區入口、故事與 AI 預覽
water.html / environment.html / technology.html / health.html
                              共用展區模板的四個靜態入口殼
topic.html                    未來展區共用入口
article.html                  保留舊文章 URL
assets/css/styles.css         匯入原型基礎、正式語意tokens、展區與互動規則
assets/js/topics.js           V2 完整知識資料及未來新增展區
assets/js/content.js          原七篇延伸文章
assets/js/visuals.js           exhibitFor、展區色彩／名稱、原創向量圖示
assets/js/topic.js            共用展區模板，多種內容版型
assets/js/site.js             共用品牌、導覽、行動選單與頁尾
assets/js/app.js              正式首頁啟動、幾何入口、觀察故事與精簡 AI 預覽
assets/js/interactions.js     可重用展品註冊表與狀態邏輯
assets/js/animations.js        Reveal 與減少動態設定
assets/js/dom.js               安全 DOM、圖像與來源工具
assets/js/article.js           舊文章相容頁
assets/images/                合法本機照片、原創品牌圖形與來源紀錄
assets/fonts/                 歷史字型與授權，當前使用系統字體
tests/verify.html             瀏覽器驗收入口
tests/browser-check.js         內容、連結、展品、版面與第五展區測試
AGENTS.md / PROJECT_SPEC.md / README.md
```
不得為每個展區複製整套頁面／導覽／互動。四入口殼以 body data-topic 指定資料，共用 topic.js；新展區優先不增加 HTML。

## 5. Discovery 設計系統
- 風格：互動式數位展覽館 × 活潑現代編輯式排版 × 科技科普。照片、視覺觀測框、展區序號、路線、資訊圖表及有節奏的內容層次建立品牌。
- 禁止點點底紋、膠帶、便條紙、貼紙傾斜、幼稚卡通、大片深綠底與大量重複左右雙欄。舊吉祥物素材保留歷史但不在當前網站引用。
- :root 共用 tokens：--ink #193E35、--mint #E1EDF0、--aqua #BBDDEB、--apricot #F3C3A3、--lavender #CDC4EA、--leaf #C6E5A7。深青綠用於文字、焦點與小型控制；各展區以淺色主題區分。
- 字體使用支援繁中的系統無襯線與明確備援，無遠端字體需求。桌面 Hero 72–96px、展區 Hero 52–72px、章節40–56px、展品標題24–30px、正文18–20px、導覽16–18px；手機 Hero40–48px、展區40–48px、正文至少18px。重要提醒與來源至少16px。
- 正文行長約30–36個中文字，段落不壓縮為摘要。控制留白，使用 lead／gallery／wide 三種章節排列，不能每節都只是標題左、內文右。
- 首頁以已確認的中央觀察站、不等尺寸幾何入口、捲動故事與互動展品為核心，不使用一般卡片網格主導。
- 共用元件：exhibit-sign、exhibit-door、observation-station、exhibit-installation、chapter-index、exhibit-panel、takeaway-list、next-exhibit。沿用 tokens，不為第五展區重設全站 CSS。
- 圖片本機存放，提供 alt、尺寸、非 Hero lazy loading；來源與授權保留 CREDITS.md。裝飾向量 aria-hidden、不攔截操作，不使用假網址。

## 6. 標準化展區資料
保留 topics.js 既有 schema；必要欄位如下，內容一律純文字：
```
{
 id, navTitle, title, englishTitle, eyebrow, intro, href, updatedAt,
 image: { src, alt },
 sections: [{ id, kicker, title, paragraphs: [], points: [] }],
 interaction: { type, title, description, disclaimer },
 scenario: { title, paragraphs: [] }, takeaways: [], cautions: [],
 sources: [{ title, url }], relatedArticles: [], nextTopic,
 exhibit: { name, tone, symbol } // 選填，新展區建議填寫
}
```
- sections 至少三節且每節有完整非空段落；介紹、可操作展品、實際情境、至少三點重點、注意事項、相關來源與下一展區不可省略。
- id 與章節 id 唯一；updatedAt 為實際編輯 ISO 日期。sources 是已查證相關 HTTPS 來源。relatedArticles 指向 content.js 有效 slug；nextTopic 指向有效展區。
- exhibit.name 是顯示名稱；tone 為 aqua/apricot/lavender/leaf；symbol 為 drop/home/scan/chart。省略時使用原主題名稱、自動序號及主題色輪替，仍須有有效入口。
- interaction.type 必須對應 resource-map／space-explorer／ai-pipeline／trend-chart 註冊模組。未支援類型須顯示可讀錯誤；新增互動先說明最小資料及 UI 變更。
- 使用 textContent／安全 DOM API 渲染；不得插入 raw HTML。原文章資料格式及四個舊分類保持不變。

## 7. 展品與內容界線
- 飲水：集中／分散配置可以操作，文字說明不把配置等同健康結果。
- 環境：有情境切換及空間熱點，保留原觀察提示；情境為教學安排，不宣稱行為診斷。
- AI：YOLOv8n偵測、PetFace身分、手動ROI與持續時間、候選事件及歷史呈現。提供步驟、掃描及條件回饋；無攝影機、上傳或真實模型推論。
- 健康：可切換貓咪與區間，圖表、摘要及逐日資料表一致；日期、貓名及數字明確標為示範資料。次數不等於毫升或健康評分。
- 不捏造準確率、FPS、訓練資料、監測成果、醫療數值或處方。區分使用者提供的專題架構、原研究能力與網站模擬。
- PetFace 為動物個體辨識研究與基準，原資料／程式／模型具研究用途限制，網站不分發模型。身分未知、遮擋與誤判需保留覆核空間。
- 照護內容附可查證來源；令人擔憂的症狀請獸醫評估。新健康主張需先查證，未確認則明確 TODO。
- 外部來源 target=_blank，rel=noopener noreferrer。

## 8. 動畫、無障礙與效能
- Hero入場、Scroll Reveal、展區入口Hover、觀察點視覺轉場、AI掃描與展品狀態變化服務內容理解。不捲動劫持、不自動輪播或無限裝飾動畫。
- 主要使用 transform/opacity，掃描與切換為短時有限動畫；離屏不浪費動畫資源。
- prefers-reduced-motion 與設定變更：停用入場、Reveal遮蔽、Hover移動、掃描與動態轉場，但狀態、文字與所有功能可用。
- 原生button/input/select，鍵盤、label、aria-pressed、aria-expanded、即時狀態完整。展區入口與觀察點不只靠Hover，情境有文字替代；圖表有資料表。
- 320px無水平溢出，控制可換行。焦點清楚，文字與淺色底足夠對比。JS初始化失敗時不得把已存在正文永久隱藏。

## 9. 新增第五展區流程
1. 閱讀本文件、PROJECT_SPEC、topics.js、topic.js、visuals.js及展品註冊表，檢查slug／內容重疊。
2. 查證來源，準備完整介紹、至少三節、展品、情境、重點、提醒與延伸探索。
3. topics新增一筆完整物件，href設topic.html?id=<slug>；選填exhibit名稱／主題色。序號、導覽、首頁幾何入口與頁尾自動延伸，不能另寫第五展區專用模板。
4. 選用符合內容的既有展品；需要新模組時先描述最小變更，沿用安全DOM、tokens、鍵盤與模擬提示。
5. 測試新展區、首頁與導覽入口、互動、無效ID、320px／桌面、來源及專案子路徑；跑tests/verify.html，新增必要展品分支測試。
6. README記錄新增檔案、來源、實測及未驗證項目。保留原展區、文章、文件與正常行為。

## 10. 驗收
五個主要頁面、四種展品、全文與來源、所有導覽、狀態分支、動畫／reduced motion、鍵盤、手機、JS錯誤、GitHub Pages子路徑及第五展區延伸均需檢查。README區分真實執行與未測項目；不宣稱未執行的Safari／實機／螢幕閱讀器、醫療審稿、真實模型或公開部署已通過。
