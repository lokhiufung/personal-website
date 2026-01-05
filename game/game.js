const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game constants
const GRAVITY = 0.5;
const JUMP_FORCE = -12;
const SPEED = 4;
const GROUND_HEIGHT = 50;

// Game state
let gameLoop;
let score = 0;
let frameCount = 0;
let assetsLoaded = 0;

// Assets
const bgImage = new Image();
bgImage.src = '../assets/img/game/mong_kok_bg.png';

const catRawImage = new Image();
catRawImage.src = '../assets/img/game/cat_green.png';
let catSprite = null; // Will hold the processed image

// Landmarks in Mong Kok (relative to background loops)
// We will simulate a long street by looping the background but tracking "world distance"
const LANDMARKS = [
    { distance: 500, name: "Ladies Market (女人街)" },
    { distance: 1500, name: "Mong Kok Computer Centre (旺角電腦中心)" },
    { distance: 2500, name: "Langham Place (朗豪坊)" },
    { distance: 3500, name: "Sneaker Street (波鞋街)" },
    { distance: 4500, name: "Argyle Street (亞皆老街)" }
];
let currentLandmark = "";

// Player object
const player = {
    x: 100, // Screen X
    worldX: 0, // Total distance traveled
    y: 0,
    width: 64,
    height: 64,
    vx: 0,
    vy: 0,
    isGrounded: false,
    facingRight: true,
    state: 'idle'
};

// Input handling
const keys = {
    ArrowRight: false,
    ArrowLeft: false,
    Space: false,
    ArrowUp: false
};

window.addEventListener('keydown', (e) => {
    if (e.code === 'Space' || e.code === 'ArrowUp') keys.Space = true;
    if (e.code === 'ArrowRight') keys.ArrowRight = true;
    if (e.code === 'ArrowLeft') keys.ArrowLeft = true;
});

window.addEventListener('keyup', (e) => {
    if (e.code === 'Space' || e.code === 'ArrowUp') keys.Space = false;
    if (e.code === 'ArrowRight') keys.ArrowRight = false;
    if (e.code === 'ArrowLeft') keys.ArrowLeft = false;
});

// Resize handling
function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    if (player.y === 0) {
        player.y = canvas.height - GROUND_HEIGHT - player.height;
    }
}
window.addEventListener('resize', resize);
resize();

// Helper: Remove Green Background
function processCatSprite() {
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = catRawImage.width;
    tempCanvas.height = catRawImage.height;
    const tempCtx = tempCanvas.getContext('2d');

    tempCtx.drawImage(catRawImage, 0, 0);
    const imageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
    const data = imageData.data;

    // Simple green screen removal
    // Look for pixels that are predominantly green
    for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        // If Green is high and Red/Blue are low (Green screen logic)
        // Adjust thresholds as needed based on the generated image
        if (g > 100 && r < 100 && b < 100) {
            data[i + 3] = 0; // Set alpha to 0
        }
    }

    tempCtx.putImageData(imageData, 0, 0);

    // Create a new image from the cleaned canvas
    catSprite = new Image();
    catSprite.src = tempCanvas.toDataURL();
}

