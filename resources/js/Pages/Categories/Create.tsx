import { useState } from 'react'
import { Head, useForm, Link } from '@inertiajs/react'
import { PageProps } from '@/types'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import Breadcrumbs from '@/Components/Breadcrumbs'

export default function Create({ auth }: PageProps) {
  const { data, setData, post, errors, processing } = useForm({
    name: '',
    slug: '',
  })

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value
    setData('name', name)
    // สร้าง slug อัตโนมัติจากชื่อ
    const slug = name
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
    setData('slug', slug)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    post(route('categories.store'))
  }

  const breadcrumbsItems = [
    { title: 'หน้าหลัก', url: route('dashboard') },
    { title: 'หมวดหมู่', url: route('categories.index') },
    { title: 'เพิ่มหมวดหมู่ใหม่', url: undefined }
  ]

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="row g-2 align-items-center">
          <div className="col">
            <div className="page-pretitle">เพิ่มรายการ</div>
            <h2 className="page-title">หมวดหมู่ใหม่</h2>
          </div>
        </div>
      }
    >
      <Head title="เพิ่มหมวดหมู่ใหม่" />

      <div className="page-body">
        <div className="container-xl">
          <Breadcrumbs items={breadcrumbsItems} />
          
          <div className="row justify-content-center">
            <div className="col-12 col-md-8">
              <form onSubmit={handleSubmit}>
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">รายละเอียดหมวดหมู่</h3>
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
                        onChange={(e) => setData('slug', e.target.value)}
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