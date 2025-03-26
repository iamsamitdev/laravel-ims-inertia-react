import { useState, FormEvent, ChangeEvent } from 'react'
import { Head, Link, useForm, router } from '@inertiajs/react'
import { PageProps } from '@/types'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import Breadcrumbs from '@/Components/Breadcrumbs'

interface ImportProps extends PageProps {}

export default function Import({ auth }: ImportProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [fileName, setFileName] = useState<string>('')
  
  const { data, setData, post, errors, reset, processing } = useForm({
    file: null as File | null
  })

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      setData('file', file)
      setFileName(file.name)
    }
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setIsUploading(true)
    
    post(route('products.import.store'), {
      preserveScroll: true,
      onSuccess: () => {
        reset()
        setFileName('')
        setIsUploading(false)
        router.visit(route('products.index'))
      },
      onError: () => {
        setIsUploading(false)
      }
    })
  }

  const breadcrumbsItems = [
    { title: 'หน้าหลัก', url: route('dashboard') },
    { title: 'รายการผลิตภัณฑ์', url: route('products.index') },
    { title: 'นำเข้าผลิตภัณฑ์', active: true }
  ]

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="นำเข้าผลิตภัณฑ์" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <Breadcrumbs items={breadcrumbsItems} />

          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-6">นำเข้าผลิตภัณฑ์</h2>
            
            <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-500 text-blue-700">
              <h3 className="font-bold">คำแนะนำ:</h3>
              <ul className="list-disc ml-5 mt-2">
                <li>ไฟล์ต้องเป็นนามสกุล .xls หรือ .xlsx เท่านั้น</li>
                <li>ตรวจสอบรูปแบบข้อมูลให้ถูกต้องตามแม่แบบที่กำหนด</li>
                <li>คอลัมน์ A: ชื่อสินค้า</li>
                <li>คอลัมน์ B: ID หมวดหมู่</li>
                <li>คอลัมน์ C: ID หน่วยนับ</li>
                <li>คอลัมน์ D: รหัสสินค้า</li>
                <li>คอลัมน์ E: จำนวน</li>
                <li>คอลัมน์ F: ราคาซื้อ</li>
                <li>คอลัมน์ G: ราคาขาย</li>
                <li>คอลัมน์ H: ชื่อรูปภาพ (ถ้ามี)</li>
              </ul>
              <div className="mt-3">
                <Link
                  href={route('products.export.store')}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  ดาวน์โหลดแม่แบบ Excel
                </Link>
              </div>
            </div>

            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="file">
                  เลือกไฟล์ Excel
                </label>
                <div className="mt-1 flex">
                  <label className="flex flex-col items-center px-4 py-2 bg-white text-blue-500 rounded-lg border border-blue-500 cursor-pointer hover:bg-blue-50">
                    <span className="text-base leading-normal">เลือกไฟล์</span>
                    <input
                      type="file"
                      id="file"
                      name="file"
                      className="hidden"
                      accept=".xls,.xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
                      onChange={handleFileChange}
                      required
                    />
                  </label>
                  <span className="ml-3 mt-2">
                    {fileName ? fileName : 'ยังไม่ได้เลือกไฟล์'}
                  </span>
                </div>
                {errors.file && (
                  <div className="text-red-500 mt-2 text-sm">{errors.file}</div>
                )}
              </div>

              <div className="flex items-center justify-end mt-6">
                <Link
                  href={route('products.index')}
                  className="px-4 py-2 bg-gray-300 border border-transparent rounded-md font-semibold text-xs text-gray-800 uppercase tracking-widest hover:bg-gray-400 focus:bg-gray-400 active:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 mr-3"
                >
                  ยกเลิก
                </Link>
                <button
                  type="submit"
                  disabled={processing || !data.file || isUploading}
                  className={`px-4 py-2 bg-green-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-green-700 focus:bg-green-700 active:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition ease-in-out duration-150 ${
                    (processing || !data.file || isUploading) ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isUploading ? 'กำลังนำเข้า...' : 'นำเข้าผลิตภัณฑ์'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  )
} 