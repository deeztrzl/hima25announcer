// script.js
let staffData = {};
let departmentData = {};

// Fetch staff data
async function loadStaffData() {
    try {
        const response = await fetch('/staff.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        staffData = await response.json();
    } catch (error) {
        console.error('Error fetching staff data:', error);
    }
}

// Fetch department data
async function loadDepartmentData() {
    try {
        const response = await fetch('/departemen.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        departmentData = await response.json();
    } catch (error) {
        console.error('Error fetching department data:', error);
    }
}

// Load all data on page load
async function loadData() {
    await loadStaffData();
    await loadDepartmentData();
}

loadData();

// Main function to check NIM and display results
function checkNim() {
    const nimInput = document.getElementById("nim-input").value.trim();
    const resultDiv = document.getElementById("result");

    if (nimInput in staffData) {
        const staff = staffData[nimInput];
        const departmentInfo = departmentData[staff.department];
        
        // Save NIM to localStorage for use in partners.html
        localStorage.setItem('selectedNim', nimInput);
        
       
        
        // Determine head contact link
        // Get contact link directly from department data
        const headContactLink = departmentInfo?.contact ? 
            `https://${departmentInfo.contact}` : 
            'https://wa.me/628123456789'; // default fallback

        resultDiv.innerHTML = `
            Selamat <b><i>${staff.name}</i></b>! Kamu telah diterima sebagai <b>staff ${staff.department}</b>.<br>
            <br>Hubungi Kepala Departemenmu: <br>
            <button class="contact-button" onclick="window.location.href='${headContactLink}'">Hubungi ${departmentInfo?.head}</button> <br>
            <button class="contact-button" onclick="showPartners()">Lihat Partnermu</button>
        `;
        resultDiv.style.color = "black";
    } else {
        resultDiv.textContent = "Maaf, Kami tidak menemukan apa yang Anda cari. Terima kasih atas partisipasinya!";
        resultDiv.style.color = "#dc3545";
    }
}

// Clear search results
function clearResult() {
    document.getElementById("nim-input").value = "";
    document.getElementById("result").textContent = "";
}

// Navigate to partners page
function showPartners() {
    window.location.href = 'partners.html';
}

// Enter key event listener
document.getElementById('nim-input').addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        checkNim();
    }
});

// Circle animation code
function moveCircle(circle) {
    let x, y, dx, dy;

    if (circle.id === "circle-1") {
        x = 50;
        y = 50;
        dx = (Math.random() - 0.5) * 4;
        dy = (Math.random() - 0.5) * 4;
    }
    else if (circle.id === "circle-2") {
        x = 300;
        y = 300;
        dx = (Math.random() - 0.5) * 4;
        dy = (Math.random() - 0.5) * 4;
    }

    function animate() {
        x += dx;
        y += dy;

        if (x + circle.offsetWidth > window.innerWidth || x < 0) dx = -dx;
        if (y + circle.offsetHeight > window.innerHeight || y < 0) dy = -dy;

        circle.style.left = `${x}px`;
        circle.style.top = `${y}px`;

        requestAnimationFrame(animate);
    }
    animate();
}

const circle1 = document.getElementById("circle-1");
moveCircle(circle1);
moveCircle(circle2);
