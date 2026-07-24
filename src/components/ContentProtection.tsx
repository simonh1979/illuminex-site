"use client";

import { useEffect } from "react";

export default function ContentProtection() {
  useEffect(() => {
    function handleContextMenu(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      if (
        target?.closest(".protect-content, .protect-image, .no-context-menu")
      ) {
        e.preventDefault();
      }
    }

    function handleDragStart(e: DragEvent) {
      const target = e.target as HTMLElement | null;
      if (target?.closest(".protect-image, .protect-content")) {
        e.preventDefault();
      }
    }

    function handleCopy(e: ClipboardEvent) {
      const selection = window.getSelection()?.toString().trim();
      const active = document.activeElement as HTMLElement | null;

      const insideEditable =
        active &&
        (active.tagName === "INPUT" ||
          active.tagName === "TEXTAREA" ||
          active.isContentEditable);

      if (insideEditable) return;

      const anchorNode = window.getSelection()?.anchorNode;
      const parent =
        anchorNode instanceof HTMLElement
          ? anchorNode
          : anchorNode?.parentElement || null;

      if (selection && parent?.closest(".protect-content")) {
        e.preventDefault();
      }
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (typeof e.key !== "string" || !e.key) return;

      const key = e.key.toLowerCase();
      const isCopyShortcut =
        (e.ctrlKey || e.metaKey) && (key === "c" || key === "x");

      if (!isCopyShortcut) return;

      const selection = window.getSelection()?.toString().trim();
      const active = document.activeElement as HTMLElement | null;

      const insideEditable =
        active &&
        (active.tagName === "INPUT" ||
          active.tagName === "TEXTAREA" ||
          active.isContentEditable);

      if (insideEditable) return;

      const anchorNode = window.getSelection()?.anchorNode;
      const parent =
        anchorNode instanceof HTMLElement
          ? anchorNode
          : anchorNode?.parentElement || null;

      if (selection && parent?.closest(".protect-content")) {
        e.preventDefault();
      }
    }

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("dragstart", handleDragStart);
    document.addEventListener("copy", handleCopy);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("dragstart", handleDragStart);
      document.removeEventListener("copy", handleCopy);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return null;
}