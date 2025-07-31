import AuthGuard from '@/components/guards/AuthGuards'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard allowedRole="admin">
      {children}
    </AuthGuard>
  )
}
