// Hex Light Animation
const canvas = document.getElementById('hexLightCanvas');
const ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

const hexOpts = {
    len: 40,
    lightCount: 20,
    lightRadius: 200,
    lightSpeed: 1,
    cols: Math.ceil(width / 40),
    rows: Math.ceil(height / 40)
};

const hexes = [];
function createHexes() {
    hexes.length = 0;
    for (let r = 0; r < hexOpts.rows; r++) {
        for (let q = 0; q < hexOpts.cols; q++) {
            hexes.push({
                x: q * hexOpts.len * 1.5,
                y: r * hexOpts.len * Math.sqrt(3) + (q % 2) * hexOpts.len * Math.sqrt(3) / 2
            });
        }
    }
}
createHexes();

// Lights
const lights = [];
for (let i = 0; i < hexOpts.lightCount; i++) {
    const hue = Math.random() * 360;
    lights.push({
        x: Math.random() * width,
        y: Math.random() * height,
        dx: (Math.random() - 0.5) * hexOpts.lightSpeed,
        dy: (Math.random() - 0.5) * hexOpts.lightSpeed,
        // Reduced saturation (40%) and lightness (50%) for subtle effect
        color: hslToRgb(hue, 40, 50)
    });
}

// Draw Hex
function drawHex(x, y, size, color, alpha = 0.3) { // default alpha reduced
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
        const a = Math.PI / 3 * i;
        const px = x + size * Math.cos(a);
        const py = y + size * Math.sin(a);
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fillStyle = color.replace(')', `,${alpha})`).replace('rgb', 'rgba');
    ctx.fill();
}

// HSL to RGB
function hslToRgb(h, s, l) {
    s /= 100; l /= 100;
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m = l - c / 2;
    let r = 0, g = 0, b = 0;
    if (h < 60) [r, g, b] = [c, x, 0];
    else if (h < 120) [r, g, b] = [x, c, 0];
    else if (h < 180) [r, g, b] = [0, c, x];
    else if (h < 240) [r, g, b] = [0, x, c];
    else if (h < 300) [r, g, b] = [x, 0, c];
    else [r, g, b] = [c, 0, x];
    return `${Math.round((r + m) * 255)},${Math.round((g + m) * 255)},${Math.round((b + m) * 255)}`;
}

// Animation loop
function animateHexLights() {
    requestAnimationFrame(animateHexLights);
    ctx.fillStyle = 'rgba(0,0,0,0.08)'; // subtle trail effect
    ctx.fillRect(0, 0, width, height);

    hexes.forEach(hx => {
        let r = 0, g = 0, b = 0, a = 0;
        lights.forEach(l => {
            const dx = hx.x - l.x;
            const dy = hx.y - l.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < hexOpts.lightRadius) {
                const intensity = 1 - dist / hexOpts.lightRadius;
                const [lr, lg, lb] = l.color.split(',').map(Number);
                r += lr * intensity;
                g += lg * intensity;
                b += lb * intensity;
                a = Math.min(a + intensity * 0.3, 0.3); // faded intensity
            }
        });
        if (a > 0) drawHex(hx.x, hx.y, hexOpts.len, `rgb(${Math.min(r,255)},${Math.min(g,255)},${Math.min(b,255)})`, a);
    });

    lights.forEach(l => {
        l.x += l.dx; l.y += l.dy;
        if (l.x < 0) l.x = width; if (l.x > width) l.x = 0;
        if (l.y < 0) l.y = height; if (l.y > height) l.y = 0;
    });
}

// Initialize
animateHexLights();

// Resize handler
window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    hexOpts.cols = Math.ceil(width / hexOpts.len);
    hexOpts.rows = Math.ceil(height / hexOpts.len);
    createHexes();
});
