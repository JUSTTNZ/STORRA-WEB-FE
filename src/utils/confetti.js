// Confetti animation utility

class ConfettiManager {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.particles = [];
    this.animationId = null;
    this.isRunning = false;
  }

  init() {
    if (this.canvas) return;

    this.canvas = document.createElement('canvas');
    this.canvas.id = 'confetti-canvas';
    this.canvas.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 9999;
    `;
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    if (this.canvas) {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    }
  }

  createParticle(x, y, color) {
    return {
      x,
      y,
      color,
      size: Math.random() * 10 + 5,
      speedX: (Math.random() - 0.5) * 15,
      speedY: Math.random() * -15 - 5,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 10,
      gravity: 0.3,
      opacity: 1,
      shape: Math.random() > 0.5 ? 'rect' : 'circle',
    };
  }

  burst(x = window.innerWidth / 2, y = window.innerHeight / 2, count = 50) {
    this.init();

    const colors = [
      '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4',
      '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F',
      '#BB8FCE', '#85C1E9', '#F8B500', '#FF69B4',
    ];

    for (let i = 0; i < count; i++) {
      const color = colors[Math.floor(Math.random() * colors.length)];
      this.particles.push(this.createParticle(x, y, color));
    }

    if (!this.isRunning) {
      this.isRunning = true;
      this.animate();
    }
  }

  // Celebration burst from multiple points
  celebrate() {
    const points = [
      { x: window.innerWidth * 0.2, y: window.innerHeight },
      { x: window.innerWidth * 0.5, y: window.innerHeight },
      { x: window.innerWidth * 0.8, y: window.innerHeight },
    ];

    points.forEach((point, i) => {
      setTimeout(() => {
        this.burst(point.x, point.y, 40);
      }, i * 200);
    });
  }

  // Rain confetti from top
  rain(duration = 3000) {
    this.init();
    const startTime = Date.now();

    const colors = [
      '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4',
      '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F',
    ];

    const addParticles = () => {
      if (Date.now() - startTime < duration) {
        for (let i = 0; i < 3; i++) {
          const x = Math.random() * window.innerWidth;
          const color = colors[Math.floor(Math.random() * colors.length)];
          const particle = this.createParticle(x, -20, color);
          particle.speedY = Math.random() * 3 + 2;
          particle.speedX = (Math.random() - 0.5) * 2;
          this.particles.push(particle);
        }
        requestAnimationFrame(addParticles);
      }
    };

    addParticles();

    if (!this.isRunning) {
      this.isRunning = true;
      this.animate();
    }
  }

  // Fireworks effect
  fireworks() {
    const positions = [
      { x: window.innerWidth * 0.25, y: window.innerHeight * 0.3 },
      { x: window.innerWidth * 0.5, y: window.innerHeight * 0.2 },
      { x: window.innerWidth * 0.75, y: window.innerHeight * 0.35 },
    ];

    positions.forEach((pos, i) => {
      setTimeout(() => {
        this.burst(pos.x, pos.y, 60);
      }, i * 400);
    });
  }

  animate() {
    if (!this.ctx || !this.canvas) return;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.particles = this.particles.filter((p) => {
      p.x += p.speedX;
      p.y += p.speedY;
      p.speedY += p.gravity;
      p.rotation += p.rotationSpeed;
      p.opacity -= 0.01;

      if (p.opacity <= 0 || p.y > this.canvas.height + 50) {
        return false;
      }

      this.ctx.save();
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate((p.rotation * Math.PI) / 180);
      this.ctx.globalAlpha = p.opacity;
      this.ctx.fillStyle = p.color;

      if (p.shape === 'rect') {
        this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size / 2);
      } else {
        this.ctx.beginPath();
        this.ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        this.ctx.fill();
      }

      this.ctx.restore();
      return true;
    });

    if (this.particles.length > 0) {
      this.animationId = requestAnimationFrame(() => this.animate());
    } else {
      this.isRunning = false;
    }
  }

  stop() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    this.particles = [];
    this.isRunning = false;
    if (this.ctx && this.canvas) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }

  destroy() {
    this.stop();
    if (this.canvas && this.canvas.parentNode) {
      this.canvas.parentNode.removeChild(this.canvas);
    }
    this.canvas = null;
    this.ctx = null;
  }
}

export const confetti = new ConfettiManager();
export default confetti;
