'use client';

import { useEffect, useRef } from 'react';

const CyberBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Встановлюємо розмір canvas на весь екран
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Символи для матричного дощу
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    
    // Масив для зберігання позицій Y кожної колонки
    const drops: number[] = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
    }

    // Функція малювання
    const draw = () => {
      // Напівпрозорий чорний фон для створення ефекту затухання
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Налаштування тексту
      ctx.fillStyle = '#0F0';
      ctx.font = `${fontSize}px monospace`;

      // Малюємо символи
      for (let i = 0; i < drops.length; i++) {
        // Випадковий символ
        const char = chars[Math.floor(Math.random() * chars.length)];
        
        // Позиція X розраховується на основі індексу та розміру шрифту
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Малюємо символ
        ctx.fillText(char, x, y);

        // Якщо крапля досягла низу, повертаємо її вгору
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        // Рухаємо краплю вниз
        drops[i]++;
      }
    };

    // Додаємо періодичні кібер-глітчі
    const createGlitch = () => {
      if (!ctx) return;
      
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const width = Math.random() * 100 + 50;
      const height = Math.random() * 30 + 10;
      
      ctx.fillStyle = `rgba(${Math.random() * 255}, ${Math.random() * 255}, 255, 0.1)`;
      ctx.fillRect(x, y, width, height);
    };

    // Анімаційний цикл
    let animationId: number;
    const animate = () => {
      draw();
      if (Math.random() > 0.95) createGlitch();
      animationId = requestAnimationFrame(animate);
    };
    
    animate();

    // Очищення при розмонтуванні
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};

export default CyberBackground;
