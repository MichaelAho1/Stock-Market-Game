//Increases the salary whenever a user buys the upgrade (limited at 500).
document.getElementById("salaryIncreaseButton").addEventListener("click", function() {
    if(bankCash - salaryIncreaseCost > 0 && salary < 500) {
        bankCash -= salaryIncreaseCost;
        salary += Math.round(salaryIncreaseCost / 40);
        salaryIncreaseCost *= 2;
        if (salary > 500) {
            salary = 500;
            document.getElementById("increaseButtonCap").innerHTML = '<span class="max-level">Max Salary Achieved</span>';
        } else {
            document.getElementById("salaryIncreaseCost").textContent = salaryIncreaseCost;
        }
        document.getElementById("salary").textContent = salary;
        document.getElementById("bankCash").textContent = bankCash;
        document.getElementById("currentSalary").textContent = salary;
    } else {
        alert("You do not have enough cash in you checking account, End the day to get your daily salary.");
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
    } else {
        alert("You do not have enough cash in you checking account, End the day to get your daily salary.");
    }
});

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