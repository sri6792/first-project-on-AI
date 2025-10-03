import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="w-full max-w-4xl mx-auto flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
          <span className="material-symbols-outlined text-black">
            lunch_dining
          </span>
        </div>
        <h1 className="text-xl font-bold">Calorie Tracker</h1>
      </div>
      <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700" aria-label="More options">
        <span className="material-symbols-outlined">
          more_vert
        </span>
      </button>
    </header>
  );
};

export default Header;
