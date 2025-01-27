'use client';

import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, Suspense } from 'react';
import Image from 'next/image';

// Компонент для відстеження сторінки
function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (window.fbq) {
      window.fbq('track', 'PageView');
    }
  }, [pathname, searchParams]);

  return null;
}

export default function FacebookPixel() {
  return (
    <>
      {/* Основний скрипт Pixel */}
      <Script id="facebook-pixel" strategy="afterInteractive">
        {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1397875247860051');
            fbq('track', 'PageView');
        `}
      </Script>

      <Suspense fallback={null}>
        <PageViewTracker />
      </Suspense>

      {/* NoScript для відстеження без JavaScript */}
      <noscript>
        <Image
          height={1}
          width={1}
          style={{ display: 'none' }}
          src="https://www.facebook.com/tr?id=1397875247860051&ev=PageView&noscript=1"
          alt="Facebook Pixel"
        />
      </noscript>
    </>
  );
}