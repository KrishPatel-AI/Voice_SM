'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { BarChart2, Eye, LineChart } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import ProfileNamePlate from '../authenication/avatar';

interface User {
  name: string;
  email: string;
  avatar?: string;
}

export function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    const loadUser = () => {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('auth_token');
        const userData = localStorage.getItem('user');
        if (token && userData) {
          try {
            setUser(JSON.parse(userData)); // Ensure the user object is properly loaded
          } catch (error) {
            console.error('Failed to parse user data:', error);
            setUser(null);
          }
        } else {
          setUser(null);
        }
      }
    };

    loadUser();
    setHasMounted(true);

    // Listen for changes to localStorage
    window.addEventListener('storage', loadUser);
    return () => window.removeEventListener('storage', loadUser);
  }, []);

  const handleLogout = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/auth/logout', {
        method: 'GET',
        credentials: 'include',
      });

      if (res.ok) {
        localStorage.clear();
        setUser(null);
        router.push('/login');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (!hasMounted) return null;

  return (
    <header className='sticky top-0 z-30 w-full border-b bg-background/95 backdrop-blur px-12'>
      <div className='container flex h-16 items-center justify-between'>
        <div className='flex items-center gap-8'>
          <Link href='/' className='flex font-bold text-xl'>
            <span className='text-primary'>Voice</span>SM
          </Link>
          <nav className='hidden lg:flex items-center gap-6'>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link
                    href='/dashboard'
                    className={cn(navigationMenuTriggerStyle(), 'group')}
                  >
                    Dashboard
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Markets</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className='grid gap-3 p-2 w-[250px]'>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            href='/markets'
                            className='flex flex-col p-2 hover:bg-accent rounded-md'
                          >
                            <div className='flex items-center gap-2'>
                              <BarChart2 className='h-4 w-4' />
                              <span className='text-sm font-medium'>
                                Markets
                              </span>
                            </div>
                            <div className='text-xs text-muted-foreground ml-6 -mt-1'>
                              Market summary and news
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            href='/watchlist'
                            className='flex flex-col p-2 hover:bg-accent rounded-md'
                          >
                            <div className='flex items-center gap-2'>
                              <Eye className='h-4 w-4' />
                              <span className='text-sm font-medium'>
                                Watchlist
                              </span>
                            </div>
                            <div className='text-xs text-muted-foreground ml-6 -mt-1'>
                              Track your favorite stocks
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            href='/compare'
                            className='flex gap-2 p-2 hover:bg-accent rounded-md'
                          >
                            <div className='flex items-center gap-2'>
                              <LineChart className='h-4 w-4' />
                              <span className='text-sm font-medium'>
                                Compare
                              </span>
                            </div>
                            <div className='text-xs text-muted-foreground -mt-1 ml-6'>
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
                    href='/voice-assistant'
                    className={cn(navigationMenuTriggerStyle(), 'group')}
                  >
                    Voice Assistant
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link
                    href='/portfolio'
                    className={cn(navigationMenuTriggerStyle(), 'group')}
                  >
                    Portfolio
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>
        </div>

        <div className='flex items-center gap-2'>
          {user ? (
            <>
              <ProfileNamePlate user={user} />
            </>
          ) : (
            <>
              <Link href='/login'>
                <Button variant='outline'>Log In</Button>
              </Link>
              <Link href='/signup'>
                <Button>Sign Up</Button>
              </Link>
            </>
          )}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
