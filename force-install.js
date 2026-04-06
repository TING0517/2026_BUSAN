// 檢查是否以獨立模式 (PWA 安裝後) 執行
const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;

// 允許本機開發或透過參數 bypass (如 ?dev=1)
const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.protocol === 'file:';
const isDev = new URLSearchParams(window.location.search).has('dev');

if (!isStandalone && !isLocalhost && !isDev) {
    // 若不是 standalone，且非開發環境，強制顯示安裝提示
    document.addEventListener('DOMContentLoaded', () => {
        // 清空原本內容，防止被操作
        document.body.innerHTML = '';
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.width = '100vw';
        document.body.style.height = '100vh';
        document.body.style.margin = '0';
        document.body.style.background = 'linear-gradient(135deg, #03045E 0%, #0077B6 50%, #00B4D8 100%)';
        
        const overlay = document.createElement('div');
        overlay.style.position = 'absolute';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.display = 'flex';
        overlay.style.flexDirection = 'column';
        overlay.style.alignItems = 'center';
        overlay.style.justifyContent = 'center';
        overlay.style.padding = '2rem';
        overlay.style.textAlign = 'center';
        overlay.style.color = '#fff';
        overlay.style.zIndex = '9999999';
        overlay.style.fontFamily = "'Noto Sans TC', sans-serif";

        overlay.innerHTML = `
            <div style="width: 90px; height: 90px; background: rgba(255,255,255,0.15); border: 2px solid rgba(255,255,255,0.3); backdrop-filter: blur(8px); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-bottom: 24px; box-shadow: 0 8px 32px rgba(0,0,0,0.1);">
                <i class="fas fa-download" style="font-size: 2.5rem; color: white;"></i>
            </div>
            <h2 style="font-size: 1.8rem; font-weight: 900; margin-bottom: 12px; letter-spacing: 1px;">請安裝應用程式</h2>
            <p style="font-size: 1.1rem; font-weight: 500; opacity: 0.9; margin-bottom: 8px;">為了提供最佳體驗，本系統不支援網頁瀏覽模式。</p>
            <p style="font-size: 1rem; opacity: 0.8; line-height: 1.7; margin-bottom: 35px; background: rgba(0,0,0,0.2); padding: 15px; border-radius: 12px; max-width: 300px;">
                <strong style="color: #fff;">🍎 iOS:</strong><br>點擊下方「分享 <i class="fas fa-share-square"></i>」➔ 選擇「加入主畫面 ➕」<br><br>
                <strong style="color: #fff;">🤖 Android:</strong><br>點擊右上角「選單 <i class="fas fa-ellipsis-v"></i>」➔ 選擇「加至主畫面」
            </p>
            <div style="font-size: 2.5rem; animation: pwa-bounce 2s infinite;">
                👇
            </div>
            <style>
                @keyframes pwa-bounce {
                    0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
                    40% { transform: translateY(-15px); }
                    60% { transform: translateY(-7px); }
                }
            </style>
        `;
        document.body.appendChild(overlay);
    });
}
