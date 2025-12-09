import React, { useState } from 'react';
import { Search, X, Loader2 } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface SearchBarProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  onSearch: (query: string) => void;
  isLoading?: boolean;
  debounceMs?: number;
}

export function SearchBar({ onSearch, isLoading = false, debounceMs = 300, className, ...props }: SearchBarProps) {
  const [value, setValue] = useState('');
  const [debounceTimeout, setDebounceTimeout] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);

    // Clear previous timeout
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    // Set new timeout
    const timeout = setTimeout(() => {
      onSearch(newValue);
    }, debounceMs);

    setDebounceTimeout(timeout);
  };

  const handleClear = () => {
    setValue('');
    onSearch('');
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
  };

  return (
    <div className={cn('relative', className)}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />

      <input
        type="text"
        value={value}
        onChange={handleChange}
        className={cn(
          'w-full h-10 pl-10 pr-10 text-base border border-gray-300 rounded',
          'placeholder:text-gray-400',
          'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
          'transition-colors'
        )}
        {...props}
      />

      <div className="absolute right-3 top-1/2 -translate-y-1/2">
        {isLoading ? (
          <Loader2 className="h-5 w-5 animate-spin text-gray-400" />
        ) : (
          value && (
            <button
              onClick={handleClear}
              className="p-0.5 hover:bg-gray-100 rounded-sm transition-colors"
              aria-label="Limpar busca"
            >
              <X className="h-5 w-5 text-gray-400" />
            </button>
          )
        )}
      </div>
    </div>
  );
}

export default SearchBar;
