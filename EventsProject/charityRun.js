function addName() {
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    
    // Ensure name and email are provided before adding to table
    if (!name || !email) {
        alert('Please enter both name and email.');
        return;
    }

    var table = document.getElementById('signupTable');
    var newRow = table.insertRow();

    newRow.insertCell(0).innerHTML = name;
    newRow.insertCell(1).innerHTML = email;
    newRow.insertCell(2).innerHTML = new Date().toLocaleTimeString();
    
    // Create the delete button with the proper class for styling
    var deleteCell = newRow.insertCell(3);
    deleteCell.innerHTML = '<button class="deleteBtn" onclick="deleteRow(this)">Delete</button>';
    deleteCell.className = 'deleteCell';

    saveTableData();

    // Clear the input fields
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
}

function saveTableData() {
    var table = document.getElementById('signupTable');
    var rows = [];
    // Start at 1 to skip the header row
    for (var i = 1, row; row = table.rows[i]; i++) {
        var cols = [];
        // Save all cells except the delete button cell
        for (var j = 0, col; col = row.cells[j]; j++) {
            // Do not save the last cell, which contains the delete button
            if (j < table.rows[i].cells.length - 1) {
                cols.push(col.innerHTML);
            }
        }
        rows.push(cols);
    }
    localStorage.setItem('charityRunData', JSON.stringify(rows));
}

function loadTableData() {
    var data = localStorage.getItem('charityRunData');
    if (data) {
        var rows = JSON.parse(data);
        var table = document.getElementById('signupTable');

        // Ensure the header row is set correctly
        table.innerHTML = "<tr><th>Name</th><th>Email</th><th>Signup Time</th><th>Delete</th></tr>";

        rows.forEach(function (rowData) {
            var newRow = table.insertRow();
            rowData.forEach(function (cellData, index) {
                var newCell = newRow.insertCell();
                newCell.innerHTML = cellData;
            });

            // Append a delete cell at the end of the row
            var deleteCell = newRow.insertCell();
            deleteCell.innerHTML = '<button class="deleteBtn" onclick="deleteRow(this)">Delete</button>';
            deleteCell.className = 'deleteCell'; // Apply the styling for delete button cell
        });
    }
}

function deleteRow(btn) {
    var row = btn.parentNode.parentNode;
    row.parentNode.removeChild(row);
    saveTableData();
}

document.addEventListener('DOMContentLoaded', loadTableData);