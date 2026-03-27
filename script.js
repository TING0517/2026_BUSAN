// --- DATA ---
const itinerary = {
    1: [
        { time: "08:00", text: "飯店放行李-Toyoko Inn 釜山海雲臺", stay: "15分", type: "hotel" },
        { time: "08:20", text: "早餐-密陽血腸豬肉湯飯 海雲台店", stay: "1小時", type: "food" },
        { time: "09:25", text: "換錢-MONEYBOX HAEUNDAE", stay: "15分" },
        { time: "09:40", text: "海雲台海灘", stay: "20分" },
        { time: "10:30", text: "午餐、休息-CLUB D OASIS汗蒸幕", stay: "3小時", type: "food" },
        { time: "14:00", text: "海岸列車 (至松亭)", stay: "0分", highlight: true },
        { time: "14:30", text: "松亭海水浴場", stay: "1.5小時" },
        { time: "17:50", text: "膠囊列車 (至尾浦)", stay: "30分", highlight: true },
        { time: "20:00", text: "晚餐-味贊王鹽烤肉", stay: "1.5小時", type: "food" }
    ],
    2: [
        { time: "08:45", text: "海東龍宮寺", stay: "1.5小時" },
        { time: "10:30", text: "釜山樂天世界冒險樂園", stay: "3.5小時" },
        { time: "14:00", text: "午餐-螞蟻家辣炒章魚", type: "food" },
        { time: "16:30", text: "鑽石灣遊艇碼頭", highlight: true },
        { time: "18:00", text: "晚餐、休息-SPA LAND 汗蒸幕", stay: "4小時" }
    ],
    3: [
        { time: "10:00", text: "松島纜車、龍宮雲橋", stay: "2.5小時" },
        { time: "13:30", text: "午餐-國際炸雞", type: "food" },
        { time: "13:30", text: "國際市場巡禮", stay: "2小時" },
        { time: "15:50", text: "白淺灘文化村", stay: "2小時" },
        { time: "18:30", text: "晚餐-Lee Jae Mo Pizza", type: "food" },
        { time: "20:50", text: "樂天超市 光慶店", stay: "1小時" }
    ],
    4: [
        { time: "09:00", text: "甘川洞文化村", stay: "3小時" },
        { time: "12:20", text: "午餐-南浦雪農湯", type: "food" },
        { time: "13:20", text: "札嘎其市場 & BIFF 廣場" },
        { time: "16:00", text: "南川洞櫻花路", highlight: true },
        { time: "16:01", text: "廣安里海水浴場", stay: "3小時" },
        { time: "19:30", text: "晚餐-明倫進士烤肉", type: "food" }
    ],
    5: [
        { time: "09:00", text: "釜山至鎮海", highlight: true },
        { time: "10:30", text: "慶和站公園 (櫻花鐵道)", stay: "1.5小時" },
        { time: "12:30", text: "余佐川櫻花徑", stay: "4小時" },
        { time: "18:00", text: "西面巡禮 & 匠人鐵板雞", type: "food" }
    ],
    6: [
        { time: "09:00", text: "太宗台", stay: "3小時" },
        { time: "12:40", text: "午餐-影島海女村", type: "food" },
        { time: "14:25", text: "東山海水川櫻花路" },
        { time: "15:40", text: "下午茶-P.ARK", type: "food" },
        { time: "19:25", text: "搭 SRT / KTX 至東大邱", highlight: true }
    ],
    7: [
        { time: "09:30", text: "大邱近代胡同 (青蘿丘等)" },
        { time: "11:20", text: "午餐-巨松燉排骨", type: "food" },
        { time: "12:45", text: "藥令市韓醫藥博物館" },
        { time: "13:55", text: "下午茶-星巴克鐘路古宅店" },
        { time: "15:45", text: "西門市場 (買棉被)", highlight: true },
        { time: "20:10", text: "抵達大邱國際機場" }
    ]
};

const hotels = {
    1: "東橫inn釜山海雲台2", 2: "東橫inn釜山海雲台2",
    3: "東橫inn釜山中央店", 4: "東橫inn釜山中央店", 5: "東橫inn釜山中央店",
    6: "大邱水晶飯店", 7: "回溫暖的家 ✈️"
};

const guides = [
    { title: "海東龍宮寺", desc: "座落於海邊的壯麗寺廟，可盡覽海天一色的美景。", tag: "Heritage", icon: "fa-dharmachakra" },
    { title: "釜山樂天世界", desc: "2022年全新開幕，擁有刺激遊樂設施與夢幻巡遊。", tag: "Park", icon: "fa-fort-awesome" },
    { title: "鑽石灣遊艇", desc: "從海上遠眺廣安大橋夜景，最極致的浪漫體驗。", tag: "Ocean", icon: "fa-ship" },
    { title: "Spa Land", desc: "新世界百貨內五星級汗蒸幕，享受高級SPA放鬆。", tag: "Relax", icon: "fa-bath" },
    { title: "白淺灘文化村", desc: "影島上的藍白色小路，被稱為釜山的聖托里尼。", tag: "Photo", icon: "fa-camera-retro" },
    { title: "鎮海櫻花", desc: "慶和火車站與餘佐川，韓國最壯觀的櫻花隧道。", tag: "Season", icon: "fa-leaf" },
    { title: "大邱近代胡同", desc: "穿越時光的紅磚建築與青蘿坡，感受歷史脈動。", tag: "History", icon: "fa-landmark" }
];

