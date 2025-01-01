document.getElementById("playButton").addEventListener("click", function() {
    //Showing the game
    const startMenu = document.getElementById('startMenu');
    startMenu.style.display = 'none';
    document.getElementById("imageOverlay").style.display = "none";
    document.getElementById("stockbar").style.display = "block";
    document.getElementById("bankingInfo").style.display = "block";
    document.getElementById("portfolioInfo").style.display = "block";
    document.getElementById("upgrade").style.display = "flex";


    //initializing variables
    document.getElementById("salary").textContent = "150";
    salary = 150.00;
    document.getElementById("bankCash").textContent = "1500";
    bankCash = 1500.00;
    document.getElementById("cashToTrade").textContent = "0.00";
    document.getElementById("cashToTrade").textContent = "0.00";
    cashToTrade = 0.00;
    document.getElementById("colorProfit").style = "color: rgb(255, 207, 49)"
    document.getElementById("profitScale").textContent = "0.00";
    profitScale = 0.00;
    document.getElementById("percentageScale").textContent = "0.00";
    percentageScale = 0.00;
    document.getElementById("day").textContent = "0";
    day = 0;
    document.getElementById("salaryIncreaseCost").textContent = "250";
    salaryIncreaseCost = 250;
    document.getElementById("stockReliability").textContent = "53";
    stockReliability = 53;
    document.getElementById("stockReliabilityCost").textContent = "1000";
    stockReliabilityCost = 1000;
    document.getElementById("portfolioCash").textContent = "0.00";
    portfolioStockValue = 0.0;
    createStockData();
    stockUpperBound = 0.835;
    boundIncrease = 0.0;
    sharesAmount = 0;
    totalPortfolioNew = 0.0;
    totalPortfolioPrevious = 0.0;
    firstTime = 0;
    let availableShares = 0;
    //creates portfolioChart
    createChart(['Day -1'], [0], 'portfolioChart');
    days.push('day -1');
    updateRotatingStockData()
    portfolioValues.push(0);
});