// google token prod
var google_access_token = "AIzaSyCL-2h1wEWTB6lmVZGHVX7Z6j92pBzw9YE";

// load google charts
google.charts.load('current', {
    'packages':['corechart', 'geochart'],
    'mapsApiKey': google_access_token
});

// define variables
var $covidSummary = $('#covidSummary');

var $worldNewConfirmed = $('#worldNewConfirmed');
var $worldTotalConfirmed = $('#worldTotalConfirmed');
var $worldNewDeaths = $('#worldNewDeaths');
var $worldTotalDeaths = $('#worldTotalDeaths');
var $worldNewRecovered = $('#worldNewRecovered');
var $worldTotalRecovered = $('#worldTotalRecovered');

var $worldTotalChart = $('#worldTotalChart');
var $worldStackedChart = $('#worldStackedChart');

var $ratioOfRecovery = $('#ratioOfRecovery');
var $ratioOfRecoveryChart = $('#ratioOfRecoveryChart');
var $ratioWorldTotalConfirmed = $('#ratioWorldTotalConfirmed');
var $ratioWorldTotalRecovered = $('#ratioWorldTotalRecovered');

var $countryTable = $('#countryTable');
var $countryDetails = $('#countryDetails');

var $country = $('#country');
var $newConfirmed = $('#newConfirmed');
var $totalConfirmed = $('#totalConfirmed');
var $newDeaths = $('#newDeaths');
var $totalDeaths = $('#totalDeaths');
var $newRecovered = $('#newRecovered');
var $totalRecovered = $('#totalRecovered');

var $countryCasesChart = $('#countryCasesChart');

var $top5NewConfirmed = $('#top5NewConfirmed');
var $top5TotalConfirmed = $('#top5TotalConfirmed');
var $top5NewDeaths = $('#top5NewDeaths');
var $top5TotalDeaths = $('#top5TotalDeaths');
var $top5NewRecovered = $('#top5NewRecovered');
var $top5TotalRecovered = $('#top5TotalRecovered');

// clear data
function clearData() {
    $covidSummary.html('');
    $worldNewConfirmed.html('');
    $worldTotalConfirmed.html('');
    $worldNewDeaths.html('');
    $worldTotalDeaths.html('');
    $worldNewRecovered.html('');
    $worldTotalRecovered.html('');

    $ratioOfRecovery.html('');
    $ratioOfRecoveryChart.html('');
    $ratioWorldTotalConfirmed.html('');
    $ratioWorldTotalRecovered.html('');

    $top5NewConfirmed.html('');
    $top5TotalConfirmed.html('');
    $top5NewDeaths.html('');
    $top5TotalDeaths.html('');
    $top5NewRecovered.html('');
    $top5TotalRecovered.html('');
};

