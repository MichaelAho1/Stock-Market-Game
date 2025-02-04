/*
Updates all Portfolio Information. Using the previous days portfolio Value and current days portfolio Value to update 
the portfolios daily profit (red for -profit and green for +profit).
*/
function updatePortfolioInformation() {
    let totalPortfolioValue = 0; 
    let purchaseItems = document.querySelectorAll('.purchase-item');

    purchaseItems.forEach(function(item) {
        let stockName = item.querySelector('.stock-name').textContent;
        let stockShares = parseInt(item.querySelector('.stock-shares span').textContent);
        

        let stockIndex = stockNames.indexOf(stockName);
        let stockPrice = stocks[stockIndex];
        
        totalPortfolioValue += stockPrice * stockShares;
    });
    totalPortfolioNew = totalPortfolioValue + cashToTrade;
    document.getElementById("portfolioCash").textContent = (totalPortfolioNew).toFixed(2);
    let dayDifference = totalPortfolioNew - totalPortfolioPrevious;
    document.getElementById("profitScale").textContent = dayDifference.toFixed(2);
    if(totalPortfolioPrevious < 1) { //If there is not any previous value in the portfolio
        document.getElementById("percentageScale").textContent = dayDifference.toFixed(2);
    } else {
        let percent = ((dayDifference) / totalPortfolioPrevious) * 100;
        document.getElementById("percentageScale").textContent = percent.toFixed(2);
        if(percent > 0) {
            document.getElementById("colorProfit").style.color = 'green';
        } else {
            document.getElementById("colorProfit").style.color = 'red';
        }
    }
    totalPortfolioPrevious = totalPortfolioNew;
}

//Updates all the users stocks (each div element that was created when a user bought a stock).
function updatePurchasedStocks() {
    const purchasedItems = document.getElementsByClassName('purchase-item');
    Array.from(purchasedItems).forEach(item => {
        const stockName = item.querySelector('.stock-name').textContent;
        for(let i = 0; i < stocks.length; i++) {
            if (stockName == stockNames[i]) {
                const currentStockPrice = stocks[i];
                item.querySelector('.stock-cost').textContent = `$${currentStockPrice}`;
            }
        }
    });
}

// Updates all the stocks information at the top of the page.
function updateRotatingStockData() {
    const boxes = document.querySelectorAll('#moving .box');
    let count = 0;
    boxes.forEach(box => {
        const name = box.childNodes[0].nodeValue.trim();
        box.childNodes[2].nodeValue = stocks[count];
        const span = box.querySelector('span');
        if(calledBefore != false) {
            let percentage = (((stocks[count] - previousStockValue[count]) / previousStockValue[count]) * 100).toFixed(2);
            span.textContent = `${percentage}%`;
            if (percentage > 0) {
                span.style.color = 'green';
            } else {
                span.style.color = 'red';
            }
        }
        count++;
    });
    calledBefore = true;
}

//Updates the 10 stocks with new values bases on a random selection that is slightly favored to increase.
function updateStockData() {
    const stockItems = document.querySelectorAll('.stockItem');
    let temp = [];
    let total = 0;
    let count = 0;
    let dayChange = 0;
    stockItems.forEach(stockItem => {
        let updatedValue = (stocks[count] * (Math.random() * 0.35 + stockUpperBound)).toFixed(2);
        temp.push(updatedValue);
        if(day === 1) {
            dayChange = (Number(updatedValue) - Number(stocks[count])).toFixed(2);
        } else {
            dayChange = (Number(updatedValue) - Number(oldStockValues[count])).toFixed(2);
        }
        total += parseFloat(updatedValue);
        const stockValueButton = stockItem.querySelector('.stockValue');
        stockValueButton.textContent = updatedValue;
        const stockValueChange = stockItem.querySelector('.dayChange')
        stockValueChange.textContent = "$" + dayChange;
        if(dayChange < 0) {
            stockValueChange.style.color = 'red';
        } else {
            stockValueChange.style.color = 'green';
        }
        count++;
    });
    oldStockValues = temp;
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