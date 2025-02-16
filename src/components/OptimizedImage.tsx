import { useState } from 'react';
import Image from 'next/image';

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      style={{
        width,
        height,
        transition: 'transform 0.5s ease',
        transform: loaded ? 'scale(1)' : 'scale(0.8)',
        overflow: 'hidden',
      }}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        quality={75}
        priority={false}
        onLoadingComplete={() => setLoaded(true)}
        style={{ objectFit: 'cover', width: '100%', height: '100%' }}
      />
    </div>
  );
}
