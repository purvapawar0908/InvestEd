function calculateTax() {
    const income = parseFloat(document.getElementById('income').value);
    const age = parseInt(document.getElementById('age').value);
    const investments = parseFloat(document.getElementById('investments').value) || 0;
    const regime = document.getElementById('regime').value;

    if (!income || income < 0 || !age || age < 0) {
        alert("Please enter valid positive values for both income and age.");
        return;
    }

    let tax = 0;

    if (regime === "old") {
        // Old Regime with deductions up to 1.5L under Section 80C
        let taxableIncome = income - Math.min(investments, 150000);

        if (age < 60) {
            tax = oldRegimeTaxSlabs(taxableIncome);
        } else if (age >= 60 && age < 80) {
            tax = oldRegimeTaxSlabs(taxableIncome, true); // Senior citizen
        } else {
            tax = oldRegimeTaxSlabs(taxableIncome, false, true); // Super senior citizen
        }
    } else {
        // New Regime without deductions
        tax = newRegimeTaxSlabs(income);
    }

    document.getElementById('taxAmount').innerText = tax.toFixed(2);
    document.getElementById('result').classList.remove('hidden');
}

// Old Regime Tax Calculation
function oldRegimeTaxSlabs(income, isSenior = false, isSuperSenior = false) {
    if (isSuperSenior) return 0; // Super seniors (80+ years) are exempt up to ₹5,00,000

    let tax = 0;
    if (income > 1000000) {
        tax += (income - 1000000) * 0.3;
        income = 1000000;
    }
    if (income > 500000) {
        tax += (income - 500000) * 0.2;
        income = 500000;
    }
    if (income > 250000) {
        const lowerLimit = isSenior ? 300000 : 250000;
        tax += (income - lowerLimit) * 0.05;
    }
    return tax;
}

// New Regime Tax Calculation
function newRegimeTaxSlabs(income) {
    let tax = 0;
    if (income > 1500000) {
        tax += (income - 1500000) * 0.3;
        income = 1500000;
    }
    if (income > 1250000) {
        tax += (income - 1250000) * 0.25;
        income = 1250000;
    }
    if (income > 1000000) {
        tax += (income - 1000000) * 0.2;
        income = 1000000;
    }
    if (income > 750000) {
        tax += (income - 750000) * 0.15;
        income = 750000;
    }
    if (income > 500000) {
        tax += (income - 500000) * 0.1;
        income = 500000;
    }
    if (income > 250000) {
        tax += (income - 250000) * 0.05;
    }
    return tax;
}
// Function to display personalized greeting based on stored username
function displayGreeting() {
    const userName = sessionStorage.getItem('userName'); // Retrieve the username from sessionStorage
    const greetingElement = document.getElementById('greeting');

    // If username exists, personalize the greeting
    if (userName) {
        greetingElement.innerHTML = `Hello, ${userName}! Choose your tax regime and calculate your tax.`;
    } else {
        greetingElement.innerHTML = "Choose your tax regime and calculate your tax based on recent Indian tax laws.";
    }
}

// Call the function when the page loads
window.onload = displayGreeting;





