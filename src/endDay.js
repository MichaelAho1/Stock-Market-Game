document.getElementById("dayButton").addEventListener("click", function() {
    day++;
    if (portfolioValues.length > 364) {
        days = [];
        portfolioValues = [];
    }
    bankCash += salary;
    previousStockValue = stocks;
    document.getElementById("day").textContent = day;
    updateStockData();
    updatePurchasedStocks();
    updatePortfolioInformation();
    updateRotatingStockData();
    days.push(day); 
    portfolioValues.push(totalPortfolioNew);
    updateChart(days, portfolioValues);
    document.getElementById("accountCash").textContent = bankCash.toFixed(2);
    document.getElementById("bankCash").textContent = bankCash.toFixed(2);
    if (day > 365) {
        endGame();
    }
});