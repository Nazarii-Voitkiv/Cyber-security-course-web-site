'use client';

export default function CyberStyles() {
  return (
    <style jsx global>{`
      .cyber-lines {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;
        background-image: 
          linear-gradient(0deg, transparent 24%, rgba(32, 255, 77, 0.05) 25%, rgba(32, 255, 77, 0.05) 26%, transparent 27%, transparent 74%, rgba(32, 255, 77, 0.05) 75%, rgba(32, 255, 77, 0.05) 76%, transparent 77%, transparent),
          linear-gradient(90deg, transparent 24%, rgba(32, 255, 77, 0.05) 25%, rgba(32, 255, 77, 0.05) 26%, transparent 27%, transparent 74%, rgba(32, 255, 77, 0.05) 75%, rgba(32, 255, 77, 0.05) 76%, transparent 77%, transparent);
        background-size: 50px 50px;
      }

      .cyber-glow {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;
        background: 
          radial-gradient(circle at 50% 50%, rgba(32, 255, 77, 0.1) 0%, rgba(32, 255, 77, 0) 50%),
          radial-gradient(circle at 0% 0%, rgba(32, 255, 77, 0.1) 0%, rgba(32, 255, 77, 0) 50%),
          radial-gradient(circle at 100% 0%, rgba(32, 255, 77, 0.1) 0%, rgba(32, 255, 77, 0) 50%),
          radial-gradient(circle at 0% 100%, rgba(32, 255, 77, 0.1) 0%, rgba(32, 255, 77, 0) 50%),
          radial-gradient(circle at 100% 100%, rgba(32, 255, 77, 0.1) 0%, rgba(32, 255, 77, 0) 50%);
      }

      :root {
        --primary-glow: conic-gradient(
          from 180deg at 50% 50%,
          #16abff33 0deg,
          #0885ff33 55deg,
          #54d6ff33 120deg,
          #0071ff33 160deg,
          transparent 360deg
        );
        --secondary-glow: radial-gradient(
          rgba(255, 255, 255, 0.1),
          rgba(255, 255, 255, 0)
        );
      }

      /* Додаємо кібер-ефекти для всіх кнопок */
      button {
        position: relative;
        overflow: hidden;
      }

      button::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(
          120deg,
          transparent,
          rgba(32, 255, 77, 0.2),
          transparent
        );
        transition: 0.5s;
      }

      button:hover::before {
        left: 100%;
      }

      /* Кібер-ефект для заголовків */
      h1, h2, h3 {
        font-family: var(--font-share-tech-mono);
        text-shadow: 0 0 10px rgba(32, 255, 77, 0.5);
      }
    `}</style>
  );
}
