import { datasets, processLegend } from './modules/datasets.js';
import { createMap } from './modules/createMap.js';
import { createLegend } from './modules/createLegend.js';
import { createSlider } from './modules/createSlider.js';


let countryInfo = [];
let yearNow;
let dataNow;
let toolTipExist = false;
let legendModeOn = false;


// 畫面大小
const size = {
    width: 1920,
    height: 1080
}

const svg = d3.select('main')
    .append("svg")
    .attr("width", size.width)
    .attr("height", size.height);

// 抓現在是用哪個資料
const menuOptions = document.querySelectorAll(".menu-option");

for (let i = 0; i < menuOptions.length; i++) {
    menuOptions[i].addEventListener('click', () => optionNow(i))
}

const logoImg = document.querySelector('#logo-img')

//輪播中英文設定
let isChineseNow = true;
const descriptionContent = document.querySelector('#description-content');
let languageChangeInterval;

async function initialize() {
    await initData();
    optionNow(0);
}

initialize();
function optionNow(option) {
    for (let i = 0; i < menuOptions.length; i++) {
        if (i === option) {
            menuOptions[i].classList.add("menu-active");
            const top = menuOptions[i].offsetTop
            const img = document.querySelector(".active-img")
            img.style.top = `${top}px`;

            logoImg.src = `./static/logo/${menuOptions[i].id}.png`

            yearNow = 2023;
            initMap(menuOptions[i].id);
            updateSlider()
        } else {
            menuOptions[i].classList.remove("menu-active");
        }

        // ranking
        const ranking = document.querySelector("#ranking")

        switch (option) {
            case 0:
                ranking.textContent = "33"
                break;
            case 1:
                ranking.textContent = "10"
                break;
            case 2:
                ranking.textContent = "4"
                break;
            case 3:
                ranking.textContent = "19"
                break;
        }
    }
}

let countriesData, countriesChineseName, mapData, democracyData, pressData, economicData, freedomData;

async function initData() {
    try {
        // 使用Promise.all同時加載多個數據源
        [countriesData, countriesChineseName, mapData, democracyData, pressData, economicData, freedomData] = await Promise.all([
            d3.tsv("./src/world_info.tsv"),
            d3.json("./src/countryChineseName.json"),
            d3.json("./src/world_map.json"),
            d3.json("./src/data/democracy.json"),
            d3.json("./src/data/press.json"),
            d3.json("./src/data/economic.json"),
            d3.json("./src/data/freedom.json")
        ]);


        addChineseName(countriesData, countriesChineseName)

        for (let i = 0; i < countriesData.length; i++) {
            countryInfo.push(createCountryObject(countriesData[i].name, countriesData[i].chineseName, countriesData[i].iso_n3, countriesData[i].iso_a3))
        }

        const projection = d3.geoNaturalEarth1()
            .center([121, 23.5])
            .rotate([-160, 0])
            .scale(290)
            .translate([size.width / 2 + 700, size.height / 2 - 60]);

        createMap(svg, mapData, projection, countryInfo);

    } catch (error) {
        console.error("Error loading data:", error);
    }
}
async function initMap(indexName) {
    try {
        dataNow = datasets[indexName]

        matchData(indexName)

        createLegend(dataNow);
        createSlider(dataNow);

        const source = document.querySelector("#source-text");
        source.textContent = `資料來源  ${dataNow.source}`


        // 輪播中英文介紹
        if (languageChangeInterval) {
            clearInterval(languageChangeInterval);
            isChineseNow = true;
        }
        languageChangeInterval = setInterval(() => languageChange(dataNow), 30000);
        languageChange(dataNow);


        // 確定創建 legend 後再來加入 click
        const legendItems = d3.selectAll(".legend-item")
        legendItems
            .on("click", (d) => {
                legendModeOn = true;
                handleLegendClick(d, dataNow);
                // 關掉 tooltip
                const tooltip = d3.select('.tooltip');
                if (tooltip) {
                    tooltip.style("visibility", "hidden");
                }
            })
        updateMap(yearNow, dataNow);



        function matchData(indexName) {
            switch (indexName) {
                case "democracy":
                    dataNow.data = democracyData;
                    break;
                case "press":
                    dataNow.data = pressData;
                    break;
                case "economic":
                    dataNow.data = economicData;
                    break;
                case "freedom":
                    dataNow.data = freedomData;
                    break;
                default:
                    dataNow.data = democracyData;
            }
        }
    } catch (error) {
        console.error("Error loading data:", error);
    }
}

