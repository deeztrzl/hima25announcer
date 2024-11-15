async function loadStaffAndDepartment() {
    try {
        // Fetch both data files simultaneously
        const [staffResponse, departmentResponse] = await Promise.all([
            fetch('/staff.json'),
            fetch('/departemen.json')
        ]);

        const staffData = await staffResponse.json();
        const departmentData = await departmentResponse.json();

        // Get DOM elements
        const departmentSelect = document.getElementById('department-select');
        const departmentName = document.getElementById('department-name');
        const departmentHead = document.getElementById('department-head');
        const staffBody = document.getElementById('staff-body');
        const staffTable = document.getElementById('staff-table');

        // Initialize dropdown
        departmentSelect.innerHTML = '<option value="">-- Pilih Departemen --</option>';

        // Populate department options
        for (const department in departmentData) {
            const option = document.createElement('option');
            option.value = department;
            option.textContent = department;
            departmentSelect.appendChild(option);
        }

        // Function to display department members
        function displayDepartmentMembers(selectedDepartment) {
            const departmentInfo = departmentData[selectedDepartment];
            const kepalaDepartemen = departmentInfo?.head || 'Tidak Diketahui';

            // Update department info
            departmentName.textContent = selectedDepartment ? `Departemen ${selectedDepartment}` : '';
            departmentHead.textContent = selectedDepartment ? `Kepala: ${kepalaDepartemen}` : '';

            // Clear existing table content
            staffBody.innerHTML = '';

            if (selectedDepartment) {
                // Populate table with department members
                for (const nim in staffData) {
                    const staff = staffData[nim];
                    if (staff.department === selectedDepartment) {
                        const row = document.createElement('tr');
                        row.innerHTML = `
                            <td>${nim}</td>
                            <td>${staff.name}</td>
                        `;
                        staffBody.appendChild(row);
                    }
                }

                // Show/hide table based on content
                staffTable.style.display = staffBody.children.length > 0 ? 'table' : 'none';
            } else {
                staffTable.style.display = 'none';
            }
        }

        // Add change event listener to department select
        departmentSelect.addEventListener('change', (event) => {
            const selectedDepartment = event.target.value;
            displayDepartmentMembers(selectedDepartment);
        });

        // Auto-select department based on saved NIM
        const savedNim = localStorage.getItem('selectedNim');
        if (savedNim && staffData[savedNim]) {
            const userDepartment = staffData[savedNim].department;
            if (userDepartment) {
                departmentSelect.value = userDepartment;
                displayDepartmentMembers(userDepartment);
            }
        }

    } catch (error) {
        console.error('Error loading staff or department data:', error);
    }
}

// Initialize on page load
window.onload = loadStaffAndDepartment;
