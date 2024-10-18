let day;
let percentageScale;
let profitScale;
let cashToTrade;
let bankCash;
let salary;
let salaryIncreaseCost;
let stockReliability;
let stockReliabilityCost;
let transferType = "Deposit";
let days = [];
let portfolioValues = [];
let portfolioChart;
let portfolioStockValue;
let totalMarketChart;
let stocks = [];
let stockNames = ['DAVE', 'GOOGL', 'GDM', 'VTS', 'OPPL', 'MFLX', 'META', 'NVDO', 'OAL', 'V'];
let tracker = false;
let stockUpperBound;
let sharesAmount;
let sharesBought;
let previousStockValue;
let marketTotalPrevious;
let marketTotalNew;
let totalPortfolioNew;
let totalPortfolioPrevious;
let firstTime;
let calledBefore = false;
availableShares;

//Start The game and initializes the variables
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


//ending Day increases salary and increases the day.
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

function endGame() {
    const endGameModal = document.getElementById("endGameModal");
    const finalPortfolioValue = document.getElementById("finalPortfolioValue");
    const finalBankCash = document.getElementById("finalBankCash");
    const totalDaysPlayed = document.getElementById("totalDaysPlayed");
    const totalSalaryEarned = document.getElementById("totalSalaryEarned");
    const total = totalPortfolioNew +  bankCash;
    if(total > 1000000) {
        document.getElementById("finalMessage").textContent = "Congratulations! You were able to become a millionaire!";
    } else {
        document.getElementById("finalMessage").textContent = "Better luck next time! You were not able to become a millionaire";
    }
    totalString = total.toString();
    document.getElementById("netWorth").textContent = `Your final networth was $${totalString}`;
    finalPortfolioValue.textContent = `$${totalPortfolioNew.toFixed(2)}`;
    finalBankCash.textContent = `$${bankCash.toFixed(2)}`;
    totalDaysPlayed.textContent = day;
    totalSalaryEarned.textContent = `$${salary * day}`; 
    endGameModal.style.display = 'flex';

    document.getElementById("restartButton").addEventListener('click', function() {
        location.reload();
    });
}


//Opening upgrades menu.
document.getElementById('upgradeButton').addEventListener('click', function() {
    document.getElementById('upgradeModal').style.display = 'block';
});

//Closes upgrades menu.
document.querySelectorAll('.close').forEach(closeButton => {
    closeButton.addEventListener('click', function() {
        this.closest('.modal').style.display = 'none';
    });
});

//Closes the Transfer menu.
document.querySelectorAll('.close2').forEach(closeButton => {
    closeButton.addEventListener('click', function() {
        this.closest('.modal2').style.display = 'none';
    });
});

//Increases the salary whenever a user buys the upgrade (limited at 500).
document.getElementById("salaryIncreaseButton").addEventListener("click", function() {
    if(bankCash - salaryIncreaseCost > 0 && salary < 500) {
        bankCash -= salaryIncreaseCost;
        salary += Math.round(salaryIncreaseCost / 40);
        salaryIncreaseCost *= 2;
        if (salary > 500) {
            salary = 500;
            document.getElementById("increaseButtonCap").innerHTML = '<span style="color: darkgreen; font-weight: bold;">Max Salary Achieved</span>';
        } else {
            document.getElementById("salaryIncreaseCost").textContent = salaryIncreaseCost;
        }
        document.getElementById("salary").textContent = salary;
        document.getElementById("bankCash").textContent = bankCash;
    }
});

//Increases the chance of a stock going up. Also increases the price for this upgrade.
document.getElementById("stockReliabilityButton").addEventListener("click", function() {
    if(bankCash - stockReliabilityCost > 0 && stockReliability < 70) {
        bankCash -= stockReliabilityCost;
        stockReliabilityCost *= 1.5;
        stockReliability += 1;
        stockUpperBound += 0.001; 
        document.getElementById("stockReliabilityCost").textContent = stockReliabilityCost;
        document.getElementById("stockReliability").textContent = stockReliability;
        document.getElementById("bankCash").textContent = bankCash;
    }
});

//Opens the transfer funds Menu.
document.getElementById('transferButton').addEventListener('click', function() {
    document.getElementById('transferModal').style.display = 'block';
});

