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

//Updates the estimated cost while the user is picking how many shares their going to pick.
document.getElementById('sharesInput').addEventListener('input', function() {
    let stockPrice = parseFloat(document.getElementById('modal-stock-price').textContent);
    let finalPrice = stockPrice * this.value;
    sharesAmount = this.value;
    document.getElementById('estimatedCost').textContent = finalPrice.toFixed(2);
});