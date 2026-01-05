/**
 * Furstenberg's Proof Visualization
 * Implements a "Number Line Topology" visualizer
 */

class TopologyVisualizer {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.width = this.canvas.offsetWidth;
        this.height = this.canvas.offsetHeight;

        // State
        this.primes = [2, 3, 5, 7, 11, 13];
        this.activePrimes = new Set();
        this.offset = 0; // Pan offset
        this.scale = 40; // Pixels per integer
        this.isDragging = false;
        this.lastX = 0;

        // Colors for primes
        this.colors = {
            2: '#3b82f6', // Blue
            3: '#ef4444', // Red
            5: '#10b981', // Green
            7: '#f59e0b', // Amber
            11: '#8b5cf6', // Violet
            13: '#ec4899' // Pink
        };

        this.init();
    }

    init() {
        // Setup Canvas
        this.resize();
        window.addEventListener('resize', () => this.resize());

        // Controls
        this.setupControls();

        // Interactions
        this.canvas.addEventListener('mousedown', (e) => {
            this.isDragging = true;
            this.lastX = e.clientX;
        });
        window.addEventListener('mousemove', (e) => {
            if (this.isDragging) {
                const dx = e.clientX - this.lastX;
                this.offset += dx;
                this.lastX = e.clientX;
                this.draw();
            }
        });
        window.addEventListener('mouseup', () => this.isDragging = false);

        // Zoom
        this.canvas.addEventListener('wheel', (e) => {
            e.preventDefault();
            const zoomSpeed = 0.001;
            this.scale *= (1 - e.deltaY * zoomSpeed);
            this.scale = Math.max(10, Math.min(200, this.scale));
            this.draw();
        });

        // Initial Draw
        this.draw();
        this.animate();
    }

    resize() {
        this.width = this.canvas.parentElement.offsetWidth;
        this.height = 400;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.draw();
    }

    setupControls() {
        const container = document.getElementById('primeControls');
        this.primes.forEach(p => {
            const btn = document.createElement('button');
            btn.className = 'viz-btn';
            btn.textContent = `p=${p}`;
            btn.onclick = () => this.togglePrime(p, btn);
            container.appendChild(btn);
        });

        // Add a "Clear" button
        const clearBtn = document.createElement('button');
        clearBtn.className = 'viz-btn';
        clearBtn.textContent = 'Clear';
        clearBtn.onclick = () => {
            this.activePrimes.clear();
            document.querySelectorAll('.viz-btn').forEach(b => b.classList.remove('active'));
            this.draw();
        };
        container.appendChild(clearBtn);
    }

    togglePrime(p, btn) {
        if (this.activePrimes.has(p)) {
            this.activePrimes.delete(p);
            btn.classList.remove('active');
        } else {
            this.activePrimes.add(p);
            btn.classList.add('active');
        }
        this.draw();
    }

    draw() {
        const ctx = this.ctx;
        ctx.clearRect(0, 0, this.width, this.height);

        const centerX = this.width / 2 + this.offset;
        const centerY = this.height / 2;

        // Draw Number Line
        ctx.beginPath();
        ctx.strokeStyle = '#475569';
        ctx.lineWidth = 2;
        ctx.moveTo(0, centerY);
        ctx.lineTo(this.width, centerY);
        ctx.stroke();

        // Calculate visible range
        const startN = Math.floor((0 - centerX) / this.scale);
        const endN = Math.ceil((this.width - centerX) / this.scale);

        // Draw Integers
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = '14px monospace';

        for (let n = startN; n <= endN; n++) {
            const x = centerX + n * this.scale;

            // Check if covered by any active prime
            let isCovered = false;
            let coveringPrime = null;

            // Find the smallest prime that covers this number (for color priority)
            // Special case: 0 is covered by everything, 1 and -1 by nothing
            if (n === 0) {
                isCovered = this.activePrimes.size > 0;
                coveringPrime = Math.min(...this.activePrimes);
            } else if (Math.abs(n) === 1) {
                isCovered = false;
            } else {
                for (let p of this.activePrimes) {
                    if (n % p === 0) {
                        isCovered = true;
                        if (!coveringPrime || p < coveringPrime) coveringPrime = p;
                    }
                }
            }

            // Draw Tick
            ctx.beginPath();
            ctx.moveTo(x, centerY - 5);
            ctx.lineTo(x, centerY + 5);
            ctx.strokeStyle = isCovered ? this.colors[coveringPrime] : '#94a3b8';
            ctx.lineWidth = isCovered ? 3 : 1;
            ctx.stroke();

            // Draw Number
            ctx.fillStyle = isCovered ? this.colors[coveringPrime] : '#94a3b8';
            if (Math.abs(n) === 1) ctx.fillStyle = '#fff'; // Highlight 1 and -1

            ctx.fillText(n.toString(), x, centerY + 25);

            // Draw "Covered" indicator (dot)
            if (isCovered) {
                ctx.beginPath();
                ctx.arc(x, centerY, 4, 0, Math.PI * 2);
                ctx.fillStyle = this.colors[coveringPrime];
                ctx.fill();
            }
        }

        // Draw Arcs for Active Primes
        // We only draw arcs for visible numbers to save performance
        this.activePrimes.forEach(p => {
            ctx.strokeStyle = this.colors[p];
            ctx.lineWidth = 2;
            ctx.globalAlpha = 0.6;

            // Find first multiple of p before startN
            let startMultiple = Math.floor(startN / p) * p;

            for (let n = startMultiple; n <= endN; n += p) {
                const x1 = centerX + n * this.scale;
                const x2 = centerX + (n + p) * this.scale;

                // Draw arc between n and n+p
                const radius = (p * this.scale) / 2;
                const midX = (x1 + x2) / 2;

                ctx.beginPath();
                ctx.arc(midX, centerY, radius, Math.PI, 0);
                ctx.stroke();
            }
            ctx.globalAlpha = 1.0;
        });

        // Highlight -1 and 1 if they are the only ones left
        // (Visual flair: if active primes are non-empty, draw a box around -1 and 1)
        if (this.activePrimes.size > 0) {
            const x1 = centerX + 1 * this.scale;
            const xMinus1 = centerX + (-1) * this.scale;

            // Glow effect for 1
            const time = Date.now() / 500;
            const glow = 5 + Math.sin(time) * 3;

            ctx.shadowColor = '#fff';
            ctx.shadowBlur = glow;
            ctx.fillStyle = '#fff';

            // Just re-draw the numbers 1 and -1 with glow
            if (x1 > -20 && x1 < this.width + 20) ctx.fillText("1", x1, centerY + 25);
            if (xMinus1 > -20 && xMinus1 < this.width + 20) ctx.fillText("-1", xMinus1, centerY + 25);

            ctx.shadowBlur = 0;
        }
    }

    animate() {
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new TopologyVisualizer('topologyCanvas');
}); 
