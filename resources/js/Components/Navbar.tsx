import { Link } from '@inertiajs/react'
import { useState } from 'react'

export default function Navbar() {
  const [ordersDropdownOpen, setOrdersDropdownOpen] = useState(false)
  const [purchasesDropdownOpen, setPurchasesDropdownOpen] = useState(false)
  const [settingsDropdownOpen, setSettingsDropdownOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  // ฟังก์ชั่นปิด dropdown อื่นๆ ยกเว้นที่เลือก
  const closeOtherDropdowns = (current: string) => {
    if (current !== 'orders') setOrdersDropdownOpen(false)
    if (current !== 'purchases') setPurchasesDropdownOpen(false)
    if (current !== 'settings') setSettingsDropdownOpen(false)
  }

  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden sm:block mt-16">
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center">
              {/* Main Navigation */}
              <div className="flex items-center">
                <Link 
                  href={route('dashboard')} 
                  className={`inline-flex items-center h-14 px-4 text-sm font-medium border-b-2 ${
                    route().current('dashboard') 
                      ? 'text-blue-600 dark:text-blue-400 border-blue-500' 
                      : 'text-gray-500 dark:text-gray-400 border-transparent hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  แดชบอร์ด
                </Link>

                <Link 
                  href={route('products.index')} 
                  className={`inline-flex items-center h-14 px-4 text-sm font-medium border-b-2 ${
                    route().current('products.*') 
                      ? 'text-blue-600 dark:text-blue-400 border-blue-500' 
                      : 'text-gray-500 dark:text-gray-400 border-transparent hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  สินค้า
                </Link>

                {/* Orders Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => {
                      setOrdersDropdownOpen(!ordersDropdownOpen)
                      closeOtherDropdowns('orders')
                    }}
                    className={`inline-flex items-center h-14 px-4 text-sm font-medium border-b-2 ${
                      route().current('orders.*') 
                        ? 'text-blue-600 dark:text-blue-400 border-blue-500' 
                        : 'text-gray-500 dark:text-gray-400 border-transparent hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                  >
                    คำสั่งซื้อ
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {ordersDropdownOpen && (
                    <div className="absolute left-0 z-10 w-48 py-1 mt-0 bg-white dark:bg-gray-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 dark:ring-opacity-20">
                      <Link href={route('orders.index')} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                        ทั้งหมด
                      </Link>
                      <Link href={route('orders.complete')} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                        เสร็จสิ้น
                      </Link>
                      <Link href={route('orders.pending')} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                        รอดำเนินการ
                      </Link>
                      <Link href={route('due.index')} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                        ค้างชำระ
                      </Link>
                    </div>
                  )}
                </div>

                {/* Purchases Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => {
                      setPurchasesDropdownOpen(!purchasesDropdownOpen)
                      closeOtherDropdowns('purchases')
                    }}
                    className={`inline-flex items-center h-14 px-4 text-sm font-medium border-b-2 ${
                      route().current('purchases.*') 
                        ? 'text-blue-600 dark:text-blue-400 border-blue-500' 
                        : 'text-gray-500 dark:text-gray-400 border-transparent hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                  >
                    การซื้อ
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {purchasesDropdownOpen && (
                    <div className="absolute left-0 z-10 w-48 py-1 mt-0 bg-white dark:bg-gray-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 dark:ring-opacity-20">
                      <Link href={route('purchases.index')} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                        ทั้งหมด
                      </Link>
                      <Link href={route('purchases.approvedPurchases')} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                        อนุมัติ
                      </Link>
                      <Link href={route('purchases.dailyPurchaseReport')} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                        รายงานการซื้อประจำวัน
                      </Link>
                    </div>
                  )}
                </div>

                <Link 
                  href={route('quotations.index')} 
                  className={`inline-flex items-center h-14 px-4 text-sm font-medium border-b-2 ${
                    route().current('quotations.*') 
                      ? 'text-blue-600 dark:text-blue-400 border-blue-500' 
                      : 'text-gray-500 dark:text-gray-400 border-transparent hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  ใบเสนอราคา
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div id="mobile-menu" className="hidden sm:hidden bg-white dark:bg-gray-800 shadow-lg rounded-b-lg mt-1">
        <div className="px-2 pt-16 pb-3 space-y-1">
          {/* Mobile Quick Access */}
          <div className="grid grid-cols-4 gap-2 p-2 mb-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <Link href={route('dashboard')} className="flex flex-col items-center p-2 text-gray-600 dark:text-gray-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span className="text-xs">หน้าหลัก</span>
            </Link>
            
            <Link href={route('products.index')} className="flex flex-col items-center p-2 text-gray-600 dark:text-gray-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <span className="text-xs">สินค้า</span>
            </Link>
            
            <Link href={route('orders.index')} className="flex flex-col items-center p-2 text-gray-600 dark:text-gray-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span className="text-xs">คำสั่งซื้อ</span>
            </Link>
            
            <Link href={route('purchases.index')} className="flex flex-col items-center p-2 text-gray-600 dark:text-gray-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="text-xs">การซื้อ</span>
            </Link>
          </div>

          {/* Mobile menu links */}
          <Link
            href={route('dashboard')}
            className={`block px-3 py-2 text-base font-medium rounded-md ${
              route().current('dashboard')
                ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            แดชบอร์ด
          </Link>

          <Link
            href={route('products.index')}
            className={`block px-3 py-2 text-base font-medium rounded-md ${
              route().current('products.*')
                ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            สินค้า
          </Link>

          {/* Mobile Orders submenu */}
          <div>
            <button
              onClick={() => {
                setOrdersDropdownOpen(!ordersDropdownOpen)
                closeOtherDropdowns('orders')
              }}
              className={`flex justify-between w-full px-3 py-2 text-base font-medium rounded-md ${
                route().current('orders.*')
                  ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <span>คำสั่งซื้อ</span>
              <svg
                className={`w-5 h-5 transition-transform ${ordersDropdownOpen ? 'transform rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {ordersDropdownOpen && (
              <div className="px-3 py-2 mt-1 space-y-1 bg-gray-50 dark:bg-gray-700 rounded-md">
                <Link
                  href={route('orders.index')}
                  className="block px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600"
                >
                  ทั้งหมด
                </Link>
                <Link
                  href={route('orders.complete')}
                  className="block px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600"
                >
                  เสร็จสิ้น
                </Link>
                <Link
                  href={route('orders.pending')}
                  className="block px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600"
                >
                  รอดำเนินการ
                </Link>
                <Link
                  href={route('due.index')}
                  className="block px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600"
                >
                  ค้างชำระ
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Purchases submenu */}
          <div>
            <button
              onClick={() => {
                setPurchasesDropdownOpen(!purchasesDropdownOpen)
                closeOtherDropdowns('purchases')
              }}
              className={`flex justify-between w-full px-3 py-2 text-base font-medium rounded-md ${
                route().current('purchases.*')
                  ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <span>การซื้อ</span>
              <svg
                className={`w-5 h-5 transition-transform ${purchasesDropdownOpen ? 'transform rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {purchasesDropdownOpen && (
              <div className="px-3 py-2 mt-1 space-y-1 bg-gray-50 dark:bg-gray-700 rounded-md">
                <Link
                  href={route('purchases.index')}
                  className="block px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600"
                >
                  ทั้งหมด
                </Link>
                <Link
                  href={route('purchases.approvedPurchases')}
                  className="block px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600"
                >
                  อนุมัติ
                </Link>
                <Link
                  href={route('purchases.dailyPurchaseReport')}
                  className="block px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600"
                >
                  รายงานการซื้อประจำวัน
                </Link>
              </div>
            )}
          </div>

          <Link
            href={route('quotations.index')}
            className={`block px-3 py-2 text-base font-medium rounded-md ${
              route().current('quotations.*')
                ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            ใบเสนอราคา
          </Link>
        </div>
      </div>
    </>
  )
} 