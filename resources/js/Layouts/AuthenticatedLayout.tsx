import { PropsWithChildren, ReactNode, useState } from 'react'
import { User } from '@/types'
import { Link } from '@inertiajs/react'
import Header from '@/Components/Header'
import Navbar from '@/Components/Navbar'
import Footer from '@/Components/Footer'

export default function Authenticated({
  user,
  header,
  children,
}: PropsWithChildren<{ user: User; header?: ReactNode }>) {
  const [darkMode, setDarkMode] = useState(false)

  return (
    <div className={`min-h-screen bg-gray-50 ${darkMode ? 'dark' : ''}`}>
      {/* Header bar with user menu */}
      <Header user={user} darkMode={darkMode} setDarkMode={setDarkMode} />
      
      {/* Navigation bar */}
      <Navbar />

      {/* Page Content */}
      <main className="py-6">
        <div className="px-4 mx-auto max-w-full">
          {header && (
            <div className="mb-6">
              {header}
            </div>
          )}
          {children}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
} 