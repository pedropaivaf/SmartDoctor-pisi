
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  FileText,
  Pill,
  FileSignature,
  User,
  LogOut,
  Activity,
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { useAuth } from '../../hooks/useAuth';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Pacientes', href: '/patients', icon: Users },
  { name: 'Súmulas', href: '/sumulas', icon: FileText },
  { name: 'Medicamentos', href: '/medications', icon: Pill },
  { name: 'Prescrições', href: '/prescriptions', icon: FileSignature },
];

export function Sidebar() {
  const { user, logout } = useAuth();

  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-200 w-64">
      {/* Logo */}
      <div className="flex items-center gap-2 px-6 py-6 border-b border-gray-200">
        <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
          <Activity className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-900">SmartDoctor</h1>
          <p className="text-xs text-gray-500">Sistema Psiquiátrico</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto custom-scrollbar">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors',
                isActive
                  ? 'bg-primary text-white'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              )
            }
          >
            <item.icon className="w-5 h-5" />
            {item.name}
          </NavLink>
        ))}
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3 px-3 py-2 mb-2 rounded-lg bg-gray-50">
          <div className="flex items-center justify-center w-8 h-8 bg-primary text-white rounded-full text-sm font-semibold">
            {user?.name
              ?.split(' ')
              .map((n) => n[0])
              .join('')
              .toUpperCase()
              .slice(0, 2) || 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">{user?.name || 'Usuário'}</p>
            <p className="text-xs text-gray-500 truncate">
              CRM {user?.crm}/{user?.crm_state}
            </p>
          </div>
        </div>

        <NavLink
          to="/profile"
          className="flex items-center gap-3 px-3 py-2 mb-1 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <User className="w-5 h-5" />
          Meu Perfil
        </NavLink>

        <button
          onClick={logout}
          className="flex items-center gap-3 px-3 py-2 w-full text-sm font-medium text-danger rounded-lg hover:bg-red-50 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Sair
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
