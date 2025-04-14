'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface User {
  name: string;
  email: string;
  avatar?: string;
}

interface Props {
  user: User;
}

export default function ProfileNamePlate({ user }: Props) {
  if (!user) return null;

  const username = user.name || 'User';
  const userImage = user.avatar || undefined;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='outline'
          className='flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium'
        >
          <Avatar className='h-6 w-6'>
            <AvatarImage src={userImage} alt={username} />
            <AvatarFallback>
              {username.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          {username}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-48' align='end'>
        <DropdownMenuItem
          onClick={() => {
            localStorage.clear();
            window.location.href = '/login';
          }}
        >
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
