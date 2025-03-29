import { useEffect, FormEventHandler } from 'react'
import { Head, Link, useForm } from '@inertiajs/react'
import GuestLayout from '@/Layouts/GuestLayout'
import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import TextInput from '@/Components/TextInput'

interface LoginForm {
  email: string
  password: string
  remember: boolean
  [key: string]: string | boolean
}

export default function Login({ status, canResetPassword }: { status?: string, canResetPassword: boolean }) {
  const { data, setData, post, processing, errors, reset } = useForm<LoginForm>({
    email: '',
    password: '',
    remember: false,
  })

  useEffect(() => {
    return () => {
      reset('password')
    }
  }, [])

  const submit: FormEventHandler = (e) => {
    e.preventDefault()
    post(route('login'))
  }

  return (
    <GuestLayout>
      <Head title="เข้าสู่ระบบ" />

      {status && (
        <div className="mb-4 font-medium text-sm text-green-600">
          {status}
        </div>
      )}

      <form onSubmit={submit}>
        <div>
          <InputLabel htmlFor="email" value="อีเมล" />
          <TextInput
            id="email"
            type="email"
            name="email"
            value={data.email}
            className="mt-1 p-2 block w-full"
            autoComplete="username"
            onChange={(e) => setData('email', e.target.value)}
          />
          <InputError message={errors.email} className="mt-2" />
        </div>

        <div className="mt-4">
          <InputLabel htmlFor="password" value="รหัสผ่าน" />
          <TextInput
            id="password"
            type="password"
            name="password"
            value={data.password}
            className="mt-1 p-2 block w-full"
            autoComplete="current-password"
            onChange={(e) => setData('password', e.target.value)}
          />
          <InputError message={errors.password} className="mt-2" />
        </div>

        <div className="flex items-center justify-between mt-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="remember"
              checked={data.remember}
              onChange={(e) => setData('remember', e.target.checked)}
              className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
            />
            <span className="ml-2 text-sm text-gray-600">จดจำฉัน</span>
          </label>

          {canResetPassword && (
            <Link
              href={route('password.request')}
              className="text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              ลืมรหัสผ่าน?
            </Link>
          )}
        </div>

        <div className="flex items-center justify-end mt-4">
          <Link
            href={route('register')}
            className="text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-4"
          >
            ลงทะเบียน
          </Link>

          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 focus:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 ml-4"
            disabled={processing}
          >
            เข้าสู่ระบบ
          </button>
        </div>
      </form>
    </GuestLayout>
  )
} 