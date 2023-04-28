"use client";

import ArrowNarrowLeftIcon from "@/assets/icons/arrow-narrow-left.svg";
import { buttonVariants } from "@/components/ui/Button";
import Link from "next/link";

export default function BackToAllLinks() {
  return (
    <Link href="/dashboard" className={buttonVariants({
      size: "sm",
      variant: "ghost",
      className: "flex gap-2 items-center w-auto"
    })}>
      <ArrowNarrowLeftIcon width={16} height={16} />
      <span className="text-sm text-foreground">All links</span>
    </Link>
  );
}