// --- CORE LOGIC ---
let currentDay = 1;
const FX_RATE = 46;

function showPage(pageId) {
    document.querySelectorAll('.tab-page').forEach(p => p.classList.add('hidden'));
    const targetPage = document.getElementById(`page-${pageId}`);
    if (targetPage) {
        targetPage.classList.remove('hidden');
        targetPage.classList.add('fade-in');
    }

    document.querySelectorAll('.nav-btn').forEach(b => {
        b.classList.remove('nav-active');
        b.classList.add('text-slate-400');
    });
    
    // Find button that triggered the event or matches pageId
    const btn = Array.from(document.querySelectorAll('.nav-btn')).find(b => b.getAttribute('onclick')?.includes(pageId));
    if (btn) {
        btn.classList.add('nav-active');
        btn.classList.remove('text-slate-400');
    }
    
    window.scrollTo(0, 0);
}

function switchDay(day) {
    currentDay = day;
    document.getElementById('current-day-label').innerText = day;
    document.querySelectorAll('.day-btn').forEach((btn, idx) => {
        btn.classList.toggle('active-day', idx + 1 === day);
    });
    renderItinerary();
}

function renderItinerary() {
    const container = document.getElementById('itinerary-container');
    if (!container) return;
    container.innerHTML = '';

    itinerary[currentDay].forEach(item => {
        const div = document.createElement('div');
        div.className = `relative pl-12 timeline-line pb-6`;

        const dotClass = item.highlight ? 'bg-amber-500 ring-4 ring-amber-100' : (item.type === 'food' ? 'bg-emerald-500' : 'bg-sky-500');

        div.innerHTML = `
            <div class="absolute left-0 top-1 w-10 h-10 flex items-center justify-center">
                <div class="w-4 h-4 rounded-full ${dotClass} z-10"></div>
            </div>
            <div class="glass-card p-5 rounded-3xl transition-all active:scale-95">
                <div class="flex justify-between items-start mb-2">
                    <span class="text-sm font-bold text-slate-400 tracking-wider font-mono">${item.time}</span>
                    ${item.stay ? `<span class="text-[12px] bg-sky-50 px-3 py-1 rounded-full text-sky-600 font-bold">待 ${item.stay}</span>` : ''}
                </div>
                <h4 class="font-bold text-slate-800 text-xl">${item.text}</h4>
                <div class="flex gap-3 mt-4">
                    <button onclick="openMap('${item.text}')" class="text-xs font-bold text-sky-600 bg-sky-50 px-4 py-2 rounded-xl">
                        <i class="fas fa-map-marker-alt mr-1"></i> 地圖
                    </button>
                    ${item.type === 'food' ? `
                        <button onclick="openBlog('${item.text}')" class="text-xs font-bold text-emerald-600 bg-emerald-50 px-4 py-2 rounded-xl">
                            <i class="fas fa-utensils mr-1"></i> 食記
                        </button>
                    ` : ''}
                </div>
            </div>
        `;
        container.appendChild(div);
    });
    document.getElementById('hotel-name').innerText = hotels[currentDay];
}

function renderGuides() {
    const container = document.getElementById('guide-container');
    if (!container) return;
    container.innerHTML = guides.map(g => `
        <div class="glass-card rounded-[2.5rem] p-6 shadow-sm relative overflow-hidden group">
            <div class="absolute top-0 right-0 w-24 h-24 bg-sky-50 rounded-bl-full flex items-center justify-center -translate-y-4 translate-x-4">
                <i class="fas ${g.icon} text-sky-200 text-2xl"></i>
            </div>
            <span class="text-[12px] font-extrabold text-sky-500 uppercase tracking-[0.2em] mb-2 block">${g.tag}</span>
            <h3 class="text-2xl font-bold text-slate-800 mb-2">${g.title}</h3>
            <p class="text-base text-slate-500 leading-loose">${g.desc}</p>
        </div>
    `).join('') + `<div class="h-10"></div>`; // 額外底部空間
}

function openMap(query) { window.open(`https://www.google.com/maps/search/${encodeURIComponent(query)}`, '_blank'); }
function openBlog(query) { window.open(`https://www.google.com/search?q=${encodeURIComponent(query + ' 食記')}`, '_blank'); }

// --- CALCULATOR LOGIC ---
function appendCalc(val) {
    const input = document.getElementById('calc-input');
    input.value += val;
    handleCalcInput();
}

function clearCalc() {
    document.getElementById('calc-input').value = '';
    updateTwdResult(0);
}

function handleCalcInput() {
    const input = document.getElementById('calc-input').value;
    const equalBtn = document.getElementById('calc-equal-btn');
    
    // 檢查是否有運算符號
    if (/[+\-*/]/.test(input)) {
        if (equalBtn) equalBtn.classList.remove('hidden');
    } else {
        if (equalBtn) equalBtn.classList.add('hidden');
        const val = parseFloat(input);
        if (!isNaN(val)) updateTwdResult(val);
        else if (input === '') updateTwdResult(0);
    }
}

