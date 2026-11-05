"use client";
import { Toaster as Sonner } from "sonner";
import { RiCheckboxCircleLine, RiInformationLine, RiAlertLine, RiCloseCircleLine, RiLoader4Line } from "@remixicon/react";
const Toaster = ({ ...props }) => {
    const theme = "light";
    return (<Sonner theme={theme} className="toaster group" icons={{
            success: (<RiCheckboxCircleLine className="size-4 text-brand"/>),
            info: (<RiInformationLine className="size-4 text-sky-500"/>),
            warning: (<RiAlertLine className="size-4 text-amber-500"/>),
            error: (<RiCloseCircleLine className="size-4 text-red-500"/>),
            loading: (<RiLoader4Line className="size-4 animate-spin text-brand"/>),
        }} style={{
            "--normal-bg": "var(--popover)",
            "--normal-text": "var(--popover-foreground)",
            "--normal-border": "var(--border)",
            "--border-radius": "var(--radius)",
        }} toastOptions={{
            classNames: {
                toast: "cn-toast",
            },
        }} {...props}/>);
};
export { Toaster };

export { Toaster as Toast };
