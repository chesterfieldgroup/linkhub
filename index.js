// Function to dynamically generate and download a vCard for an employee
function downloadVCard(employee) {
    const vCardData = `
BEGIN:VCARD
VERSION:3.0
FN:${employee.name}
ORG:Chesterfield Insurance Brokers
TITLE:${employee.position}
TEL;TYPE=WORK,VOICE:${employee.phone}
EMAIL;TYPE=PREF,INTERNET:${employee.email}
END:VCARD
`;

    const blob = new Blob([vCardData], { type: 'text/vcard' });
    const downloadLink = document.createElement("a");
    downloadLink.href = window.URL.createObjectURL(blob);
    downloadLink.setAttribute("download", `${employee.name.split(' ').join('_')}.vcf`);
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}

// Function to update the webpage with the employee's details
function updateEmployeeDetails(employee) {
    document.getElementById('employeePhoto').src = employee.photoUrl;
    document.getElementById('employeePhoto').alt = `Photo of ${employee.name}`;
    document.getElementById('employeeName').textContent = employee.name;
    document.getElementById('employeePosition').textContent = employee.position;
    document.getElementById('employeeSpecialization').textContent = employee.specialization;
    document.getElementById('employeeEmail').href = `mailto:${employee.email}`;
    document.getElementById('employeePhone').href = `tel:${employee.phone}`;

    // Attach the downloadVCard function to a button click with current employee's details
    document.getElementById('downloadVCardBtn').onclick = () => downloadVCard(employee);
}

// Function to handle when an employee is not found
function handleEmployeeNotFound() {
    const employeeCard = document.getElementById('employeeCard');
    employeeCard.innerHTML = '<div class="alert alert-danger" role="alert">Employee not found.</div>';
}

document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    const employeeId = params.get('id'); // Extracts 'id' from the URL query parameters

    fetch('employees.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const employee = data.find(emp => emp.id === employeeId);
            if (employee) {
                updateEmployeeDetails(employee);
            } else {
                handleEmployeeNotFound();
            }
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
            handleEmployeeNotFound();
        });
});
