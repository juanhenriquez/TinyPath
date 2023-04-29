"use client";

import NextLink from "next/link";
import { Link } from "@tinypath/database";

// icons
import EditIcon from "@/assets/icons/edit.svg";
import CopyIcon from "@/assets/icons/copy.svg";
import LinkExternal from "@/assets/icons/link-external.svg";

// utils
import { cn } from "@/utils";

// components
import { Button, buttonVariants } from "@/components/ui/Button";

export default function LinkActions({ link }: { link: Link }) {
  return (
    <div className="flex gap-2 justify-end">
      <NextLink
        className={cn(
          buttonVariants({
            size: "xs",
            variant: "ghost",
          }),
          "h-auto px-2 py-2"
        )}
        target="_blank"
        href={link.shortened_uri}
      >
        <LinkExternal width={12} height={12} />
      </NextLink>
      <Button
        size="xs"
        variant="ghost"
        className="h-auto px-2 py-2"
        onClick={() => {
          navigator.clipboard.writeText(link.shortened_uri);
        }}
      >
        <CopyIcon width={12} height={12} />
      </Button>
      <NextLink
        className={cn(
          buttonVariants({
            size: "xs",
            variant: "ghost",
          }),
          "h-auto px-2 py-2"
        )}
        href={`/links/${link.id}`}
      >
        <EditIcon width={12} height={12} />
      </NextLink>
    </div>
  );
}
