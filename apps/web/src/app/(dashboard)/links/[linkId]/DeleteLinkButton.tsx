'use client';

import { useRouter } from 'next/navigation';
import type { Link } from '@tinypath/database';
import { useQueryClient } from '@tanstack/react-query';

// assets
import TrashIcon from '@/assets/icons/trash.svg';

// components
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';
import { ToolbarButton } from '@/components/ui/Toolbar';

// mutations
import { useMutationDeleteLink } from '@/queries/useMutationDeleteLink';

export default function DeleteLinkButton({ link }: { link: Link }) {
  const router = useRouter();
  const queryClient = useQueryClient();

  // Use the `useMutationDeleteLink` mutatin to delete the link
  const { mutate, isLoading } = useMutationDeleteLink(
    { link },
    {
      onSuccess: () => {
        // Invalidate the `links` query after the mutation is successful
        queryClient.invalidateQueries({ queryKey: ['links'] });

        // Navigate to the dashboard after the mutation is successful
        router.push('/dashboard');
      },
    },
  );

  return (
    <ToolbarButton asChild>
      <Button
        size="xs"
        className="gap-2"
        variant="destructive"
        onClick={() => mutate()}
        data-testid="delete-link-button"
      >
        {isLoading ? (
          <Spinner size={14} />
        ) : (
          <TrashIcon width={14} height={14} />
        )}
        {isLoading ? 'Deleting...' : 'Delete'}
      </Button>
    </ToolbarButton>
  );
}
