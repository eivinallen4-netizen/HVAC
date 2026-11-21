"use client";

import { useEffect, useState } from "react";
import { THEME_KEY } from "@/lib/theme";
import { Icon } from "./Icon";

type Theme = "light" | "dark";

const systemTheme = (): Theme => (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");

const readChoice = (): Theme | null => {
  try {
    const t = localStorage.getItem(THEME_KEY);
    return t === "light" || t === "dark" ? t : null;
  } catch {
    return null;
  }
};
const saveChoice = (t: Theme | null) => {
  try {
    if (t) localStorage.setItem(THEME_KEY, t);
    else localStorage.removeItem(THEME_KEY);
  } catch {}
};

/**
 * Light/dark switch. By default the site follows the device setting (prefers-color-scheme).
 * Tapping the switch overrides it and the choice is remembered; when the device setting itself
 * changes (e.g. auto dark at sunset) the site follows the device again.
 */
export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const apply = (t: Theme) => {
      document.documentElement.dataset.theme = t;
      setTheme(t);
    };
    apply(readChoice() ?? systemTheme());

    const mq = window.matchMedia("(prefers-color-scheme: light)");
    const onChange = () => {
      saveChoice(null);
      apply(systemTheme());
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const toggle = () => {
    const next: Theme = (theme ?? systemTheme()) === "dark" ? "light" : "dark";
    // picking the same thing the device uses goes back to "follow the device"
    saveChoice(next === systemTheme() ? null : next);
    document.documentElement.dataset.theme = next;
    setTheme(next);
  };

  const label = theme === "light" ? "Switch to dark mode" : "Switch to light mode";
  return (
    <button type="button" className="theme-btn" onClick={toggle} aria-label={label} title={label}>
      <Icon name={theme === "light" ? "moon" : "sun"} size={20} />
    </button>
  );
}
