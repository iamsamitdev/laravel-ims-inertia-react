import { useState, FormEvent } from 'react'
import { Head, useForm, Link } from '@inertiajs/react'
import { PageProps } from '@/types'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import Breadcrumbs from '@/Components/Breadcrumbs'

interface Role {
  id: number
  name: string
}

interface User {
  id: number
  name: string
  email: string
  role_id: number
  phone: string | null
  address: string | null
  bio: string | null
  profile_image: string | null
}

interface EditProps extends PageProps {
  roles: Role[]
  user: User
}

export default function Edit({ auth, roles, user }: EditProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(
    user.profile_image ? `/storage/profiles/${user.profile_image}` : null
  )

  const { data, setData, post, errors, processing } = useForm({
    _method: 'PUT',
    name: user.name || '',
    email: user.email || '',
    role_id: user.role_id ? String(user.role_id) : '',
    phone: user.phone || '',
    address: user.address || '',
    bio: user.bio || '',
    profile_image: null as File | null,
    password: '',
    password_confirmation: '',
  })

  const breadcrumbsItems = [
    { title: 'หน้าหลัก', url: route('dashboard') },
    { title: 'ผู้ใช้งาน', url: route('users.index') },
    { title: user.name, url: route('users.show', user.id) },
    { title: 'แก้ไข', url: undefined }
  ]

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    post(route('users.update', user.id))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setData('profile_image', file)
      
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          setImagePreview(e.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="row g-2 align-items-center">
          <div className="col">
            <h2 className="page-title">แก้ไขข้อมูลผู้ใช้งาน</h2>
          </div>
        </div>
      }
    >
      <Head title={`แก้ไขข้อมูลผู้ใช้งาน: ${user.name}`} />

      <div className="page-body">
        <div className="container-xl">
          <Breadcrumbs items={breadcrumbsItems} />

          <div className="row">
            <div className="col-12">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-4">
                    <div className="card">
                      <div className="card-header">
                        <h3 className="card-title">รูปโปรไฟล์</h3>
                      </div>
                      <div className="card-body">
                        <div className="text-center mb-3">
                          <img
                            className="avatar avatar-xl rounded-circle"
                            src={imagePreview || '/assets/img/demo/user-placeholder.png'}
                            alt={user.name}
                          />
                        </div>
                        
                        <div className="mb-3">
                          <div className="small font-italic text-muted mb-2">
                            JPG หรือ PNG ขนาดไม่เกิน 2 MB
                          </div>
                          <input
                            className={`form-control ${errors.profile_image ? 'is-invalid' : ''}`}
                            type="file"
                            id="profile_image"
                            name="profile_image"
                            accept="image/*"
                            onChange={handleImageChange}
                          />
                          {errors.profile_image && (
                            <div className="invalid-feedback">{errors.profile_image}</div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-8">
                    <div className="card">
                      <div className="card-header">
                        <h3 className="card-title">ข้อมูลส่วนตัว</h3>
                      </div>
                      <div className="card-body">
                        <div className="mb-3">
                          <label className="form-label required" htmlFor="name">ชื่อ</label>
                          <input
                            id="name"
                            type="text"
                            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            required
                          />
                          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                        </div>

                        <div className="mb-3">
                          <label className="form-label required" htmlFor="email">อีเมล</label>
                          <input
                            id="email"
                            type="email"
                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            required
                          />
                          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                        </div>

                        <div className="mb-3">
                          <label className="form-label required" htmlFor="role_id">สิทธิ์การใช้งาน</label>
                          <select
                            id="role_id"
                            className={`form-select ${errors.role_id ? 'is-invalid' : ''}`}
                            value={data.role_id}
                            onChange={(e) => setData('role_id', e.target.value)}
                            required
                          >
                            <option value="">เลือกสิทธิ์การใช้งาน</option>
                            {roles.map((role) => (
                              <option key={role.id} value={role.id.toString()}>{role.name}</option>
                            ))}
                          </select>
                          {errors.role_id && <div className="invalid-feedback">{errors.role_id}</div>}
                        </div>

                        <div className="mb-3">
                          <label className="form-label" htmlFor="phone">เบอร์โทรศัพท์</label>
                          <input
                            id="phone"
                            type="text"
                            className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                            value={data.phone}
                            onChange={(e) => setData('phone', e.target.value)}
                          />
                          {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                        </div>

                        <div className="mb-3">
                          <label className="form-label" htmlFor="address">ที่อยู่</label>
                          <textarea
                            id="address"
                            className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                            rows={3}
                            value={data.address}
                            onChange={(e) => setData('address', e.target.value)}
                          ></textarea>
                          {errors.address && <div className="invalid-feedback">{errors.address}</div>}
                        </div>

                        <div className="mb-3">
                          <label className="form-label" htmlFor="bio">ประวัติย่อ</label>
                          <textarea
                            id="bio"
                            className={`form-control ${errors.bio ? 'is-invalid' : ''}`}
                            rows={3}
                            value={data.bio}
                            onChange={(e) => setData('bio', e.target.value)}
                          ></textarea>
                          {errors.bio && <div className="invalid-feedback">{errors.bio}</div>}
                        </div>

                        <hr className="my-4" />
                        <div className="mb-3">
                          <h4>เปลี่ยนรหัสผ่าน</h4>
                          <p className="text-muted">เว้นว่างไว้หากไม่ต้องการเปลี่ยนรหัสผ่าน</p>
                        </div>

                        <div className="mb-3">
                          <label className="form-label" htmlFor="password">รหัสผ่านใหม่</label>
                          <input
                            id="password"
                            type="password"
                            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                          />
                          {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                        </div>

                        <div className="mb-3">
                          <label className="form-label" htmlFor="password_confirmation">ยืนยันรหัสผ่านใหม่</label>
                          <input
                            id="password_confirmation"
                            type="password"
                            className={`form-control ${errors.password_confirmation ? 'is-invalid' : ''}`}
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                          />
                          {errors.password_confirmation && <div className="invalid-feedback">{errors.password_confirmation}</div>}
                        </div>
                      </div>
                      <div className="card-footer text-end">
                        <Link href={route('users.show', user.id)} className="btn btn-outline-secondary me-2">
                          ยกเลิก
                        </Link>
                        <button type="submit" className="btn btn-primary" disabled={processing}>
                          {processing ? 'กำลังบันทึก...' : 'บันทึกข้อมูล'}
                        </button>
                      </div>
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