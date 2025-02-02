'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, Suspense } from 'react';
import Script from 'next/script';
import Image from 'next/image';

declare global {
    interface Window {
        fbq: (type: string, eventName: string, params?: Record<string, unknown>) => void;
        _fbq: Record<string, unknown> | undefined;
    }
}

function PageViewTracker() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        if (typeof window !== 'undefined' && window.fbq) {
            window.fbq('track', 'PageView');

        }
    }, [pathname, searchParams]);

    return null;
}

export default function FacebookPixel() {
    return (
        <>
            <Script id="facebook-pixel" strategy="afterInteractive">
                {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];
          t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window,document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID}');
          fbq('track', 'PageView');
        `}
            </Script>

            <Suspense fallback={null}>
                <PageViewTracker />
            </Suspense>

            <noscript>
                <Image
                    height={1}
                    width={1}
                    src={`https://www.facebook.com/tr?id=${process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID}&ev=PageView&noscript=1`}
                    alt=""
                    priority={true}
                />
            </noscript>
        </>
    );
}
