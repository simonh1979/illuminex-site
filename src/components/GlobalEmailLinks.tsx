"use client";

import { useEffect } from "react";

const EMAIL_ADDRESS = "hello@illuminex.co.uk";

function convertEmailTextToLinks(root: ParentNode) {
  const walker = document.createTreeWalker(
    root,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode(node) {
        const parent = node.parentElement;

        if (!parent) {
          return NodeFilter.FILTER_REJECT;
        }

        if (
          parent.closest(
            "a, script, style, textarea, input, select, option, code, pre"
          )
        ) {
          return NodeFilter.FILTER_REJECT;
        }

        if (!node.textContent?.includes(EMAIL_ADDRESS)) {
          return NodeFilter.FILTER_REJECT;
        }

        return NodeFilter.FILTER_ACCEPT;
      },
    }
  );

  const matchingNodes: Text[] = [];
  let currentNode = walker.nextNode();

  while (currentNode) {
    matchingNodes.push(currentNode as Text);
    currentNode = walker.nextNode();
  }

  matchingNodes.forEach((textNode) => {
    const text = textNode.textContent ?? "";
    const parts = text.split(EMAIL_ADDRESS);
    const fragment = document.createDocumentFragment();

    parts.forEach((part, index) => {
      if (part) {
        fragment.appendChild(document.createTextNode(part));
      }

      if (index < parts.length - 1) {
        const link = document.createElement("a");

        link.href = `mailto:${EMAIL_ADDRESS}`;
        link.textContent = EMAIL_ADDRESS;
        link.className = "global-email-link";
        link.setAttribute(
          "aria-label",
          `Email Illuminex Consultancy at ${EMAIL_ADDRESS}`
        );

        fragment.appendChild(link);
      }
    });

    textNode.parentNode?.replaceChild(fragment, textNode);
  });
}

export default function GlobalEmailLinks() {
  useEffect(() => {
    const updateEmailLinks = () => {
      convertEmailTextToLinks(document.body);
    };

    updateEmailLinks();

    const observer = new MutationObserver(() => {
      updateEmailLinks();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return null;
}