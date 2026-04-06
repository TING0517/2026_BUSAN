// --- WEATHER LOGIC ---
async function fetchWeather() {
    const cities = [
        { name: 'Busan', displayName: '釜山', id: 'weather-busan', lat: 35.1796, lng: 129.0756 },
        { name: 'Daegu', displayName: '大邱', id: 'weather-daegu', lat: 35.8714, lng: 128.6014 }
    ];

    for (const city of cities) {
        try {
            const url = `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lng}&current_weather=true&daily=precipitation_probability_max&hourly=temperature_2m,precipitation_probability,weathercode&timezone=auto&forecast_days=3`;
            const res = await fetch(url);
            const data = await res.json();
            renderWeatherUI(city.id, data);
        } catch (e) {
            console.error(`Weather for ${city.name} failed`, e);
        }
    }
}

function renderWeatherUI(containerId, data) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const current = data.current_weather;
    const daily = data.daily;
    const hourly = data.hourly;
    const temp = Math.round(current.temperature);
    const weatherDesc = getWmoWeatherDesc(current.weathercode);
    const rainChance = daily.precipitation_probability_max[0] || 0;
    const obsTime = new Date().toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit' });

    let html = `
        <div class="mb-8">
            <div class="flex items-center justify-between mb-4 text-white gap-8">
                <span class="text-6xl font-black tracking-tighter shrink-0">${temp}<sup class="text-3xl ml-1">° C</sup></span>
                <div class="text-right min-w-0">
                     <span class="block text-xl font-bold mb-1">${weatherDesc}</span>
                     <span class="block text-sm font-medium opacity-90">今日降雨機率 ${rainChance}%</span>
                </div>
            </div>
            <div class="text-[12px] text-white/60 mb-2 font-medium">觀測時間：今天 ${obsTime}</div>
        </div>
        <div class="pt-6 border-t border-white/20">
            <div class="flex items-center justify-between mb-4">
                <span class="text-xs font-black text-white/50 uppercase tracking-[0.2em]">未來預報</span>
                <span class="text-[10px] text-white/40"><i class="fas fa-arrows-left-right mr-1"></i> 左右滑動</span>
            </div>
            <div class="flex overflow-x-auto gap-4 pb-4 hide-scrollbar -mx-2 px-2 w-full">
    `;

    const now = new Date();
    for (let i = 0; i < hourly.time.length; i++) {
        const timeObj = new Date(hourly.time[i]);
        if (timeObj < new Date(now.getTime() - 60 * 60 * 1000)) continue;

        const hour = timeObj.getHours();
        const displayTime = hour === 0 ? `<span class="text-sky-300">${timeObj.getMonth() + 1}/${timeObj.getDate()}</span>` : `${hour}:00`;

        html += `
            <div class="flex-shrink-0 flex flex-col items-center bg-white/10 backdrop-blur-md rounded-2xl py-4 px-3 min-w-[70px] border border-white/5">
                <span class="text-[11px] font-bold text-white/70 mb-2">${displayTime}</span>
                <i class="fas ${getWeatherIcon(hourly.weathercode[i])} text-lg text-white mb-2"></i>
                <span class="text-base font-black text-white mb-1">${Math.round(hourly.temperature_2m[i])}°</span>
                <div class="flex items-center gap-0.5 text-[10px] text-sky-200 font-bold">
                    <i class="fas fa-droplet scale-75"></i> ${hourly.precipitation_probability[i]}%
                </div>
            </div>
        `;
    }

    html += `</div></div>`;
    container.innerHTML = html;
}

function getWmoWeatherDesc(code) {
    const mapping = { 0: '晴朗', 1: '晴時多雲', 2: '多雲', 3: '陰天', 45: '霧', 48: '霧', 51: '毛毛雨', 53: '毛毛雨', 55: '毛毛雨', 61: '小雨', 63: '雨', 65: '大雨', 80: '陣雨', 81: '陣雨', 82: '強陣雨', 95: '雷雨' };
    return mapping[code] || '未知';
}

function getWeatherIcon(code) {
    if ([0, 1].includes(code)) return 'fa-sun';
    if ([2, 3].includes(code)) return 'fa-cloud-sun';
    if ([45, 48].includes(code)) return 'fa-smog';
    if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return 'fa-cloud-showers-heavy';
    return 'fa-cloud';
}

// --- INIT ---
window.addEventListener('load', () => {
    if (document.getElementById('weather-busan')) fetchWeather();
});