function performManualCalc() {
    const input = document.getElementById('calc-input').value;
    try {
        // 使用更安全的計算方式或簡單評估
        const result = Function('"use strict";return (' + input + ')')();
        document.getElementById('calc-input').value = result;
        const equalBtn = document.getElementById('calc-equal-btn');
        if (equalBtn) equalBtn.classList.add('hidden');
        updateTwdResult(result);
    } catch (e) {
        alert("運算格式不正確哦");
    }
}

function updateTwdResult(krw) {
    const twd = Math.round(krw / FX_RATE);
    document.getElementById('res-twd').innerText = twd.toLocaleString();
}

function resetCalculator() {
    document.getElementById('calc-input').value = '';
    document.getElementById('res-twd').innerText = '0';
    document.getElementById('calc-equal-btn').classList.add('hidden');
}

// --- WEATHER LOGIC ---
async function fetchWeather() {
    const cities = [
        { name: 'Busan', displayName: '釜山', id: 'weather-busan' },
        { name: 'Daegu', displayName: '大邱', id: 'weather-daegu' }
    ];

    for (const city of cities) {
        try {
            // 使用 AllOrigins 代理繞過本地 CORS 限制
            const targetUrl = encodeURIComponent(`https://wttr.in/${city.name}?format=j1&lang=zh-tw`);
            const proxyUrl = `https://api.allorigins.win/raw?url=${targetUrl}`;
            
            const res = await fetch(proxyUrl);
            if (!res.ok) throw new Error('Fetch failed');
            const data = await res.json();
            
            const current = data.current_condition[0];
            const today = data.weather[0];
            const obsTime = current.observation_time;
            const observationDate = data.current_condition[0].localObsDateTime;

            // Update UI for current weather
            const container = document.getElementById(city.id);
            if (!container) continue;

            // Get chance of rain (average or midday peak)
            const rainChance = today.hourly[4]?.chanceofrain || today.hourly[0].chanceofrain;

            let html = `
                <div class="mb-6">
                    <div class="flex items-center justify-between mb-4 text-white">
                        <span class="text-4xl font-extrabold">${current.temp_C}°C</span>
                        <div class="text-right">
                             <span class="block text-sm font-bold opacity-90">${current.weatherDesc[0].value}</span>
                             <span class="block text-[12px] opacity-75">降雨機率 ${rainChance}%</span>
                        </div>
                    </div>
                    <div class="text-[10px] text-white/60 mb-8">觀測時間：${observationDate}</div>
                </div>

                <div class="space-y-4 pt-4 border-t border-white/20">
                    <span class="block text-[10px] font-bold text-white/50 uppercase tracking-widest mb-3">3 日詳細預報</span>
            `;

            // 3-day forecast
            data.weather.slice(0, 3).forEach(day => {
                const dateParts = day.date.split('-');
                const monthDay = `${dateParts[1]}/${dateParts[2]}`;
                const dayRain = day.hourly[4]?.chanceofrain || day.hourly[0].chanceofrain;
                
                html += `
                    <div class="flex items-center justify-between text-white py-2">
                        <span class="text-sm font-bold w-12">${monthDay}</span>
                        <div class="flex items-center gap-2 flex-1 justify-center">
                            <i class="fas ${getWeatherIcon(day.hourly[4]?.weatherDesc[0].value)} text-sm opacity-80"></i>
                            <span class="text-xs opacity-80">${day.hourly[4]?.weatherCode ? day.hourly[4].weatherDesc[0].value : '晴'}</span>
                        </div>
                        <div class="text-sm font-bold text-right w-24">
                            <span>${day.mintempC}°</span> / <span>${day.maxtempC}°</span>
                            <span class="text-[9px] block opacity-60 font-normal">☔ ${dayRain}%</span>
                        </div>
                    </div>
                `;
            });

            html += `</div>`;
            container.innerHTML = html;

        } catch (e) {
            console.error(`Fetch weather for ${city.name} failed`, e);
            document.getElementById(city.id).innerHTML = `
                <div class="text-white p-4 text-center">
                    <i class="fas fa-exclamation-triangle mb-2 opacity-50"></i>
                    <p class="text-xs opacity-70">數據暫時無法更新</p>
                    <button onclick="fetchWeather()" class="mt-4 text-[10px] bg-white/20 px-3 py-1 rounded-full">重試</button>
                </div>
            `;
        }
    }
}

function getWeatherIcon(desc) {
    if (!desc) return 'fa-sun';
    const d = desc.toLowerCase();
    if (d.includes('rain')) return 'fa-cloud-showers-heavy';
    if (d.includes('cloud')) return 'fa-cloud';
    if (d.includes('clear') || d.includes('sun')) return 'fa-sun';
    if (d.includes('snow')) return 'fa-snowflake';
    return 'fa-cloud-sun';
}

// --- INIT ---
window.onload = () => {
    renderItinerary();
    renderGuides();
    fetchWeather();
    switchDay(1);
};
