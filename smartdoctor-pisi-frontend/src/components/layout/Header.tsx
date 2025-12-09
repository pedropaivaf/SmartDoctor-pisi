
import { Bell } from 'lucide-react';
import { SearchBar } from '../ui';
import { useAuth } from '../../hooks/useAuth';

export interface HeaderProps {
  title?: string;
  onSearch?: (query: string) => void;
  showSearch?: boolean;
}

export function Header({ title, onSearch, showSearch = false }: HeaderProps) {
  const { user } = useAuth();

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left: Title or Search */}
        <div className="flex-1 max-w-2xl">
          {showSearch && onSearch ? (
            <SearchBar
              placeholder="Buscar pacientes, súmulas..."
              onSearch={onSearch}
            />
          ) : (
            title && <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
          )}
        </div>

        {/* Right: Notifications and User */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <button className="relative p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell className="w-5 h-5" />
            {/* Badge for unread notifications */}
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger rounded-full" />
          </button>

          {/* User Info */}
          <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">{user?.name || 'Usuário'}</p>
              <p className="text-xs text-gray-500">
                CRM {user?.crm}/{user?.crm_state}
              </p>
            </div>
            <div className="flex items-center justify-center w-10 h-10 bg-primary text-white rounded-full text-sm font-semibold">
              {user?.name
                ?.split(' ')
                .map((n) => n[0])
                .join('')
                .toUpperCase()
                .slice(0, 2) || 'U'}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