// If the user selects deposit this function will change the name of the transfer button and change the colors so it correlates with the type of transaction.
// Also changes the cash available header to how much cash is in there bank account.
document.getElementById("depositButton").addEventListener('click', function() {
    document.getElementById("depositButton").style.backgroundColor = "rgb(76, 175, 80)";
    document.getElementById("withdrawButton").style.backgroundColor = "gray";
    document.getElementById("transferConfirmed").style.backgroundColor = "rgb(76, 175, 80)";
    document.getElementById("transferConfirmed").textContent = "Deposit";
    document.getElementById("accountCash").textContent = bankCash;
    transferType = "Deposit";
});

// If the user selects withdraw this function will change the name of the transfer button and change the colors so it correlates with the type of transaction.
// Also changes the cash available header to how much cash is in there portfolio.
document.getElementById("withdrawButton").addEventListener('click', function() {
    document.getElementById("withdrawButton").style.backgroundColor = "rgb(255, 152, 0)";
    document.getElementById("depositButton").style.backgroundColor = "gray";
    document.getElementById("transferConfirmed").style.backgroundColor = "rgb(255, 152, 0)";
    document.getElementById("transferConfirmed").textContent = "Withdraw";
    document.getElementById("accountCash").textContent = cashToTrade;
    transferType = "Withdraw";
});


/* 
After the user inputs a certain amount of money this function will transfer
money from their checking account to their portfolio or vice versa (depends on if they selected withraw or deposit).
The modal also has a cash available header that is updated depending on how the user has in there bank account or portfolio.
*/ 
document.getElementById("transferConfirmed").addEventListener('click', function() {
    if(transferType == "Deposit") {
        let depositAmount = parseInt(document.getElementById("amountInput").value);
        if(depositAmount <= bankCash && depositAmount > 0) {
            bankCash -= depositAmount;
            cashToTrade += depositAmount;
            document.getElementById("cashToTrade").textContent = cashToTrade.toFixed(2);
            document.getElementById("portfolioCash").textContent = cashToTrade + portfolioStockValue;
            document.getElementById("bankCash").textContent = bankCash.toFixed(2);
            document.getElementById("accountCash").textContent = bankCash.toFixed(2);
            document.querySelector('.modal2').style.display = 'none';
            updatePortfolioInformation();
        }
    } else {
        let withdrawAmount = parseInt(document.getElementById("amountInput").value);
        if(withdrawAmount <= cashToTrade && withdrawAmount > 0) {
            cashToTrade -= withdrawAmount;
            bankCash += withdrawAmount;
            document.getElementById("cashToTrade").textContent = cashToTrade.toFixed(2);
            document.getElementById("bankCash").textContent = bankCash;
            document.getElementById("portfolioCash").textContent = cashToTrade + portfolioStockValue;
            document.getElementById("accountCash").textContent = cashToTrade.toFixed(2);
            document.querySelector('.modal2').style.display = 'none';
            updatePortfolioInformation();
        }
    }
});

//Opens the TradeModal.
document.getElementById("tradeButton").addEventListener('click', function() {
    const tradeModal = document.getElementById('tradeModal');
    tradeModal.style.display = 'block';  
});

//Closes the Trading Menu.
document.querySelectorAll('.close3').forEach(closeButton => {
    closeButton.addEventListener('click', function() {
        this.closest('.modal3').style.display = 'none';
    });
});

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

//This method creates each of the stocks sell/buy modal when a user selects a stock in the Trade stocks menu
document.addEventListener("DOMContentLoaded", function() {
    const stockItems = document.querySelectorAll('.stockItem'); 
    const stockModal = document.querySelector('.stockModal'); 
    const closeModal = document.querySelector('.stockModal .close'); 
    stockItems.forEach(stockItem => {
        stockItem.addEventListener('click', function() {
            const stockName = this.querySelector('.stockDetails h1').textContent; 
            const stockPrice = this.querySelector('.stockValue').textContent; 
            
            document.getElementById('modal-stock-name').textContent = stockName;
            document.getElementById('modal-stock-price').textContent = stockPrice;
            document.getElementById('portfolioCash2').textContent = (cashToTrade.toFixed(2)).toString() ;

            stockModal.style.display = 'block';
        });
    });
    closeModal.addEventListener('click', function() {
        stockModal.style.display = 'none';
    });
});

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
    if(marketDifference > 0) {
        document.getElementById("marketMovement").style.color = 'green';
    } else {
        document.getElementById("marketMovement").style.color = 'red';
    }
    marketTotalPrevious = marketTotalNew;
    stocks = temp;
}

//Updates the estimated cost while the user is picking how many shares their going to pick.
document.getElementById('sharesInput').addEventListener('input', function() {
    let stockPrice = parseFloat(document.getElementById('modal-stock-price').textContent);
    let finalPrice = stockPrice * this.value;
    sharesAmount = this.value;
    document.getElementById('estimatedCost').textContent = finalPrice.toFixed(2);
});

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

