// Function to add a new entry to the Bake Sale sign-up table
function addName() {
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var bakedGood = document.getElementById('bakedGood').value;

    // Validation to ensure that name, email, and baked good are provided
    if (!name || !email || !bakedGood) {
        alert('Please enter name, email, and what baked good you will bring.');
        return;
    }

    var table = document.getElementById('signupTable');
    var newRow = table.insertRow();

    newRow.insertCell(0).innerHTML = name;
    newRow.insertCell(1).innerHTML = email;
    newRow.insertCell(2).innerHTML = new Date().toLocaleTimeString();
    newRow.insertCell(3).innerHTML = bakedGood;
    
    // Create the delete button and append it to the last cell
    var deleteCell = newRow.insertCell(4);
    deleteCell.innerHTML = '<button class="deleteBtn" onclick="deleteRow(this)">Delete</button>';
    deleteCell.className = 'deleteCell';

    // Reset the form fields
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('bakedGood').value = '';

    // Save data to localStorage
    saveTableData();
}

// Function to save the current table data to localStorage
function saveTableData() {
    var table = document.getElementById('signupTable');
    var rowsData = [];
    
    // Start at 1 to skip the header row
    for (var i = 1; i < table.rows.length; i++) {
        var rowData = [];
        // Save all cells except the delete button cell
        for (var j = 0; j < table.rows[i].cells.length - 1; j++) {
            rowData.push(table.rows[i].cells[j].innerHTML);
        }
        rowsData.push(rowData);
    }
    
    localStorage.setItem('bakeSaleData', JSON.stringify(rowsData));
}

// Function to load table data from localStorage
function loadTableData() {
    var savedData = localStorage.getItem('bakeSaleData');
    
    if (savedData) {
        var tableData = JSON.parse(savedData);
        var table = document.getElementById('signupTable');
        // Ensure the header is correct
        table.innerHTML = "<tr><th>Name</th><th>Email</th><th>Signup Time</th><th>Baked Good</th><th>Delete</th></tr>";

        tableData.forEach(function(rowData) {
            var newRow = table.insertRow();

            // Add cells for each piece of data
            newRow.insertCell(0).innerHTML = rowData[0];
            newRow.insertCell(1).innerHTML = rowData[1];
            newRow.insertCell(2).innerHTML = rowData[2];
            newRow.insertCell(3).innerHTML = rowData[3];
            var deleteCell = newRow.insertCell(4);
            deleteCell.innerHTML = '<button class="deleteBtn" onclick="deleteRow(this)">Delete</button>';
            deleteCell.className = 'deleteCell';
        });
    }
}

// Function to delete a row from the table
function deleteRow(btn) {
    var row = btn.parentNode.parentNode;
    row.parentNode.removeChild(row);
    saveTableData();
}

// Event listener to load the saved data when the document loads
document.addEventListener('DOMContentLoaded', loadTableData);