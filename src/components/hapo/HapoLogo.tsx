import { cn } from "@/lib/utils";
import type { SVGProps } from "react";

export function HapoLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("text-primary", props.className)}
      {...props}
    >
      <path d="M4 4h16v16H4z" fill="hsl(var(--primary) / 0.1)" stroke="none" />
      <path d="M7 8v8" />
      <path d="M17 8v8" />
      <path d="M7 12h10" />
    </svg>
  );
}
