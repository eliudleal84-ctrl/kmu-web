"use client";

import { useEffect, useRef } from 'react';

export function ParticleBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let particles: Particle[] = [];
        let animationFrameId: number;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            init();
        };

        class Particle {
            x: number;
            y: number;
            size: number;
            speedX: number;
            speedY: number;
            color: string;
            originalX: number;
            originalY: number;

            constructor() {
                this.x = Math.random() * canvas!.width;
                this.y = Math.random() * canvas!.height;
                this.originalX = this.x;
                this.originalY = this.y;
                this.size = Math.random() * 3 + 1; // Organic sizes between 1 and 4
                this.speedX = Math.random() * 0.4 - 0.2; // Slow organic movement
                this.speedY = Math.random() * 0.4 - 0.2;

                // Brand colors (Sage, Amber, Stone) with high transparency
                const colors = [
                    'rgba(74, 93, 79, 0.4)',  // Sage Green
                    'rgba(217, 119, 6, 0.3)', // Warm Amber
                    'rgba(120, 113, 108, 0.2)' // Warm Grey
                ];
                this.color = colors[Math.floor(Math.random() * colors.length)];
            }

            update() {
                // Simple fluid movement
                this.x += this.speedX;
                this.y += this.speedY;

                // Bounce off edges gently
                if (this.x > canvas!.width || this.x < 0) this.speedX *= -1;
                if (this.y > canvas!.height || this.y < 0) this.speedY *= -1;
            }

            draw() {
                ctx!.fillStyle = this.color;
                ctx!.beginPath();
                ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx!.fill();
            }
        }

        const init = () => {
            particles = [];
            // Dynamic particle count based on screen size (prevent overcrowding)
            const particleCount = Math.min(Math.floor((window.innerWidth * window.innerHeight) / 12000), 100);

            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        };

        const connectParticles = () => {
            // Connect nearby particles with subtle lines (Gestalt principle: Closure/Proximity)
            for (let a = 0; a < particles.length; a++) {
                for (let b = a; b < particles.length; b++) {
                    const dx = particles[a].x - particles[b].x;
                    const dy = particles[a].y - particles[b].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 150) { // Connection distance
                        const opacity = 1 - distance / 150;
                        ctx!.strokeStyle = `rgba(168, 162, 158, ${opacity * 0.2})`; // Very subtle grey line
                        ctx!.lineWidth = 1;
                        ctx!.beginPath();
                        ctx!.moveTo(particles[a].x, particles[a].y);
                        ctx!.lineTo(particles[b].x, particles[b].y);
                        ctx!.stroke();
                    }
                }
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach((particle) => {
                particle.update();
                particle.draw();
            });

            connectParticles();
            animationFrameId = requestAnimationFrame(animate);
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();
        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 w-full h-full -z-10 opacity-60 pointer-events-none"
            aria-hidden="true"
        />
    );
}
