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
