import { redirect } from 'next/navigation'

export default function ArticlesIndexPage() {
  // Redirect ke home karena list artikel sudah di sana
  redirect('/')
}
