'use client';

import * as ToolbarPrimitive from '@radix-ui/react-toolbar';
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react';

import { cn } from '@/utils';

const ToolbarButton = ToolbarPrimitive.Button;
const ToolbarLink = ToolbarPrimitive.ToolbarLink;

const ToolbarRoot = forwardRef<
  ElementRef<typeof ToolbarPrimitive.Root>,
  ComponentPropsWithoutRef<typeof ToolbarPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <ToolbarPrimitive.Root
    ref={ref}
    className={cn('flex w-full min-w-max rounded-md', className)}
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
    className={cn('flex gap-1', className)}
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
      'text-muted-foreground hover:bg-muted hover:text-muted-foreground focus:shadow-primary/70 data-[state=on]:bg-muted data-[state=on]:text-foreground inline-flex flex-shrink-0 flex-grow-0 basis-auto items-center justify-center rounded p-[6px] text-xs leading-none outline-none focus:relative focus:shadow-[0_0_0_2px]',
      className,
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
    className={cn('bg-border mx-3 w-[1px]', className)}
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
