"use client"

import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'

export function useLogout() {
  const router = useRouter()

  const logout = () => {
    // پاک کردن توکن از کوکی
    Cookies.remove('authToken')
    
    // پاک کردن توکن از localStorage
    localStorage.removeItem('authToken')
    
    // هدایت به صفحه لاگین
    router.push('/login')
  }

  return { logout }
}

// یا به صورت تابع ساده:
export function logoutUser() {
  Cookies.remove('authToken')
  localStorage.removeItem('authToken')
  window.location.href = '/login'
}