import type { ReactNode } from "react";
import NavigationMenu from "#/src/app/(site)/components/sidemenu/navigation-menu";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <NavigationMenu section="snippets" />
      {children}
    </>
  );
}
