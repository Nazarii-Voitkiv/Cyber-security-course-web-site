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
            <Script
                id="facebook-pixel"
                strategy="afterInteractive"
                src="https://connect.facebook.net/en_US/fbevents.js"
                nonce="facebook-pixel-nonce"
            />
            <Script
                id="facebook-pixel-init"
                strategy="afterInteractive"
                nonce="facebook-pixel-nonce"
            >
                {`
                    fbq('init', '${process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID}');
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
