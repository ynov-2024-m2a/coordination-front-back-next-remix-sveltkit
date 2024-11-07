import { useProgressBarStore } from "@/features/page/nextTopLoader";
import { useEffect } from "react";

// To avoid multiple warning by different components
// We allow only once every 2 seconds
// Else we do nothing
let alreadyWarned = false;

// Comment : https://github.com/vercel/next.js/discussions/9662#discussioncomment-8819562
export const useWarnIfUnsavedChanges = (unsaved: boolean, message?: string) => {
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleAnchorClick = (e: any) => {
      if (alreadyWarned || e.metaKey) return; // Check if CMD key is pressed
      const targetUrl = e.currentTarget.href;
      const currentUrl = window.location.href;
      if (targetUrl !== currentUrl) {
        if (window.onbeforeunload) {
          alreadyWarned = true;
          // @ts-expect-error - onbeforeunload is a function
          const res = window.onbeforeunload();
          if (!res) {
            e.preventDefault();
            setTimeout(() => {
              alreadyWarned = false;
            }, 2000);
          }
        }
      }
    };

    const handleMutation = () => {
      const anchorElements = document.querySelectorAll("a[href]");
      for (const anchor of anchorElements) {
        anchor.addEventListener("click", handleAnchorClick);
      }
    };

    const mutationObserver = new MutationObserver(handleMutation);
    mutationObserver.observe(document, { childList: true, subtree: true });

    // don't know if needed or not but it works
    return () => {
      mutationObserver.disconnect();
      const anchorElements = document.querySelectorAll("a[href]");
      for (const anchor of anchorElements) {
        anchor.removeEventListener("click", handleAnchorClick);
      }
    };
  }, []);

  useEffect(() => {
    const beforeUnloadHandler = () => {
      useProgressBarStore.getState().disable();
      const yes = confirm(
        message ??
          "Changes you made has not been saved just yet. Do you wish to proceed anyway?",
      );

      if (yes) {
        useProgressBarStore.getState().enable();
        return true;
      }

      return false;
    };
    window.onbeforeunload = unsaved ? beforeUnloadHandler : null;

    return () => {
      window.onbeforeunload = null;
      useProgressBarStore.getState().enable();
    };
  }, [unsaved, message]);
};
