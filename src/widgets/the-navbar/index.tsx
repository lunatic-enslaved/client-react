import React from 'react';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { useLocation } from 'react-router-dom';

import { Calendar } from './calendar';

// FIXME: было бы хорошо определять title и calendar через page meta, как во vue

export const TheNavbar = () => {
  const [isSidebarOpen, setSidebarOpen] = React.useState(false);
  const location = useLocation();
  const [title, setTitle] = React.useState(document.title);

  React.useEffect(() => setTitle(document.title), [location]);

  let append: JSX.Element | null = null;

  if (location.pathname === '/calories-planner') {
    append = <Calendar />;
  }

  return (
    <header>
      <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow">
        <button
          type="button"
          className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
          onClick={() => setSidebarOpen(!isSidebarOpen)}>
          <span className="sr-only">Открыть сайдбар</span>
          <Bars3Icon className="h-6 w-6" aria-hidden="true" />
        </button>

        <div className="flex-1 px-4 flex justify-between">
          <div className="flex-1 flex items-center">
            <h2 className="text-xl font-bold mb-0">{title}</h2>
          </div>

          {append}
        </div>
      </div>
    </header>
  );
};
