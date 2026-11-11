import { useCallback, useEffect, useRef, useState } from "react";

const SCRIPT_SRC =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

let scriptPromise;

function loadTurnstile() {
  if (window.turnstile) return Promise.resolve(window.turnstile);
  if (!scriptPromise) {
    scriptPromise = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = SCRIPT_SRC;
      script.async = true;
      script.onload = () =>
        window.turnstile
          ? resolve(window.turnstile)
          : reject(new Error("Turnstile script loaded without window.turnstile"));
      script.onerror = () => {
        scriptPromise = undefined; // allow a retry on the next mount
        script.remove();
        reject(new Error("Failed to load the Turnstile script"));
      };
      document.head.appendChild(script);
    });
  }
  return scriptPromise;
}

/**
 * Renders a Cloudflare Turnstile widget into the element given to
 * `containerRef`. Tokens are single-use: call `reset()` after every request.
 * The token is only held by the widget, never stored or logged.
 */
export function useTurnstile(siteKey) {
  const [container, setContainer] = useState(null);
  const [hasError, setHasError] = useState(false);
  const widgetIdRef = useRef(null);

  useEffect(() => {
    if (!siteKey) {
      console.error("Turnstile: NEXT_PUBLIC_TURNSTILE_SITE_KEY is not set");
      return;
    }
    if (!container) return;
    let cancelled = false;

    loadTurnstile()
      .then((turnstile) => {
        if (cancelled) return;
        widgetIdRef.current = turnstile.render(container, {
          sitekey: siteKey,
          theme: "dark",
          size: "flexible",
          callback: () => setHasError(false),
          "error-callback": () => {
            setHasError(true);
            return true; // handled: we show our own message
          },
        });
      })
      .catch((error) => {
        console.error("Turnstile:", error.message);
        if (!cancelled) setHasError(true);
      });

    return () => {
      cancelled = true;
      if (widgetIdRef.current != null) {
        window.turnstile?.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [siteKey, container]);

  /** The current unexpired token, or "" if the check hasn't passed yet. */
  const getToken = useCallback(() => {
    const id = widgetIdRef.current;
    const turnstile = window.turnstile;
    if (id == null || !turnstile) return "";
    if (turnstile.isExpired?.(id)) return "";
    return turnstile.getResponse(id) || "";
  }, []);

  const reset = useCallback(() => {
    if (widgetIdRef.current != null) window.turnstile?.reset(widgetIdRef.current);
  }, []);

  return { containerRef: setContainer, getToken, reset, hasError: hasError || !siteKey };
}
