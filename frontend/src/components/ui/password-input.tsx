import * as React from 'react';
import { Input } from './input';
import { Button } from './button';
import { Eye, EyeOff } from 'lucide-react';

interface PasswordInputProps
  extends React.ComponentPropsWithoutRef<typeof Input> {}

export const PasswordInput = React.forwardRef<
  HTMLInputElement,
  PasswordInputProps
>(({ className, ...props }, ref) => {
  const [show, setShow] = React.useState(false);

  return (
    <div className='relative'>
      <Input
        ref={ref}
        {...props}
        type={show ? 'text' : 'password'}
        className={className}
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
