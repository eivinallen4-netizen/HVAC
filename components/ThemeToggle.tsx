"use client";

import { useEffect, useState } from "react";
import { Icon } from "./Icon";

type Theme = "light" | "dark";

const systemTheme = (): Theme => (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");

/** Light/dark switch. Follows the device setting until the visitor picks one, then remembers it. */
export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const apply = (t: Theme) => {
      document.documentElement.dataset.theme = t;
      setTheme(t);
    };
    apply(saved === "light" || saved === "dark" ? saved : systemTheme());

    // keep following the phone's setting (e.g. auto dark at sunset) unless the visitor chose
    const mq = window.matchMedia("(prefers-color-scheme: light)");
    const onChange = () => {
      if (!localStorage.getItem("theme")) apply(systemTheme());
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const toggle = () => {
    const next: Theme = (theme ?? systemTheme()) === "dark" ? "light" : "dark";
    // picking the same thing the phone uses goes back to "follow the phone"
    if (next === systemTheme()) localStorage.removeItem("theme");
    else localStorage.setItem("theme", next);
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
