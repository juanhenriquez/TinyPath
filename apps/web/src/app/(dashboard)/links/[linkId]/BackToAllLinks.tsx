'use client';

import Link from 'next/link';

// icons
import ArrowNarrowLeftIcon from '@/assets/icons/arrow-narrow-left.svg';

// components
import { buttonVariants } from '@/components/ui/Button';

export default function BackToAllLinks() {
  return (
    <Link
      href="/dashboard"
      className={buttonVariants({
        size: 'sm',
        variant: 'ghost',
        className: 'flex w-auto items-center gap-2',
      })}
    >
      <ArrowNarrowLeftIcon width={16} height={16} />
      <span className="text-foreground text-sm">All links</span>
    </Link>
  );
}
