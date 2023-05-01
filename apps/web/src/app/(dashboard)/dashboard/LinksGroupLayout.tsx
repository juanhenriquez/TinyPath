'use client';

import type { Link } from '@tinypath/database';
import { useInView } from 'react-intersection-observer';

// queries
import useInfiniteLinks from '@/queries/useInfiniteLink';

// components
import LinkActions from './LinkActions';
import { useSearchParams } from 'next/navigation';
import { Spinner } from '@/components/ui/Spinner';

type SortOption = 'asc' | 'desc' | undefined;

export default function LinksGroupLayout() {
  const searchParams = useSearchParams();
  const {
    data,
    hasNextPage: hasMoreLinks,
    fetchNextPage: fetchMoreLinks,
    isLoading: isLoadingMoreLinks,
    isFetchingNextPage: isFetchingMoreLinks,
  } = useInfiniteLinks({
    take: 15,
    count: searchParams.get('count') as SortOption,
    createdAt: searchParams.get('createdAt') as SortOption,
  });

  // Group links by date by creating an object with the date as
  // the key and an array of links as the value.
  const links = data?.pages?.flatMap(page => page.links);
  const linksGroupedByDate = links?.length
    ? links.reduce<{
        [key: string]: Link[];
      }>((prev, link) => {
        const date = new Date(link.created_date).toLocaleDateString();

        if (!prev[date]) {
          prev[date] = [];
        }

        prev[date]?.push(link);

        return prev;
      }, {})
    : {};

  const { ref } = useInView({
    threshold: 1,
    onChange: inView => {
      if (inView && hasMoreLinks) {
        fetchMoreLinks();
      }
    },
  });

  if (!links?.length) {
    return (
      <div className="text-muted-foreground bg-card border-border flex min-h-[80px] items-center justify-center rounded-md border-[0.5px] border-dashed text-xs shadow-sm">
        No links found
      </div>
    );
  }

  return (
    <div className="relative flex flex-col gap-8 pb-[80px]">
      {Object.keys(linksGroupedByDate)
        .sort((a, b) => {
          if (searchParams.get('createdAt') === 'asc') {
            return new Date(a).getTime() - new Date(b).getTime();
          } else {
            return new Date(b).getTime() - new Date(a).getTime();
          }
        })
        .map(date => {
          const currentLinks = linksGroupedByDate[date];
          return (
            <div key={date} className="flex flex-col gap-2">
              <div className="text-xs font-medium text-zinc-700 dark:text-zinc-500">
                {new Date(date).toLocaleDateString('en-US', {
                  weekday: 'short',
                  month: 'long',
                  day: 'numeric',
                })}
              </div>

              <div className="bg-card border-border flex flex-col overflow-hidden rounded-md border-[0.5px] shadow-sm">
                {currentLinks
                  .sort((a, b) => {
                    if (searchParams.get('count') === 'asc') {
                      return a.count - b.count;
                    } else {
                      return b.count - a.count;
                    }
                  })
                  .map(link => (
                    <div
                      className="border-border grid grid-cols-[1fr,fit-content(100%)] items-center border-b px-4 py-2 last:border-b-0 sm:h-[44px] sm:justify-between sm:gap-3"
                      key={link.id}
                    >
                      <div className="flex flex-col sm:grid sm:grid-cols-[160px,1fr]">
                        <div className="max-w-[160px] overflow-hidden text-ellipsis whitespace-nowrap text-xs font-medium sm:max-w-none">
                          {link.name || link.uri}
                        </div>
                        <div className="sm:border-border items-center text-xs sm:border-l sm:pl-3">
                          {link.count}{' '}
                          <span className="text-muted-foreground">Clicks</span>
                        </div>
                      </div>
                      <div className="ml-auto flex">
                        <LinkActions link={link} />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          );
        })}
      {!isLoadingMoreLinks && hasMoreLinks && (
        <div
          ref={ref}
          className="pointer-events-none absolute bottom-0 left-0 flex h-[40px] w-full items-center justify-center"
        >
          {isFetchingMoreLinks && (
            <div className="absolute bottom-8 flex w-full items-center justify-center">
              <Spinner width={20} height={20} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
