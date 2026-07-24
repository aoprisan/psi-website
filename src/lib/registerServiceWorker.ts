/**
 * Registers the generated service worker so the site — and above all the
 * private space — keeps working with no connection.
 *
 * Skipped in dev, under Capacitor and on non-http schemes, where a service
 * worker is either useless or unsupported.
 */
export function registerServiceWorker(): void {
  if (!import.meta.env.PROD) return;
  if (!("serviceWorker" in navigator)) return;
  if (!/^https?:$/.test(window.location.protocol)) return;
  // Capacitor bundles the assets natively; a second cache layer only adds
  // a way for the two to disagree.
  if ("Capacitor" in window) return;

  window.addEventListener("load", () => {
    const url = `${import.meta.env.BASE_URL}sw.js`;
    void navigator.serviceWorker.register(url, { scope: import.meta.env.BASE_URL }).catch(() => {
      /* Offline support is an enhancement; a failure must stay silent. */
    });
  });
}
