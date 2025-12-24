'use client';

import { useEffect } from 'react';

interface AdSenseAdProps {
    adSlot: string;
    adFormat?: 'auto' | 'fluid' | 'rectangle' | 'vertical' | 'horizontal';
    fullWidthResponsive?: boolean;
    className?: string;
}

export default function AdSenseAd({
    adSlot,
    adFormat = 'auto',
    fullWidthResponsive = true,
    className = '',
}: AdSenseAdProps) {
    useEffect(() => {
        try {
            // @ts-ignore
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (err) {
            console.error('AdSense error:', err);
        }
    }, []);

    return (
        <div className={`adsense-container ${className}`}>
            <ins
                className="adsbygoogle"
                style={{ display: 'block' }}
                data-ad-client="ca-pub-2757390342181644"
                data-ad-slot={adSlot}
                data-ad-format={adFormat}
                data-full-width-responsive={fullWidthResponsive.toString()}
            />
        </div>
    );
}
