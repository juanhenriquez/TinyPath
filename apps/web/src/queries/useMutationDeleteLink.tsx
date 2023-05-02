import type { Link } from '@tinypath/database';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

export function useMutationDeleteLink(
  { link }: { link: Link },
  options: UseMutationOptions<Link, Error> = {},
) {
  return useMutation<Link, Error>(
    async () => {
      const response = await fetch(`/api/links/${link.id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      return data;
    },
    { ...options },
  );
}
