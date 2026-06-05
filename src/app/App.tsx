import React, { useEffect } from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router';
import { HelmetProvider } from 'react-helmet-async';
import { AppRoutes } from '@/app/routes';
import { Toaster } from 'sonner';
import { GlobalJsonLd } from '@/app/components/GlobalJsonLd';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <HelmetProvider>
      <GlobalJsonLd />
      <Router>
        <ScrollToTop />
        <div className="w-full min-h-screen">
          <AppRoutes />
          <Toaster position="top-right" />
        </div>
      </Router>
    </HelmetProvider>
  );
}
