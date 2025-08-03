import { api } from "../api"

export async function AuthRegister(username: string, password: string, role: string) {
  try {
    const res = await api.post('/auth/register', {
      username,
      password,
      role,
    })

    console.log('APP INFO REGISTER', res)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error('APP ERROR REGISTER',err)
    throw new Error(err.response?.data?.message || 'Login gagal')
  }
}