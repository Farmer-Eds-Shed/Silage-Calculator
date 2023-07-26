
// Wait for the DOM to finish loading before running
// Get the button and input elements and add event listeners to them
document.addEventListener("DOMContentLoaded", function () {

    //Tabs event listener
    const cTabButtons = document.querySelectorAll('.tablinks');
    cTabButtons.forEach(tabButton => tabButton.addEventListener("click", function (e) {
        openTab(e, this.textContent.toLowerCase());
    }));

    //area-calc Button event listener
    let calcButton = document.getElementById('area-calc');
    calcButton.addEventListener('click', showArea);

    //js-PDF Button event listener
    let jsPDF = document.getElementById('js-pdf');
    jsPDF.addEventListener('click', PDF);

    //listen for all input boxes
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        //calculate on input change
        input.addEventListener('change', calculate);
        //highlight input text on focus
        input.addEventListener('focus', function () {
            input.select();
        });
        //input validation keys 0-9 only
        input.addEventListener('keypress', function (e) {
            let key = e.key;
            let regex = new RegExp("^[0-9]+$");
            if (!regex.test(key)) {
                e.preventDefault();
                return false;
            }
        });
    });

    //listen for reset buttons
    const resets = document.querySelectorAll('.reset');
    resets.forEach(reset => {
        reset.addEventListener('click', function () {
            inputs.forEach(input => {
                input.value = input.defaultValue;
                calculate();
                openTab("reset");
                document.getElementById("result-row").setAttribute("class", "");
            });
        });
    });

    //listen for help buttons
    const helpBtns = document.querySelectorAll('.help');
    const modal = document.getElementById("help-modal");
    helpBtns.forEach(helpBtn => {
        helpBtn.addEventListener('click', function () {
            modal.style.display = "block";
        });
    });

    // when user clicks outside modal text area, close the modal
    modal.addEventListener('click', function (event) {
        if (event.target.id == "help-modal") {
            modal.style.display = "none";
        }
    });

    // When the user clicks on <span> (x), close the modal
    const closeBtn = document.getElementById("close");
    closeBtn.addEventListener('click', function () {
        modal.style.display = "none";
    });

    //listen for area-input boxes
    const areaInputs = document.querySelectorAll(".area-input");
    areaInputs.forEach(input => {
        input.addEventListener('change', area);
    });
});


/**
 * Show/hide area calculator.
 *
 */
function showArea() {
    let areaTable = document.getElementById("area-table");

    if (areaTable.style.display === "none") {
        areaTable.style.display = "block";
    } else {
        areaTable.style.display = "none";
    }
}


/**
 * Area Calculator.
 * 
 */
function area() {
    let pitLength = document.getElementById("length").value;
    let pitWidth = document.getElementById("width").value;
    let pitHeight = document.getElementById("height").value;
    let pitArea = parseInt(pitLength * pitWidth * pitHeight);

    document.getElementById("area-result").innerHTML = pitArea;
    document.getElementById("pit-stock").value = pitArea;

    calculate();
}


/**
 * Returns tonnes required per month.
 *
 * @param {string} cattleType The cattle type.
 * @return {array} Tonnes, Bales, months, cattle number and intake  per month.
 */
function stock(cattleType) {
    let cattle = document.getElementById(cattleType).value;
    let months = document.getElementById(cattleType + "-months").value;
    let intake = document.getElementsByClassName(cattleType + "-silage")[0].innerHTML;
    let tonnes = document.getElementsByClassName(cattleType + "-silage")[1];
    let bales = document.getElementsByClassName(cattleType + "-silage")[2];
    let output = [];

    //calculate silage required
    output.tonnes = parseInt(cattle * months * intake);
    output.bales = parseInt(tonnes.innerHTML / 0.8);
    output.cattle = cattle;
    output.months = months;
    output.intake = intake;

    tonnes.innerHTML = output.tonnes;
    bales.innerHTML = output.bales;
    return output;
}


/**
 * Total stock function.
 *
 * @return {array} Total tonnes and bales required per month.
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

    //calculate total silage requirement
    let totalTonnes = dairyTonnes + sucklerTonnes + heifersTonnes + weanlingsTonnes + storesTonnes;
    let totalBales = dairyBales + sucklerBales + heifersBales + weanlingsBales + storesBales;

    output.tonnes = totalTonnes;
    output.bales = totalBales;

    //update stock table
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
 * @return {array} m3, tonnes and bales silage in stock.
 */
