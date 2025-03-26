import { FormEventHandler } from 'react'
import { Head, useForm } from '@inertiajs/react'
import GuestLayout from '@/Layouts/GuestLayout'
import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import TextInput from '@/Components/TextInput'

interface ConfirmPasswordForm {
  password: string
  [key: string]: string
}

export default function ConfirmPassword() {
  const { data, setData, post, processing, errors } = useForm<ConfirmPasswordForm>({
    password: '',
  })

  const submit: FormEventHandler = (e) => {
    e.preventDefault()
    post(route('password.confirm'))
  }

  return (
    <GuestLayout>
      <Head title="ยืนยันรหัสผ่าน" />
      
      <div className="mb-4 text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">ยืนยันรหัสผ่าน</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">เพื่อความปลอดภัย โปรดยืนยันรหัสผ่านของคุณก่อนดำเนินการต่อ</p>
      </div>

      <form onSubmit={submit}>
        <div className="mt-4">
          <InputLabel htmlFor="password" value="รหัสผ่าน" />
          <TextInput
            id="password"
            type="password"
            name="password"
            value={data.password}
            className="mt-1 block w-full"
            autoComplete="current-password"
            onChange={(e) => setData('password', e.target.value)}
            required
            autoFocus
          />
          <InputError message={errors.password} className="mt-2" />
        </div>

        <div className="flex items-center justify-end mt-4">
          <button 
            type="submit" 
            className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 focus:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
            disabled={processing}
          >
            ยืนยัน
          </button>
        </div>
      </form>
    </GuestLayout>
  )
} 