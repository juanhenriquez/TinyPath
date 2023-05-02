'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';

// queries
import useLinks from '@/queries/useLinks';

// components
import LinkActions from './LinkActions';
import Paginator from '@/components/ui/Paginator';
import LinksTableHeader from './LinksTableHeader';
import { Spinner } from '@/components/ui/Spinner';

type SortOption = 'asc' | 'desc' | undefined;

const PAGE_SIZE = 15;

export default function LinksTableLayout() {
  const searchParams = useSearchParams();

  const [currentPage, setCurrentPage] = useState(1);

  const countOrder = searchParams.get('count') as SortOption;
  const createdAtOrder = searchParams.get('createdAt') as SortOption;

  const { data, isLoading, isFetching } = useLinks(
    {
      currentPage,
      take: PAGE_SIZE,
      count: countOrder,
      createdAt: createdAtOrder,
    },
    { keepPreviousData: true },
  );

  if (isLoading) {
    return (
      <div className="flex w-full items-center justify-center">
        <Spinner size={16} />
      </div>
    );
  }

  if (!data?.links?.length) {
    return (
      <div className="text-muted-foreground bg-card border-border flex min-h-[80px] items-center justify-center rounded-md border-[0.5px] border-dashed text-xs shadow-sm">
        No links found
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <div className="-mx-4 -my-2 w-full overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full px-[0.5px] py-2 align-middle">
          <div className="ring-border overflow-hidden rounded-lg shadow ring-[0.5px] ring-opacity-5">
            <table
              className="divide-border min-w-full divide-y-[0.5px]"
              data-testid="links-table"
            >
              <LinksTableHeader />
              <tbody className="divide-border bg-card divide-y-[0.5px]" data-testid="links-table-body">
                {data?.links?.map(link => (
                  <tr key={link.id}>
                    <td className="text-foreground max-w-[100px] overflow-hidden text-ellipsis whitespace-nowrap py-2 pl-4 pr-3 text-xs font-medium sm:pl-6">
                      {link.name || link.uri}
                    </td>
                    <td className="text-muted-foreground whitespace-nowrap px-3 py-2 text-xs">
                      {link.count}
                    </td>
                    <td className="text-muted-foreground whitespace-nowrap px-3 py-2 text-xs">
                      {new Date(link.created_date).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </td>
                    <td className="relative whitespace-nowrap py-2 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                      <LinkActions link={link} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="relative flex items-center">
        <Paginator
          pageSize={PAGE_SIZE}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          totalCount={data?.total || 0}
        />
        {isFetching && (
          <div className="absolute right-0 translate-x-full pl-2">
            <Spinner size={16} />
          </div>
        )}
      </div>
    </div>
  );
}
