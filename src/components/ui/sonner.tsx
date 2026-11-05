"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"
import { RiCheckboxCircleLine, RiInformationLine, RiAlertLine, RiCloseCircleLine, RiLoader4Line } from "@remixicon/react"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: (
          <RiCheckboxCircleLine className="size-4 text-emerald-500" />
        ),
        info: (
          <RiInformationLine className="size-4 text-sky-500" />
        ),
        warning: (
          <RiAlertLine className="size-4 text-amber-500" />
        ),
        error: (
          <RiCloseCircleLine className="size-4 text-red-500" />
        ),
        loading: (
          <RiLoader4Line className="size-4 animate-spin text-teal-600" />
        ),
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: "cn-toast",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
