
// 防止手勢縮放
document.addEventListener('touchmove', function (event) {
    if (event.target.type === 'range') {
        // 如果是滑塊，允許默認行為
        return;
    }

    // 對於非滑塊元素，防止縮放
    if (event.scale !== 1) {
        event.preventDefault();
    }
}, { passive: false });


// 防止雙擊縮放
let lastTouchEnd = 0;
let devModeClickCount = 0;
let clickTimeout;
let devMode = false;
document.addEventListener('touchend', (event) => {

    // 開發者按鈕
    if (event.target.id === 'secret-button') {
        // 增加點擊計數
        devModeClickCount++;

        // 重置計時器
        clearTimeout(clickTimeout);
        clickTimeout = setTimeout(() => {
            devModeClickCount = 0;
        }, 3000);

        // 如果在3秒內點擊10次，開啟開發者模式
        if (devModeClickCount >= 10) {
            devMode = true;
            toggleFullScreen();
            location.reload(true);  // 強制從服務器重新加載，忽略緩存
            devModeClickCount = 0;  // 重置點擊次數
        }
        return;
    }


    let now = new Date().getTime();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);


// 禁止右鍵選單
document.addEventListener('contextmenu', (event) => {
    event.preventDefault();
});


// 控制瀏覽器全螢幕
function toggleFullScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    }
    else if (document.exitFullscreen) {
        document.exitFullscreen();
    }
}


// 待機模式
let idleTimer;
const idleTime = 10000; // 10秒
const idleClick = document.getElementById('idle-click');
const idleDrag = document.getElementById('idle-drag');

function resetIdleTimer() {
    clearTimeout(idleTimer);
    idleTimer = setTimeout(hideIdle, idleTime);
    idleClick.style.visibility = 'hidden';
    idleDrag.style.visibility = 'hidden';
}

function hideIdle() {
    idleClick.style.visibility = 'visible';
    idleDrag.style.visibility = 'visible';
}

// 監聽用戶活動
['mousedown', 'click', 'touchstart', 'touchmove', 'pointerdown'].forEach(evt => {
    document.addEventListener(evt, resetIdleTimer, false);
}
);

// 初始化計時器
resetIdleTimer();

function playClickSound() {
    const sound = document.getElementById('clickSound');
    sound.currentTime = 0;
    sound.play();
}

// 為所有按鈕添加點擊事件監聽器
document.addEventListener('click', playClickSound);

const slider = document.querySelector("#mySlider");
slider.addEventListener("input", playClickSound);
