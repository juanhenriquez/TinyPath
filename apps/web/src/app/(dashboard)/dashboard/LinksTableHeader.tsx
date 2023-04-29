'use client';

// assets
import ArrowUpIcon from '@/assets/icons/arrow-up.svg';
import ArrowDownIcon from '@/assets/icons/arrow-down.svg';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';

export default function LinksTableHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [, startTransition] = useTransition();

  const countOrder = searchParams.get('count');
  const createdAtOrder = searchParams.get('createdAt');

  function onSortByClick() {
    const newCountOrder = countOrder === 'desc' ? 'asc' : 'desc';
    const params = new URLSearchParams(window.location.search);

    params.set('count', newCountOrder);
    params.delete('createdAt');

    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`);
    });
  }

  function onSortByDate() {
    const newCreatedAtOrder = createdAtOrder === 'desc' ? 'asc' : 'desc';
    const params = new URLSearchParams(window.location.search);

    params.set('createdAt', newCreatedAtOrder);
    params.delete('count');

    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`);
    });
  }

  return (
    <thead className="bg-card">
      <tr>
        <th
          scope="col"
          className="text-foreground py-3 pl-4 pr-3 text-left text-xs font-semibold sm:pl-6"
        >
          Name
        </th>
        <th
          scope="col"
          className="text-foreground px-3 py-3 text-left text-xs font-semibold"
        >
          <button className="flex items-center gap-2" onClick={onSortByClick}>
            Clicks
            {countOrder === 'desc' && <ArrowDownIcon width={12} height={12} />}
            {countOrder === 'asc' && <ArrowUpIcon width={12} height={12} />}
          </button>
        </th>
        <th
          scope="col"
          className="text-foreground px-3 py-3 text-left text-xs font-semibold"
        >
          <button className="flex items-center gap-2" onClick={onSortByDate}>
            Created At
            {createdAtOrder === 'desc' && (
              <ArrowDownIcon width={12} height={12} />
            )}
            {createdAtOrder === 'asc' && <ArrowUpIcon width={12} height={12} />}
          </button>
        </th>
        <th scope="col" className="relative py-3 pl-3 pr-4 sm:pr-6">
          <span className="sr-only">Edit</span>
        </th>
      </tr>
    </thead>
  );
}
