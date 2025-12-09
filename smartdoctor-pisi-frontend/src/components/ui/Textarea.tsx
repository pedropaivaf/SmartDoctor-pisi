import React, { useEffect, useRef } from 'react';
import { cn } from '../../lib/utils';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  autoResize?: boolean;
  maxLength?: number;
  showCount?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      label,
      error,
      helperText,
      autoResize = false,
      maxLength,
      showCount = false,
      id,
      value,
      ...props
    },
    ref
  ) => {
    const textareaId = id || label?.toLowerCase().replace(/\s/g, '-');
    const hasError = !!error;
    const internalRef = useRef<HTMLTextAreaElement | null>(null);

    // Auto-resize functionality
    useEffect(() => {
      if (autoResize && internalRef.current) {
        const textarea = internalRef.current;
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
    }, [value, autoResize]);

    const handleRef = (node: HTMLTextAreaElement) => {
      internalRef.current = node;
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    };

    const currentLength = value?.toString().length || 0;

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={textareaId} className="block text-sm font-medium text-gray-700 mb-1">
            {label}
            {props.required && <span className="text-danger ml-1">*</span>}
          </label>
        )}

        <textarea
          ref={handleRef}
          id={textareaId}
          maxLength={maxLength}
          value={value}
          className={cn(
            'w-full px-3 py-2 text-base border rounded transition-colors resize-y',
            'placeholder:text-gray-400',
            'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
            'disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed',
            hasError ? 'border-danger focus:ring-danger' : 'border-gray-300 hover:border-gray-400',
            autoResize && 'resize-none',
            className
          )}
          {...props}
        />

        <div className="flex justify-between items-start mt-1">
          <div className="flex-1">
            {error && <p className="text-sm text-danger">{error}</p>}
            {helperText && !error && <p className="text-sm text-gray-500">{helperText}</p>}
          </div>

          {(showCount || maxLength) && (
            <p className="text-sm text-gray-500 ml-2">
              {currentLength}
              {maxLength && `/${maxLength}`}
            </p>
          )}
        </div>
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export default Textarea;
