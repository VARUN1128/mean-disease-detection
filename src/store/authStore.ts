/**
 * Authentication store for managing user auth state
 */
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthState {
  accessToken: string | null
  userId: string | null
  email: string | null
  isAuthenticated: boolean
  setAuth: (token: string, userId: string, email: string) => void
  clearAuth: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      userId: null,
      email: null,
      isAuthenticated: false,
      setAuth: (token, userId, email) =>
        set({
          accessToken: token,
          userId,
          email,
          isAuthenticated: true,
        }),
      clearAuth: () =>
        set({
          accessToken: null,
          userId: null,
          email: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: 'auth-storage',
    }
  )
)

