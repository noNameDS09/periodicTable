import { ThemeSwitcher } from "./theme-switcher";
import { Atom } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-10">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Atom className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold tracking-tight">Element Explorer</h1>
        </div>
        <ThemeSwitcher />
      </div>
    </header>
  );
}
