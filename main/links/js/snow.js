/*
 
// Add snow to web page in December -  Snow.js - 04Dec25

    add with:  <script src="js/snow.js"></script>

*/

console.log("Festivus snow Javascript loaded");


// only display if it is December up to 25th
//      note: Jan=0, first day of month=1

/**
 * Christmas Snow Effect - Gradual Buildup Version
 * Creates an animated snowfall that intensifies very slowly as Christmas approaches
 */
 
 
(function() {
    // Configuration
    const config = {
        // Snowflake characters - using various unicode snowflake symbols
        snowflakes: ['❄', '❅', '❆', '✻', '✼', '❉', '❊'],
        
        // Colors for snowflakes (can include gradients)
        colors: ['#FFFFFF', '#F0F8FF', '#E6F3FF', '#CCDFFF', '#B3D9FF'],
        
        // Date range for effect (December 1-25)
        startDay: 1,
        endDay: 25,
        
        // Min and max number of snowflakes - adjusted for gradual buildup
        minFlakes: 1,      // Start with just 1 flake
        maxFlakes: 200,    // End with 200 flakes
        
        // Size range for snowflakes
        minSize: 8,
        maxSize: 18,
        
        // Speed range for falling
        minSpeed: 1,
        maxSpeed: 3,
        
        // Wind effect
        wind: 0.4,
        
        // Opacity range
        minOpacity: 0.3,
        maxOpacity: 0.5,
        
        // Z-index for snowflakes - set very high to appear above everything
        zIndex: 99999
    };

    // Debug mode - set to true to see console messages
    const debug = false;
     

    // Check if we should show snow based on date
    const today = new Date();
    const isDecember = today.getMonth() === 11; // December is month 11 (0-indexed)
    const dayOfMonth = today.getDate();
    if (debug) {
        console.log(`Current date: ${today}`);
        console.log(`Is December: ${isDecember}, Day: ${dayOfMonth}`);
    }
    if (!isDecember || dayOfMonth < config.startDay || dayOfMonth > config.endDay) {
        if (debug) console.log("Snow effect disabled: Not in date range");
        return; // Don't run the snow effect
    }
    
    // mouse interaction
    let mouse = { x: null, y: null };
    window.addEventListener('mousemove', e => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });      

    // Calculate snow intensity based on date (1-25) - GRADUAL BUILDUP
    function calculateSnowIntensity() {
        // Normalize date to 0-1 range
        const normalizedDate = (dayOfMonth - config.startDay) / (config.endDay - config.startDay);
        
        // Use a logarithmic function for very slow initial growth
        // This creates a curve that stays very low for most of the month and then increases rapidly near the end
        const easedProgress = Math.pow(normalizedDate, 1.6); // Higher exponent = slower initial growth
        
        // Calculate number of flakes based on eased progress
        const flakeCount = Math.floor(config.minFlakes + easedProgress * (config.maxFlakes - config.minFlakes));
        
        if (debug) {
            console.log(`Day: ${dayOfMonth}, Normalized: ${normalizedDate.toFixed(2)}, Progress: ${easedProgress.toFixed(2)}, Flakes: ${flakeCount}`);
        }
        
        return flakeCount;
    }

    // Create a snowflake element
    function createSnowflake(id) {
        const flake = document.createElement('div');
        flake.id = `snowflake-${id}`;
        flake.className = 'snowflake';
        flake.innerHTML = config.snowflakes[Math.floor(Math.random() * config.snowflakes.length)];
        
        // Set initial styles
        const size = Math.random() * (config.maxSize - config.minSize) + config.minSize;
        const opacity = Math.random() * (config.maxOpacity - config.minOpacity) + config.minOpacity;
        const color = config.colors[Math.floor(Math.random() * config.colors.length)];
        
        flake.style.position = 'fixed';
        flake.style.top = `${Math.random() * window.innerHeight}px`;
        flake.style.left = `${Math.random() * window.innerWidth}px`;
        flake.style.fontSize = `${size}px`;
        flake.style.color = color;
        flake.style.opacity = opacity;
        flake.style.zIndex = config.zIndex;
        flake.style.pointerEvents = 'none';
        flake.style.userSelect = 'none';
        flake.style.willChange = 'transform';
        
        // Add some rotation
        flake.style.transform = `rotate(${Math.random() * 360}deg)`;
        
        // Add text shadow for better visibility against backgrounds
        flake.style.textShadow = '0 0 5px rgba(255, 255, 255, 0.8), 0 0 10px rgba(255, 255, 255, 0.6)';
        
        return flake;
    }

// --- Snowflake class (replace your existing class) ---
class Snowflake {
    constructor(element, initial = false) {
        this.element = element;
        this.reset(initial);
    }

    reset(initial = false) {
        // Position
        this.x = Math.random() * window.innerWidth;
        // If initial spawn, pick a random y. Otherwise start at top.
        this.y = initial ? Math.random() * window.innerHeight : -50;

        // Movement
        this.speed = Math.random() * (config.maxSpeed - config.minSpeed) + config.minSpeed;
        this.windOffset = Math.random() * 2 - 1;
        this.oscillationSpeed = Math.random() * 0.05 + 0.01;
        this.oscillationAmount = Math.random() * 1.5 + 0.5;
        this.angle = Math.random() * Math.PI * 2;

        // Visual properties
        this.rotation = Math.random() * 360;
        this.rotationSpeed = Math.random() * 2 - 1;

        // Apply initial position
        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;
    }

    update() {
        // (keep your update logic unchanged)
        this.y += this.speed;
        this.angle += this.oscillationSpeed;
        this.x += Math.sin(this.angle) * this.oscillationAmount + config.wind * this.windOffset;

        if (mouse.x !== null) {
            const dx = this.x - mouse.x;
            const dy = this.y - mouse.y;
            const dist = Math.sqrt(dx*dx + dy*dy);
            // mouse settings
            const radius = 160;      // was 120
            const strength = 4;      // was 4
            if (dist < radius) {
                const force = (radius - dist) / radius;
                this.x += (dx / dist) * force * strength;
                this.y += (dy / dist) * force * strength;
            }
        }

        this.rotation += this.rotationSpeed;

        this.element.style.transform = `translate(${this.x - parseFloat(this.element.style.left)}px, ${this.y - parseFloat(this.element.style.top)}px) rotate(${this.rotation}deg)`;

        if (this.y > window.innerHeight + 50 || this.x < -50 || this.x > window.innerWidth + 50) {
            this.reset(); // subsequent resets start at top
        }
    }
}

    // Main snow effect class
    class SnowEffect {
        constructor() {
            // Create container with high z-index
            this.container = document.createElement('div');
            this.container.id = 'snow-container';
            this.container.style.position = 'fixed';
            this.container.style.top = '0';
            this.container.style.left = '0';
            this.container.style.width = '100%';
            this.container.style.height = '100%';
            this.container.style.pointerEvents = 'none';
            this.container.style.overflow = 'visible'; // Changed to visible
            this.container.style.zIndex = config.zIndex;
            
            // Add to DOM - try to add as high as possible in the DOM tree
            if (document.body) {
                document.body.appendChild(this.container);
                if (debug) console.log("Snow container added to body");
            } else if (document.documentElement) {
                document.documentElement.appendChild(this.container);
                if (debug) console.log("Snow container added to documentElement");
            } else {
                if (debug) console.error("Could not add snow container to DOM");
                return;
            }
            
            this.snowflakes = [];
            this.animationId = null;
            
            // Calculate how many snowflakes to create
            const flakeCount = calculateSnowIntensity();
            if (debug) console.log(`Creating ${flakeCount} snowflakes`);
            
            // create snowflakes (only change is passing `true` for initial spawn)
            for (let i = 0; i < flakeCount; i++) {
                const element = createSnowflake(i);
                this.container.appendChild(element);
                this.snowflakes.push(new Snowflake(element, true)); // <- true = initial random Y
            }
            
            // Handle window resize
            window.addEventListener('resize', this.handleResize.bind(this));
            
            // Start animation
            this.animate();
            
            if (debug) console.log("Snow effect initialized");
        }

        handleResize() {
            // Reset snowflakes that might be out of view after resize
            this.snowflakes.forEach(flake => {
                if (flake.x > window.innerWidth || flake.y > window.innerHeight) {
                    flake.reset();
                }
            });
        }

        animate() {
            // Update all snowflakes
            this.snowflakes.forEach(flake => flake.update());
            
            // Continue animation
            this.animationId = requestAnimationFrame(this.animate.bind(this));
        }

        destroy() {
            // Cancel animation
            if (this.animationId) {
                cancelAnimationFrame(this.animationId);
            }
            
            // Remove container and all snowflakes
            if (this.container && this.container.parentNode) {
                this.container.parentNode.removeChild(this.container);
            }
            
            this.snowflakes = [];
        }
    }

    // Add CSS for better performance and visibility
    const style = document.createElement('style');
    style.textContent = `
        .snowflake {
            position: fixed;
            top: -50px;
            z-index: ${config.zIndex};
            pointer-events: none;
            text-shadow: 0 0 5px rgba(255, 255, 255, 0.8), 0 0 10px rgba(255, 255, 255, 0.6);
            will-change: transform;
            /* Ensure snowflakes are above everything */
            position: fixed !important;
        }
        
        #snow-container {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            height: 100% !important;
            pointer-events: none !important;
            z-index: ${config.zIndex} !important;
            overflow: visible !important;
        }
    `;
    document.head.appendChild(style);
    if (debug) console.log("Snow styles added to head");

    // Initialize snow effect when DOM is ready
    function initSnow() {
        if (debug) console.log("Initializing snow effect");
        const snowEffect = new SnowEffect();
        
        // Clean up on page unload
        window.addEventListener('beforeunload', () => {
            snowEffect.destroy();
        });
    }

    // Make sure DOM is ready before initializing
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSnow);
        if (debug) console.log("Waiting for DOM to load");
    } else {
        initSnow();
        if (debug) console.log("DOM already loaded, initializing snow");
    }
})();
