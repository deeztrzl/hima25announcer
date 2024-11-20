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

// Fungsi untuk menampilkan popup
function showPopup() {
    document.getElementById('result-popup').style.display = 'flex';
}

// Fungsi untuk menutup popup
function closePopup() {
    document.getElementById('result-popup').style.display = 'none';
}

// Fungsi untuk validasi input NIM
function validateNIM(nim) {
    // Cek apakah input kosong
    if (!nim) {
        return {
            isValid: false,
            message: "Silakan masukkan NIM yang sesuai"
        };
    }
    
    // Cek apakah input hanya berisi angka
    if (!/^\d+$/.test(nim)) {
        return {
            isValid: false,
            message: "NIM hanya boleh berisi angka"
        };
    }

    // Cek panjang NIM (harus 7 digit)
    if (nim.length !== 7) {
        return {
            isValid: false,
            message: "NIM harus terdiri dari 7 angka"
        };
    }

    return {
        isValid: true
    };
}

// Main function to check NIM and display results
function checkNim() {
    const nimInput = document.getElementById("nim-input").value.trim();
    const resultDiv = document.getElementById("result");
    
    // Validasi input
    const validation = validateNIM(nimInput);
    if (!validation.isValid) {
        resultDiv.innerHTML = `
            <div style="background-color: #ffe6e6; padding: 15px; border-radius: 8px; border: 1px solid #dc3545;">
                <div style="color: #dc3545; font-weight: bold; margin-bottom: 5px;">Peringatan!</div>
                <div style="color: #dc3545;">${validation.message}</div>
                <div style="color: #666; font-size: 0.9em; margin-top: 8px;">
                    Pastikan NIM yang dimasukkan:
                    <ul style="text-align: left; margin-top: 5px; margin-left: 5px; margin-bottom: 0;">
                        <li>Terdiri dari 7 angka</li>
                        <li>Tidak mengandung huruf atau simbol</li>
                        <li>Tidak boleh kosong</li>
                    </ul>
                </div>
            </div>
        `;
        showPopup();
        return;
    }

    if (nimInput in staffData) {
        const staff = staffData[nimInput];
        const departmentInfo = departmentData[staff.department];
        
        localStorage.setItem('selectedNim', nimInput);
        
        const headContactLink = departmentInfo?.contact ? 
            `https://${departmentInfo.contact}` : 
            'https://wa.me/628123456789';

        resultDiv.innerHTML = `
            Selamat <b><i>${staff.name}</i></b>! Anda telah diterima sebagai <b>staff ${staff.department} HIMATRONIKA-AI Periode 2024/2025</b>.<br>
            <br>Anda <b>Wajib</b> Hubungi Kepala Departemen Terlebih Dahulu: <br>
            <button class="contact-button" onclick="window.location.href='${headContactLink}'"><b>Hubungi ${departmentInfo?.head}</b></button> <br>
            <button class="contact-button" onclick="showPartners()">Lihat Partnermu</button>
        `;
        resultDiv.style.color = "black";
        showPopup();
    } else {
        resultDiv.innerHTML = `
            <div style="background-color: #ffe6e6; padding: 15px; border-radius: 8px; border: 1px solid #dc3545;">
                <div style="color: #dc3545;">Maaf, Kami tidak menemukan apa yang Anda cari. Tetap semangat dan jangan takut untuk mencoba! Terima kasih atas partisipasinya!</div>
            </div>
        `;
        showPopup();
    }
}

// Clear search results
function clearResult() {
    document.getElementById("nim-input").value = "";
    document.getElementById("result").textContent = "";
    closePopup();
}

// Navigate to partners page
function showPartners() {
    window.location.href = 'partners.html';
}

// Enter key event listener with validation
document.getElementById('nim-input').addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        checkNim();
    }
});

// Input event listener untuk membatasi panjang input dan hanya mengizinkan angka
document.getElementById('nim-input').addEventListener('input', function(event) {
    let value = event.target.value;
    // Hapus karakter non-digit
    value = value.replace(/\D/g, '');
    // Batasi panjang input menjadi 7 digit
    if (value.length > 7) {
        value = value.slice(0, 7);
    }
    event.target.value = value;
});

// Circle animation code (tidak berubah)
function moveCircle(circle) {
    let x, y, dx, dy;

    if (circle.id === "circle-1") {
        x = 50;
        y = 50;
        dx = (Math.random() - 0.5) * 4;
        dy = (Math.random() - 0.5) * 4;
    }
    else if (circle.id === "circle-2") {
        x = 150;
        y = 150;
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
const circle2 = document.getElementById("circle-2");
moveCircle(circle1);
moveCircle(circle2);

// Event listener untuk menutup popup ketika mengklik di luar popup
window.addEventListener('click', function(event) {
    const popup = document.getElementById('result-popup');
    if (event.target === popup) {
        closePopup();
    }
});