<script setup>
import { onMounted, ref } from "vue";

const canvasRef = ref(null);
const particles = ref([]);

const NUM_PARTICLES = 80; // Número de partículas

// Función para inicializar partículas
const initParticles = (canvas) => {
    const ctx = canvas.getContext("2d");
    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight);

    particles.value = Array.from({ length: NUM_PARTICLES }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 2,
        speedY: (Math.random() - 0.5) * 2,
    }));

    animateParticles(ctx, width, height);
};

// Función para animar partículas
const animateParticles = (ctx, width, height) => {
    ctx.clearRect(0, 0, width, height);

    particles.value.forEach((p) => {
        // Mueve las partículas
        p.x += p.speedX;
        p.y += p.speedY;

        // Rebote en los bordes
        if (p.x < 0 || p.x > width) p.speedX *= -1;
        if (p.y < 0 || p.y > height) p.speedY *= -1;

        // Dibujar partícula
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.fill();
    });

    requestAnimationFrame(() => animateParticles(ctx, width, height));
};

// Se ejecuta cuando el componente se monta
    onMounted(() => {
    const canvas = canvasRef.value;
    if (canvas) initParticles(canvas);
});
</script>

<template>
    <canvas ref="canvasRef" class="absolute top-0 left-0 w-full h-full -z-10"></canvas>
</template>

<style scoped>
    canvas {
        position: fixed;
        background: #0f172a; /* Color de fondo oscuro */
    }
</style>