function silageStock(silageType) {
    let silageQuantity = document.getElementById(silageType + "-stock").value;
    let tonnes = document.getElementsByClassName(silageType)[0];
    let bales = document.getElementsByClassName(silageType)[1];
    let output = [];

    //calculate pit m3 in equivelent tonnes and bales
    if (silageType == "pit") {
        output.bales = parseInt(silageQuantity * 0.77 / 0.8);
        output.tonnes = parseInt(silageQuantity * 0.77);
    }
    //calculate silage bales in equivelenat tonnes and bales
    else if (silageType == "bales") {
        output.bales = parseInt(silageQuantity);
        output.tonnes = parseInt(silageQuantity * 0.8);
    }
    output.amount = silageQuantity;

    tonnes.innerHTML = output.tonnes;
    bales.innerHTML = output.bales;
    return output;
}


/**
 * Total silage function.
 *
 * @return {array} Total tonnes of silage in stock bales and tonnes.
 */
function silageTotal() {
    let pitBales = silageStock("pit").bales;
    let bales = silageStock("bales").bales;
    let pitTonnes = silageStock("pit").tonnes;
    let baleTonnes = silageStock("bales").tonnes;

    //calculate total silage in stock
    let totalTonnes = pitTonnes + baleTonnes;
    let totalBales = pitBales + bales;
    let output = [];

    //function output
    output.tonnes = totalTonnes;
    output.bales = totalBales;

    //update silage table
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

    //calculate silage surplus/deficit
    let resultBales = parseInt(silageBales - stockBales);
    let resultTonnes = parseInt(silageTonnes - stockTonnes);

    //update outlook table
    document.getElementsByClassName("result")[0].innerHTML = resultTonnes;
    document.getElementsByClassName("result")[1].innerHTML = resultBales;

    //Style outlook table if deficit
    if (Math.sign(resultTonnes) == -1) {
        document.getElementById("surplus").innerHTML = "Deficit";
        document.getElementById("result-row").setAttribute("class", "deficit");
    }
    //Style outlook table if surplus
    else {
        document.getElementById("surplus").innerHTML = "Surplus";
        document.getElementById("result-row").setAttribute("class", "surplus");
    }

    //draw graph if !==0 else clear 
    if (silageTonnes !== 0 || stockTonnes !== 0) {
        google.charts.setOnLoadCallback(drawChart);
        document.getElementById("my-chart").style.display = "block";
    }
    else {
        document.getElementById("my-chart").style.display = "none";
    }
}


/**
 * Function to set active tab.
 *
 */
function openTab(e, tabName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    if (e != "reset") {
        document.getElementById(tabName).style.display = "block";
        e.currentTarget.className += " active";
    }
    else {
        // reset to default tab
        document.getElementsByClassName("tabcontent")[0].style.display = "block";
        document.getElementsByClassName("tablinks")[0].className += " active";
    }

}


//External Libraries

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

    const chart = new google.visualization.BarChart(document.getElementById('my-chart'));
    chart.draw(data, options);
}


/**
 * Generates a PDF from Table.
 * Using jsPDF and jsPDF-Autotable libraries
 */
function PDF() {
    let doc = new jsPDF();

    //Stock table to Array
    let stockHead = [['', 'Stock', 'Months', 't/months', 'Tonnes', 'Bales']];
    let stockBody = [
        ['Dairy Cows', stock('dairy').cattle, stock('dairy').months, 1.6, stock('dairy').tonnes, stock('dairy').bales],
        ['Suckler Cows', stock('suckler').cattle, stock('suckler').months, 1.4, stock('suckler').tonnes, stock('suckler').bales],
        ['In-Calf Heifers', stock('heifers').cattle, stock('heifers').months, 1.3, stock('heifers').tonnes, stock('heifers').bales],
        ['0-1 Years', stock('weanlings').cattle, stock('weanlings').months, 0.7, stock('weanlings').tonnes, stock('weanlings').bales],
        ['1-2 Years', stock('stores').cattle, stock('stores').months, 1.3, stock('stores').tonnes, stock('stores').bales],
        ['Total', '', '', '', stockTotal().tonnes, stockTotal().bales],
    ];

    //Silage table to Array
    let silageHead = [['', 'Amount', 'Tonnes', 'Bales']];
    let silageBody = [
        ['Silage Pit m3', silageStock('pit').amount, silageStock('pit').tonnes, silageStock('pit').bales],
        ['Silage Bales', silageStock('bales').amount, silageStock('bales').tonnes, silageStock('bales').bales],
        ['Total', '', silageTotal().tonnes, silageTotal().bales],
    ];


    doc.text(10, 20, 'Stock to be Housed');
    doc.autoTable({ head: stockHead, body: stockBody, startY: 25 });
    doc.text(10, 100, 'Silage Available');
    doc.autoTable({ head: silageHead, body: silageBody, startY: 105 });
    doc.text(10, 150, 'Winter Outlook');
    //Auto generate outlook table from HTML
    doc.autoTable({ html: '#results-table', startY: 155 });
    // open PDF in new window
    window.open(doc.output('bloburl'), '_blank');

}

