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
        stockItem.querySelector('.dayChange').style.color = "green";
    });
    document.getElementById("totalMarket").textContent = temp.toFixed(2);
    marketTotalPrevious = temp.toFixed(2);
}
