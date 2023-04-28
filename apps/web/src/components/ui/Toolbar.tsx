"use client";

import * as ToolbarPrimitive from "@radix-ui/react-toolbar";
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";

import { cn } from "@/utils";

const ToolbarButton = ToolbarPrimitive.Button;
const ToolbarLink = ToolbarPrimitive.ToolbarLink;

const ToolbarRoot = forwardRef<
  ElementRef<typeof ToolbarPrimitive.Root>,
  ComponentPropsWithoutRef<typeof ToolbarPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <ToolbarPrimitive.Root
    ref={ref}
    className={cn("flex w-full min-w-max rounded-md", className)}
    {...props}
  >
    {children}
    {/* <ChevronRight className="ml-auto h-4 w-4" /> */}
  </ToolbarPrimitive.Root>
));
ToolbarRoot.displayName = ToolbarPrimitive.Root.displayName;

const ToolbarToogleGroup = forwardRef<
  ElementRef<typeof ToolbarPrimitive.ToggleGroup>,
  ComponentPropsWithoutRef<typeof ToolbarPrimitive.ToggleGroup>
>(({ className, children, ...props }, ref) => (
  <ToolbarPrimitive.ToggleGroup
    ref={ref}
    className={cn(
      "flex gap-1",
      className
    )}
    {...props}
  >
    {children}
  </ToolbarPrimitive.ToggleGroup>
));
ToolbarToogleGroup.displayName = ToolbarPrimitive.ToggleGroup.displayName;

const ToolbarToggleItem = forwardRef<
  ElementRef<typeof ToolbarPrimitive.ToggleItem>,
  ComponentPropsWithoutRef<typeof ToolbarPrimitive.ToggleItem>
>(({ className, children, ...props }, ref) => (
  <ToolbarPrimitive.ToggleItem
    ref={ref}
    className={cn(
      "flex-shrink-0 flex-grow-0 basis-auto text-muted-foreground p-[6px] rounded inline-flex text-xs leading-none items-center justify-center outline-none hover:bg-muted hover:text-muted-foreground focus:relative focus:shadow-[0_0_0_2px] focus:shadow-primary/70 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground",
      className
    )}
    {...props}
  >
    {children}
  </ToolbarPrimitive.ToggleItem>
));
ToolbarToggleItem.displayName = ToolbarPrimitive.ToggleItem.displayName;

const ToolbarSeparator = forwardRef<
  ElementRef<typeof ToolbarPrimitive.Separator>,
  ComponentPropsWithoutRef<typeof ToolbarPrimitive.Separator>
>(({ className, children, ...props }, ref) => (
  <ToolbarPrimitive.Separator
    ref={ref}
    className={cn("w-[1px] bg-border mx-3", className)}
    {...props}
  />
));
ToolbarSeparator.displayName = ToolbarPrimitive.Separator.displayName;

export {
  ToolbarLink,
  ToolbarRoot,
  ToolbarButton,
  ToolbarSeparator,
  ToolbarToggleItem,
  ToolbarToogleGroup,
};
