// Function to add a new entry to the TED Talk sign-up table
function addEntry() {
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var timeSlot = document.getElementById('timeSlot').value;
    var table = document.getElementById('signupTable');
    var newRow = table.insertRow(-1);

    newRow.insertCell(0).innerHTML = name;
    newRow.insertCell(1).innerHTML = email;
    newRow.insertCell(2).innerHTML = timeSlot;
    var deleteCell = newRow.insertCell(3);
    deleteCell.innerHTML = '<button class="deleteBtn" onclick="deleteRow(this)">Delete</button>';
    
    // Reset the form fields
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('timeSlot').value = '12pm'; // Reset to the first option

    // Save data to localStorage
    saveTableData();
}

// Function to save the current table data to localStorage
function saveTableData() {
    var table = document.getElementById('signupTable');
    var rowsData = [];
    
    for (var i = 1; i < table.rows.length; i++) {
        var rowData = [];
        for (var j = 0; j < table.rows[i].cells.length - 1; j++) {
            rowData.push(table.rows[i].cells[j].innerText);
        }
        rowsData.push(rowData);
    }
    
    localStorage.setItem('tedTalkSignupData', JSON.stringify(rowsData));
}

// Function to load table data from localStorage
function loadTableData() {
    var savedData = localStorage.getItem('tedTalkSignupData');
    
    if (savedData) {
        var tableData = JSON.parse(savedData);
        var table = document.getElementById('signupTable');

        tableData.forEach(function(rowData) {
            var newRow = table.insertRow(-1);

            newRow.insertCell(0).innerHTML = rowData[0];
            newRow.insertCell(1).innerHTML = rowData[1];
            newRow.insertCell(2).innerHTML = rowData[2];
            var deleteCell = newRow.insertCell(3);
            deleteCell.innerHTML = '<button class="deleteBtn" onclick="deleteRow(this)">Delete</button>';
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