export function createLegend(dataNow) {
    // 圖例
    const legendLength = (dataNow.legendValue.length - 1);
    const legendEachLength = 800 / legendLength;
    const legendSize = {
        width: legendEachLength,
        height: 30,
        gap: 0
    }
    const colors = d3.scaleOrdinal(dataNow.colorIndex, dataNow.colorPalette)

    const legendArea = d3.select('.legend-area-top')

    // 檢查是否已經有 .legend 的 svg
    let checkLegend = legendArea.select("svg.legend");
    if (!checkLegend.empty()) {
        checkLegend.remove();
    }


    const legend = legendArea.append("g")
        .append("svg")
        .attr("width", 1000)
        .attr("height", 100)
        .attr("class", "legend")
        .attr("transform", "translate(25,10)");

    const legendItems = legend.selectAll(".legend-item")
        .data(dataNow.legendValue)
        .enter()
        .append("g")
        .attr("class", "legend-item")
        .attr("transform", (d, i) => `translate(${i * (legendSize.width + legendSize.gap) + 20}, 0)`);

    // 圖例顏色方塊
    legendItems.filter((d, i) => i < legendLength)
        .append("rect")
        .attr("width", legendSize.width)
        .attr("height", legendSize.height)
        .attr("y", legendSize.height + 10)
        .style("fill", (d, i) => {
            return colors(i)
        })
        .classed("legend-rect", true);

    // 圖例文字
    legendItems.append("text")
        .attr("x", 0)
        .attr("y", legendSize.height)
        // .attr("text-anchor", start)
        .classed("legend-text", true)
        .text(d => d);


    // 先檢查並清空legend
    const legendTitleArea = d3.select(".legend-area-title")
    let checkLegendTitle = legendTitleArea.selectAll(".legend-area-title-text");
    if (!checkLegendTitle.empty()) {
        checkLegendTitle.remove();
    }

    const legendTitle = legendTitleArea.selectAll(".legend-area-title-text")
        .data(dataNow.legendLabel)
        .enter()
        .append("div")
        .classed("legend-area-title-text", true)
        .text(d => d)
        .data(dataNow.legendLabelEn)
        .append("span")
        .classed("legend-area-title-text-en", true)
        .text(d => d)

    legendTitleSize(dataNow.name)
}

function legendTitleSize(name) {
    const legendTitle = d3.selectAll(".legend-area-title-text");
    const legendTitleArray = legendTitle._groups[0];
    switch (name) {
        case "democracy":
            legendTitleArray[0].classList.add("legend-area-title-text-4")
            break;
        case "press":
            break;
        case "economic":
            break;
        case "freedom":
            break;
        default:
            break;
    }
}


