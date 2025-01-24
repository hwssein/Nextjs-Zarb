"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

const RangeProgress = React.forwardRef<
  HTMLInputElement,
  React.ComponentPropsWithoutRef<"input"> & {
    value: number;
    onValueChange: (value: number) => void;
  }
>(({ value, onValueChange, className, ...props }, forwardedRef) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useImperativeHandle(forwardedRef, () => inputRef.current!, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    onValueChange(newValue);
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const input = inputRef.current;
    if (!input) return;

    const rect = input.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    const percentage = (x / width) * 100;

    const newValue = Math.max(0, Math.min(100, percentage));
    onValueChange(newValue);
  };

  return (
    <div
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-full bg-primary/20",
        className
      )}
      onClick={handleClick}
    >
      <input
        ref={inputRef}
        type="range"
        value={value}
        min="0"
        max="100"
        step="0.1"
        onChange={handleChange}
        className="w-full h-full bg-background border-none outline-none overflow-hidden appearance-none cursor-pointer"
        {...props}
        style={{
          background: `linear-gradient(to right, var(--highlight) ${value}%, var(--stroke) ${value}%)`,
        }}
      />
      <div
        className="absolute top-0 left-0 h-full w-full bg-primary transition-all"
        style={{ transform: `translateX(-${100 - value}%)` }}
      />
    </div>
  );
});

RangeProgress.displayName = "RangeProgress";

export default RangeProgress;