function languageChange(dataNow) {
    descriptionContent.classList.add('fade');

    setTimeout(() => {
        if (isChineseNow) {
            descriptionContent.classList.remove('en');
            descriptionContent.textContent = dataNow.descriptionContent;
        } else {
            descriptionContent.classList.add('en');
            descriptionContent.textContent = dataNow.descriptionContentEn;
        }
        isChineseNow = !isChineseNow;
        descriptionContent.classList.remove('fade');
    }, 500);
}


function createCountryObject(name, chineseName, n3, a3) {
    return {
        name: name,
        chineseName: chineseName,
        n3: n3,
        a3: a3
    };
}


function addChineseName(countriesData, countriesChineseName) {
    countriesData.forEach(country => {
        let chineseName = countriesChineseName.find((element) => element.Entity === country.name)
        if (chineseName) {
            country.chineseName = chineseName.Country;
        } else {
            country.chineseName = null;
        }
    });
}

// 依 topojson 的國家 id(n3)查出對應的國家資料 + 當年度分數
function findCountryData(id, yearData) {
    const country = countryInfo.find(country => country.n3 === id);
    const data = country ? yearData.find(c => c.Code === country.a3) : undefined;
    return { country, data };
}

function updateMap(year, dataNow) {

    //指定年份的數據
    const yearData = dataNow.data.filter(country => country.Year == year);
    const newPath = svg.selectAll('.country');
    const clickArea = d3.select('circle');

    const tooltip = d3.select('.tooltip');
    const tooltipCountry = d3.select('#tooltipCountry')
    const tooltipCountryEn = d3.select('#tooltipCountryEn')
    const tooltipYear = d3.select('#tooltipYear')
    const tooltipScore = d3.select('#tooltipScore')
    const tooltipPoint = d3.select('#tooltipPoint')

    // 順便更新 tw-info
    const twScore = document.querySelector("#tw-info-score");
    const twYear = document.querySelector("#tw-info-year");
    const twColor = document.querySelector(".tw-info-area-top");

    twYear.textContent = year;
    const colors = d3.scaleOrdinal(dataNow.colorIndex, dataNow.colorPalette)
    const textColors = d3.scaleOrdinal(dataNow.colorIndex, dataNow.textColorPalette)

    const legendLength = (dataNow.legendValue.length - 1);
    const twInfo = document.querySelector(".tw-info-area-top")

    clickArea.raise();
    clickArea.on("click", () => {
        if (!toolTipExist) {
            tooltip.style("visibility", "hidden");
            tooltip.classed("pop-up", false);
            toolTipExist = false;
        }
        if (!legendModeOn) {
            twInfo.classList.remove("tw-info-active-out")
            twInfo.classList.add("tw-info-active")
        }
    })


    newPath
        .transition()
        .duration(500)
        .attr("fill", d => {
            const { country, data } = findCountryData(d.id, yearData);

            if (data) {
                const processIndex = processLegend(dataNow.name, data)
                if (country.name === 'R.O.C (Taiwan)') {
                    twScore.textContent = data.Score;
                    twColor.style.backgroundColor = colors(processIndex)
                    twColor.style.color = textColors(processIndex)
                }

                return colors(processIndex)
            } else {
                return "#E8E8E8"
            }
        })
        .style("stroke", "#fff")
        .style("stroke-width", 0.8)
        .on("end", () => {
            newPath.on("click", (d) => {
                // 重置所有國家的邊框
                newPath.style("stroke", "#fff")
                    .style("stroke-width", 0.8);

                const { country, data } = findCountryData(d.target.__data__.id, yearData);
                d3.select(d.target)
                    .raise()

                const tooltipColor = document.querySelector(".tooltipTitleArea")
                const tooltipText = document.querySelector("#tooltipCountry")
                const tooltipTextEn = document.querySelector("#tooltipCountryEn")



                d.target.style.stroke = "#222"
                d.target.style.strokeWidth = 2
                if (data) {
                    if (data.Entity != 'R.O.C (Taiwan)') {
                        twInfo.classList.remove("tw-info-active")
                        twInfo.classList.add("tw-info-active-out")
                        if (data.Entity === 'Brazil') {
                            tooltip.style("top", `${d.clientY}px`)
                            tooltip.style("left", `${d.clientX - 225 - 10}px`)
                        } else {
                            tooltip.style("top", `${d.clientY}px`)
                            tooltip.style("left", `${d.clientX + 10}px`)
                        }

                        // 動畫
                        if (!legendModeOn) {
                            tooltip.style("visibility", "visible")
                        }
                        if (!toolTipExist) {
                            const processIndex = processLegend(dataNow.name, data)
                            tooltip.classed("pop-up", true)
                            tooltipColor.style.backgroundColor = colors(processIndex)
                            tooltipText.style.color = textColors(processIndex)
                            tooltipTextEn.style.color = textColors(processIndex)

                            toolTipExist = true;
                        }
                        setTimeout(() => {
                            tooltip.classed("pop-up", false);
                            toolTipExist = false;
                        }, 200)


                        // 名稱統一用 countryInfo 的
                        tooltipCountryEn.text(`${country.name}`)
                        tooltipCountry.text(`${country.chineseName}`)
                        tooltipYear.text(`${data.Year}`)
                        tooltipScore.text(`${data.Score}`)
                        tooltipPoint.text("分")
                    } else {
                        if (!toolTipExist) {
                            tooltip.style("visibility", "hidden");
                            tooltip.classed("pop-up", false);
                            toolTipExist = false;
                        }
                        if (!legendModeOn) {
                            twInfo.classList.remove("tw-info-active-out")
                            twInfo.classList.add("tw-info-active")
                        }
                    }
                } else {
                    tooltip.style("top", `${d.clientY}px`)
                    tooltip.style("left", `${d.clientX + 10}px`)

                    // 動畫
                    if (!legendModeOn) {
                        tooltip.style("visibility", "visible")
                    }
                    if (!toolTipExist) {
                        tooltip.classed("pop-up", true)
                        tooltipColor.style.backgroundColor = "#E8E8E8"
                        tooltipText.style.color = "#222"
                        toolTipExist = true;
                    }
                    setTimeout(() => {
                        tooltip.classed("pop-up", false);
                        toolTipExist = false;
                    }, 200)

                    tooltipCountry.text("N/A")
                    tooltipCountryEn.text("")
                    tooltipYear.text(`${yearNow}`)
                    tooltipScore.text("")
                    tooltipPoint.text("")
                }
            })
        })
    d3.selectAll("rect")
        .style("fill", (d, i) => {
            if (i < legendLength) {
                return colors(i)
            } else {
                return "rgba(0,0,0,0)"
            }
        })
}



