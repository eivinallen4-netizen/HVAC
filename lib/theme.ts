// Kept out of the client component so the server layout gets the actual string.

/**
 * localStorage key for the visitor's own light/dark choice. Versioned so a choice saved by an older
 * build (key "theme") is dropped once and every visitor starts out following their device setting.
 */
export const THEME_KEY = "wave-theme";

/**
 * Inline script for <head>: before first paint, applies the visitor's saved override if there is one,
 * otherwise the device setting (prefers-color-scheme), so there's no flash of the wrong theme.
 */
export const themeInitScript = `(function(){try{localStorage.removeItem("theme");var t=localStorage.getItem("${THEME_KEY}");if(t!=="light"&&t!=="dark")t=matchMedia("(prefers-color-scheme: light)").matches?"light":"dark";document.documentElement.dataset.theme=t;}catch(e){}})();`;
