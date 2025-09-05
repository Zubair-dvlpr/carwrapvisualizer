import React, { useRef, useState, useEffect, useCallback } from "react";

/**
 * Instagram-like carousel: horizontal scroll-snap, dots, chevrons, 1/4 counter
 * Props:
 *  - images: string[] of data URLs (e.g., "data:image/png;base64,...")
 *  - aspect (optional): "square" | "portrait" | "landscape"
 */
const InstagramCarousel = ({ images = [], aspect = "square" }) => {
    const scrollerRef = useRef(null);
    const [index, setIndex] = useState(0);

    // Aspect ratios similar to Instagram
    const aspectClass =
        aspect === "portrait"
            ? "aspect-[4/5]"
            : aspect === "landscape"
                ? "aspect-[1.91/1]"
                : "aspect-square";

    const goTo = useCallback((i) => {
        if (!scrollerRef.current) return;
        const clamped = Math.max(0, Math.min(images.length - 1, i));
        const slides = scrollerRef.current.querySelectorAll("[data-slide]");
        const child = slides[clamped];
        if (child) child.scrollIntoView({ behavior: "smooth", inline: "center" });
    }, [images.length]);

    const next = () => goTo(index + 1);
    const prev = () => goTo(index - 1);

    // Sync index on scroll (snap position)
    useEffect(() => {
        const el = scrollerRef.current;
        if (!el) return;

        const onScroll = () => {
            const { scrollLeft, clientWidth } = el;
            const newIndex = Math.round(scrollLeft / clientWidth);
            if (newIndex !== index) setIndex(newIndex);
        };

        el.addEventListener("scroll", onScroll, { passive: true });
        return () => el.removeEventListener("scroll", onScroll);
    }, [index]);

    // Keyboard arrows
    useEffect(() => {
        const onKey = (e) => {
            if (e.key === "ArrowRight") next();
            if (e.key === "ArrowLeft") prev();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [next]);

    if (!images.length) return null;

    return (
        <div className={`relative w-full max-w-[640px] mx-auto rounded-2xl overflow-hidden bg-black`}>
            {/* Counter like Instagram (top-right) */}
            <div className="absolute right-3 top-3 z-20 text-xs font-medium bg-black/60 text-white px-2 py-1 rounded">
                {index + 1}/{images.length}
            </div>

            {/* Scroller */}
            <div
                ref={scrollerRef}
                className="w-full overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar"
                style={{ scrollbarWidth: "none" }}
            >
                <div className="flex">
                    {images.map((src, i) => (
                        <div key={i} data-slide className={`w-full shrink-0 snap-center ${aspectClass} bg-black h-[520px]`}>
                            <img
                                src={src}
                                alt={`Generated ${i + 1}`}
                                className="w-full h-full object-contain bg-black"
                                draggable={false}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Left / Right chevrons (appear only when available) */}
            {index > 0 && (
                <button
                    aria-label="Previous"
                    onClick={prev}
                    className="absolute left-2 top-1/2 -translate-y-1/2 z-20 rounded-full bg-black/60 backdrop-blur px-2 py-2 hover:bg-black/80"
                >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                        <path d="M15 18l-6-6 6-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            )}
            {index < images.length - 1 && (
                <button
                    aria-label="Next"
                    onClick={next}
                    className="absolute right-2 top-1/2 -translate-y-1/2 z-20 rounded-full bg-black/60 backdrop-blur px-2 py-2 hover:bg-black/80"
                >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                        <path d="M9 6l6 6-6 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            )}

            {/* Dots */}
            <div className="absolute bottom-3 w-full flex items-center justify-center gap-1.5 z-20">
                {images.map((_, i) => (
                    <button
                        key={i}
                        aria-label={`Go to ${i + 1}`}
                        onClick={() => goTo(i)}
                        className={`h-1.5 rounded-full transition-all ${i === index ? "w-5 bg-white" : "w-1.5 bg-white/50"}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default InstagramCarousel;
