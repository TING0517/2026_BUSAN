// 檢查是否以獨立模式 (PWA 安裝後) 執行
const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;

// 允許本機開發或透過參數 bypass (如 ?dev=1)
const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.protocol === 'file:';
const isDev = new URLSearchParams(window.location.search).has('dev');

if (!isStandalone && !isLocalhost && !isDev) {
    // 若不是 standalone，且非開發環境，強制顯示安裝提示
    document.addEventListener('DOMContentLoaded', () => {
        // 清空原本內容並清除可能的 CSS class (例如 bg-slate-50)
        document.body.innerHTML = '';
        document.body.className = '';
        document.body.style.margin = '0';
        document.body.style.overflow = 'hidden';

        const overlay = document.createElement('div');
        overlay.innerHTML = `
            <style>
                @keyframes force-gradientBG {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                @keyframes pwa-bounce {
                    0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
                    40% { transform: translateY(-15px); }
                    60% { transform: translateY(-7px); }
                }
                @keyframes float-icon {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-12px); }
                }
                .force-install-wrapper {
                    position: fixed;
                    top: 0; left: 0; width: 100%; height: 100vh;
                    background: linear-gradient(135deg, #03045E, #0077B6, #00B4D8, #90E0EF);
                    background-size: 300% 300%;
                    animation: force-gradientBG 10s ease infinite;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    z-index: 9999999;
                    font-family: 'Noto Sans TC', 'Quicksand', sans-serif;
                    padding: 2rem;
                    text-align: center;
                    color: white;
                    overflow: hidden;
                }
                .force-glass-card {
                    background: rgba(255, 255, 255, 0.1);
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    border: 1px solid rgba(255, 255, 255, 0.3);
                    border-radius: 2rem;
                    padding: 2.5rem 1.5rem;
                    width: 100%;
                    max-width: 360px;
                    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.2);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    position: relative;
                    z-index: 10;
                }
                .force-icon-circle {
                    width: 80px; height: 80px;
                    background: linear-gradient(135deg, #ffffff, #e0f2fe);
                    border-radius: 50%;
                    display: flex; align-items: center; justify-content: center;
                    margin-bottom: 20px;
                    box-shadow: 0 8px 24px rgba(0, 119, 182, 0.5);
                    animation: float-icon 4s ease-in-out infinite;
                }
                .force-icon-circle i {
                    font-size: 2.2rem;
                    color: #0077B6;
                }
                .force-title {
                    font-size: 1.6rem; font-weight: 900; margin-bottom: 8px; letter-spacing: 1px;
                    text-shadow: 0 2px 4px rgba(0,0,0,0.1);
                }
                .force-subtitle {
                    font-size: 0.95rem; font-weight: 500; opacity: 0.9; margin-bottom: 24px; line-height: 1.5;
                }
                .force-instruction-box {
                    background: rgba(0,0,0,0.15);
                    border-radius: 1rem;
                    padding: 1.2rem;
                    width: 100%;
                    text-align: left;
                    margin-bottom: 10px;
                    border: 1px solid rgba(255,255,255,0.1);
                }
                .force-instruction-box p {
                    font-size: 0.95rem; opacity: 0.95; line-height: 1.6; margin: 0;
                }
                .force-instruction-box i {
                    color: #90E0EF;
                    margin: 0 4px;
                }
                .pwa-bounce-arrow {
                    font-size: 3rem;
                    margin-top: 30px;
                    animation: pwa-bounce 2s infinite;
                    filter: drop-shadow(0 4px 8px rgba(0,0,0,0.2));
                    z-index: 10;
                }
                /* 背景裝飾光暈 */
                .deco-circle-1 {
                    position: absolute; top: -10%; left: -10%; width: 250px; height: 250px;
                    background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
                    z-index: 1;
                }
                .deco-circle-2 {
                    position: absolute; bottom: -20%; right: -20%; width: 350px; height: 350px;
                    background: radial-gradient(circle, rgba(144,224,239,0.2) 0%, transparent 70%);
                    z-index: 1;
                }
            </style>
            
            <div class="force-install-wrapper">
                <div class="deco-circle-1"></div>
                <div class="deco-circle-2"></div>
                
                <div class="force-glass-card">
                    <div class="force-icon-circle">
                        <i class="fas fa-plane-departure"></i>
                    </div>
                    <h2 class="force-title">專屬旅行 App</h2>
                    <p class="force-subtitle">為確保資料同步與順暢體驗，<br>本應用程式僅供安裝後使用。</p>
                    
                    <div class="force-instruction-box">
                        <p>
                            <strong><i class="fab fa-apple text-white" style="color: white; margin-right: 6px;"></i>iOS / Safari</strong><br>
                            1. 點擊下方中央的「分享 <i class="fas fa-share-square"></i>」<br>
                            2. 向下滑動選擇「加入主畫面 ➕」
                        </p>
                        <hr style="border: 0; border-top: 1px solid rgba(255,255,255,0.1); margin: 12px 0;">
                        <p>
                            <strong><i class="fab fa-android text-white" style="color: white; margin-right: 6px;"></i>Android / Chrome</strong><br>
                            1. 點擊右上角的「選單 <i class="fas fa-ellipsis-v"></i>」<br>
                            2. 選擇「加至主畫面」
                        </p>
                    </div>
                </div>

                <div class="pwa-bounce-arrow">
                    👇
                </div>
            </div>
        `;
        document.body.appendChild(overlay);
    });
}
