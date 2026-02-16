import { useState } from "react";

export function useClipboard(timeout = 2000) {
  const [copied, setCopied] = useState(false);

  const copy = async (text: string | number) => {
    if (!navigator?.clipboard) return;

    await navigator.clipboard.writeText(String(text));
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, timeout);
  };

  return { copy, copied };
}
