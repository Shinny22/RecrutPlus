import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-slate-400 selection:bg-primary selection:text-primary-foreground border-input h-10 w-full min-w-0 rounded-xl border bg-white/85 px-4 py-2 text-base text-slate-700 shadow-sm transition-[color,box-shadow,border-color] outline-none file:mr-4 file:inline-flex file:h-8 file:cursor-pointer file:rounded-lg file:border-0 file:bg-emerald-100 file:px-3 file:text-sm file:font-semibold file:text-emerald-800 hover:file:bg-emerald-200 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-emerald-400 focus-visible:ring-4 focus-visible:ring-emerald-100",
        "aria-invalid:border-destructive aria-invalid:ring-destructive/20",
        className
      )}
      {...props}
    />
  )
}

export { Input }
