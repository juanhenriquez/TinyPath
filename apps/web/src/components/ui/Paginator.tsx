'use client';

// icons
import ChevronLeftIcon from '@/assets/icons/chevron-left.svg';
import ChevronRightIcon from '@/assets/icons/chevron-right.svg';

// utils
import { cn } from '@/utils';

// hooks
import { usePagination, DOTS, UsePaginationProps } from '@/hooks/usePagination';

type PaginatorProps = UsePaginationProps & {
  onPageChange: (page: number) => void;
};

export default function Paginator({
  pageSize,
  totalCount,
  currentPage,
  onPageChange,
  siblingCount = 1,
}: PaginatorProps) {
  const paginationRange = usePagination({
    pageSize,
    totalCount,
    currentPage,
    siblingCount,
  });

  // If there are less than 2 times in pagination range we shall not render the component
  if (currentPage === 0 || paginationRange?.length < 2) {
    return null;
  }

  function onNext() {
    onPageChange(currentPage + 1);
  }

  function onPrevious() {
    onPageChange(currentPage - 1);
  }

  let lastPage = paginationRange[paginationRange?.length - 1];

  return (
    <div className="flex items-center gap-2">
      {/* Left navigation arrow */}
      <li
        className={cn(
          'user-select-none hover:bg-muted cursor-pointer list-none rounded p-2',
          currentPage === 1 ? 'pointer-events-none' : 'pointer-events-all',
        )}
        onClick={onPrevious}
      >
        <ChevronLeftIcon
          width={14}
          height={14}
          className={cn(
            currentPage === 1 ? 'text-foreground/30' : 'text-foreground',
          )}
        />
      </li>
      {paginationRange?.map((pageNumber, index) => {
        // If the pageItem is a DOT, render the DOTS unicode character
        if (pageNumber === DOTS) {
          return (
            <li
              key={`${pageNumber}-${index}`}
              className="select-none list-none"
            >
              &#8230;
            </li>
          );
        }

        // Render our Page Pills
        return (
          <li
            key={pageNumber}
            className={cn(
              'user-select-none cursor-pointer list-none rounded p-2 text-xs leading-none',
              currentPage === pageNumber
                ? 'bg-primary text-primary-foreground'
                : 'text-foreground hover:bg-muted bg-transparent',
            )}
            onClick={() => onPageChange(pageNumber as number)}
          >
            {pageNumber}
          </li>
        );
      })}
      {/*  Right Navigation arrow */}
      <li
        onClick={onNext}
        className={cn(
          'user-select-none hover:bg-muted cursor-pointer list-none rounded p-2',
          lastPage === currentPage
            ? 'pointer-events-none'
            : 'pointer-events-all',
        )}
      >
        <ChevronRightIcon
          width={14}
          height={14}
          className={cn(
            lastPage === currentPage ? 'text-foreground/30' : 'text-foreground',
          )}
        />
      </li>
    </div>
  );
}
