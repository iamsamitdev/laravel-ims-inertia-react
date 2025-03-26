import { useState, useEffect } from 'react'
import { Head, Link, useForm } from '@inertiajs/react'
import { PageProps } from '@/types'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import Breadcrumbs from '@/Components/Breadcrumbs'

interface Supplier {
  id: number
  name: string
  email: string
  phone: string
  shopname: string
  address: string
  type: string
  photo: string | null
  account_holder: string | null
  account_number: string | null
  bank_name: string | null
}

interface EditProps extends PageProps {
  supplier: Supplier
}

export default function Edit({ auth, supplier }: EditProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(
    supplier.photo ? `/storage/${supplier.photo}` : null
  )

  const { data, setData, post, processing, errors } = useForm({
    name: supplier.name || '',
    email: supplier.email || '',
    phone: supplier.phone || '',
    address: supplier.address || '',
    shopname: supplier.shopname || '',
    type: supplier.type || '',
    _method: 'put',
    photo: null as File | null,
    account_holder: supplier.account_holder || '',
    account_number: supplier.account_number || '',
    bank_name: supplier.bank_name || '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    post(route('suppliers.update', supplier.id))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setData('photo', file)

    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const breadcrumbsItems = [
    { title: 'หน้าหลัก', url: route('dashboard') },
    { title: 'ซัพพลายเออร์', url: route('suppliers.index') },
    { title: supplier.name, url: route('suppliers.show', supplier.id) },
    { title: 'แก้ไข', url: undefined }
  ]

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="page-header d-print-none">
          <div className="container-xl">
            <div className="page-pretitle">ฟอร์ม</div>
            <h2 className="page-title">แก้ไขข้อมูลซัพพลายเออร์</h2>
          </div>
        </div>
      }
    >
      <Head title={`แก้ไขซัพพลายเออร์: ${supplier.name}`} />

      <div className="page-body">
        <div className="container-xl">
          <Breadcrumbs items={breadcrumbsItems} />

          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="row">
              <div className="col-lg-4">
                <div className="card">
                  <div className="card-body">
                    <h3 className="card-title">รูปโปรไฟล์</h3>

                    <img
                      className="img-account-profile mb-2"
                      src={imagePreview || '/assets/img/demo/user-placeholder.svg'}
                      alt="Preview"
                      style={{ maxWidth: '100%', height: 'auto' }}
                    />

                    <div className="small font-italic text-muted mb-2">
                      JPG หรือ PNG ขนาดไม่เกิน 1 MB
                    </div>

                    <input
                      className={`form-control ${errors.photo ? 'is-invalid' : ''}`}
                      type="file"
                      id="image"
                      name="photo"
                      accept="image/*"
                      onChange={handleImageChange}
                    />

                    {errors.photo && (
                      <div className="invalid-feedback">{errors.photo}</div>
                    )}
                  </div>
                </div>
              </div>

              <div className="col-lg-8">
                <div className="card">
                  <div className="card-body">
                    <h3 className="card-title">รายละเอียดซัพพลายเออร์</h3>

                    <div className="row row-cards">
                      <div className="col-md-12">
                        <div className="mb-3">
                          <label htmlFor="name" className="form-label required">
                            ชื่อ
                          </label>
                          <input
                            id="name"
                            type="text"
                            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                          />
                          {errors.name && (
                            <div className="invalid-feedback">{errors.name}</div>
                          )}
                        </div>

                        <div className="mb-3">
                          <label htmlFor="email" className="form-label required">
                            อีเมล
                          </label>
                          <input
                            id="email"
                            type="email"
                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                          />
                          {errors.email && (
                            <div className="invalid-feedback">{errors.email}</div>
                          )}
                        </div>

                        <div className="mb-3">
                          <label htmlFor="shopname" className="form-label required">
                            ชื่อร้าน
                          </label>
                          <input
                            id="shopname"
                            type="text"
                            className={`form-control ${errors.shopname ? 'is-invalid' : ''}`}
                            value={data.shopname}
                            onChange={(e) => setData('shopname', e.target.value)}
                          />
                          {errors.shopname && (
                            <div className="invalid-feedback">{errors.shopname}</div>
                          )}
                        </div>

                        <div className="mb-3">
                          <label htmlFor="phone" className="form-label required">
                            เบอร์โทรศัพท์
                          </label>
                          <input
                            id="phone"
                            type="text"
                            className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                            value={data.phone}
                            onChange={(e) => setData('phone', e.target.value)}
                          />
                          {errors.phone && (
                            <div className="invalid-feedback">{errors.phone}</div>
                          )}
                        </div>
                      </div>

                      <div className="col-sm-6 col-md-6">
                        <div className="mb-3">
                          <label htmlFor="type" className="form-label required">
                            ประเภทซัพพลายเออร์
                          </label>
                          <select
                            id="type"
                            className={`form-select ${errors.type ? 'is-invalid' : ''}`}
                            value={data.type}
                            onChange={(e) => setData('type', e.target.value)}
                          >
                            <option value="distributor">ผู้จัดจำหน่าย (Distributor)</option>
                            <option value="wholesaler">ผู้ค้าส่ง (Wholesaler)</option>
                            <option value="producer">ผู้ผลิต (Producer)</option>
                          </select>
                          {errors.type && (
                            <div className="invalid-feedback">{errors.type}</div>
                          )}
                        </div>
                      </div>

                      <div className="col-sm-6 col-md-6">
                        <div className="mb-3">
                          <label htmlFor="bank_name" className="form-label">
                            ชื่อธนาคาร
                          </label>
                          <input
                            id="bank_name"
                            type="text"
                            className={`form-control ${errors.bank_name ? 'is-invalid' : ''}`}
                            value={data.bank_name}
                            onChange={(e) => setData('bank_name', e.target.value)}
                          />
                          {errors.bank_name && (
                            <div className="invalid-feedback">{errors.bank_name}</div>
                          )}
                        </div>
                      </div>

                      <div className="col-sm-6 col-md-6">
                        <div className="mb-3">
                          <label htmlFor="account_holder" className="form-label">
                            ชื่อเจ้าของบัญชี
                          </label>
                          <input
                            id="account_holder"
                            type="text"
                            className={`form-control ${errors.account_holder ? 'is-invalid' : ''}`}
                            value={data.account_holder}
                            onChange={(e) => setData('account_holder', e.target.value)}
                          />
                          {errors.account_holder && (
                            <div className="invalid-feedback">{errors.account_holder}</div>
                          )}
                        </div>
                      </div>

                      <div className="col-sm-6 col-md-6">
                        <div className="mb-3">
                          <label htmlFor="account_number" className="form-label">
                            เลขที่บัญชี
                          </label>
                          <input
                            id="account_number"
                            type="text"
                            className={`form-control ${errors.account_number ? 'is-invalid' : ''}`}
                            value={data.account_number}
                            onChange={(e) => setData('account_number', e.target.value)}
                          />
                          {errors.account_number && (
                            <div className="invalid-feedback">{errors.account_number}</div>
                          )}
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="mb-3">
                          <label htmlFor="address" className="form-label required">
                            ที่อยู่
                          </label>
                          <textarea
                            id="address"
                            className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                            rows={3}
                            value={data.address}
                            onChange={(e) => setData('address', e.target.value)}
                          ></textarea>
                          {errors.address && (
                            <div className="invalid-feedback">{errors.address}</div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="card-footer text-end">
                    <button 
                      type="submit" 
                      className="btn btn-primary"
                      disabled={processing}
                    >
                      อัปเดตข้อมูล
                    </button>
                    <Link
                      href={route('suppliers.show', supplier.id)}
                      className="btn btn-outline-secondary ms-2"
                    >
                      ยกเลิก
                    </Link>
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