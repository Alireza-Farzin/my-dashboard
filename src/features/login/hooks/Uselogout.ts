"use client"

import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { useState } from 'react';

export function useLogout() {
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const router = useRouter()

  const logout = () => {
    Cookies.remove('authToken')

    localStorage.removeItem('authToken')
    router.push('/login')
  }
  const handleLogout = () => {
    logout();
    setShowLogoutDialog(false);
  };

  return { logout, handleLogout, showLogoutDialog, setShowLogoutDialog }
}
export function logoutUser() {
  Cookies.remove('authToken')
  localStorage.removeItem('authToken')
  window.location.href = '/login'
}

