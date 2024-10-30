"use client";

import * as Dialog from "@radix-ui/react-dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { cn } from "@stratokit/ui/cn";
import { useRouter } from "next/navigation";
import type { ComponentProps, Dispatch, SetStateAction } from "react";
import { useMediaQuery } from "usehooks-ts";
import { Drawer } from "vaul";

export function Modal({
  children,
  className,
  showModal,
  setShowModal,
  onClose,
  desktopOnly,
  preventDefaultClose,
  drawerRootProps,
}: {
  children: React.ReactNode;
  className?: string;
  showModal?: boolean;
  setShowModal?: Dispatch<SetStateAction<boolean>>;
  onClose?: () => void;
  desktopOnly?: boolean;
  preventDefaultClose?: boolean;
  drawerRootProps?: ComponentProps<typeof Drawer.Root>;
}) {
  const router = useRouter();

  const closeModal = ({ dragged }: { dragged?: boolean } = {}) => {
    if (preventDefaultClose && !dragged) {
      return;
    }
    // fire onClose event if provided
    onClose && onClose();

    // if setShowModal is defined, use it to close modal
    if (setShowModal) {
      setShowModal(false);
      // else, this is intercepting route @modal
    } else {
      router.back();
    }
  };
  const isMobile = useMediaQuery("(max-width: 640px)");

  if (isMobile && !desktopOnly) {
    return (
      <Drawer.Root
        open={setShowModal ? showModal : true}
        onOpenChange={(open) => {
          if (!open) {
            closeModal({ dragged: true });
          }
        }}
        {...drawerRootProps}
      >
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 z-50 bg-zinc-100 bg-opacity-10 backdrop-blur" />
          <Drawer.Content
            className={cn(
              "fixed bottom-0 left-0 right-0 z-50 rounded-t-[10px] border-t border-zinc-200 bg-white",
              className,
            )}
          >
            <VisuallyHidden.Root>
              <Drawer.Title>Modal</Drawer.Title>
              <Drawer.Description>This is a modal</Drawer.Description>
            </VisuallyHidden.Root>
            <div className="sticky top-0 z-20 flex w-full items-center justify-center rounded-t-[10px] bg-inherit">
              <div className="my-3 h-1 w-12 rounded-full bg-zinc-300" />
            </div>
            {children}
          </Drawer.Content>
          <Drawer.Overlay />
        </Drawer.Portal>
      </Drawer.Root>
    );
  }

  return (
    <Dialog.Root
      open={setShowModal ? showModal : true}
      onOpenChange={(open) => {
        if (!open) {
          closeModal();
        }
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay
          // for detecting when there's an active opened modal
          id="modal-backdrop"
          className="animate-fade-in fixed inset-0 z-40 bg-muted/20 backdrop-blur-sm"
        />
        <Dialog.Content
          onOpenAutoFocus={(e) => e.preventDefault()}
          onCloseAutoFocus={(e) => e.preventDefault()}
          className={cn(
            "animate-scale-in fixed inset-0 z-40 m-auto max-h-fit w-full max-w-md overflow-hidden border bg-background p-0 shadow-xl sm:rounded-2xl",
            className,
          )}
        >
          <VisuallyHidden.Root>
            <Dialog.Title>Modal</Dialog.Title>
            <Dialog.Description>This is a modal</Dialog.Description>
          </VisuallyHidden.Root>
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
