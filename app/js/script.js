var DATA;
$(document).ready(function() {
    // all custom jQuery will go here
    loadData();
});

function loadData() {
    $.getJSON("./data.json", function(json) {
        DATA = json;
        initData();
    });
}

function initData() {
    setData("weekly");
}

function setData(period) {
    let reportsCard = $(".reports-card");
    let cards = reportsCard.find(".card");
    cards.each(function() {
        let type = $(this).attr("class").split(" ")[1];
        let timeframes = $(this).find(".timeframes");
        let currentValue = timeframes.find(".current");
        let previousValue = timeframes.find(".previous");
        let dataValue = DATA.find(el => el.title.toUpperCase() == type.toUpperCase()).timeframes;
        replaceData(currentValue, previousValue, dataValue, period);
    });
}

function replaceData(currentValue, previousValue, dataValue, period) {
    let curr = dataValue[period].current + "hrs";
    let prev = dataValue[period].previous + "hrs";
    if (period == "weekly") {
        prev = "Last Week - " + prev;
    } else if (period == "daily") {
        prev = "Yesterday - " + prev;
    } else if (period == "monthly") {
        prev = "Last Month - " + prev;
    }
    currentValue.text(curr);
    previousValue.text(prev);
}


function choosePeriod(event) {
    let target = $(event.target);
    if (target.hasClass("period-to-select")) {
        let periodList = target.parent();
        periodList.find("li").removeClass("selected")
        target.addClass("selected")
        setData(target.text().toLowerCase());
    }
}