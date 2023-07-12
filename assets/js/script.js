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