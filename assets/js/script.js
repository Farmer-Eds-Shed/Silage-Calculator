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
 * Calculate function.
 */
function calculate(event) {
    console.log(stock("dairy"));
    console.log(stock("suckler"));
    console.log(stock("heifers"));
    console.log(stock("weanlings"));
    console.log(stock("stores"));
    console.log(stockTotal());

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