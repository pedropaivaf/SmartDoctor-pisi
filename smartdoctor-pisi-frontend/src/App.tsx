import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { ProtectedRoute, AppLayout } from './components/layout';
import PsychoCareSystem from './PsychoCareSystem';

// Auth Pages (lazy loaded)
const LoginPage = React.lazy(() => import('./pages/auth/LoginPage'));
const RegisterPage = React.lazy(() => import('./pages/auth/RegisterPage'));

// App Pages (lazy loaded)
const DashboardPage = React.lazy(() => import('./pages/DashboardPage'));
const PatientsListPage = React.lazy(() => import('./pages/patients/PatientsListPage'));
const PatientNewPage = React.lazy(() => import('./pages/patients/PatientNewPage'));
const PatientEditPage = React.lazy(() => import('./pages/patients/PatientEditPage'));
const PatientProfilePage = React.lazy(() => import('./pages/patients/PatientProfilePage'));
const SumulaNewPage = React.lazy(() => import('./pages/sumula/SumulaNewPage'));
const SumulaViewPage = React.lazy(() => import('./pages/sumula/SumulaViewPage'));
const SumulasListPage = React.lazy(() => import('./pages/sumula/SumulasListPage'));
const MedicationsPage = React.lazy(() => import('./pages/medications/MedicationsPage'));
const PrescriptionsListPage = React.lazy(() => import('./pages/prescriptions/PrescriptionsListPage'));
const PrescriptionNewPage = React.lazy(() => import('./pages/prescriptions/PrescriptionNewPage'));

// Create QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <React.Suspense fallback={<div className="flex items-center justify-center h-screen">Carregando...</div>}>
          <Routes>
            {/* PsychoCare System - Standalone Demo */}
            <Route path="/psychocare" element={<PsychoCareSystem />} />

            {/* Public Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Protected Routes */}
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              {/* Dashboard */}
              <Route index element={<DashboardPage />} />

              {/* Patients */}
              <Route path="patients">
                <Route index element={<PatientsListPage />} />
                <Route path="new" element={<PatientNewPage />} />
                <Route path=":id" element={<PatientProfilePage />} />
                <Route path=":id/edit" element={<PatientEditPage />} />
                <Route path=":id/sumula/new" element={<SumulaNewPage />} />
                <Route path=":id/sumula/:recordId" element={<SumulaViewPage />} />
              </Route>

              {/* Sumulas */}
              <Route path="sumulas">
                <Route index element={<SumulasListPage />} />
              </Route>

              {/* Medications */}
              <Route path="medications">
                <Route index element={<MedicationsPage />} />
              </Route>

              {/* Prescriptions */}
              <Route path="prescriptions">
                <Route index element={<PrescriptionsListPage />} />
                <Route path="new" element={<PrescriptionNewPage />} />
                <Route path="new/:patientId" element={<PrescriptionNewPage />} />
              </Route>
            </Route>

            {/* 404 Redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </React.Suspense>
      </BrowserRouter>

      {/* Toast Notifications */}
      <Toaster
        position="top-right"
        expand={false}
        richColors
        closeButton
      />
    </QueryClientProvider>
  );
}

export default App;
