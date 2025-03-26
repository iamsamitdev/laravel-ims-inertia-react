import { FormEventHandler } from 'react'
import { Head, Link, useForm } from '@inertiajs/react'
import GuestLayout from '@/Layouts/GuestLayout'

export default function VerifyEmail({ status }: { status?: string }) {
  const { post, processing } = useForm({})

  const submit: FormEventHandler = (e) => {
    e.preventDefault()
    post(route('verification.send'))
  }

  return (
    <GuestLayout>
      <Head title="ยืนยันอีเมล" />

      <div className="mb-4 text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">ยืนยันอีเมลของคุณ</h1>
      </div>

      <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
        ขอบคุณสำหรับการลงทะเบียน! ก่อนเริ่มใช้งาน โปรดยืนยันอีเมลของคุณโดยคลิกที่ลิงก์ที่เราได้ส่งไปให้คุณทางอีเมล
        หากคุณไม่ได้รับอีเมล เราจะส่งอีกฉบับให้คุณ
      </div>

      {status === 'verification-link-sent' && (
        <div className="mb-4 font-medium text-sm text-green-600 dark:text-green-400">
          ลิงก์ยืนยันใหม่ได้ถูกส่งไปยังอีเมลที่คุณให้ไว้ตอนลงทะเบียน
        </div>
      )}

      <form onSubmit={submit}>
        <div className="mt-4 flex items-center justify-between">
          <button 
            type="submit" 
            className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 focus:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
            disabled={processing}
          >
            ส่งอีเมลยืนยันอีกครั้ง
          </button>

          <Link
            href={route('logout')}
            method="post"
            as="button"
            type="button"
            className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            ออกจากระบบ
          </Link>
        </div>
      </form>
    </GuestLayout>
  )
} 