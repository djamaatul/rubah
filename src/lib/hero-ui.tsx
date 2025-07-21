"use client";

import { HeroUIProvider } from "@heroui/system";
import { useRouter } from "next/navigation";
import { Provider as ReduxProvider } from "react-redux";
import { makeStore, store } from "@/lib/store";
import { PersistGate } from "redux-persist/integration/react";
import { useRef } from "react";
import { Persistor } from "redux-persist";

export type ProvidersProps = React.PropsWithChildren;

declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>["push"]>[1]
    >;
  }
}

export function Providers({ children }: ProvidersProps) {
  const persisStore = useRef<Persistor>(undefined);
  const router = useRouter();
  if (!persisStore.current) persisStore.current = makeStore();

  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persisStore.current!}>
        <HeroUIProvider navigate={router.push}>{children}</HeroUIProvider>
      </PersistGate>
    </ReduxProvider>
  );
}

export * from "@heroui/react";
