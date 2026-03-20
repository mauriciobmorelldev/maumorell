"use client";

import { useEffect, useMemo, useState } from "react";

export type ThemeMode = "light" | "dark" | "system";

type ThemeToggleProps = {
  initialMode?: ThemeMode;
  onChange?: (mode: ThemeMode) => void;
  className?: string;
};

const STORAGE_KEY = "maumorell-theme";

const resolveSystemTheme = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";

export default function ThemeToggle({
  initialMode = "system",
  onChange,
  className,
}: ThemeToggleProps) {
  const [mode, setMode] = useState<ThemeMode>(initialMode);
  const [resolvedMode, setResolvedMode] = useState<"light" | "dark">("light");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as ThemeMode | null;
    if (stored) {
      setMode(stored);
      return;
    }
    setMode(initialMode);
  }, [initialMode]);

  useEffect(() => {
    if (mode !== "system") {
      setResolvedMode(mode);
      return;
    }

    const update = () => setResolvedMode(resolveSystemTheme());
    update();

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [mode]);

  useEffect(() => {
    const theme = mode === "system" ? resolvedMode : mode;
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    window.localStorage.setItem(STORAGE_KEY, mode);
    onChange?.(mode);
  }, [mode, resolvedMode, onChange]);

  const options = useMemo(
    () => [
      { id: "light" as const, label: "Light" },
      { id: "system" as const, label: "Auto" },
      { id: "dark" as const, label: "Dark" },
    ],
    []
  );

  return (
    <div className={`theme-toggle ${className ?? ""}`} role="group" aria-label="Tema">
      {options.map((option) => (
        <button
          key={option.id}
          type="button"
          className={
            mode === option.id
              ? "theme-toggle__button is-active"
              : "theme-toggle__button"
          }
          aria-pressed={mode === option.id}
          onClick={() => setMode(option.id)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
