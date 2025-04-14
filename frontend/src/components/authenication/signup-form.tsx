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
  const [errors, setErrors] = React.useState<{ [key: string]: string }>({});
  const [message, setMessage] = React.useState('');
  const [messageType, setMessageType] = React.useState<
    'success' | 'error' | ''
  >('');
  const router = useRouter();

  const validate = (
    username: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => {
    const newErrors: { [key: string]: string } = {};

    if (!/^[a-zA-Z ]{2,30}$/.test(username)) {
      newErrors.name = 'Name must contain only letters and spaces.';
    }

    if (!email.endsWith('@gmail.com')) {
      newErrors.email = 'Email must end with @gmail.com.';
    }

    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=<>?{}[\]~]).{6,}$/;
    if (!passwordRegex.test(password)) {
      newErrors.password =
        'Password must contain at least 1 uppercase, 1 number, and 1 special character.';
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    return newErrors;
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    setMessage('');
    setMessageType('');

    const formData = new FormData(e.currentTarget);
    const username = formData.get('name')?.toString().trim() || '';
    const email = formData.get('email')?.toString().trim() || '';
    const password = formData.get('password')?.toString() || '';
    const confirmPassword = formData.get('confirmPassword')?.toString() || '';

    const validationErrors = validate(
      username,
      email,
      password,
      confirmPassword
    );
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/signup',
        { username, email, password }
      );

      if (response.status === 201) {
        const { user, token } = response.data;

        localStorage.setItem('auth_username', user.username);
        localStorage.setItem('auth_token', token);

        setMessage('User registered successfully! Redirecting to login...');
        setMessageType('success');
        toast.success(`Welcome, ${user.username}!`);

        setTimeout(() => {
          router.push('/login');
        }, 2000);
      }
    } catch (err: any) {
      if (
        err.response?.data?.message?.toLowerCase().includes('exist') ||
        err.response?.status === 409
      ) {
        setMessage('User already exists. Please login.');
        setMessageType('error');
        toast.error('User already exists. Please login.');
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      } else {
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
          <form onSubmit={handleSignup} noValidate>
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
                {errors.name && (
                  <p className='text-red-500 text-sm'>{errors.name}</p>
                )}
              </div>

              <div className='grid gap-2'>
                <Label htmlFor='email'>Email</Label>
                <Input
                  id='email'
                  name='email'
                  type='email'
                  placeholder='you@gmail.com'
                  required
                />
                {errors.email && (
                  <p className='text-red-500 text-sm'>{errors.email}</p>
                )}
              </div>

              <div className='grid gap-2'>
                <Label htmlFor='password'>Password</Label>
                <PasswordInput
                  id='password'
                  name='password'
                  placeholder='********'
                  required
                />
                {errors.password && (
                  <p className='text-red-500 text-sm'>{errors.password}</p>
                )}
              </div>

              <div className='grid gap-2'>
                <Label htmlFor='confirmPassword'>Confirm Password</Label>
                <PasswordInput
                  id='confirmPassword'
                  name='confirmPassword'
                  placeholder='********'
                  required
                />
                {errors.confirmPassword && (
                  <p className='text-red-500 text-sm'>
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              <div className='flex flex-col gap-2'>
                <Button type='submit' className='w-full' disabled={loading}>
                  {loading ? 'Creating...' : 'Create Account'}
                </Button>
                <Button
                  variant='outline'
                  className='w-full'
                  type='button'
                  disabled={true}
                  onClick={() =>
                    signIn('google', {
                      prompt: 'select_account',
                      callbackUrl: '/dashboard',
                    })
                  }
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
