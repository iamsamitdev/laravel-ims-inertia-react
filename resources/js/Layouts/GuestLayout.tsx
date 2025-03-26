import { PropsWithChildren } from 'react'
import { Link } from '@inertiajs/react'

export default function Guest({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100 dark:bg-gray-900">
      <div>
        <Link href="/" className="flex justify-center">
          <img src="/static/logo.svg" width="110" height="32" alt="IMS-Thai" />
        </Link>
      </div>

      <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white dark:bg-gray-800 shadow-md overflow-hidden sm:rounded-lg">
        {/* BEGIN: Content */}
        {children}
        {/* END: Content */}
      </div>
    </div>
  )
} 