import { useState, useEffect } from 'react'
import { Head, useForm, Link } from '@inertiajs/react'
import { PageProps } from '@/types'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import Breadcrumbs from '@/Components/Breadcrumbs'

interface Category {
  id: number
  name: string
  slug: string
}

interface EditProps extends PageProps {
  category: Category
}

export default function Edit({ auth, category }: EditProps) {
  const { data, setData, put, errors, processing } = useForm({
    name: category.name || '',
    slug: category.slug || '',
  })

  const [autoUpdateSlug, setAutoUpdateSlug] = useState(true)

  useEffect(() => {
    if (autoUpdateSlug && data.name !== category.name) {
      const slug = data.name
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
      setData('slug', slug)
    }
  }, [data.name])

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData('name', e.target.value)
  }

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData('slug', e.target.value)
    setAutoUpdateSlug(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    put(route('categories.update', category.id))
  }

  const breadcrumbsItems = [
    { title: 'หน้าหลัก', url: route('dashboard') },
    { title: 'หมวดหมู่', url: route('categories.index') },
    { title: 'แก้ไขหมวดหมู่', url: undefined }
  ]

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="page-header d-print-none">
          <div className="container-xl">
            <div className="page-pretitle">แก้ไข</div>
            <h2 className="page-title">หมวดหมู่: {category.name}</h2>
          </div>
        </div>
      }
    >
      <Head title={`แก้ไขหมวดหมู่ - ${category.name}`} />

      <div className="page-body">
        <div className="container-xl">
          <Breadcrumbs items={breadcrumbsItems} />
          
          <div className="row justify-content-center">
            <div className="col-12 col-md-8">
              <form onSubmit={handleSubmit}>
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">แก้ไขรายละเอียดหมวดหมู่</h3>
                  </div>
                  <div className="card-body">
                    <div className="mb-3">
                      <label className="form-label required">ชื่อหมวดหมู่</label>
                      <input 
                        type="text" 
                        className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                        value={data.name}
                        onChange={handleNameChange}
                        placeholder="ป้อนชื่อหมวดหมู่" 
                      />
                      {errors.name && (
                        <div className="invalid-feedback">
                          {errors.name}
                        </div>
                      )}
                    </div>

                    <div className="mb-3">
                      <label className="form-label required">Slug</label>
                      <input 
                        type="text" 
                        className={`form-control ${errors.slug ? 'is-invalid' : ''}`}
                        value={data.slug}
                        onChange={handleSlugChange}
                        placeholder="ป้อน slug" 
                      />
                      {errors.slug && (
                        <div className="invalid-feedback">
                          {errors.slug}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="card-footer text-end">
                    <div className="d-flex">
                      <Link href={route('categories.index')} className="btn btn-link">ยกเลิก</Link>
                      <button type="submit" className="btn btn-primary ms-auto" disabled={processing}>
                        {processing ? 'กำลังบันทึก...' : 'บันทึกข้อมูล'}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  )
} 