// Game Loop
function update() {
    // Movement
    if (keys.ArrowRight) {
        player.vx = SPEED;
        player.facingRight = true;
        player.state = 'walk';
    } else if (keys.ArrowLeft) {
        player.vx = -SPEED;
        player.facingRight = false;
        player.state = 'walk';
    } else {
        player.vx = 0;
        player.state = 'idle';
    }

    // Jump
    if (keys.Space && player.isGrounded) {
        player.vy = JUMP_FORCE;
        player.isGrounded = false;
        player.state = 'jump';
    }

    // Physics
    player.vy += GRAVITY;
    player.y += player.vy;

    // Ground collision
    const floorY = canvas.height - GROUND_HEIGHT - player.height;
    if (player.y >= floorY) {
        player.y = floorY;
        player.vy = 0;
        player.isGrounded = true;
        if (player.state === 'jump') player.state = 'idle';
    }

    // Update World Position (for scrolling)
    // We only move the player visually up to a point, then we scroll the world
    // But for simplicity in this version, let's just track worldX
    if (player.vx !== 0) {
        player.worldX += player.vx;
    }

    // Prevent going backward past 0
    if (player.worldX < 0) {
        player.worldX = 0;
        player.vx = 0;
    }

    // Check Landmarks
    currentLandmark = "";
    for (const landmark of LANDMARKS) {
        if (Math.abs(player.worldX - landmark.distance) < 300) {
            currentLandmark = landmark.name;
            break;
        }
    }

    // Score / Distance
    document.getElementById('score').innerText = Math.floor(player.worldX / 10);

    frameCount++;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 1. Draw Background (Parallax/Scrolling)
    if (bgImage.complete) {
        const bgWidth = bgImage.width * (canvas.height / bgImage.height);
        const bgHeight = canvas.height;

        // Calculate scroll offset
        // We want the background to move opposite to player direction
        const scrollX = -(player.worldX * 0.5) % bgWidth;

        // Draw 3 copies to cover the screen seamlessly
        // If scrollX is -500, we draw at -500, -500+W, -500+2W
        ctx.drawImage(bgImage, scrollX, 0, bgWidth, bgHeight);
        ctx.drawImage(bgImage, scrollX + bgWidth, 0, bgWidth, bgHeight);
        ctx.drawImage(bgImage, scrollX + bgWidth * 2, 0, bgWidth, bgHeight);

        // If screen is huge, draw one more
        if (scrollX + bgWidth * 2 < canvas.width) {
            ctx.drawImage(bgImage, scrollX + bgWidth * 3, 0, bgWidth, bgHeight);
        }
    } else {
        ctx.fillStyle = '#111';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    // 2. Draw Landmark Text (in the background, behind player but in front of buildings?)
    // Let's draw it in the UI layer instead for clarity, or floating in world.
    // Floating in world is cooler.
    if (currentLandmark) {
        ctx.save();
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
        ctx.roundRect(canvas.width / 2 - 150, 50, 300, 60, 10);
        ctx.fill();

        ctx.fillStyle = "#0ff"; // Neon Cyan
        ctx.font = "bold 20px 'Courier New', monospace";
        ctx.textAlign = "center";
        ctx.shadowColor = "#0ff";
        ctx.shadowBlur = 10;
        ctx.fillText("📍 " + currentLandmark, canvas.width / 2, 85);
        ctx.restore();
    }

    // 3. Draw Player
    // Player stays relatively centered horizontally unless at start
    // Actually, we are moving worldX, but where is player on screen?
    // Let's keep player at 1/3 of screen width usually.
    // But wait, we updated worldX based on vx.
    // We need to decide: does player move on screen or does world move?
    // Standard platformer: Player moves to center, then world moves.

    // Simplified: Player is always at a fixed screen X (e.g., 200px)
    // and the world scrolls.
    // EXCEPT when worldX is near 0.

    let screenX = player.x;
    // If we want the player to be fixed on screen:
    // screenX = 200; 
    // But we defined player.x in update.
    // Let's just use the simple logic:
    // Player is fixed at 20% of screen, background moves.
    screenX = canvas.width * 0.2;

    ctx.save();
    ctx.translate(screenX, player.y);

    if (!player.facingRight) {
        ctx.scale(-1, 1);
        ctx.translate(-player.width, 0);
    }

    if (catSprite) {
        // Bobbing
        let bobY = 0;
        if (player.state === 'walk') {
            bobY = Math.sin(frameCount * 0.2) * 3;
        }
        ctx.drawImage(catSprite, 0, bobY, player.width, player.height);
    } else {
        // Fallback while processing
        ctx.fillStyle = 'orange';
        ctx.fillRect(0, 0, player.width, player.height);
    }
    ctx.restore();

    // 4. Draw Floor (Neon)
    ctx.strokeStyle = '#ff0055'; // Neon Pink
    ctx.lineWidth = 2;
    ctx.shadowBlur = 15;
    ctx.shadowColor = '#ff0055';
    ctx.beginPath();
    ctx.moveTo(0, canvas.height - GROUND_HEIGHT + 10);
    ctx.lineTo(canvas.width, canvas.height - GROUND_HEIGHT + 10);
    ctx.stroke();
    ctx.shadowBlur = 0;
}

function loop() {
    update();
    draw();
    gameLoop = requestAnimationFrame(loop);
}

// Init
bgImage.onload = () => {
    assetsLoaded++;
    if (assetsLoaded >= 2) loop();
};

catRawImage.onload = () => {
    processCatSprite();
    assetsLoaded++;
    if (assetsLoaded >= 2) loop();
};

// Fallback
setTimeout(() => {
    if (assetsLoaded < 2) {
        console.log("Force starting loop");
        loop();
    }
}, 2000);
