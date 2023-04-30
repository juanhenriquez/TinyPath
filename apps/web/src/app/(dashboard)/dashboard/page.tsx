import { Suspense } from 'react';

// lib
import { getLinks } from '@/lib/links';

// components
import LinksTableLayout from './LinksTableLayout';
import LinksGroupLayout from './LinksGroupLayout';
import { Spinner } from '@/components/ui/Spinner';
import DashboardActionsToolbar from './DashboardActionsToolbar/DashboardActionsToolbar';

interface DashboardPageSearchParams {
  count?: 'desc' | 'asc';
  layout: 'table' | 'group';
  createdAt?: 'desc' | 'asc';
}

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: DashboardPageSearchParams;
}) {
  // Get links from database.
  const links = await getLinks(searchParams.createdAt, searchParams.count);

  // Get selected layout from search params.
  const layout = searchParams.layout ?? 'table';

  return (
    <div className="mx-auto flex w-full max-w-4xl items-start px-4 py-12 sm:px-6">
      <div className="flex w-full flex-col">
        <div className="flex w-full flex-col justify-between gap-4 border-b-[0.5px] border-black/10 pb-4 dark:border-white/10 sm:flex-row sm:items-center sm:gap-0">
          <div className="flex flex-col">
            <h1 className="text-sm font-semibold">Links</h1>
            <p className="text-xs text-zinc-700 dark:text-zinc-500">
              Review and manage all your links
            </p>
          </div>
          <div className="flex w-full overflow-x-auto sm:w-auto">
            <DashboardActionsToolbar />
          </div>
        </div>
        {links.length ? (
          <div className="mt-8">
            {layout === 'table' ? (
              <LinksTableLayout />
            ) : (
              <Suspense
                fallback={
                  <div className="border-border bg-card text-muted-foreground flex w-full animate-pulse items-center justify-center gap-2 rounded-md border-[0.5px] p-4">
                    <Spinner width={16} height={16} />
                    <span className="text-xs ">Loading...</span>
                  </div>
                }
              >
                {/* @ts-expect-error Async Server Component */}
                <LinksGroupLayout searchParams={searchParams} />
              </Suspense>
            )}
          </div>
        ) : (
          <div className="text-muted-foreground bg-card border-border mt-8 flex min-h-[80px] items-center justify-center rounded-md border-[0.5px] border-dashed text-xs shadow-sm">
            No links found
          </div>
        )}
      </div>
    </div>
  );
}
