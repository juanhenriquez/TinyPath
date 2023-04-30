import type { Link } from '@tinypath/database';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

interface CreateOrUpdateLinkMutationVariables {
  link: string;
  name?: string;
}

export default function useMutationCreateOrUpdateLink(
  {
    currentLink,
  }: {
    currentLink?: Link;
  },
  options: UseMutationOptions<
    Link,
    Error,
    CreateOrUpdateLinkMutationVariables
  > = {},
) {
  const apiMethod = currentLink ? 'PUT' : 'POST';
  const apiEndpoint = currentLink
    ? `/api/links/${currentLink.id}`
    : '/api/links';

  return useMutation<Link, Error, CreateOrUpdateLinkMutationVariables>(
    async ({ link, name }) => {
      const response = await fetch(apiEndpoint, {
        method: apiMethod,
        body: JSON.stringify({
          link,
          name,
        }),
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
