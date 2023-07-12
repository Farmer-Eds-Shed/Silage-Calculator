function stock() {
    let dairyCows = document.getElementById("dairy-cows").value;
    let sucklerCows = document.getElementById("suckler-cows").value;
    let heifers = document.getElementById("heifers").value;
    let weanlings = document.getElementById("weanlings").value;
    let stores = document.getElementById("stores").value;
    let dairyCowsMonths = document.getElementById("dairy-cows-months").value;
    let sucklerCowsMonths = document.getElementById("suckler-cows-months").value;
    let heifersMonths = document.getElementById("heifers-months").value;
    let weanlingsMonths = document.getElementById("weanlings-months").value;
    let storesMonths = document.getElementById("stores-months").value;

    let dairyCowsTonnes = dairyCows * dairyCowsMonths * 1.6;
    let dairyCowsBales = dairyCowsTonnes / .6;
    console.log(dairyCowsTonnes);
}

function calculate(event) {
    stock();

}

let calcButton = document.getElementById('calculate');
calcButton.addEventListener('click', calculate);


google.charts.load('current', { 'packages': ['corechart'] });
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    const data = google.visualization.arrayToDataTable([

        ['Silage', 'Tonnes', { role: "style" }],
        ['Required', 55, "green"],
        ['Available', 49, "red"]
    ]);

    const options = {
        //title: 'Silage',
        legend: 'none'
    };



    const chart = new google.visualization.BarChart(document.getElementById('myChart'));
    chart.draw(data, options);
}