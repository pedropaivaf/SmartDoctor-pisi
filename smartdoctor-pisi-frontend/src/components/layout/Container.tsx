
import { cn } from '../../lib/utils';

export interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export function Container({ children, className, maxWidth = 'full' }: ContainerProps) {
  const maxWidths = {
    sm: 'max-w-screen-sm',
    md: 'max-w-screen-md',
    lg: 'max-w-screen-lg',
    xl: 'max-w-screen-xl',
    full: 'max-w-full',
  };

  return (
    <div className={cn('mx-auto px-6 py-6', maxWidths[maxWidth], className)}>
      {children}
    </div>
  );
}

export default Container;
