//Creates completely random stock data for each of the stocks (100 - 1000).
function createStockData()  {
    let temp = 0;
    const stockItems = document.querySelectorAll('.stockItem');
    stockItems.forEach(stockItem => {
        let startValue = ((Math.random() * 901) + 20).toFixed(2);
        temp += parseFloat(startValue);
        stocks.push(startValue);
        const stockValueButton = stockItem.querySelector('.stockValue');
        stockValueButton.textContent = startValue.toString();
    });
    document.getElementById("totalMarket").textContent = temp.toFixed(2);
    marketTotalPrevious = temp.toFixed(2);
}

//Updates the 10 stocks with new values bases on a random selection that is slightly favored to increase.
function updateStockData() {
    const stockItems = document.querySelectorAll('.stockItem');
    let temp = [];
    let total = 0;
    let count = 0;
    stockItems.forEach(stockItem => {
        let updatedValue = (stocks[count] * (Math.random() * 0.35 + stockUpperBound)).toFixed(2);
        temp.push(updatedValue);
        total += parseFloat(updatedValue);
        const stockValueButton = stockItem.querySelector('.stockValue');
        stockValueButton.textContent = updatedValue.toString();
        count++;
    });
    document.getElementById("totalMarket").textContent = total.toFixed(2);
    marketTotalNew = total.toFixed(2); 
    let marketDifference = marketTotalNew - marketTotalPrevious;
    let marketPercentage = (((marketTotalNew - marketTotalPrevious) / marketTotalPrevious) * 100);
    document.getElementById("totalMarketPercentage").textContent = marketPercentage.toFixed(2);
    document.getElementById("totalMarketDifference").textContent = marketDifference.toFixed(2);
    let marketMovementElement = document.getElementById("marketMovement");
    if(marketDifference > 0) {
        marketMovementElement.classList.remove('negative');
        marketMovementElement.classList.add('positive');
    } else {
        marketMovementElement.classList.remove('positive');
        marketMovementElement.classList.add('negative');
    }
    marketTotalPrevious = marketTotalNew;
    stocks = temp;
}