import { Header } from "@/app/(index)/components/header";
import { Footer } from "@/components/footer";
import { PropsWithChildren } from "react";

export default function IndexLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
