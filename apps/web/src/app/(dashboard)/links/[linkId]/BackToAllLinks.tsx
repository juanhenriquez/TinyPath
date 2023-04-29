'use client';

import ArrowNarrowLeftIcon from '@/assets/icons/arrow-narrow-left.svg';
import { buttonVariants } from '@/components/ui/Button';
import Link from 'next/link';

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
