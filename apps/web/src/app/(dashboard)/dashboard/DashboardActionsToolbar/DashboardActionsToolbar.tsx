"use client";

import { useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

// icons
import Rows01Icon from "@/assets/icons/rows-01.svg";
import TableIcon from "@/assets/icons/table.svg";

// components
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/Tooltip";
import CreateLinkButton from "./CreateLinkButton";
import SortLinksDropdownMenu from "./SortLinksDrodownMenu";
import { ToolbarRoot, ToolbarSeparator } from "@/components/ui/Toolbar";
import { ToolbarToggleItem, ToolbarToogleGroup } from "@/components/ui/Toolbar";

export default function DashboardActionsToolbar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [, startTransition] = useTransition();

  const layout = searchParams.get("layout") ?? "list";

  function onChangeLayout(value: string) {
    if (!value) return;

    const params = new URLSearchParams(window.location.search);
    params.set("layout", value);
    params.delete("count");
    params.delete("createdAt");

    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`);
    });
  }

  return (
    <ToolbarRoot>
      <ToolbarToogleGroup
        value={layout}
        onValueChange={onChangeLayout}
        type="single"
      >
        <TooltipProvider>
          <Tooltip>
            <ToolbarToggleItem value="list" asChild>
              <TooltipTrigger>
                <TableIcon width={16} height={16} />
              </TooltipTrigger>
            </ToolbarToggleItem>
            <TooltipContent sideOffset={8}>List Layout</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <ToolbarToggleItem value="group" asChild>
              <TooltipTrigger>
                <Rows01Icon width={16} height={16} />
              </TooltipTrigger>
            </ToolbarToggleItem>
            <TooltipContent sideOffset={8}>Group Layout</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </ToolbarToogleGroup>
      <ToolbarSeparator />
      <div className="flex gap-2">
        {layout === "group" && <SortLinksDropdownMenu />}
        <CreateLinkButton />
      </div>
    </ToolbarRoot>
  );
}