function updateSlider() {

    // 控制slider
    const yearDisplay = d3.select('#mySliderLabel')
        .text(`${yearNow}`);
    const sliderImg = d3.select('#slider-img')
    sliderImg.style("left", `663px`)
    yearDisplay.style("left", `663px`)
    d3.select("#mySlider")
        .on("input", (e) => {
            // 關掉 tooltip
            const tooltip = d3.select('.tooltip');
            if (tooltip) {
                tooltip.style("visibility", "hidden");
            }
            // 計算滑塊位置，並更新滑塊上的字、位置
            // 有調整記得去 css 調整初始 #mySliderLabel 位置
            const sliderPosition = getSliderPosition(e);
            sliderImg.style("left", `${sliderPosition - 2}px`)
            yearDisplay.style("left", `${sliderPosition - 2}px`)
            yearNow = dataNow.sliderValue[e.target.value]
            updateMap(yearNow, dataNow)
        })
        .on("touchstart", (e) => {
            e.target.classList.add('dragging')
        })
        .on("touchend", (e) => {
            e.target.classList.remove('dragging')
        })
}

function getSliderPosition(e) {
    const max = e.target.max;
    const min = e.target.min;
    const percent = (e.target.value - min) / (max - min);
    const sliderImgWidth = 125;
    const sliderThumb = 25;
    const sliderPositionX = e.target.offsetLeft
    const offset = percent * (e.target.offsetWidth - sliderThumb) + sliderPositionX - sliderImgWidth / 2 + sliderThumb / 2;
    return offset
}


