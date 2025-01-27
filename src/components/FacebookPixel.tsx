'use client';

import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, Suspense } from 'react';

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
        console.log("Trying to track page view!", pathname, searchParams.toString());
        if (window.fbq) {
            window.fbq('track', 'PageView');
            console.log("PageView event fired to Facebook Pixel!");
        } else {
            console.log("fbq is not defined?");
        }
    }, [pathname, searchParams]);

    return null;
}


export default function FacebookPixel() {
    return (
        <>
            {/* Базовий код пікселя. Виконується після того, як сторінка завантажена (afterInteractive). */}
            <Script id="facebook-pixel" strategy="afterInteractive">
                {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];
          t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '1790911841722624');
          fbq('track', 'PageView');
        `}
            </Script>

            {/* Трекер, який щоразу викликає PageView при зміні маршруту. */}
            <Suspense fallback={null}>
                <PageViewTracker />
            </Suspense>

            {/* NoScript для тих, хто вимкнув JS (важливо, щоб і ці перегляди відслідковувались). */}
            <noscript>
                <img
                    height={1}
                    width={1}
                    style={{ display: 'none' }}
                    src="https://www.facebook.com/tr?id=YOUR_PIXEL_ID&ev=PageView&noscript=1"
                    alt="fbpx"
                />
            </noscript>
        </>
    );
}
