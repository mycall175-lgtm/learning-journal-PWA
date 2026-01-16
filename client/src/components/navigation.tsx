import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, BookOpen, Home, User, FolderKanban, Download, Gamepad2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./theme-toggle";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/journal", label: "Journal", icon: BookOpen },
  { href: "/projects", label: "Projects", icon: FolderKanban },
  { href: "/game", label: "Game", icon: Gamepad2 },
  { href: "/about", label: "About", icon: User },
];

interface NavigationProps {
  onInstallClick?: () => void;
  canInstall?: boolean;
}

export function Navigation({ onInstallClick, canInstall }: NavigationProps) {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 gap-4">
        <Link href="/" className="flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">Learning Journal</span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "gap-2",
                    isActive && "bg-secondary"
                  )}
                  data-testid={`link-nav-${item.label.toLowerCase()}`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Button>
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          {canInstall && (
            <Button
              variant="outline"
              size="sm"
              onClick={onInstallClick}
              className="hidden sm:flex gap-2"
              data-testid="button-install-pwa"
            >
              <Download className="h-4 w-4" />
              Install App
            </Button>
          )}
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="fixed inset-0 top-16 z-50 bg-background md:hidden">
          <div className="flex flex-col items-center justify-center h-full gap-8 p-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location === item.href;
              return (
                <Link key={item.href} href={item.href}>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 text-2xl font-medium transition-colors",
                      isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                    )}
                    data-testid={`link-mobile-nav-${item.label.toLowerCase()}`}
                  >
                    <Icon className="h-6 w-6" />
                    {item.label}
                  </button>
                </Link>
              );
            })}
            {canInstall && (
              <Button
                variant="default"
                size="lg"
                onClick={() => {
                  onInstallClick?.();
                  setMobileMenuOpen(false);
                }}
                className="gap-2 mt-4"
                data-testid="button-mobile-install"
              >
                <Download className="h-5 w-5" />
                Install App
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
