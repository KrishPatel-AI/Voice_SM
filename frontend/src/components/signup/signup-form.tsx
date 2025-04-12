'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff } from 'lucide-react';
import { signIn } from 'next-auth/react';

// Reusable PasswordInput component with toggle visibility
const PasswordInput = React.forwardRef(({ className, ...props }, ref) => {
  const [show, setShow] = React.useState(false);

  return (
    <div className='relative'>
      <Input
        ref={ref}
        {...props}
        type={show ? 'text' : 'password'}
        className={cn(className, 'pr-10')}
      />
      <Button
        type='button'
        variant='ghost'
        size='icon'
        className='absolute right-1 top-1/2 -translate-y-1/2 text-muted-foreground'
        onClick={() => setShow((prev) => !prev)}
        tabIndex={-1}
      >
        {show ? <EyeOff size={18} /> : <Eye size={18} />}
      </Button>
    </div>
  );
});
PasswordInput.displayName = 'PasswordInput';

// SignupForm component
export function SignupForm({ className, ...props }) {
  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Create a new account</CardTitle>
          <CardDescription>
            Enter your details below to create a new account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className='flex flex-col gap-6'>
              <div className='grid gap-3'>
                <Label htmlFor='name'>Full Name</Label>
                <Input id='name' type='text' placeholder='John Doe' required />
              </div>

              <div className='grid gap-3'>
                <Label htmlFor='email'>Email</Label>
                <Input
                  id='email'
                  type='email'
                  placeholder='you@example.com'
                  required
                />
              </div>

              <div className='grid gap-3'>
                <Label htmlFor='password'>Password</Label>
                <PasswordInput id='password' placeholder='********' required />
              </div>

              <div className='grid gap-3'>
                <Label htmlFor='confirmPassword'>Confirm Password</Label>
                <PasswordInput
                  id='confirmPassword'
                  placeholder='********'
                  required
                />
              </div>

              <div className='flex flex-col gap-3'>
                <Button type='submit' className='w-full'>
                  Create Account
                </Button>
                {/* Google Sign-In Button */}
                <Button
                  variant='outline'
                  className='w-full'
                  onClick={() => signIn('google')} // This triggers the Google login
                >
                  Sign up with Google
                </Button>
              </div>
            </div>

            <div className='mt-4 text-center text-sm'>
              Already have an account?{' '}
              <a href='/login' className='underline underline-offset-4'>
                Login
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
