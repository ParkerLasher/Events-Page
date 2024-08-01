const usedNumbers = new Set();
let pendingRaffleNumber = null;

// Function to add a new entry to the raffle table
function addEntry() {
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var raffleNumber = pendingRaffleNumber; // Use the pending raffle number

    if (!raffleNumber) {
        alert('Please generate a raffle number first.');
        return;
    }
    var table = document.getElementById('raffleTable');
    var newRow = table.insertRow(-1);

    newRow.insertCell(0).innerHTML = name;
    newRow.insertCell(1).innerHTML = email;
    newRow.insertCell(2).innerHTML = raffleNumber;
    var deleteCell = newRow.insertCell(3);
    deleteCell.innerHTML = '<button class="deleteBtn" onclick="deleteRow(this)">Delete</button>';

    // Clear the form fields and the pending raffle number
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('raffleNumber').value = '';
    pendingRaffleNumber = null;

    // Add the confirmed number to the usedNumbers set and save it
    usedNumbers.add(raffleNumber);
    saveUsedNumbers();

    // Save data to localStorage
    saveTableData();
}

// Function to save the current table data to localStorage
function saveTableData() {
    var table = document.getElementById('raffleTable');
    var rowsData = [];

    for (var i = 1; i < table.rows.length; i++) {
        var rowData = [];
        for (var j = 0; j < table.rows[i].cells.length - 1; j++) {
            rowData.push(table.rows[i].cells[j].innerText);
        }
        rowsData.push(rowData);
    }

    localStorage.setItem('raffleSignupData', JSON.stringify(rowsData));
    saveUsedNumbers(); // Also save the used numbers whenever we save the table data
}

// Function to load table data from localStorage
function loadTableData() {
    var savedData = localStorage.getItem('raffleSignupData');

    if (savedData) {
        var tableData = JSON.parse(savedData);
        var table = document.getElementById('raffleTable');

        tableData.forEach(function (rowData) {
            var newRow = table.insertRow(-1);

            newRow.insertCell(0).innerHTML = rowData[0];
            newRow.insertCell(1).innerHTML = rowData[1];
            newRow.insertCell(2).innerHTML = rowData[2];
            var deleteCell = newRow.insertCell(3);
            deleteCell.innerHTML = '<button class="deleteBtn" onclick="deleteRow(this)">Delete</button>';
            
            // Add the number to the usedNumbers set to prevent reuse
            usedNumbers.add(parseInt(rowData[2], 10));
        });
    }
    // Ensure the usedNumbers set is up to date
    loadUsedNumbers();
}

// Function to delete a row from the table
function deleteRow(btn) {
    var row = btn.parentNode.parentNode;
    var numberToRemove = parseInt(row.cells[2].innerText, 10);

    // Remove the number from the set of used numbers
    usedNumbers.delete(numberToRemove);
    saveUsedNumbers();

    row.parentNode.removeChild(row);
    saveTableData();
}

// Function to generate a unique raffle number
function generateRaffleNumber() {
    var maxNumbers = 20000;
    if (usedNumbers.size >= maxNumbers) {
        alert("All raffle numbers have been allocated.");
        return;
    }

    let raffleNumber;
    do {
        raffleNumber = Math.floor(Math.random() * maxNumbers) + 1;
    } while (usedNumbers.has(raffleNumber) || raffleNumber === pendingRaffleNumber);

    pendingRaffleNumber = raffleNumber; // Store the generated number temporarily
    document.getElementById('raffleNumber').value = raffleNumber; // Display the number
}

// Event listener to load the saved data when the document loads
document.addEventListener('DOMContentLoaded', function() {
    loadTableData();
    loadUsedNumbers();
});

// Function to save the set of used raffle numbers to localStorage
function saveUsedNumbers() {
    localStorage.setItem('usedRaffleNumbers', JSON.stringify([...usedNumbers]));
}

// Function to load the set of used raffle numbers from localStorage
function loadUsedNumbers() {
    var savedNumbers = localStorage.getItem('usedRaffleNumbers');
    if (savedNumbers) {
        var numbers = JSON.parse(savedNumbers);
        numbers.forEach(number => usedNumbers.add(number));
    }
}

// Ensure the generateRaffleNumber function is properly bound to the button
document.getElementById('generateNumber').addEventListener('click', generateRaffleNumber);