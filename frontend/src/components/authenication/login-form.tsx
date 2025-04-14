'use client';

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
import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { log } from 'console';

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);

        localStorage.setItem('auth_token', data.token);
        localStorage.setItem(
          'user',
          JSON.stringify({
            name: data?.user?.username,
            email: data?.user?.email,
            id: data?.user?.id,
          })
        );

        toast.success('Welcome back!');
        router.push('/');
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData?.message || 'Login failed.');
        toast.error(errorData?.message || 'Login failed.');
      }
    } catch (error: any) {
      setErrorMessage('Something went wrong.');
      toast.error('Login failed.');
    } finally {
      setLoading(false);
    }
  };

  if (!isClient) {
    return <div>Loading...</div>;
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className='flex flex-col gap-4'>
              {errorMessage && (
                <div
                  className='bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative'
                  role='alert'
                >
                  <span className='block sm:inline'>{errorMessage}</span>
                </div>
              )}

              <div className='grid gap-2'>
                <Label htmlFor='email'>Email</Label>
                <Input
                  id='email'
                  type='email'
                  placeholder='m@example.com'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={errorMessage ? 'border-red-500' : ''}
                />
              </div>

              <div className='grid gap-2'>
                <div className='flex items-center'>
                  <Label htmlFor='password'>Password</Label>
                  <a
                    href='#'
                    className='ml-auto inline-block text-sm underline-offset-4 hover:underline'
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id='password'
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className={errorMessage ? 'border-red-500' : ''}
                />
              </div>

              <div className='flex flex-col gap-2'>
                <Button type='submit' className='w-full' disabled={loading}>
                  {loading ? 'Logging in...' : 'Login'}
                </Button>
                <Button variant='outline' className='w-full' disabled={true}>
                  Login with Google
                </Button>
              </div>
            </div>
            <div className='mt-4 text-center text-sm'>
              Don&apos;t have an account?{' '}
              <a href='/signup' className='underline underline-offset-4'>
                Sign up
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
