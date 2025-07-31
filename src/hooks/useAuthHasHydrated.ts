import { useEffect, useState } from 'react'
import { useAuthStore } from '@/stores/auth-store'

// Bypass TypeScript untuk akses .persist
export function useAuthHasHydrated() {
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const store = useAuthStore as any
    if (store.persist?.hasHydrated?.()) {
      setHydrated(true)
    } else {
      const unsub = store.persist?.onFinishHydration?.(() => {
        setHydrated(true)
      })
      return () => unsub?.()
    }
  }, [])

  return hydrated
}
