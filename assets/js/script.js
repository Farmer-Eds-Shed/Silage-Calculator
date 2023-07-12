function stock(cattleType) {
    let cattle = document.getElementById(cattleType).value;
    let months = document.getElementById(cattleType + "-months").value;
    let intake = document.getElementsByClassName(cattleType + "-silage")[0].innerHTML;
    let tonnes = document.getElementsByClassName(cattleType + "-silage")[1];
    let bales = document.getElementsByClassName(cattleType + "-silage")[2];

    tonnes.innerHTML = parseInt(cattle * months * intake);
    bales.innerHTML = parseInt(tonnes.innerHTML * .6);
    return tonnes.innerHTML;
}



function calculate(event) {
    console.log(stock("dairy"));
    console.log(stock("suckler"));
    console.log(stock("heifers"));
    console.log(stock("weanlings"));
    console.log(stock("stores"));
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