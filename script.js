let staffData = {};

// Fetch data from staff.json
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

// Load staff data on page load
loadStaffData();


// Search NIM functionality
function checkNim() {
    const nimInput = document.getElementById("nim-input").value.trim();
    const resultDiv = document.getElementById("result");

    if (nimInput in staffData) {
        const staff = staffData[nimInput];
        let headContactLink;

        // Switch case untuk menentukan hyperlink berdasarkan nama kepala departemen
        switch (staff.head) {
            case 'Ibu Siti':
                headContactLink = 'https://wa.me/6285183303124';
                break;
            case 'Bapak Hasan':
                headContactLink = 'mailto:bapak.hasan@example.com';
                break;
            case 'Ibu Dewi':
                headContactLink = 'mailto:ibu.dewi@example.com';
                break;
            default:
                headContactLink = `mailto:${staff.head}@example.com`;
                break;
        }

        resultDiv.innerHTML = `
            Selamat ${staff.name}! Kamu telah diterima sebagai staff ${staff.department}.<br>
            Hubungi Kepala Departemenmu: <br>
            <button onclick="window.location.href='${headContactLink}'">Hubungi ${staff.head}</button>
        `;
        resultDiv.innerHTML.style.color = "#fffff";
    } else {
        resultDiv.textContent = "Maaf, Kami tidak menemukan apa yang Anda cari. Terima kasih atas partisipasinya!";
        resultDiv.style.color = "#dc3545";
    }
}

// Tambahkan event listener pada input field
document.getElementById('nim-input').addEventListener('keyup', function(event) {
    // Jika tombol yang ditekan adalah Enter
    if (event.key === 'Enter') {
        // Panggil fungsi checkNim()
        checkNim();
    }
});

function clearResult() {
    document.getElementById("nim-input").value = "";
    document.getElementById("result").textContent = "";
}


// Circle bouncing animation
function moveCircle(circle) {
    let x, y, dx, dy;

    // Set the initial position of the circles
    if (circle.id === "circle-1") {
        x = 50; // Left of the window
        y = 50; // Top of the window
        dx = (Math.random() - 0.5) * 4;
        dy = (Math.random() - 0.5) * 4;
    } 
    /*else if (circle.id === "circle-2") {
        x = 150; // Right of the window
        y = 150; // Bottom of the window
        dx = (Math.random() - 0.5) * 4;
        dy = (Math.random() - 0.5) * 4;
    }*/

    function animate() {
        x += dx;
        y += dy;

        // Collision detection
        if (x + circle.offsetWidth > window.innerWidth || x < 0) dx = -dx;
        if (y + circle.offsetHeight > window.innerHeight || y < 0) dy = -dy;

        circle.style.left = `${x}px`;
        circle.style.top = `${y}px`;

        requestAnimationFrame(animate);
    }
    animate();
}

// Apply the bouncing animation to the circles
const circle1 = document.getElementById("circle-1");
//const circle2 = document.getElementById("circle-2");
moveCircle(circle1);
//moveCircle(circle2);