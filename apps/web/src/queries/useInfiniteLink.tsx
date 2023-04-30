import { UseInfiniteQueryOptions, UseQueryOptions, useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { Link } from '@tinypath/database';

interface UseLinksQueryVariables {
  take: number;
  count?: 'asc' | 'desc';
  createdAt?: 'asc' | 'desc';
}

interface UseLinksQueryResponse {
  links: Link[];
  total: number;
  hasMore: boolean;
  nextPage: number | null;
  previusPage: number | null;
}

export default function useInfiniteLinks(
  { take, createdAt, count }: UseLinksQueryVariables,
  options: UseInfiniteQueryOptions<UseLinksQueryResponse, Error> = {},
) {
  return useInfiniteQuery({
    queryKey: ['links', 'infinite', { take }],
    getNextPageParam: (lastPage) => lastPage.nextPage,
    queryFn: async ({ pageParam = 1 }) => {
      const params = new URLSearchParams({
        take: take.toString(),
        page: pageParam.toString(),
        ...(count && { countOrder: count?.toString() }),
        ...(createdAt && { createdAtOrder: createdAt?.toString() }),
      });
      const response = await fetch(`/api/links?${params.toString()}`);

      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      const data = await response.json();
      return data;
    },
    ...options,
  });
}