// covid summary
function getCovidSummary() {
    covidSummaryUrl = ('https://api.covid19api.com/summary');
    $.getJSON(covidSummaryUrl, function(covidSummaryResults) {
        console.log('Covid summary results:');
        console.log(covidSummaryResults);
        if (covidSummaryResults.Countries.length > 0) {
            var worldNewConfirmed = 0;
            var worldTotalConfirmed = 0;
            var worldNewDeaths = 0;
            var worldTotalDeaths = 0;
            var worldNewRecovered = 0;
            var worldTotalRecovered = 0;

            for (i=0; i < covidSummaryResults.Countries.length; i++) {
                var country = covidSummaryResults.Countries[i].Country;
                var countrySlug = covidSummaryResults.Countries[i].Slug;
                var newConfirmed = covidSummaryResults.Countries[i].NewConfirmed;
                var totalConfirmed = covidSummaryResults.Countries[i].TotalConfirmed;
                var newDeaths = covidSummaryResults.Countries[i].NewDeaths;
                var totalDeaths = covidSummaryResults.Countries[i].TotalDeaths;
                var newRecovered = covidSummaryResults.Countries[i].NewRecovered;
                var totalRecovered = covidSummaryResults.Countries[i].TotalRecovered;

                worldNewConfirmed += newConfirmed;
                worldTotalConfirmed += totalConfirmed;
                worldNewDeaths += newDeaths;
                worldTotalDeaths += totalDeaths;
                worldNewRecovered += newRecovered;
                worldTotalRecovered += totalRecovered;

                $covidSummary.append(
                    `<tr><td><button class="btn btn-link covid-btn-link" onclick="getCountryDetails('` 
                        + country + `','`
                        + countrySlug + `','`
                        + totalConfirmed + `','`
                        + totalDeaths + `','`
                        + totalRecovered + `','`
                        + newConfirmed + `','`
                        + newDeaths + `','`
                        + newRecovered
                        + `')">` + country + `</button>` + 
                    '</td><td class="covid-hide-mobile">' + totalConfirmed + 
                    '</td><td class="covid-hide-mobile">' + totalDeaths + 
                    '</td><td class="covid-hide-mobile">' + totalRecovered + 
                    '</td><td class="covid-hide-mobile">' + newConfirmed + 
                    '</td><td class="covid-hide-mobile">' + newDeaths +
                    '</td><td class="covid-hide-mobile">' + newRecovered +
                    '</td></tr>');
            }

            $worldNewConfirmed.append(worldNewConfirmed.toLocaleString());
            $worldTotalConfirmed.append(worldTotalConfirmed.toLocaleString());
            $worldNewDeaths.append(worldNewDeaths.toLocaleString());
            $worldTotalDeaths.append(worldTotalDeaths.toLocaleString());
            $worldNewRecovered.append(worldNewRecovered.toLocaleString());
            $worldTotalRecovered.append(worldTotalRecovered.toLocaleString());

            $ratioWorldTotalConfirmed.append(formatNumber(worldTotalConfirmed));
            $ratioWorldTotalRecovered.append(formatNumber(worldTotalRecovered));

            var top5NewConfirmed = find5Largest(covidSummaryResults.Countries, 'NewConfirmed');
            var top5TotalConfirmed = find5Largest(covidSummaryResults.Countries, 'TotalConfirmed');
            var top5NewDeaths = find5Largest(covidSummaryResults.Countries, 'NewDeaths');
            var top5TotalDeaths = find5Largest(covidSummaryResults.Countries, 'TotalDeaths');
            var top5NewRecovered = find5Largest(covidSummaryResults.Countries, 'NewRecovered');
            var top5TotalRecovered = find5Largest(covidSummaryResults.Countries, 'TotalRecovered');

            for (var i=0; i < 5; i++) {
                var num = i + 1;

                if (top5NewConfirmed[i].Country == "United States of America") {
                    top5NewConfirmed[i].Country = "United States";
                }
                if (top5TotalConfirmed[i].Country == "United States of America") {
                    top5TotalConfirmed[i].Country = "United States";
                }
                if (top5NewDeaths[i].Country == "United States of America") {
                    top5NewDeaths[i].Country = "United States";
                }
                if (top5TotalDeaths[i].Country == "United States of America") {
                    top5TotalDeaths[i].Country = "United States";
                }
                if (top5NewRecovered[i].Country == "United States of America") {
                    top5NewRecovered[i].Country = "United States";
                }
                if (top5TotalRecovered[i].Country == "United States of America") {
                    top5TotalRecovered[i].Country = "United States";
                }

                $top5NewConfirmed.append('<div class="row covid-list"><div class="col-8"><span class="covid-top-5"><div class="covid-top-5-num">' + num + '</div>' + top5NewConfirmed[i].Country + '</span></div><div class="col-4">' + top5NewConfirmed[i].NewConfirmed.toLocaleString() + '</div></div>');
                $top5TotalConfirmed.append('<div class="row covid-list"><div class="col-8"><span class="covid-top-5"><div class="covid-top-5-num">' + num + '</div>' + top5TotalConfirmed[i].Country + '</span></div><div class="col-4">' + top5TotalConfirmed[i].TotalConfirmed.toLocaleString() + '</div></div>');
                $top5NewDeaths.append('<div class="row covid-list"><div class="col-8"><span class="covid-top-5"><div class="covid-top-5-num">' + num + '</div>' + top5NewDeaths[i].Country + '</span></div><div class="col-4">' + top5NewDeaths[i].NewDeaths.toLocaleString() + '</div></div>');
                $top5TotalDeaths.append('<div class="row covid-list"><div class="col-8"><span class="covid-top-5"><div class="covid-top-5-num">' + num + '</div>' + top5TotalDeaths[i].Country + '</span></div><div class="col-4">' + top5TotalDeaths[i].TotalDeaths.toLocaleString() + '</div></div>');
                $top5NewRecovered.append('<div class="row covid-list"><div class="col-8"><span class="covid-top-5"><div class="covid-top-5-num">' + num + '</div>' + top5NewRecovered[i].Country + '</span></div><div class="col-4">' + top5NewRecovered[i].NewRecovered.toLocaleString() + '</div></div>');
                $top5TotalRecovered.append('<div class="row covid-list"><div class="col-8"><span class="covid-top-5"><div class="covid-top-5-num">' + num + '</div>' + top5TotalRecovered[i].Country + '</span></div><div class="col-4">' + top5TotalRecovered[i].TotalRecovered.toLocaleString() + '</div></div>');
            }

            var ratioOfRecovery = ((worldTotalRecovered/worldTotalConfirmed)*100).toFixed(1);
            console.log(ratioOfRecovery);
            $ratioOfRecovery.append(ratioOfRecovery);

            var totalMinusRecovered = worldTotalConfirmed - worldTotalRecovered;
            drawRatioChart(worldTotalRecovered, totalMinusRecovered);

            drawTotalChart(worldTotalConfirmed,worldTotalDeaths,worldTotalRecovered);
            drawStackedChart(worldTotalConfirmed,worldTotalDeaths,worldTotalRecovered,worldNewConfirmed,worldNewDeaths,worldNewRecovered)
            
            drawWorldMap(covidSummaryResults.Countries, 'TotalConfirmed', 'totalCasesMap');
            drawWorldMap(covidSummaryResults.Countries, 'TotalDeaths', 'totalDeathsMap');
            drawWorldMap(covidSummaryResults.Countries, 'TotalRecovered', 'totalRecoveredMap');
            drawWorldMap(covidSummaryResults.Countries, 'NewConfirmed', 'newCasesMap');
            drawWorldMap(covidSummaryResults.Countries, 'NewDeaths', 'newDeathsMap');
            drawWorldMap(covidSummaryResults.Countries, 'NewRecovered', 'newRecoveredMap');
        }
        else {
            $covidSummary.append('No results found.');
        }
    });
};

