import { cn } from "@/lib/utils/cn";
import { PropsWithChildren } from "react";

export function Container(props: PropsWithChildren<{ className?: string }>) {
  return (
    <main className={cn(`max-w-xl mx-auto`, props.className)}>
      {props.children}
    </main>
  );
}
