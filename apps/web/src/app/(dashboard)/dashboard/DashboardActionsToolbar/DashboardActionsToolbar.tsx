'use client';

import { useTransition } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

// icons
import Rows01Icon from '@/assets/icons/rows-01.svg';
import TableIcon from '@/assets/icons/table.svg';
import FileDownload from '@/assets/icons/file-download.svg';

// components
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/Tooltip';
import CreateOrUpdateLinkButton from '@/components/CreateOrUpdateLinkButton';
import SortLinksDropdownMenu from './SortLinksDrodownMenu';
import {
  ToolbarLink,
  ToolbarRoot,
  ToolbarSeparator,
} from '@/components/ui/Toolbar';
import { ToolbarToggleItem, ToolbarToogleGroup } from '@/components/ui/Toolbar';
import { buttonVariants } from '@/components/ui/Button';

export default function DashboardActionsToolbar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [, startTransition] = useTransition();

  const layout = searchParams.get('layout') ?? 'table';

  function onChangeLayout(value: string) {
    if (!value) return;

    const params = new URLSearchParams(window.location.search);
    params.set('layout', value);
    params.delete('count');
    params.delete('createdAt');

    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`);
    });
  }
  
  return (
    <ToolbarRoot className="p-1">
      {layout === 'group' && (
        <>
          <SortLinksDropdownMenu />
          <ToolbarSeparator />
        </>
      )}

      <ToolbarToogleGroup
        value={layout}
        onValueChange={onChangeLayout}
        type="single"
      >
        <Tooltip>
          <ToolbarToggleItem value="table" asChild>
            <TooltipTrigger>
              <TableIcon width={16} height={16} />
            </TooltipTrigger>
          </ToolbarToggleItem>
          <TooltipContent sideOffset={8}>Table Layout</TooltipContent>
        </Tooltip>
        <Tooltip>
          <ToolbarToggleItem value="group" asChild>
            <TooltipTrigger>
              <Rows01Icon width={16} height={16} />
            </TooltipTrigger>
          </ToolbarToggleItem>
          <TooltipContent sideOffset={8}>Group Layout</TooltipContent>
        </Tooltip>
      </ToolbarToogleGroup>
      <ToolbarSeparator />
      <div className="flex gap-2">
        <ToolbarLink
          target="_self"
          download="links.csv"
          href="/api/links/download"
          className={buttonVariants({
            size: 'xs',
            variant: 'secondary',
            className: 'flex gap-2',
          })}
        >
          <FileDownload width={16} height={16} />
          Export
        </ToolbarLink>
        <CreateOrUpdateLinkButton />
      </div>
    </ToolbarRoot>
  );
}