// get country details
function getCountryDetails(country, countrySlug, totalConfirmed, totalDeaths, totalRecovered, newConfirmed, newDeaths, newRecovered) {
    $country.append(country);
    $newConfirmed.append(Number(newConfirmed).toLocaleString());
    $totalConfirmed.append(Number(totalConfirmed).toLocaleString());
    $newDeaths.append(Number(newDeaths).toLocaleString());
    $totalDeaths.append(Number(totalDeaths).toLocaleString());
    $newRecovered.append(Number(newRecovered).toLocaleString());
    $totalRecovered.append(Number(totalRecovered).toLocaleString());

    $countryDetails.toggleClass('d-none');
    $countryTable.toggleClass('d-none');
    
    countryDetailsUrl = ('https://api.covid19api.com/total/country/' + countrySlug + '/status/confirmed');
    $.getJSON(countryDetailsUrl, function(countryDetailsResults) {
        console.log('Country details results:');
        console.log(countryDetailsResults);
        if (countryDetailsResults.length > 0) {
            var countryArr = [];

            for (i=0; i < countryDetailsResults.length; i++) {
                var date = countryDetailsResults[i].Date;
                var cases = countryDetailsResults[i].Cases;

                countryArr.push({"date": date, "cases": cases});
            }
        
            drawCountryCasesChart(countryArr);                      
            drawStackedChart(Number(totalConfirmed),Number(totalDeaths),Number(totalRecovered),Number(newConfirmed),Number(newDeaths),Number(newRecovered));
        }
        else {
            return;
        }
    });
};

