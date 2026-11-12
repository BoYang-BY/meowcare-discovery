export const categories = {
  water: '飲水照護',
  nutrition: '飲食營養',
  environment: '環境管理',
  health: '健康觀察',
};

const hydration = { title: 'Cornell Feline Health Center — Hydration', url: 'https://www.vet.cornell.edu/departments-centers-and-institutes/cornell-feline-health-center/health-information/feline-health-topics/hydration' };
const environment = { title: 'AAFP／ISFM — Feline Environmental Needs Guidelines', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11383066/' };
const feeding = { title: 'Cornell Feline Health Center — Feeding Your Cat', url: 'https://www.vet.cornell.edu/departments-centers-and-institutes/cornell-feline-health-center/health-information/feline-health-topics/feeding-your-cat' };
const illness = { title: 'VCA Animal Hospitals — Recognizing the Signs of Illness in Cats', url: 'https://vcahospitals.com/westcreek/know-your-pet/recognizing-signs-of-illness-in-cats' };
const thirst = { title: 'PDSA — Is my cat drinking and weeing too much?', url: 'https://www.pdsa.org.uk/pet-help-and-advice/pet-health-hub/symptoms/is-my-cat-drinking-and-weeing-too-much' };

export const articles = [
  {
    id: 'multi-cat-water-resources',
    title: '多貓家庭如何安排飲水資源？',
    category: 'water',
    summary: '水碗放得多，也要讓每隻貓都能安心靠近。從分散位置、通行動線與個別使用情況，檢查多貓家庭的飲水資源是否容易取得。',
    tags: ['多貓', '水碗', '資源分配'],
    updatedAt: '2026-11-12',
    sections: [
      { heading: '分散資源，提供選擇', paragraphs: ['AAFP／ISFM 環境指引建議將重要資源分散在不同位置。多個水碗集中在同一角落，仍可能需要經過同一隻貓才能使用；安排不同飲水位置，讓牠們有選擇。'] },
      { heading: '觀察每隻貓是否真的喝得到', paragraphs: ['你可以記下各隻貓常用的水碗，以及是否有等待、繞路或被擋住的情況。別只根據水碗總共少了多少水，就假設每隻貓都有使用。', '整理一張簡單的家庭資源位置圖，將觀察到的阻擋情況標在上面，方便逐項檢查。這是整理觀察的方法，並非評估健康的工具。'] },
      { heading: '調整後繼續觀察', paragraphs: ['Cornell 提醒，貓咪間的衝突可能影響水碗的可近性。調整位置後，持續留意原本避開水碗的貓，是否能自在接近。'] },
    ],
    cautions: ['若飲水或排尿習慣出現明顯變化，請諮詢獸醫，不要只歸因於資源競爭。'],
    sources: [environment, hydration],
  },
  {
    id: 'observe-drinking-habits',
    title: '如何觀察貓咪的飲水習慣？',
    category: 'water',
    summary: '比起只看水碗少了多少水，了解貓咪平常的習慣更有幫助。一起記錄食物、飲水與排尿的變化，讓日常觀察成為就診時的參考。',
    tags: ['飲水', '觀察', '紀錄', '濕食'],
    updatedAt: '2026-11-12',
    sections: [
      { heading: '把食物中的水分一起考慮', paragraphs: ['飲水不只來自水碗，濕食也能提供水分。因此，看見貓較少走到水碗前，並不能單獨判斷牠的水分狀態。'] },
      { heading: '建立自己的觀察筆記', paragraphs: ['可在筆記中分別記下日期、食物種類、看見的飲水行為與貓砂盆變化。若有換食或環境變動，也一併註記，方便回顧前後差異。', '共用水碗、打翻或蒸發都會讓水量紀錄難以對應到單一貓咪；不確定的部分請直接寫明，不必把估計數字當作精準攝取量。'] },
      { heading: '留意偏離平常的改變', paragraphs: ['PDSA 提醒，突然比平時更常喝水，或排尿明顯增加，應聯絡獸醫。紀錄的目的是協助描述變化，不是自行判斷疾病。'] },
    ],
    cautions: ['不要為了測量而限制飲水。若懷疑脫水或出現令人擔憂的症狀，請及時諮詢獸醫。'],
    sources: [hydration, thirst],
  },
  {
    id: 'dry-and-wet-food',
    title: '貓咪乾糧與濕食的差異',
    category: 'nutrition',
    summary: '乾糧與濕食在含水量、保存方式與使用便利性上各有差異。選擇時也要閱讀營養標示，並考慮貓咪的生命階段與個別健康需求。',
    tags: ['乾糧', '濕食', '營養', '食物保存'],
    updatedAt: '2026-11-12',
    sections: [
      { heading: '含水量與保存方式不同', paragraphs: ['濕食含有較多水分，是食物水分的來源之一；乾糧含水量較低。乾糧也有保存期限，濕食開封後未使用的部分需要冷藏，並依產品標示保存。'] },
      { heading: '先讀營養標示', paragraphs: ['Cornell 提醒，食物應符合貓咪生命階段的完整均衡營養需求。有些罐頭營養並不完整，不能只憑外觀、口味或「濕食」名稱，就認定適合作為唯一主食。'] },
      { heading: '整理問題，再討論選擇', paragraphs: ['挑選前可以列出目前食物的名稱、標示、貓咪接受情況及保存上的疑問，帶給獸醫討論。若有既有疾病或正在使用處方飲食，應先確認調整方式。'] },
    ],
    cautions: ['不要自行以一般文章取代個別營養建議；若食慾改變或有令人擔憂的症狀，請諮詢獸醫。'],
    sources: [feeding],
  },
  {
    id: 'reduce-resource-competition',
    title: '多貓家庭如何減少資源競爭？',
    category: 'environment',
    summary: '同住不代表每隻貓都願意共享所有空間。從食物、飲水到休息位置，檢查資源是否分散，並留意容易被忽略的等待、阻擋與退讓。',
    tags: ['多貓', '環境', '資源競爭', '休息空間'],
    updatedAt: '2026-11-12',
    sections: [
      { heading: '共享空間，也需要各自的選擇', paragraphs: ['AAFP／ISFM 指引將進食、飲水、如廁、抓磨、遊戲與休息列為重要環境資源。將資源分散，可讓貓咪有更多選擇，減少被迫靠近其他貓才能使用的情況。'] },
      { heading: '觀察安靜的互動', paragraphs: ['沒有打架不一定代表相處沒有壓力。你可以記下某隻貓是否經常在別隻貓離開後才去吃飯，或總在門口等待，再將觀察帶給獸醫討論。'] },
      { heading: '用位置圖整理調整方向', paragraphs: ['在家庭平面草圖上標出各項資源與常見等待位置，列出哪些地方能增加選擇。調整時保留紀錄，方便了解後續變化，而非憑單次印象下結論。'] },
    ],
    cautions: ['若出現持續衝突、躲藏、食慾或排尿變化，請諮詢獸醫，必要時尋求行為專業協助。'],
    sources: [environment],
  },
  {
    id: 'daily-health-records',
    title: '如何建立貓咪日常健康紀錄？',
    category: 'health',
    summary: '簡單且持續的紀錄，能幫助你說清楚貓咪和平常有什麼不同。整理食慾、飲水、排泄與活動變化，讓與獸醫溝通時更有條理。',
    tags: ['健康紀錄', '食慾', '活動', '就診'],
    updatedAt: '2026-11-12',
    sections: [
      { heading: '選擇容易維持的格式', paragraphs: ['紙本或手機筆記都可以。建議欄位為日期、貓咪名字、食慾、飲水、排泄、活動與其他觀察；多貓家庭分別記錄，未能確認是哪隻貓時，註明「不確定」。'] },
      { heading: '描述看見的事實', paragraphs: ['比起寫「牠生病了」，可以記下「今天剩下比平時多的食物」或「原本會跳上椅子，今天停在地面」。VCA 提醒，食慾、口渴、活動與理毛的變化都可能值得留意。', '照片或影片可作為描述的補充，但不需要為了拍攝而打擾不舒服的貓咪。'] },
      { heading: '就診前整理重點', paragraphs: ['把開始變化的時間、持續情況、目前食物與用藥資訊整理在一起。紀錄是溝通輔助，不能代替檢查，也不應為了累積更多紀錄而延後就醫。'] },
    ],
    cautions: ['若有呼吸困難、無法排尿或其他明顯不適，請立即尋求獸醫協助，不要等待紀錄完成。'],
    sources: [illness],
  },
  {
    id: 'changes-in-drinking',
    title: '發現飲水異常時該注意什麼？',
    category: 'health',
    summary: '飲水突然改變時，先整理與平常不同的地方，並留意排尿、食慾與精神。了解哪些資訊值得告訴獸醫，避免單憑飲水量自行判斷疾病。',
    tags: ['飲水異常', '排尿', '獸醫', '健康觀察'],
    updatedAt: '2026-11-12',
    sections: [
      { heading: '改變值得重視，原因需要評估', paragraphs: ['突然喝得更多或排尿增加，可能有不同原因，不能只靠水碗變空的速度判定疾病。PDSA 建議，若認為貓咪比平時喝得多，應安排獸醫評估。'] },
      { heading: '準備可以描述的資訊', paragraphs: ['整理變化開始時間、食物或用藥變動、是否有水打翻，以及食慾和排尿是否改變。無法確認飲水量時，描述觀察到的行為即可，別猜一個數字。'] },
      { heading: '出現明顯不適時及時求助', paragraphs: ['若反覆進出貓砂盆卻無法排尿，請立即尋求獸醫協助。若懷疑脫水，也應及時聯絡獸醫，不要只靠居家觀察排除問題。'] },
    ],
    cautions: ['不要限制飲水，也不要自行給藥或安排補液。令人擔憂的症狀需要獸醫評估。'],
    sources: [thirst, hydration, illness],
  },
  {
    id: 'arrange-cat-water-stations',
    title: '如何安排貓咪飲水點',
    category: 'water',
    summary: '即使家裡只有一隻貓，也可以提供不同的飲水選擇。從水碗與食物、貓砂盆的位置關係，到取用與補水是否方便，逐步檢查家中的飲水點。',
    tags: ['飲水點', '位置安排', '水碗', '單貓'],
    updatedAt: '2026-11-12',
    sections: [
      { heading: '將飲水與其他資源分開', paragraphs: ['AAFP／ISFM 指引建議，飲水、進食與如廁等資源各有位置，食物與飲水也應分開安排。這個原則同樣適用於單貓家庭，讓貓咪能選擇不同位置。'] },
      { heading: '確認能輕鬆接近，也方便照料', paragraphs: ['Cornell 建議持續提供容易取得的新鮮飲水。檢查水碗前是否堆著物品、通道是否會被關上的門擋住，並選擇自己方便查看及補水的位置。', '可用一張簡單清單，分別列出各飲水點的位置、通行狀況與補水情況，避免只記得最常看見的那一碗。這是居家整理方法，不是健康評估標準。'] },
      { heading: '依個別偏好觀察使用情況', paragraphs: ['飲水器並非每隻貓都偏好。若想增加不同容器的選擇，可記下貓咪實際使用的情況；不必因為換了設備，就假設牠一定喝得更多。'] },
    ],
    cautions: ['飲水點安排不能用來排除健康問題。若飲水或排尿出現明顯變化，或有令人擔憂的症狀，請諮詢獸醫；不要為了測試位置偏好而限制飲水。'],
    sources: [environment, hydration],
  },
];
