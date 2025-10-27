/**
 * Copyright (c) 2025 XUNOIA TECHNOLOGIES PRIVATE LIMITED
 * Licensed under XUNOIA Private License v1.0
 * All rights reserved.
 */

import { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { routes, defaultRoute } from './routes';
import LoadingPage from '../components/LoadingPage';

const AppRoutes = () => (
  <BrowserRouter>
    <Suspense fallback={<LoadingPage />}>
      <Routes>
        {routes.map(({ path, element: Element }) => (
          <Route 
            key={path} 
            path={path} 
            element={<Element />} 
          />
        ))}
        
        {/* default route */}
        <Route path="/" element={<Navigate to={defaultRoute} replace />} />
        
        <Route path="*" element={<Navigate to={defaultRoute} replace />} />
      </Routes>
    </Suspense>
  </BrowserRouter>
);

export default AppRoutes;