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