export function createSlider(dataNow) {
    const slider = document.querySelector('#mySlider');
    const sliderLabel = document.querySelector('#mySliderLabel');

    const sliderMin = document.querySelector(".slider-min");
    const sliderMax = document.querySelector(".slider-max");

    const sliderValue = dataNow.sliderValue;
    const sliderValueLength = sliderValue.length - 1;

    // const div = document.querySelector(".slider-area-top");
    // const spanNum = 3;
    // for (let i = 0; i < spanNum; i++) {
    //     const newSpan = document.createElement("span");
    //     newSpan.classList.add('thumb-pulse')
    //     newSpan.classList.add('thumb-pulsing')
    //     newSpan.style.setProperty('--i', i);
    //     div.appendChild(newSpan);
    // }

    // 定義最大、最小、區間
    sliderMin.textContent = `${sliderValue.at(0)}`
    sliderMax.textContent = `${sliderValue.at(-1)}`
    slider.min = 0
    slider.max = sliderValueLength

    // 一律從最新年份開始 
    slider.value = sliderValueLength
    sliderLabel.innerHTML = sliderValue[slider.value];



    // 監聽滑動事件
    slider.oninput = function () {
        sliderLabel.innerHTML = sliderValue[slider.value];
    }
}