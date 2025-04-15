
import { Loader2 } from 'lucide-react';

interface LoaderProps {
  text?: string;
}

const Loader = ({ text = 'Loading data...' }: LoaderProps) => {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <Loader2 className="w-8 h-8 text-indigo-600 animate-spin mb-2" />
      <p className="text-gray-600">{text}</p>
    </div>
  );
};

export default Loader;
