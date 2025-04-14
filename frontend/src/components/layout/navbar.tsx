// components/layout/navbar.tsx
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BarChart2, Eye, LineChart } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

export function Navbar() {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-30 w-full border-b bg-background/95 backdrop-blur px-12">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex font-bold text-xl">
            <span className="text-primary">Voice</span>SM
          </Link>
          <nav className="hidden lg:flex items-center gap-6">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link
                    href="/dashboard"
                    className={cn(navigationMenuTriggerStyle(), "group")}
                  >
                    Dashboard
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Markets</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-2 w-[250px]">
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            href="/markets"
                            className="flex flex-col p-2 hover:bg-accent rounded-md"
                          >
                            <div className="flex items-center gap-2">
                              <BarChart2 className="h-4 w-4" />
                              <span className="text-sm font-medium">
                                Markets
                              </span>
                            </div>
                            <div className="text-xs text-muted-foreground ml-6 -mt-1">
                              Market summary and news
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            href="/watchlist"
                            className="flex flex-col p-2 hover:bg-accent rounded-md"
                          >
                            <div className="flex items-center gap-2">
                              <Eye className="h-4 w-4" />
                              <span className="text-sm font-medium">
                                Watchlist
                              </span>
                            </div>
                            <div className="text-xs text-muted-foreground ml-6 -mt-1">
                              Track your favorite stocks
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            href="/compare"
                            className="flex gap-2 p-2 hover:bg-accent rounded-md"
                          >
                            <div className="flex items-center gap-2">
                              <LineChart className="h-4 w-4" />
                              <span className="text-sm font-medium">
                                Compare
                              </span>
                            </div>
                            <div className="text-xs text-muted-foreground -mt-1 ml-6">
                              Compare multiple stocks
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link
                    href="/voice-assistant"
                    className={cn(navigationMenuTriggerStyle(), "group")}
                  >
                    Voice Assistant
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link
                    href="/portfolio"
                    className={cn(navigationMenuTriggerStyle(), "group")}
                  >
                    Portfolio
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>
        </div> 

        <div className="flex items-center gap-4">
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <Button variant="outline">Log In</Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button>Sign Up</Button>
            </SignUpButton>
          </SignedOut>
          <ThemeToggle />
        </div>
      </div>
    </header>
  ); 
}