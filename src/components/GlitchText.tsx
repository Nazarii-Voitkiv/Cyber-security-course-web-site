'use client';

interface GlitchTextProps {
  text: string;
  className?: string;
}

const GlitchText = ({ text, className = '' }: GlitchTextProps) => {
  return (
    <span className={`glitch-text ${className}`}>
      {text}
    </span>
  );
};

export default GlitchText;