// get country table
function getCountryTable() {
    $country.html('');
    $newConfirmed.html('');
    $totalConfirmed.html('');
    $newDeaths.html('');
    $totalDeaths.html('');
    $newRecovered.html('');
    $totalRecovered.html('');

    $worldStackedChart.html('');
    $countryCasesChart.html('');
    
    $countryDetails.toggleClass('d-none');
    $countryTable.toggleClass('d-none');
};

// draw worldwide total bar chart
function drawTotalChart(totalConfirmed, totalDeaths, totalRecovered) {
    var data = google.visualization.arrayToDataTable([
        ['Statistic', 'Count', { role: 'style' }],
        ['Total Cases', totalConfirmed, 'color: #4455AB'],
        ['Total Deaths', totalDeaths, 'color: rgb(236, 152, 187)'],
        ['Total Recovered', totalRecovered, 'color: rgb(14, 187, 187)']
    ]);

    var options = {
        hAxis: {
            title: 'Count'
        },
        colors: ['#4455AB'],
        legend: 'none',
        chartArea: {'top':'10%'}
    };

    var element = document.getElementById('worldTotalChart');
    if (typeof(element) != 'undefined' && element != null) {
        var chart = new google.visualization.BarChart(document.getElementById('worldTotalChart'));
        chart.draw(data, options);
    };
};

// draw stacked total + new chart
function drawStackedChart(totalConfirmed, totalDeaths, totalRecovered, newConfirmed, newDeaths, newRecovered) {
    var knownConfirmed = totalConfirmed - newConfirmed;
    var knownDeaths = totalDeaths - newDeaths;
    var knownRecovered = totalRecovered - newRecovered;
    
    var data = google.visualization.arrayToDataTable([
        ['Statistic', 'Known', { role: 'style' }, 'New', { role: 'style' }],
        ['Total Cases', knownConfirmed, 'color: #4455AB;', newConfirmed, 'color: #4455AB; opacity: .5;'],
        ['Total Deaths', knownDeaths, 'color: rgb(236, 152, 187)', newDeaths, 'color: rgb(236, 152, 187); opacity: .5;'],
        ['Total Recovered', knownRecovered, 'color: rgb(14, 187, 187)', newRecovered, 'color: rgb(14, 187, 187); opacity: .5;'],
    ]);

    var options = {
        hAxis: {
            title: 'Count'
        },
        legend: 'none',
        chartArea: {'top':'10%', 'width':'85%', 'right':'5%'},
        isStacked: true,
        height: 275
    };

    var element = document.getElementById('worldStackedChart');
    if (typeof(element) != 'undefined' && element != null) {
        var chart = new google.visualization.BarChart(document.getElementById('worldStackedChart'));
        chart.draw(data, options);
    };
};

// draw country cases line chart
function drawCountryCasesChart(countryArr) {
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Date');
    data.addColumn('number', 'Cases');

    for (i=0; i< countryArr.length; i++) {
        data.addRow(
            [formatDate(countryArr[i].date), countryArr[i].cases]
        );
    }

    var options = {
        vAxis: {
            title: 'Cases'
        },
        colors: ['#4455AB'],
        legend: 'none',
        chartArea: {'right':'0', 'width':'90%'}
    };

    var element = document.getElementById('countryCasesChart');
    if (typeof(element) != 'undefined' && element != null) {
        var chart = new google.visualization.AreaChart(document.getElementById('countryCasesChart'));
        chart.draw(data, options);
    };
};

