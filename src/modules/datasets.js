export const datasets = {
    democracy: {
        name: 'democracy',
        data: null,
        scoreKey: 'Score',
        colorPalette: ["#a50026", "#d73027", "#f46d43", "#fdae61", "#fee090", "#ffffbf", "#e0f3f8", "#abd9e9", "#74add1", "#4575b4"],
        textColorPalette: ["#fff", "#fff", "#fff", "#fff", "#222", "#222", "#222", "#222", "#fff", "#fff", "#fff"],
        colorIndex: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        legendLabel: ["威權政權", "混合政權", "缺陷民主", "完全民主"],
        legendLabelEn: ["Authoritarian regimes", "Hybrid regimes", "Flawed democracies", "Full democracies"],
        legendValue: ["0分", "1分", "2分", "3分", "4分", "5分", "6分", "7分", "8分", "9分", "10分"],
        sliderValue: [2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023],
        descriptionContent: "經濟學人資訊社發布的《民主指數》對 167 個國家與地區的民主狀況進行評分。該指數綜合多項評估指標，包括公民在自由和公平選舉中選擇政治領袖的程度、享有公民自由的情況、對民主優於其他政治制度的偏好、實際參與政治的能力與情況，以及政府是否能有效代表民意等資訊。",
        descriptionContentEn: "The Democracy Index published by the Economist Intelligence Unit scores the state of democracy in 167 countries and territories. This index integrates multiple assessment indicators, including the extent to which citizens can choose political leaders through free and fair elections, the enjoyment of civil liberties, the preference for democracy over other political systems, the ability and circumstances for actual political participation, and whether the government can effectively represent public opinion.",
        source: "經濟學人資訊社 / 民主指數  https://www.eiu.com/n/"
    },
    press: {
        name: 'press',
        data: null,
        scoreKey: 'Score',
        colorPalette: ["#bd0026", "#f03b20", "#fd8d3c", "#fecc5c", "#ffffb2"],
        textColorPalette: ["#fff", "#fff", "#fff", "#222", "#222", "#222"],
        colorIndex: [0, 1, 2, 3, 4],
        legendLabel: ["狀況惡劣", "狀況艱難", "問題顯著", "狀況尚可", "狀況良好"],
        legendLabelEn: ["Very serious", "Difficult", "Problematic", "Satisfactory", "Good"],
        legendValue: ["0分", "40分", "55分", "70分", "85分", "100分"],
        sliderValue: [2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023],
        descriptionContent: "無國界記者致力於在全球推廣新聞自由，每年發布《世界新聞自由指數》，評估全球 180 個國家的媒體自由程度。該指數旨在提高大眾對記者所面臨威脅的認識，並在國際層面倡議記者的權益，主張記者應在不受政治、經濟、法律和社會干預且身心安全不受威脅的環境下，能夠為公共利益進行新聞的製作與傳播。",
        descriptionContentEn: "Reporters without Borders is dedicated to promoting press freedom worldwide and publishes the World Press Freedom Index annually, assessing the level of media freedom in 180 countries. The index aims to raise public awareness of the threats faced by journalists and advocates for their rights at the international level, asserting that journalists should be able to produce and disseminate news in the public interest in an environment free from political, economic, legal, and social interference, and where their physical and mental safety is not threatened.",
        source: "無國界記者 / 世界新聞自由指數 https://rsf.org/en"
    },
    economic: {
        name: 'economic',
        data: null,
        scoreKey: 'Score',
        colorPalette: ["#d73027", "#fc8d59", "#fee090", "#e0f3f8", "#91bfdb", "#4575b4"],
        textColorPalette: ["#fff", "#fff", "#222", "#222", "#fff", "#fff"],
        colorIndex: [0, 1, 2, 3, 4, 5],
        legendLabel: ["幾乎不自由", "受限", "中等自由", "大多自由", "自由"],
        legendLabelEn: ["Repressed ", "Mostly Unfree", "Moderately Free", "Mostly Free", "Free "],
        legendValue: ["0分", "50分", "60分", "70分", "80分", "100分"],
        sliderValue: [2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023],
        descriptionContent: "傳統基金會智庫每年發布的《經濟自由度指數》自1995年起持續發表報告，2022年的報告涵蓋全球184個國家，已成為全球權威的經濟自由度評價指標。該指數旨在促進經濟機會、個人賦權與繁榮，並強調經濟自由與進步之間強大的正向關係。",
        descriptionContentEn: 'Heritage Foundation has been publishing the "Index of Economic Freedom" annually since 1995. The 2022 report covers 184 countries worldwide and has become a global benchmark for evaluating economic freedom. This index aims to increase economic opportunity, individual empowerment, and prosperity, while highlighting the strong positive relationship between economic freedom and progress.',
        source: "傳統基金會 / 經濟自由度指數  https://www.heritage.org/index/"
    },
    freedom: {
        name: 'freedom',
        data: null,
        scoreKey: 'Score',
        colorPalette: ["#d73027", "#fee090", "#4575b4"],
        textColorPalette: ["#fff", "#222", "#fff"],
        colorIndex: [0, 1, 2],
        legendLabel: ["不自由", "部分自由", "自由"],
        legendLabelEn: ["Not Free", "Partly Free", "Free"],
        legendValue: ["NF", "PF", "F", ""], //還待釐清
        sliderValue: [2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023],
        descriptionContent: "自由之家是一個非營利且無黨派的組織，致力於創造一個人人自由的世界。自1973年起，每年透過發布《世界自由度調查》，對全球 210 個國家和地區的政治權利及公民自由進行評分。報告針對選舉過程、政治多元性及參與、政府運作、言論自由與信仰自由、集會結社權利、法治、以及個人自主性及個人權利等面向進行評比。",
        descriptionContentEn: 'Freedom House is a non-profit, non-partisan organization dedicated to creating a world where everyone is free. Since 1973, it has published annually the Freedom in the World report, which assesses political rights and civil liberties in 210 countries and territories. The report includes analysis on electoral processes, political pluralism and participation, the functioning of the government, freedom of expression and of belief, associational and organizational rights, the rule of law, as well as personal autonomy and individual rights.',
        source: "自由之家 / 全球自由度調查  https://freedomhouse.org/zh-hant"
    }
}


export function processLegend(name, data) {
    let score = data.Score;
    switch (name) {
        case "democracy":
            return Math.floor(score);
        case "press":
            score = score / 10;
            if (score < 4) {
                return 0;
            } else if (score < 5.5) {
                return 1;
            } else if (score < 7) {
                return 2;
            } else if (score < 8.5) {
                return 3;
            } else if (score < 10) {
                return 4;
            }
            return null;
        case "economic":
            score = score / 10;
            if (score < 4) {
                return 0;
            } else if (score < 5) {
                return 1;
            } else if (score < 6) {
                return 2;
            } else if (score < 7) {
                return 3;
            } else if (score < 8) {
                return 4;
            } else if (score < 10) {
                return 5;
            }
            return null;
        case "freedom":
            const tag = data.Tag;
            if (tag === "NF") {
                return 0;
            } else if (tag === "PF") {
                return 1;
            } else if (tag === "F") {
                return 2;
            }
        default:
            return Math.floor(score);
    }
}
