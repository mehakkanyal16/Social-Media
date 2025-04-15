
import { ReactNode } from 'react';

interface DataCardProps {
  title: string;
  children: ReactNode;
  className?: string;
}

const DataCard = ({ title, children, className = '' }: DataCardProps) => {
  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}>
      <div className="px-6 py-4 bg-indigo-50 border-b border-indigo-100">
        <h2 className="text-lg font-semibold text-indigo-800">{title}</h2>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
};

export default DataCard;
