import React from 'react';

interface SidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen, setIsSidebarOpen }) => {
  return (
    <>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
          aria-hidden="true"
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-gray-900/50 border-r border-gray-200 dark:border-gray-800 flex-col flex transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between gap-3 px-6 py-4 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-black">
                lunch_dining
              </span>
            </div>
            <h1 className="text-xl font-bold">Calorie Tracker</h1> 
            // change kar lena
          </div>
          <button
            className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
            aria-label="Close menu"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <nav className="flex-grow p-4">
          <ul>
            <li>
              <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary/20 text-primary font-bold" aria-current="page">
                <span className="material-symbols-outlined">edit_note</span>
                <span>Calorie Input</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
                <span className="material-symbols-outlined">pie_chart</span>
                <span>Daily Summary</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
                <span className="material-symbols-outlined">menu_book</span>
                <span>Food Database</span>
              </a>
            </li>
          </ul>
        </nav>
        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 w-full flex items-center justify-between text-left">
            <div className="flex items-center gap-3">
              <img
                src="https://i.pravatar.cc/40?u=a042581f4e29026704d"
                alt="User avatar"
                className="w-10 h-10 rounded-full"
              />
              <div>
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-200">guest</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">View profile</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-gray-500 dark:text-gray-400">
              more_vert
            </span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;