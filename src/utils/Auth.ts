export interface AuthUser {
    username: string
}

const AUTH_STORAGE_KEY = 'neon-arena-auth-user'

export const getStoredAuthUser = (): AuthUser | null => {
    if (typeof window === 'undefined') return null

    const rawUser = window.localStorage.getItem(AUTH_STORAGE_KEY)
    if (!rawUser) return null

    try {
        return JSON.parse(rawUser) as AuthUser
    } catch {
        window.localStorage.removeItem(AUTH_STORAGE_KEY)
        return null
    }
}

export const saveAuthUser = (user: AuthUser) => {
    if (typeof window === 'undefined') return
    window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user))
}

export const clearAuthUser = () => {
    if (typeof window === 'undefined') return
    window.localStorage.removeItem(AUTH_STORAGE_KEY)
}

export const isAuthenticated = () => getStoredAuthUser() !== null