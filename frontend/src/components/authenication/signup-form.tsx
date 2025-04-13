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
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const PasswordInput = React.forwardRef(
  (
    { className, ...props }: React.ComponentPropsWithoutRef<'input'>,
    ref: React.Ref<HTMLInputElement>
  ) => {
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
  }
);
PasswordInput.displayName = 'PasswordInput';

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const [loading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [messageType, setMessageType] = React.useState<
    'success' | 'error' | ''
  >('');
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setMessageType('');

    const formData = new FormData(e.currentTarget);
    const username = formData.get('name')?.toString().trim() || '';
    const email = formData.get('email')?.toString().trim() || '';
    const password = formData.get('password')?.toString() || '';
    const confirmPassword = formData.get('confirmPassword')?.toString() || '';

    if (password !== confirmPassword) {
      toast.error('Passwords do not match.');
      setMessage('Passwords do not match.');
      setMessageType('error');
      setLoading(false);
      return;
    }

    try {
      // Attempt to register the user directly
      const response = await axios.post(
        'http://localhost:5000/api/auth/signup',
        {
          username,
          email,
          password,
        }
      );

      if (response.status === 201) {
        const { user, token } = response.data;
        console.log('✅ Signup Success:', user);
        console.log('📌 JWT Token:', token);

        localStorage.setItem('auth_username', user.username);
        localStorage.setItem('auth_token', token);

        setMessage('User registered successfully! Redirecting to login...');
        setMessageType('success');
        toast.success(
          `Welcome, ${user.username}! User registered successfully.`
        );

        // Redirect to login page after 2 seconds
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      }
    } catch (err: any) {
      console.error('Signup Error:', err.response?.data || err.message);

      // Check if the error is due to user already existing
      if (
        err.response?.data?.message?.toLowerCase().includes('exist') ||
        err.response?.status === 409
      ) {
        setMessage('User already exists. Please login.');
        setMessageType('error');
        toast.error('User already exists. Please login.');

        // Redirect to login page after 2 seconds
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      } else {
        // Other registration errors
        setMessage(err.response?.data?.message || 'Signup failed.');
        setMessageType('error');
        toast.error(err.response?.data?.message || 'Signup failed.');
      }
    } finally {
      setLoading(false);
    }
  };

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
          {message && (
            <div
              className={`mb-4 p-3 rounded ${
                messageType === 'success'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {message}
            </div>
          )}
          <form onSubmit={handleSignup}>
            <div className='flex flex-col gap-4'>
              <div className='grid gap-2'>
                <Label htmlFor='name'>Full Name</Label>
                <Input
                  id='name'
                  name='name'
                  type='text'
                  placeholder='John Doe'
                  required
                />
              </div>

              <div className='grid gap-2'>
                <Label htmlFor='email'>Email</Label>
                <Input
                  id='email'
                  name='email'
                  type='email'
                  placeholder='you@example.com'
                  required
                />
              </div>

              <div className='grid gap-2'>
                <Label htmlFor='password'>Password</Label>
                <PasswordInput
                  id='password'
                  name='password'
                  placeholder='********'
                  required
                />
              </div>

              <div className='grid gap-2'>
                <Label htmlFor='confirmPassword'>Confirm Password</Label>
                <PasswordInput
                  id='confirmPassword'
                  name='confirmPassword'
                  placeholder='********'
                  required
                />
              </div>

              <div className='flex flex-col gap-2'>
                <Button type='submit' className='w-full' disabled={loading}>
                  {loading ? 'Creating...' : 'Create Account'}
                </Button>
                <Button
                  variant='outline'
                  className='w-full'
                  onClick={() => signIn('google')}
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
