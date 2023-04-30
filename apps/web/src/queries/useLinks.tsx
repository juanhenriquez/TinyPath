import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { Link } from '@tinypath/database';

interface UseLinksQueryVariables {
  take: number;
  currentPage: number;
  count?: 'asc' | 'desc';
  createdAt?: 'asc' | 'desc';
}

interface UseLinksQueryResponse {
  links: Link[];
  total: number;
}

export default function useLinks(
  { currentPage, take, createdAt, count }: UseLinksQueryVariables,
  options: UseQueryOptions<UseLinksQueryResponse, Error> = {},
) {
  return useQuery({
    queryKey: ['links', { currentPage, take }],
    queryFn: async () => {
      const params = new URLSearchParams({
        take: take.toString(),
        page: currentPage.toString(),
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