// draw world map
function drawWorldMap(countriesArr, property, elementId) {
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Country');
    data.addColumn('number', 'Cases');

    for (i=0; i< countriesArr.length; i++) {
        if (countriesArr[i].country == "United States of America") {
            countriesArr[i].country = "United States";
        }

        data.addRow(
            [countriesArr[i].Country, countriesArr[i][property]]
        );
    }

    var options = {
        colorAxis: {colors: ['#DADDEE', '#4455AB']},
        backgroundColor: '#f1f3f9'
    };

    var element = document.getElementById(elementId);
    if (typeof(element) != 'undefined' && element != null) {
        var chart = new google.visualization.GeoChart(document.getElementById(elementId));
        chart.draw(data, options);
    };
};

// draw ratio chart
function drawRatioChart(value1, value2) {
    var data = new google.visualization.arrayToDataTable([
        ['Ratio', 'Percent'],
        ['Recovered', value1],
        ['Not Recovered', value2],
    ]);

    var options = {
        pieHole: 0.7,
        legend: 'none',
        colors: ['#4455AB', '#f1f3f9'],
        chartArea: {'width': '100%', 'height': '100%'},
        pieSliceText: 'none'
    };

    var element = document.getElementById('ratioOfRecoveryChart');
    if (typeof(element) != 'undefined' && element != null) {
        var chart = new google.visualization.PieChart(document.getElementById('ratioOfRecoveryChart'));
        chart.draw(data, options);
    };
};

// find 5 largest values in array
function find5Largest(arr, property) { 
    arr.sort((a, b) => (a[property] < b[property]) ? 1 : -1)   
    return arr.slice(0,5);
} 
  
// create trigger to resizeEnd event     
$(window).resize(function() {
    if(this.resizeTO) clearTimeout(this.resizeTO);
    this.resizeTO = setTimeout(function() {
        $(this).trigger('resizeEnd');
    }, 500);
});

// call function when window resize is completed  
$(window).on('resizeEnd', function() {
    reloadData();
});

// toggle sidebar
function toggleSidebar() {
    $("#covid-wrapper").toggleClass("toggled");
    setTimeout(reloadData, 250);
}

// reload data
function reloadData() {
    clearData();
    getCovidSummary();
}

// country lookup search
$("#searchCountries").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#covidSummary tr").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
});

// table sort
$('th').click(function() {
    var table = $(this).parents('table').eq(0);
    var rows = table.find('tr:gt(0)').toArray().sort(comparer($(this).index()));
    this.asc = !this.asc;
    
    if (!this.asc) {
        rows = rows.reverse();
    }
    
    for (var i = 0; i < rows.length; i++) {
        table.append(rows[i]);
    }
});

function comparer(index) {
    return function(a, b) {
        var valA = getCellValue(a, index);
        var valB = getCellValue(b, index);
        return $.isNumeric(valA) && $.isNumeric(valB) ? valA - valB : valA.toString().localeCompare(valB);
    }
};

function getCellValue(row, index) { 
    return $(row).children('td').eq(index).text() 
};

// format date
function formatDate(unformattedDate) {
    var date = new Date(unformattedDate);
    return (date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1)) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear();
}

// format large numbers
function formatNumber(number) {
    // 9 zeroes for bil
    return Math.abs(Number(number)) >= 1.0e+9
    ? (Math.abs(Number(number)) / 1.0e+9).toFixed(2) + "B"

    // 6 zeroes for mil
    : Math.abs(Number(number)) >= 1.0e+6
    ? (Math.abs(Number(number)) / 1.0e+6).toFixed(2) + "M"
    
    // 3 zerose for thousands
    : Math.abs(Number(number)) >= 1.0e+3
    ? (Math.abs(Number(number)) / 1.0e+3).toFixed(2) + "K"
    : Math.abs(Number(number));
};

// load data on page load
$(document).ready(function() {
    getCovidSummary();
});
