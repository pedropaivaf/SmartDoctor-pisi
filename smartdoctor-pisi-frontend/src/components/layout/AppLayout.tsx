
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

export interface AppLayoutProps {
  title?: string;
  onSearch?: (query: string) => void;
  showSearch?: boolean;
}

export function AppLayout({ title, onSearch, showSearch = false }: AppLayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header title={title} onSearch={onSearch} showSearch={showSearch} />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto custom-scrollbar">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
