"use client";

import { ZodError, z } from "zod";
import useSWRMutation from "swr/mutation";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

// icons
import PlusIcon from "@/assets/icons/plus.svg";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";

// components
import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Spinner } from "@/components/ui/Spinner";
import { ToolbarButton } from "@/components/ui/Toolbar";

// libs
import { urlRegex } from "@/lib/url";
  
const createLinkFormSchema = z.object({
  name: z.string().optional(),
  link: z.string().regex(urlRegex, "Invalid URL"),
});

export default function CreateLinkButton() {
  const [isPending, startTransition] = useTransition();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // keep track of client side errors.
  const router = useRouter();
  const [errors, setErrors] = useState<z.inferFormattedError<
    typeof createLinkFormSchema
  > | null>(null);

  // form state.
  const [link, setLink] = useState("");
  const [name, setName] = useState("");

  // use swr mutation to create a new link.
  const {
    isMutating: isLoading,
    trigger,
    error,
    reset,
  } = useSWRMutation(
    "/api/links",
    async (url, { arg }: { arg: { link: string; name?: string } }) => {
      const response = await fetch(url, {
        method: "POST",
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
    }
  );

  const isMutating = isLoading || isPending;

  function onCreateLink() {
    if (!link) return;

    setErrors(null);

    try {
      const data = createLinkFormSchema.parse({ link, name });
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
    setLink("");
    setName("");
    setErrors(null);
    setIsDialogOpen(false);
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <ToolbarButton asChild>
        <DialogTrigger asChild>
          <Button size="xs" className="gap-2">
            <PlusIcon width={16} height={16} /> Create Link
          </Button>
        </DialogTrigger>
      </ToolbarButton>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new Link</DialogTitle>
          <DialogDescription>
            Turn long, complex URLs into short, easy-to-share TinyPath links.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-end gap-4 py-4">
          <div className="w-full flex flex-col gap-2">
            <Label htmlFor="name">New Link</Label>
            <Input
              id="link"
              type="url"
              value={link}
              onChange={(e) => {
                setLink(e.target.value);
                setErrors((v: any) => ({ ...v, link: null }));
              }}
              placeholder="https://twitter/juanhenriqz"
            />
            {errors?.link?._errors.map((item, i) => (
              <span key={i} className="text-xs text-destructive-foreground">
                {item}
              </span>
            ))}
          </div>
          <div className="w-full flex flex-col gap-2">
            <Label htmlFor="name">
              Name{" "}
              <span className="text-xs text-black/60 dark:text-white/60">
                (Optional)
              </span>
            </Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setErrors((v: any) => ({ ...v, name: null }));
              }}
              placeholder="My Awesome Link"
            />
            {errors?.name?._errors.map((item, i) => (
              <span key={i} className="text-xs text-destructive-foreground">
                {item}
              </span>
            ))}
          </div>
          {error && (
            <span className="text-xs text-destructive-foreground">
              {error.message}
            </span>
          )}
          <div className="flex gap-2">
            <Button variant="ghost" onClick={onDialogClose}>
              Cancel
            </Button>
            <Button
              className="gap-2"
              disabled={!link || isMutating}
              onClick={onCreateLink}
            >
              {isMutating && <Spinner width={16} height={16} />}
              {isMutating ? "Creating..." : "Create"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
