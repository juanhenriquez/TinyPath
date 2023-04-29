'use client';

import { useTransition } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

// icons
import ArrowUpIcon from '@/assets/icons/arrow-up.svg';
import SortIcon from '@/assets/icons/switch-vertical.svg';
import ArrowDownIcon from '@/assets/icons/arrow-down.svg';

// components
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { ToolbarButton } from '@/components/ui/Toolbar';
import { Button } from '@/components/ui/Button';

export default function SortLinksDropdownMenu() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [, startTransition] = useTransition();

  const countOrder = searchParams.get('count') || '';
  const createdAtOrder = searchParams.get('createdAt') || '';

  function onChangeCountOrder(value: string) {
    if (!value) return;

    const params = new URLSearchParams(window.location.search);
    params.set('count', value);

    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`);
    });
  }

  function onChangeCreatedAtOrder(value: string) {
    if (!value) return;

    const params = new URLSearchParams(window.location.search);
    params.set('createdAt', value);

    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`);
    });
  }

  return (
    <DropdownMenu>
      <ToolbarButton asChild>
        <DropdownMenuTrigger asChild>
          <Button size="xs" variant="secondary" className="gap-2">
            <SortIcon width={16} height={16} />
            Sort
          </Button>
        </DropdownMenuTrigger>
      </ToolbarButton>
      <DropdownMenuContent>
        <DropdownMenuRadioGroup
          value={countOrder}
          onValueChange={onChangeCountOrder}
        >
          <DropdownMenuRadioItem value="asc" className="gap-2">
            <ArrowUpIcon width={16} height={16} />
            <span>Count Ascending</span>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="desc" className="gap-2">
            <ArrowDownIcon width={16} height={16} />
            <span>Count Descending</span>
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={createdAtOrder}
          onValueChange={onChangeCreatedAtOrder}
        >
          <DropdownMenuRadioItem value="asc" className="gap-2">
            <ArrowUpIcon width={16} height={16} />
            <span>Created Date Ascending</span>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="desc" className="gap-2">
            <ArrowDownIcon width={16} height={16} />
            <span>Created Date Descending</span>
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
