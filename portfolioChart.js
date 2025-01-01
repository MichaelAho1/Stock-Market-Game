// Create the portfolio chart with the x value being the days and the y value being that portfolios value for that day.
function createChart(days, values, chartType) {
    const ctx = document.getElementById(chartType).getContext('2d');
    const fakeData = {
        labels: days,
        datasets: [{
            data: values,
            borderColor: 'rgb(76, 175, 80)',
            borderWidth: 2,
            fill: false
        }]
    };
    const config = {
        type: 'line',
        data: fakeData,
        options: {
            animation: false, 
            scales: {
                x: { display: false },  
                y: { display: true }
            },
            plugins: {
                legend: { display: false }, 
                tooltip: { enabled: false }
            },
            elements: {
                point: { radius: 0 },
                line: { tension: 0 }  
            }
        }
    };
    
    portfolioChart = new Chart(ctx, config); 
}

// Updates the chart with new and relevant data.
function updateChart(newDays, newValues) {
    if (portfolioChart) {
        portfolioChart.data.labels = newDays;
        portfolioChart.data.datasets[0].data = newValues;
        portfolioChart.update();
    }
}