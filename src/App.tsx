import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/layout/Sidebar';
import { MobileNav } from './components/layout/MobileNav';
import { Header } from './components/layout/Header';
import { Toast } from './components/layout/Toast';
import { CommandPalette } from './components/layout/CommandPalette';
import { ProModal } from './components/modals/ProModal';

// Landing Page (Página de Vendas / Inicial)
import { LandingPageView } from './components/landing/LandingPageView';

// App Views
import { HomeView } from './components/views/HomeView';
import { BibleView } from './components/views/BibleView';
import { PlansView } from './components/views/PlansView';
import { NotebookView } from './components/views/NotebookView';
import { ProfileView } from './components/views/ProfileView';

const MainLayout: React.FC = () => {
  const { activeTab } = useApp();

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomeView />;
      case 'bible':
        return <BibleView />;
      case 'plans':
        return <PlansView />;
      case 'notebook':
        return <NotebookView />;
      case 'profile':
        return <ProfileView />;
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#FAF9F6] dark:bg-[#121413] text-stone-800 dark:text-stone-200 font-sans selection:bg-sage-200 selection:text-sage-900 dark:selection:bg-sage-900/60 dark:selection:text-sage-100 transition-colors duration-200">
      {/* Desktop Sidebar (Collapsible) */}
      <Sidebar />

      {/* Main App Content Viewport */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        <Header />

        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 max-w-6xl w-full mx-auto pb-24 md:pb-12">
          {renderContent()}
        </main>

        {/* Mobile Bottom Navigation Bar */}
        <MobileNav />
      </div>

      {/* Global Modals & Notifications */}
      <CommandPalette />
      <ProModal />
      <Toast />
    </div>
  );
};

const AppRoot: React.FC = () => {
  const { viewMode } = useApp();

  if (viewMode === 'landing') {
    return (
      <div className="relative">
        <LandingPageView />
        <ProModal />
        <Toast />
      </div>
    );
  }

  return <MainLayout />;
};

export default function App() {
  return (
    <AppProvider>
      <AppRoot />
    </AppProvider>
  );
}
