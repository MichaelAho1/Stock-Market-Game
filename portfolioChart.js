// Create the portfolio chart with the x value being the days and the y value being that portfolios value for that day.
function createChart(days, values, chartType) {
    const ctx = document.getElementById(chartType).getContext('2d');
    const fakeData = {
        labels: days,
        datasets: [{
            data: values,
            borderColor: '#4CAF50',
            borderWidth: 2,
            fill: true,
            backgroundColor: 'rgba(76, 175, 80, 0.1)',
            tension: 0.4,
            pointRadius: 0,
            pointHoverRadius: 6,
            pointBackgroundColor: '#4CAF50',
            pointHoverBackgroundColor: '#fff',
            pointBorderColor: '#4CAF50',
            pointHoverBorderColor: '#4CAF50',
            pointBorderWidth: 2,
            pointHoverBorderWidth: 2
        }]
    };
    const config = {
        type: 'line',
        data: fakeData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 750,
                easing: 'easeInOutQuart'
            },
            scales: {
                x: { 
                    display: true,
                    grid: {
                        display: false,
                        drawBorder: false
                    },
                    ticks: {
                        color: '#888',
                        font: {
                            size: 10
                        },
                        maxTicksLimit: 8
                    }
                },
                y: { 
                    display: true,
                    position: 'right',
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)',
                        drawBorder: false
                    },
                    ticks: {
                        color: '#888',
                        font: {
                            size: 10
                        },
                        callback: function(value) {
                            return '$' + value.toLocaleString();
                        }
                    }
                }
            },
            plugins: {
                legend: { 
                    display: false 
                },
                tooltip: {
                    enabled: true,
                    mode: 'index',
                    intersect: false,
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#4CAF50',
                    titleFont: {
                        size: 13,
                        weight: 'bold'
                    },
                    bodyColor: '#fff',
                    bodyFont: {
                        size: 12
                    },
                    padding: 10,
                    cornerRadius: 4,
                    displayColors: false,
                    callbacks: {
                        label: function(context) {
                            return '$' + context.parsed.y.toLocaleString();
                        }
                    }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
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