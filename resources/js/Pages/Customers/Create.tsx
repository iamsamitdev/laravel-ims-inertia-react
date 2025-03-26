import { useState } from 'react'
import { Head, useForm, Link } from '@inertiajs/react'
import { PageProps } from '@/types'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import Breadcrumbs from '@/Components/Breadcrumbs'

export default function Create({ auth }: PageProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  
  const { data, setData, post, errors, processing } = useForm({
    photo: null as File | null,
    name: '',
    email: '',
    phone: '',
    address: '',
    account_holder: '',
    account_number: '',
    bank_name: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    post(route('customers.store'))
  }

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setData('photo', file)
      
      // สร้าง preview ของรูปภาพ
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          setImagePreview(e.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const breadcrumbsItems = [
    { title: 'หน้าหลัก', url: route('dashboard') },
    { title: 'ลูกค้า', url: route('customers.index') },
    { title: 'เพิ่มลูกค้าใหม่', url: undefined }
  ]

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="row g-2 align-items-center">
          <div className="col">
            <div className="page-pretitle">รายการ</div>
            <h2 className="page-title">เพิ่มลูกค้าใหม่</h2>
          </div>
        </div>
      }
    >
      <Head title="เพิ่มลูกค้าใหม่" />

      <div className="page-body">
        <div className="container-xl">
          <Breadcrumbs items={breadcrumbsItems} />

          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-lg-4">
                <div className="card">
                  <div className="card-body">
                    <h3 className="card-title">
                      รูปลูกค้า
                    </h3>

                    <img 
                      className="img-account-profile mb-2" 
                      src={imagePreview || '/assets/img/demo/user-placeholder.svg'} 
                      alt="รูปโปรไฟล์ลูกค้า" 
                      style={{ maxWidth: '100%', height: 'auto' }}
                    />

                    <div className="small font-italic text-muted mb-2">ไฟล์ JPG หรือ PNG ขนาดไม่เกิน 2 MB</div>

                    <input 
                      className={`form-control ${errors.photo ? 'is-invalid' : ''}`} 
                      type="file"  
                      id="image" 
                      onChange={handlePhotoChange}
                      accept="image/*"
                    />

                    {errors.photo && (
                      <div className="invalid-feedback">
                        {errors.photo}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="col-lg-8">
                <div className="card">
                  <div className="card-body">
                    <h3 className="card-title">ข้อมูลลูกค้า</h3>
                    
                    <div className="mb-3">
                      <label className="form-label required">ชื่อ</label>
                      <input 
                        type="text" 
                        className={`form-control ${errors.name ? 'is-invalid' : ''}`} 
                        name="name" 
                        placeholder="กรอกชื่อลูกค้า" 
                        value={data.name}
                        onChange={e => setData('name', e.target.value)}
                      />
                      {errors.name && (
                        <div className="invalid-feedback">
                          {errors.name}
                        </div>
                      )}
                    </div>

                    <div className="mb-3">
                      <label className="form-label required">อีเมล</label>
                      <input 
                        type="email" 
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`} 
                        name="email" 
                        placeholder="กรอกอีเมล" 
                        value={data.email}
                        onChange={e => setData('email', e.target.value)}
                      />
                      {errors.email && (
                        <div className="invalid-feedback">
                          {errors.email}
                        </div>
                      )}
                    </div>

                    <div className="mb-3">
                      <label className="form-label required">เบอร์โทรศัพท์</label>
                      <input 
                        type="text" 
                        className={`form-control ${errors.phone ? 'is-invalid' : ''}`} 
                        name="phone" 
                        placeholder="กรอกเบอร์โทรศัพท์" 
                        value={data.phone}
                        onChange={e => setData('phone', e.target.value)}
                      />
                      {errors.phone && (
                        <div className="invalid-feedback">
                          {errors.phone}
                        </div>
                      )}
                    </div>

                    <div className="mb-3">
                      <label className="form-label required">ที่อยู่</label>
                      <textarea 
                        className={`form-control ${errors.address ? 'is-invalid' : ''}`} 
                        name="address" 
                        rows={3} 
                        placeholder="กรอกที่อยู่"
                        value={data.address}
                        onChange={e => setData('address', e.target.value)}
                      ></textarea>
                      {errors.address && (
                        <div className="invalid-feedback">
                          {errors.address}
                        </div>
                      )}
                    </div>

                    <div className="hr-text">ข้อมูลบัญชีธนาคาร (ไม่บังคับ)</div>

                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">ชื่อเจ้าของบัญชี</label>
                          <input 
                            type="text" 
                            className={`form-control ${errors.account_holder ? 'is-invalid' : ''}`} 
                            name="account_holder" 
                            placeholder="กรอกชื่อเจ้าของบัญชี" 
                            value={data.account_holder}
                            onChange={e => setData('account_holder', e.target.value)}
                          />
                          {errors.account_holder && (
                            <div className="invalid-feedback">
                              {errors.account_holder}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">เลขที่บัญชี</label>
                          <input 
                            type="text" 
                            className={`form-control ${errors.account_number ? 'is-invalid' : ''}`} 
                            name="account_number" 
                            placeholder="กรอกเลขที่บัญชี" 
                            value={data.account_number}
                            onChange={e => setData('account_number', e.target.value)}
                          />
                          {errors.account_number && (
                            <div className="invalid-feedback">
                              {errors.account_number}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">ธนาคาร</label>
                          <input 
                            type="text" 
                            className={`form-control ${errors.bank_name ? 'is-invalid' : ''}`} 
                            name="bank_name" 
                            placeholder="กรอกชื่อธนาคาร" 
                            value={data.bank_name}
                            onChange={e => setData('bank_name', e.target.value)}
                          />
                          {errors.bank_name && (
                            <div className="invalid-feedback">
                              {errors.bank_name}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-footer text-end">
                    <div className="d-flex">
                      <Link href={route('customers.index')} className="btn btn-link">ยกเลิก</Link>
                      <button type="submit" className="btn btn-primary ms-auto" disabled={processing}>
                        {processing ? 'กำลังบันทึก...' : 'บันทึกข้อมูล'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </AuthenticatedLayout>
  )
} 