// 點擊其他地方
document.addEventListener('click', (e) => {
    const twInfo = document.querySelector(".tw-info-area-top")
    if (!legendModeOn) {
        if (e.target.tagName === 'svg' || e.target.tagName === 'SPAN' || e.target.tagName === 'text' || e.target.tagName === 'DIV') {
            const tooltip = d3.select('.tooltip');
            updateMap(yearNow, dataNow)
            legendModeOn = false;
            tooltip.style("visibility", "hidden");
            twInfo.classList.remove("tw-info-active")
            twInfo.classList.add("tw-info-active-out")
        }
    } else {
        if (e.target.tagName === 'svg' || e.target.tagName === 'SPAN' || e.target.tagName === 'text' || e.target.tagName === 'DIV' || e.target.tagName === 'path') {
            const tooltip = d3.select('.tooltip');
            updateMap(yearNow, dataNow)
            legendModeOn = false;
            tooltip.style("visibility", "hidden");
            twInfo.classList.remove("tw-info-active")
            twInfo.classList.add("tw-info-active-out")
        }
    }

});


// 圖例點擊反應
function handleLegendClick(d, dataNow) {
    let legendClickValue = d.target.__data__;
    legendClickValue = dataNow.legendValue.indexOf(legendClickValue)
    const colors = d3.scaleOrdinal(dataNow.colorIndex, dataNow.colorPalette)
    const legendLength = (dataNow.legendValue.length - 1);

    // 處理圖例
    d3.selectAll("rect")
        .style("fill", (d, i) => {
            if (i === legendClickValue) {
                return colors(i)
            } else {
                return adjustOpacity(colors(i), 0.3)
            }
        })


    //處理地圖
    const yearData = dataNow.data.filter(country => country.Year == yearNow);
    const newPath = svg.selectAll('.country');
    newPath
        .transition()
        .duration(500)
        .attr("fill", (d, i, nodes) => {
            const { data } = findCountryData(d.id, yearData);

            if (data) {
                const processIndex = processLegend(dataNow.name, data)
                if (processIndex === legendClickValue) {
                    // nodes[i] 是取到 path 元素
                    d3.select(nodes[i]).raise();
                    return colors(processIndex)
                } else {
                    return adjustOpacity(colors(processIndex), 0.3)
                }
            } else {
                return adjustOpacity("#E8E8E8", 0.3)
            }
        })
    newPath
        .style("stroke", d => {
            const { data } = findCountryData(d.id, yearData);

            if (data) {
                const processIndex = processLegend(dataNow.name, data)
                if (processIndex === legendClickValue) {
                    return "#222"
                }
            }

        })
        .style("stroke-width", d => {
            const { data } = findCountryData(d.id, yearData);

            if (data) {
                const processIndex = processLegend(dataNow.name, data)
                if (processIndex === legendClickValue) {
                    return 2
                }
            }

        });

}

// 用 d3.js 功能調整透明度
function adjustOpacity(color, opacity) {
    return d3.color(color).copy({ opacity: opacity });
}
