// Declare the chart variable globally so it can be accessed and updated
let investmentChart = null;

function calculateInvestment() {
    // Get user inputs
    let monthlySalary = parseFloat(document.getElementById("monthlySalary").value);
    let age = parseInt(document.getElementById("age").value);
    let monthlyInvestment = parseFloat(document.getElementById("monthlyInvestment").value);
    let years = parseInt(document.getElementById("years").value);
    let interestRate = parseFloat(document.getElementById("interestRate").value) / 100;

    // Calculate the number of months for investment
    let months = years * 12;
    let futureValue = 0;
    let investmentGrowth = [];
    let monthLabels = [];

    // Calculate investment growth for each month
    for (let i = 1; i <= months; i++) {
        futureValue = futureValue + monthlyInvestment;
        futureValue += futureValue * (interestRate / 12); // Monthly compounding
        investmentGrowth.push(futureValue.toFixed(2));
        monthLabels.push(i);
    }

    // Display the result
    document.getElementById("investmentAmount").textContent = futureValue.toFixed(2);
    document.getElementById("yearsLabel").textContent = years;
    document.getElementById("result").classList.remove("hidden");

    // Get the canvas context to draw the chart
    let ctx = document.getElementById('investmentChart').getContext('2d');

    // If the chart already exists, destroy it before creating a new one
    if (investmentChart) {
        investmentChart.destroy();
    }

    // Create a new chart with updated data
    investmentChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: monthLabels,
            datasets: [{
                label: 'Investment Growth (₹)',
                data: investmentGrowth,
                borderColor: '#3a84d0',
                fill: false,
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Months'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Investment Value (₹)'
                    }
                }
            }
        }
    });
}

// Function to display personalized greeting based on stored username
function displayGreeting() {
    const userName = sessionStorage.getItem('userName'); // Retrieve user name from sessionStorage
    const greetingElement = document.getElementById('greeting'); 

    // If the username exists in sessionStorage, personalize the greeting
    if (userName) {
        greetingElement.innerHTML = `Hello, ${userName}! Calculate your future investment growth based on your inputs.`;
    } else {
        greetingElement.innerHTML = "Calculate your future investment growth based on your inputs.";
    }
}

// Call the function to display the greeting when the page loads
window.onload = displayGreeting;