'use client';

import { ZodError, z } from 'zod';
import { useRouter } from 'next/navigation';
import type { Link } from '@tinypath/database';
import { useState, useTransition } from 'react';
import { useQueryClient } from '@tanstack/react-query';

// icons
import PlusIcon from '@/assets/icons/plus.svg';

import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogDescription,
} from '@/components/ui/Dialog';

// components
import { Label } from '@/components/ui/Label';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';
import { ToolbarButton } from '@/components/ui/Toolbar';

// libs
import { urlRegex } from '@/utils';

// queries
import useMutationCreateOrUpdateLink from '@/queries/useMutationCreateOrUpdateLink';

const createOrUpdateLinkFormSchema = z.object({
  name: z.string().optional(),
  link: z.string().regex(urlRegex, 'Invalid URL'),
});

function DialogForm({
  currentLink,
  onDialogClose,
}: {
  currentLink?: Link;
  onDialogClose: () => void;
}) {
  const queryClient = useQueryClient();
  const [isPending, startTransition] = useTransition();

  // keep track of client side errors.
  const router = useRouter();
  const [errors, setErrors] = useState<z.inferFormattedError<
    typeof createOrUpdateLinkFormSchema
  > | null>(null);

  // form state.
  const [linkOriginalUrl, setLinkOriginalUrl] = useState(
    currentLink?.uri || '',
  );
  const [name, setName] = useState(currentLink?.name || '');

  // use react-query mutation to create or update the link.
  const { mutate, isLoading, error, reset } = useMutationCreateOrUpdateLink(
    { currentLink },
    {
      onSuccess: () => {
        // invalidate the links query to refetch the data.
        console.log('invalidating links query');
        queryClient.invalidateQueries({ queryKey: ['links'] });

        // close the dialog and refresh the router.
        startTransition(() => {
          onDialogClose();
          router.refresh();
        });
      },
    },
  );

  const isMutating = isLoading || isPending;

  function onCreateLink() {
    if (!linkOriginalUrl) return;

    setErrors(null);

    try {
      const data = createOrUpdateLinkFormSchema.parse({
        link: linkOriginalUrl,
        name,
      });
      mutate(data);
    } catch (error) {
      if (error instanceof ZodError) {
        setErrors(error.format());
      }
    }
  }

  function onClose() {
    reset();
    onDialogClose();
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{currentLink ? 'Update' : 'Create'} Link</DialogTitle>
        <DialogDescription>
          Turn long, complex URLs into short, easy-to-share TinyPath links.
        </DialogDescription>
      </DialogHeader>
      <div className="flex flex-col items-end gap-4 py-4">
        <div className="flex w-full flex-col gap-2">
          <Label htmlFor="name">Original URL</Label>
          <Input
            id="link"
            type="url"
            value={linkOriginalUrl}
            onChange={e => {
              setLinkOriginalUrl(e.target.value);
              setErrors((v: any) => ({ ...v, link: null }));
            }}
            placeholder="https://twitter/juanhenriqz"
          />
          {errors?.link?._errors.map((item, i) => (
            <span key={i} className="text-destructive-foreground text-xs">
              {item}
            </span>
          ))}
        </div>
        <div className="flex w-full flex-col gap-2">
          <Label htmlFor="name">
            Name{' '}
            <span className="text-xs text-black/60 dark:text-white/60">
              (Optional)
            </span>
          </Label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={e => {
              setName(e.target.value);
              setErrors((v: any) => ({ ...v, name: null }));
            }}
            placeholder="My Awesome Link"
          />
          {errors?.name?._errors.map((item, i) => (
            <span key={i} className="text-destructive-foreground text-xs">
              {item}
            </span>
          ))}
        </div>
        {error && (
          <span className="text-destructive-foreground text-xs">
            {error.message}
          </span>
        )}
        <div className="flex gap-2">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button
            className="gap-2"
            disabled={!linkOriginalUrl || isMutating}
            onClick={onCreateLink}
          >
            {isMutating && <Spinner width={16} height={16} />}
            {isMutating
              ? currentLink
                ? 'Updating...'
                : 'Creating...'
              : currentLink
              ? 'Update'
              : 'Create'}
          </Button>
        </div>
      </div>
    </DialogContent>
  );
}

export default function CreateOrUpdateLinkButton({
  currentLink,
}: {
  currentLink?: Link;
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <ToolbarButton asChild>
        <DialogTrigger asChild>
          <Button size="xs" className="gap-2">
            {!currentLink && <PlusIcon width={16} height={16} />}
            {currentLink ? 'Update' : 'Create'} Link
          </Button>
        </DialogTrigger>
      </ToolbarButton>
      {isDialogOpen && (
        <DialogForm
          currentLink={currentLink}
          onDialogClose={() => setIsDialogOpen(false)}
        />
      )}
    </Dialog>
  );
}
