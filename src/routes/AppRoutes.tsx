import { Navigate, Route, Routes } from 'react-router-dom'
import ErrorBoundary from '../shared/components/ErrorBoundary/ErrorBoundary'
import ProtectedRoute from './ProtectedRoute'
import Login from '../modules/auth/components/Login'
import TwoFactorAuth from '../modules/auth/components/TwoFactorAuth'
import Dashboard from '../modules/dashboard/components/Dashboard'
import ArtWorkList from '../modules/artwork/components/ArtWorkList'
import LimitProfileList from '../modules/limit-profile/components/LimitProfileList'
import CardVendorList from '../modules/card-perso-vendor/components/CardVendorList'
import BinProfileList from '../modules/bin-profile/components/BinProfileList'
import CardProductList from '../modules/card-product/components/CardProductList'


export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/2fa" element={<TwoFactorAuth />} />
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <ErrorBoundary> <Dashboard /></ErrorBoundary>
        </ProtectedRoute>
      } />
      <Route path="/artwork" element={
        <ProtectedRoute>
          <ErrorBoundary><ArtWorkList /></ErrorBoundary>
        </ProtectedRoute>
      } />

      <Route path="/limit-profile" element={
        <ProtectedRoute>
          <ErrorBoundary><LimitProfileList /></ErrorBoundary>
        </ProtectedRoute>
      } />
      <Route path="/card-vendors" element={
        <ProtectedRoute>
          <ErrorBoundary><CardVendorList /></ErrorBoundary>
        </ProtectedRoute>
      } />
      <Route path="/bin-profile" element={
        <ProtectedRoute>
          <ErrorBoundary><BinProfileList/></ErrorBoundary>
        </ProtectedRoute>
      } />
       <Route path="/fee-profile" element={
        <ProtectedRoute>
          <ErrorBoundary><BinProfileList/></ErrorBoundary>
        </ProtectedRoute>
      } />
      <Route path="/card-product" element={
        <ProtectedRoute>
          <ErrorBoundary><CardProductList/></ErrorBoundary>
        </ProtectedRoute>
      } />
      <Route path="*" element={<Navigate to="/dashboard" />} /> {/* Redirect to home for invalid routes */}
    </Routes>
  )
}
