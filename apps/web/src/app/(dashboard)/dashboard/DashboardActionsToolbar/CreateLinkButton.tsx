'use client';

import { ZodError, z } from 'zod';
import useSWRMutation from 'swr/mutation';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

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
import { urlRegex } from '@/lib/url';
import { Link } from '@tinypath/database';

const createOrUpdateLinkFormSchema = z.object({
  name: z.string().optional(),
  link: z.string().regex(urlRegex, 'Invalid URL'),
});

export default function CreateLinkButton({
  currentLink,
}: {
  currentLink?: Link;
}) {
  const [isPending, startTransition] = useTransition();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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

  // use swr mutation to create or update the link.
  const apiMethod = currentLink ? 'PUT' : 'POST';
  const apiEndpoint = currentLink
    ? `/api/links/${currentLink.id}`
    : '/api/links';
  const {
    error,
    reset,
    trigger,
    isMutating: isLoading,
  } = useSWRMutation(
    apiEndpoint,
    async (url, { arg }: { arg: { link: string; name?: string } }) => {
      const response = await fetch(url, {
        method: apiMethod,
        body: JSON.stringify(arg),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      return data;
    },
    {
      onSuccess: () => {
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
      const data = createOrUpdateLinkFormSchema.parse({ link: linkOriginalUrl, name });
      trigger(data);
    } catch (error) {
      if (error instanceof ZodError) {
        console.log(error.format());
        setErrors(error.format());
      }
    }
  }

  function onDialogClose() {
    reset();
    setErrors(null);
    setIsDialogOpen(false);
  }

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
            <Button variant="ghost" onClick={onDialogClose}>
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
    </Dialog>
  );
}
