/*
After the user buys a share this method adds the new stocks name, price, and how many shares their are to a new div section.
It also increments the amount of shares available to sell in that certain stock.
*/
document.getElementById("buyShares").addEventListener('click', function() {
    let finalPrice = parseFloat(document.getElementById('estimatedCost').textContent).toFixed(2);
    const stockName = document.getElementById('modal-stock-name').textContent;
    const stockPrice = parseFloat(document.getElementById('modal-stock-price').textContent).toFixed(2);
    sharesBought = parseInt(document.getElementById('sharesInput').value);
    console.log(sharesBought);
    if(isNaN(sharesBought)) {
        alert("You do not have enough cash in you portfolio. Transfer more funds from your checking account to buy more stocks.");
    } else {
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
    }
});

document.querySelectorAll('.close4').forEach(closeButton => {
    closeButton.addEventListener('click', function() {
        document.querySelector('.stockModal').style.display = 'none';  
    });
});

//Resets the estimated cost and the users input and closes out of both modals. Then updates the portfolio Information.
function ResetCloseModals() {
    document.querySelector('.stockModal').style.display = 'none';  
    document.querySelector('.modal3').style.display = 'none';  
    document.getElementById('sharesInput').value = '';  
    document.getElementById('estimatedCost').textContent = '0.00';  
    updatePortfolioInformation();
}