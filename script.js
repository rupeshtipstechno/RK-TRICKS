// MATRIX RAIN
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const letters = "01";
const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

function draw() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#00ff88";
    ctx.font = fontSize + "px monospace";

    drops.forEach((y, i) => {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillText(text, i * fontSize, y * fontSize);
        if (y * fontSize > canvas.height && Math.random() > 0.975)
            drops[i] = 0;
        drops[i]++;
    });
}
setInterval(draw, 33);

// TYPING EFFECT
const text = "Initializing Dark Web Intelligence...";
let i = 0;
function typing() {
    if (i < text.length) {
        document.getElementById("typing").innerHTML += text.charAt(i);
        i++;
        setTimeout(typing, 50);
    }
}
typing();

// SEARCH FUNCTION
async function search() {
    const query = document.getElementById("query").value;
    const resultDiv = document.getElementById("result");

    resultDiv.innerHTML = "Scanning...";

    const response = await fetch("/api/search?q=" + query);
    const data = await response.json();

    if (!data || data.length === 0) {
        resultDiv.innerHTML = "No breach found.";
        return;
    }

    resultDiv.innerHTML = `
        <div class="result-card">
            <h3>Target Found</h3>
            <pre>${JSON.stringify(data, null, 2)}</pre>
        </div>
    `;
}
