// Kept out of the client component so the server layout gets the actual string.
/** Inline script for <head>: applies the saved choice (or the phone's setting) before first paint. */
export const themeInitScript = `(function(){try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark")t=matchMedia("(prefers-color-scheme: light)").matches?"light":"dark";document.documentElement.dataset.theme=t;}catch(e){}})();`;
