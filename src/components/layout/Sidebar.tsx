
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { BarChart2, TrendingUp, Activity, Menu, X } from 'lucide-react';
import { useIsMobile } from "@/hooks/use-mobile";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();
  
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    if (isMobile) {
      setIsOpen(false);
    }
  };

  const navItems = [
    { path: '/', name: 'Top Users', icon: <BarChart2 className="w-5 h-5" /> },
    { path: '/trending', name: 'Trending Posts', icon: <TrendingUp className="w-5 h-5" /> },
    { path: '/feed', name: 'Feed', icon: <Activity className="w-5 h-5" /> },
  ];

  return (
    <>
      {/* Mobile menu button */}
      {isMobile && (
        <button
          className="fixed top-4 left-4 z-50 p-2 rounded-md bg-white shadow-md"
          onClick={toggleSidebar}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-indigo-600 shadow-lg transform transition-transform duration-300 ease-in-out ${
          isMobile ? (isOpen ? 'translate-x-0' : '-translate-x-full') : 'translate-x-0'
        }`}
      >
        <div className="px-6 py-6">
          <h1 className="text-xl font-bold text-white mb-8">Social Analytics</h1>
          <nav className="space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={closeSidebar}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 text-sm rounded-md transition-colors ${
                    isActive
                      ? 'bg-indigo-700 text-white'
                      : 'text-indigo-100 hover:bg-indigo-500 hover:text-white'
                  }`
                }
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
