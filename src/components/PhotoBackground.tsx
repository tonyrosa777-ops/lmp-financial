import Image from 'next/image';

interface PhotoBackgroundProps {
  src: string;
  alt?: string;
  /** Image opacity 0-100. Default 35. */
  opacity?: number;
  /** Whether this is above-the-fold (preload). Default false. */
  priority?: boolean;
}

/**
 * Photographic background for dark-gradient page header sections.
 * Renders an absolutely-positioned <Image fill> with a navy overlay
 * so heading text remains readable. Slot inside any `relative overflow-hidden`
 * `<section className="section-dark-gradient ...">` BEFORE the breathing-orb
 * div and before the content `<div className="relative z-10">` block.
 *
 * Place at z-0 (default). Other elements should be z-10+.
 */
export default function PhotoBackground({
  src,
  alt = '',
  opacity = 35,
  priority = false,
}: PhotoBackgroundProps) {
  return (
    <div aria-hidden="true" className="absolute inset-0 z-0 pointer-events-none">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="100vw"
        priority={priority}
        className="object-cover"
        style={{ opacity: opacity / 100 }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, rgba(14, 27, 51, 0.72) 0%, rgba(14, 27, 51, 0.55) 45%, rgba(14, 27, 51, 0.85) 100%)',
        }}
      />
    </div>
  );
}
