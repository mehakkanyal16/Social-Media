
import { AlertTriangle } from 'lucide-react';

interface ErrorDisplayProps {
  message: string;
  retry?: () => void;
}

const ErrorDisplay = ({ message, retry }: ErrorDisplayProps) => {
  return (
    <div className="rounded-lg bg-red-50 p-6 border border-red-100 flex flex-col items-center justify-center">
      <AlertTriangle className="w-8 h-8 text-red-500 mb-2" />
      <p className="text-red-700 mb-4">{message}</p>
      {retry && (
        <button
          onClick={retry}
          className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-md transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorDisplay;
