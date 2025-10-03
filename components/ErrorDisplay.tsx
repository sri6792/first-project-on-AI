import React from 'react';

interface ErrorDisplayProps {
  message: string;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message }) => {
  return (
    <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-lg" role="alert">
      <div className="flex">
        <div className="py-1">
          <span className="material-symbols-outlined mr-4">
            error
          </span>
        </div>
        <div>
          <p className="font-bold">Oops! Something went wrong.</p>
          <p className="text-sm">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default ErrorDisplay;
