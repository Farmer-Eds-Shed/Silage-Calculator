/**
 * Returns tonnes required per month.
 *
 * @param {string} cattleType The cattle type.
 * @return {number} Tonnes required per month.
 */

function stock(cattleType) {
    let cattle = document.getElementById(cattleType).value;
    let months = document.getElementById(cattleType + "-months").value;
    let intake = document.getElementsByClassName(cattleType + "-silage")[0].innerHTML;
    let tonnes = document.getElementsByClassName(cattleType + "-silage")[1];
    let bales = document.getElementsByClassName(cattleType + "-silage")[2];

    tonnes.innerHTML = parseInt(cattle * months * intake);
    bales.innerHTML = parseInt(tonnes.innerHTML * .6);
    return parseInt(tonnes.innerHTML);
}

/**
 * Total stock function.
 *
 * @return {number} Total tonnes required per month.
 */
function stockTotal() {
    let dairy = stock("dairy");
    let suckler = stock("suckler");
    let heifers = stock("heifers");
    let weanlings = stock("weanlings");
    let stores = stock("stores");

    let total = dairy + suckler + heifers + weanlings + stores;
    return total;
}

/**
 * Returns silage stock by type.
 *
 * @param {string} silageType The silage type.
 * @return {number} tonnes silage in stock.
 */
function silageStock(silageType) {
    let silageQuantity = document.getElementById(silageType + "-stock").value;
    let tonnes = document.getElementsByClassName(silageType)[0];
    let bales = document.getElementsByClassName(silageType)[1];
    if (silageType == "pit") {
        tonnes.innerHTML = parseInt(silageQuantity * .77);
        bales.innerHTML = parseInt(tonnes.innerHTML * .6);
    }
    else if (silageType == "bales") {
        bales.innerHTML = parseInt(silageQuantity);
        tonnes.innerHTML = parseInt(silageQuantity / .6);
    }
    return parseInt(tonnes.innerHTML);
}

/**
 * Total silage function.
 *
 * @return {number} Total tonnes of silage in stock.
 */
function silageTotal() {
    let pit = silageStock("pit");
    let bales = silageStock("bales");
    let total = bales + pit;

    return total;
}

/**
 * Calculate function.
 */
function calculate(event) {

    console.log("Total cattle " + stockTotal());
    console.log("Total Silage " + silageTotal());
}

//calcButton event listener
let calcButton = document.getElementById('calculate');
calcButton.addEventListener('click', calculate);


//Google Charts
google.charts.load('current', { 'packages': ['corechart'] });
google.charts.setOnLoadCallback(drawChart);


/**
 * Draws a Google Charts Bar Chart.
 */
function drawChart() {
    const data = google.visualization.arrayToDataTable([

        ['Silage', 'Tonnes', { role: "style" }],
        ['Required', 55, "green"],
        ['Available', 49, "red"]
    ]);

    const options = {
        legend: 'none'
    };

    const chart = new google.visualization.BarChart(document.getElementById('myChart'));
    chart.draw(data, options);
}