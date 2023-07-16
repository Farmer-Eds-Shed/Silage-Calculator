
// Wait for the DOM to finish loading before running
// Get the button elements and add event listeners to them
document.addEventListener("DOMContentLoaded", function () {


    //calcButton event listener
    //let calcButton = document.getElementById('calculate');
    //calcButton.addEventListener('click', calculate);



    //listen for all input boxes
    const inputs = document.querySelectorAll("input");
    inputs.forEach(input => {
        input.addEventListener('focusout', calculate);
        input.addEventListener('focus', function (e) {
            input.select();
        });
    });
});


/**
 * Returns tonnes required per month.
 *
 * @param {string} cattleType The cattle type.
 * @return {array} Tonnes and Bales required per month.
 */
function stock(cattleType) {
    let cattle = document.getElementById(cattleType).value;
    let months = document.getElementById(cattleType + "-months").value;
    let intake = document.getElementsByClassName(cattleType + "-silage")[0].innerHTML;
    let tonnes = document.getElementsByClassName(cattleType + "-silage")[1];
    let bales = document.getElementsByClassName(cattleType + "-silage")[2];
    let output = [];

    output.tonnes = parseInt(cattle * months * intake);
    output.bales = parseInt(tonnes.innerHTML / 0.8);

    tonnes.innerHTML = output.tonnes;
    bales.innerHTML = output.bales;
    return output;
}

/**
 * Total stock function.
 *
 * @return {number} Total tonnes required per month.
 */
function stockTotal() {
    let dairyTonnes = stock("dairy").tonnes;
    let sucklerTonnes = stock("suckler").tonnes;
    let heifersTonnes = stock("heifers").tonnes;
    let weanlingsTonnes = stock("weanlings").tonnes;
    let storesTonnes = stock("stores").tonnes;
    let dairyBales = stock("dairy").bales;
    let sucklerBales = stock("suckler").bales;
    let heifersBales = stock("heifers").bales;
    let weanlingsBales = stock("weanlings").bales;
    let storesBales = stock("stores").bales;
    let output = [];

    let totalTonnes = dairyTonnes + sucklerTonnes + heifersTonnes + weanlingsTonnes + storesTonnes;
    let totalBales = dairyBales + sucklerBales + heifersBales + weanlingsBales + storesBales;

    output.tonnes = totalTonnes;
    output.bales = totalBales;

    document.getElementsByClassName("stock-total")[0].innerHTML = totalTonnes;
    document.getElementsByClassName("stock-total")[1].innerHTML = totalBales;
    document.getElementsByClassName("stock-total")[2].innerHTML = totalTonnes;
    document.getElementsByClassName("stock-total")[3].innerHTML = totalBales;

    return output;
}

/**
 * Returns silage stock by type.
 *
 * @param {string} silageType The silage type.
 * @return {object} tonnes silage in stock.
 */
function silageStock(silageType) {
    let silageQuantity = document.getElementById(silageType + "-stock").value;
    let tonnes = document.getElementsByClassName(silageType)[0];
    let bales = document.getElementsByClassName(silageType)[1];
    let output = [];

    if (silageType == "pit") {
        output.bales = parseInt(silageQuantity * 0.77 / 0.8);
        output.tonnes = parseInt(silageQuantity * 0.77);
    }
    else if (silageType == "bales") {
        output.bales = parseInt(silageQuantity);
        output.tonnes = parseInt(silageQuantity * 0.8);
    }

    tonnes.innerHTML = output.tonnes;
    bales.innerHTML = output.bales;
    return output;
}

/**
 * Total silage function.
 *
 * @return {number} Total tonnes of silage in stock.
 */
function silageTotal() {
    let pitBales = silageStock("pit").bales;
    let bales = silageStock("bales").bales;
    let pitTonnes = silageStock("pit").tonnes;
    let baleTonnes = silageStock("bales").tonnes;

    let totalTonnes = pitTonnes + baleTonnes;
    let totalBales = pitBales + bales;
    let output = [];

    output.tonnes = totalTonnes;
    output.bales = totalBales;

    document.getElementsByClassName("silage-total")[0].innerHTML = totalTonnes;
    document.getElementsByClassName("silage-total")[1].innerHTML = totalBales;
    document.getElementsByClassName("silage-total")[2].innerHTML = totalTonnes;
    document.getElementsByClassName("silage-total")[3].innerHTML = totalBales;
    return output;
}

/**
 * Calculate function.
 */
function calculate() {
    let stockTonnes = stockTotal().tonnes;
    let silageTonnes = silageTotal().tonnes;
    let stockBales = stockTotal().bales;
    let silageBales = silageTotal().bales;

    let resultBales = parseInt(silageBales - stockBales);
    let resultTonnes = parseInt(silageTonnes - stockTonnes);

    document.getElementsByClassName("result")[0].innerHTML = resultTonnes;
    document.getElementsByClassName("result")[1].innerHTML = resultBales;

    if (Math.sign(resultTonnes) == -1) {
        document.getElementById("surplus").innerHTML = "Deficit";
        document.getElementById("result-row").setAttribute("class", "deficit");
    }
    else {
        document.getElementById("surplus").innerHTML = "Surplus";
        document.getElementById("result-row").setAttribute("class", "surplus");
    }

    //draw graph if !==0 else clear 
    if (silageTonnes !== 0 || stockTonnes !== 0) {
        google.charts.setOnLoadCallback(drawChart);
    }
    else {
        document.getElementById("myChart").innerHTML = "";
    }
}

//Load Google Charts Library
google.charts.load('current', { 'packages': ['corechart'] });
document.getElementsByTagName("BODY")[0].onresize = function () { calculate(); };

/**
 * Draws a Google Charts Bar Chart.
 */
function drawChart() {
    let stock = stockTotal().tonnes;
    let silage = silageTotal().tonnes;
    let barColor = silage >= stock ? "#04AA6D" : "rgb(204, 70, 70)";

    const data = google.visualization.arrayToDataTable([
        ['Silage', 'Tonnes', { role: "style" }],
        ['Required', stock, "#04AA6D"],
        ['Available', silage, barColor]
    ]);

    const options = {
        legend: 'none',
        hAxis: {
            minValue: 0,
        }

    };


    const chart = new google.visualization.BarChart(document.getElementById('myChart'));
    chart.draw(data, options);
}



function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}


