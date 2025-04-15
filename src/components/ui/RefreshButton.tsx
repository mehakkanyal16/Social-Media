
import { useState } from 'react';
import { RefreshCw } from 'lucide-react';

interface RefreshButtonProps {
  onRefresh: () => Promise<void>;
  text?: string;
  className?: string;
}

const RefreshButton = ({ onRefresh, text = 'Refresh', className = '' }: RefreshButtonProps) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleClick = async () => {
    setIsRefreshing(true);
    try {
      await onRefresh();
    } catch (error) {
      console.error('Refresh error:', error);
    } finally {
      // Add a small delay to make the animation visible
      setTimeout(() => {
        setIsRefreshing(false);
      }, 750);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isRefreshing}
      className={`flex items-center px-3 py-2 rounded-md text-sm transition-colors ${
        isRefreshing 
          ? 'bg-indigo-200 text-indigo-700 cursor-not-allowed' 
          : 'bg-indigo-100 text-indigo-800 hover:bg-indigo-200'
      } ${className}`}
    >
      <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
      {isRefreshing ? 'Refreshing...' : text}
    </button>
  );
};

export default RefreshButton;
