import Image from 'next/image';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  showText?: boolean;
  variant?: 'light' | 'dark';
}

function getLogoSrc(className?: string): string {
  const toneHint = className ?? '';
  const isDarkSurface =
    /(?:^|\s)(?:text-white|text-gray-50|text-slate-50|text-zinc-50|text-neutral-50|bg-gray-9|bg-slate-9|bg-zinc-9|bg-neutral-9)/.test(
      toneHint
    );

  return isDarkSurface ? '/images/kanbex_logo_white.png' : '/images/kanbex_logo_black.png';
}

export function Logo({ className, showText = true, variant }: LogoProps) {
  const logoSrc = variant
    ? variant === 'light'
      ? '/images/kanbex_logo_white.png'
      : '/images/kanbex_logo_black.png'
    : getLogoSrc(className);

  return (
    <div className={cn('inline-flex items-center gap-3 shrink-0 h-11', className)} aria-label="Kanbex">
      <Image
        src={logoSrc}
        alt=""
        width={44}
        height={44}
        className="h-full w-auto shrink-0"
        priority
      />
      {showText && <span className="text-[22px] font-semibold leading-none select-none">Kanbex</span>}
    </div>
  );
}

export function LogoIcon({ className, variant }: { className?: string; variant?: 'light' | 'dark' }) {
  return <Logo className={className} showText={false} variant={variant} />;
}

export default Logo;