/*
After a user selects sell this function will decrement the share amount according to the users input.
If their is no shares left it will delete that div element. The function also updates all the portfolio Information.
*/
document.getElementById("sellShares").addEventListener('click', function() {
    let stockName = document.getElementById('modal-stock-name').textContent; 
    let stockPrice = parseFloat(document.getElementById('modal-stock-price').textContent).toFixed(2); 
    let sharesToSell = parseInt(document.getElementById('sharesInput').value); 
    let existingStockDiv = Array.from(document.getElementById('purchaseHistoryContainer').getElementsByClassName('purchase-item')).find(item => {
        return item.querySelector('.stock-name').textContent === stockName; 
    });

    if (existingStockDiv) {
        let currentShares = parseInt(existingStockDiv.querySelector('.stock-shares span').textContent); 
        
        let sharesAvailableElement = document.getElementById('availableShares'); 
        sharesAvailableElement.textContent = `Shares available to sell: ${currentShares}`;

        if (sharesToSell > 0 && sharesToSell <= currentShares) {
            let saleAmount = sharesToSell * stockPrice;
            cashToTrade += saleAmount; 
            document.getElementById("cashToTrade").textContent = cashToTrade.toFixed(2); 
            document.getElementById("portfolioCash").textContent = cashToTrade + portfolioStockValue; 

            if (currentShares - sharesToSell > 0) {
                existingStockDiv.querySelector('.stock-shares span').textContent = currentShares - sharesToSell; 
            } else {
                existingStockDiv.remove();
            }
            sharesAvailableElement.textContent = `Shares available to sell: ${currentShares - sharesToSell}`;
            ResetCloseModals();
        } else {
            alert("You do not have enough shares to sell.");
        }
    } else {
        alert("Stock not found in your portfolio.");
    }
});

/*
After the user buys a share this method adds the new stocks name, price, and how many shares their are to a new div section.
It also increments the amount of shares available to sell in that certain stock.
*/

document.getElementById("buyShares").addEventListener('click', function() {
    let finalPrice = parseFloat(document.getElementById('estimatedCost').textContent).toFixed(2);
    const stockName = document.getElementById('modal-stock-name').textContent;
    const stockPrice = parseFloat(document.getElementById('modal-stock-price').textContent).toFixed(2);
    sharesBought = parseInt(document.getElementById('sharesInput').value);
    if (cashToTrade >= finalPrice) {
        cashToTrade -= finalPrice;
        document.getElementById("portfolioCash2").textContent = cashToTrade.toFixed(2);
        document.getElementById("cashToTrade").textContent = cashToTrade.toFixed(2);
        document.getElementById("portfolioCash").textContent = cashToTrade + portfolioStockValue;
        let purchaseContainer = document.getElementById('purchaseHistoryContainer');
        let existingStockDiv = Array.from(purchaseContainer.getElementsByClassName('purchase-item')).find(item => {
            return item.querySelector('.stock-name').textContent === stockName;
        });

        if (existingStockDiv) {
            let currentShares = parseInt(existingStockDiv.querySelector('.stock-shares span').textContent);
            existingStockDiv.querySelector('.stock-shares span').textContent = currentShares + sharesBought;
            let sharesAvailableElement = document.getElementById('availableShares'); 
            sharesAvailableElement.textContent = `Shares available to sell: ${currentShares + sharesBought}`;
        } else {
            const purchaseDiv = document.createElement('div');
            purchaseDiv.classList.add('purchase-item');
            purchaseDiv.innerHTML = `<p class="stock-name">${stockName}</p>
                <p class="stock-shares"><span>${sharesBought}</span> Shares</p>
                <p class="stock-cost">$${stockPrice}</p>`;
        
            purchaseContainer.appendChild(purchaseDiv);

            let sharesAvailableElement = document.getElementById('availableShares'); 
            sharesAvailableElement.textContent = `Shares available to sell: ${sharesBought}`;
        }    
        ResetCloseModals();
    } else {
        alert("Add more cash to your portfolio in order to complete this trade.");
    }
});

//Resets the estimated cost and the users input and closes out of both modals. Then updates the portfolio Information.
function ResetCloseModals() {
    document.querySelector('.stockModal').style.display = 'none';  
    document.querySelector('.modal3').style.display = 'none';  
    document.getElementById('sharesInput').value = '';  
    document.getElementById('estimatedCost').textContent = '0.00';  
    updatePortfolioInformation();
}