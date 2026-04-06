import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js';
import { getFirestore, collection, addDoc, onSnapshot, query, orderBy, updateDoc, deleteDoc, doc, Timestamp } from 'https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js';
import { firebaseConfig } from './firebase-config.js';
import { trips, getCurrentTripId } from './data/config.js';

// --- INITIALIZE FIREBASE ---
let db;
try {
    const app = initializeApp(firebaseConfig);
    db = getFirestore(app);
} catch (e) {
    console.error("Firebase Initialization Failed", e);
}

// --- GLOBALS ---
let currentDay = 1;
let itineraryItems = [];
const tripId = getCurrentTripId();
const currentTrip = trips.find(t => t.id === tripId) || trips[0];

const getItineraryPath = () => `${tripId}_itineraries`;

// --- ITINERARY CRUD LOGIC ---

async function fetchItinerary() {
    if (!db) return;
    const q = query(collection(db, getItineraryPath()));

    onSnapshot(q, (snapshot) => {
        itineraryItems = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        renderItinerary();
        hideLoading();
    }, (err) => {
        console.error("Fetch itinerary failed", err);
        hideLoading();
    });
}

window.openItineraryModal = function (eventId = null) {
    const modal = document.getElementById('itinerary-modal');
    const content = document.getElementById('itinerary-modal-content');
    const form = document.getElementById('itinerary-form');
    const title = document.getElementById('itinerary-modal-title');
    const delBtn = document.getElementById('event-delete-btn');

    form.reset();
    document.getElementById('event-id').value = '';
    
    if (eventId) {
        const item = itineraryItems.find(i => i.id === eventId);
        if (item) {
            title.innerText = "編輯行程內容";
            document.getElementById('event-id').value = item.id;
            document.getElementById('event-time').value = item.time;
            document.getElementById('event-text').value = item.text;
            document.getElementById('event-stay').value = item.stay || '';
            document.getElementById('event-type').value = item.type || 'normal';
            document.getElementById('event-highlight').checked = item.highlight || false;
            delBtn.classList.remove('hidden');
        }
    } else {
        title.innerText = "新增行程項目";
        delBtn.classList.add('hidden');
        // 預設目前選取的天數
    }

    modal.classList.remove('hidden');
    setTimeout(() => content.classList.remove('translate-y-full'), 10);
};

window.closeItineraryModal = function () {
    const modal = document.getElementById('itinerary-modal');
    const content = document.getElementById('itinerary-modal-content');
    content.classList.add('translate-y-full');
    setTimeout(() => modal.classList.add('hidden'), 300);
};

async function handleItinerarySubmit(e) {
    e.preventDefault();
    if (!db) return;

    const id = document.getElementById('event-id').value;
    const data = {
        day: currentDay,
        time: document.getElementById('event-time').value,
        text: document.getElementById('event-text').value,
        stay: document.getElementById('event-stay').value,
        type: document.getElementById('event-type').value,
        highlight: document.getElementById('event-highlight').checked,
        updatedAt: Timestamp.now()
    };

    try {
        if (id) {
            await updateDoc(doc(db, getItineraryPath(), id), data);
        } else {
            data.createdAt = Timestamp.now();
            await addDoc(collection(db, getItineraryPath()), data);
        }
        window.closeItineraryModal();
    } catch (err) {
        console.error("Save itinerary failed", err);
        alert("儲存失敗，請檢查網路或 Firebase 設定。");
    }
}

window.deleteItineraryItem = async function () {
    const id = document.getElementById('event-id').value;
    if (!id || !confirm("確定要刪除這項行程嗎？")) return;

    try {
        await deleteDoc(doc(db, getItineraryPath(), id));
        window.closeItineraryModal();
    } catch (err) {
        console.error("Delete failed", err);
    }
};

// --- UTILS ---
function hideLoading() {
    const loading = document.getElementById('loading-overlay');
    if (loading) {
        loading.classList.add('hidden');
    }
}

// --- UI LOGIC ---

function switchDay(day) {
    currentDay = day;
    const label = document.getElementById('current-day-label');
    if (label) label.innerText = day;
    
    document.querySelectorAll('.day-btn').forEach((btn, idx) => {
        btn.classList.toggle('active-day', idx + 1 === day);
    });
    renderItinerary();
}
window.switchDay = switchDay;

function renderItinerary() {
    const container = document.getElementById('itinerary-container');
    if (!container) return;
    
    // 過濾出當天的行程並按時間排序
    const dayItems = itineraryItems
        .filter(item => item.day === currentDay)
        .sort((a, b) => a.time.localeCompare(b.time));

    if (dayItems.length === 0) {
        container.innerHTML = `
            <div class="glass-card p-10 rounded-[2.5rem] text-center text-slate-400">
                <i class="fas fa-map-marker-alt text-4xl mb-4 opacity-20"></i>
                <p class="font-bold">今日尚無行程紀錄<br>可以點右上角按鈕新增喔！</p>
            </div>
        `;
        return;
    }

    container.innerHTML = dayItems.map(item => {
        const dotClass = item.highlight ? 'bg-amber-500 ring-4 ring-amber-100' : (item.type === 'food' ? 'bg-emerald-500' : 'bg-sky-500');
        
        return `
            <div class="relative pl-12 timeline-line pb-6 group">
                <div class="absolute left-0 top-1 w-10 h-10 flex items-center justify-center">
                    <div class="w-4 h-4 rounded-full ${dotClass} z-10"></div>
                </div>
                <div class="glass-card p-5 rounded-3xl transition-all active:scale-[0.98] relative">
                    <div class="flex justify-between items-start mb-2">
                        <span class="font-bold text-slate-400 tracking-wider font-mono">${item.time}</span>
                        <div class="flex items-center gap-2">
                            ${item.stay ? `<span class="text-[12px] bg-sky-50 px-3 py-1 rounded-full text-sky-600 font-bold"> ${item.stay}</span>` : ''}
                            <button onclick="openItineraryModal('${item.id}')" class="edit-btn w-8 h-8 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center hover:bg-sky-100 hover:text-sky-600 transition-all">
                                <i class="fas fa-pen text-[10px]"></i>
                            </button>
                        </div>
                    </div>
                    <h4 class="font-bold text-slate-800 text-xl mb-3">${item.text}</h4>
                    <div class="flex gap-3">
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
            </div>
        `;
    }).join('');

    // 更新飯店資訊
    const hotelEl = document.getElementById('hotel-name');
    if (hotelEl) {
        const hotelItem = dayItems.find(i => i.type === 'hotel');
        hotelEl.innerText = hotelItem ? hotelItem.text.replace('飯店放行李-', '').replace('今晚住宿：', '') : "尚未決定住宿";
    }
}

window.openMap = (query) => window.open(`https://www.google.com/maps/search/${encodeURIComponent(query)}`, '_blank');
window.openBlog = (query) => window.open(`https://www.google.com/search?q=${encodeURIComponent(query + ' 食記')}`, '_blank');

// --- INIT ---
window.addEventListener('load', () => {
    if (document.getElementById('itinerary-container')) {
        fetchItinerary();
        document.getElementById('btn-add-event')?.addEventListener('click', () => window.openItineraryModal());
        document.getElementById('itinerary-form')?.addEventListener('submit', handleItinerarySubmit);
        
        const startDate = new Date(currentTrip.startDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        startDate.setHours(0, 0, 0, 0);
        let day = Math.floor((today - startDate) / (1000 * 60 * 60 * 24)) + 1;
        if (day < 1 || day > 7) day = 1;
        switchDay(day);
    }
});
