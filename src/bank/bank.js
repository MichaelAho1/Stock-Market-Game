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
        } else {
            alert("You do not have enough cash in you checking account, End the day to get your daily salary.");
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
        } else {
            alert("You do not have enough portfolio cash, sell more stocks to have more portfolio cash.");
        }
    }
});

//Closes the Transfer menu.
document.querySelectorAll('.close2').forEach(closeButton => {
    closeButton.addEventListener('click', function() {
        this.closest('.modal2').style.display = 'none';
    });
});

