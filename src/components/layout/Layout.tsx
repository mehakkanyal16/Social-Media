
import { ReactNode } from 'react';
import Sidebar from './Sidebar';
import { useIsMobile } from "@/hooks/use-mobile";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const isMobile = useIsMobile();

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className={`flex-1 overflow-auto transition-all duration-300 ${isMobile ? 'ml-0' : 'ml-64'}`}>
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
