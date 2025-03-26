import { Head, Link } from '@inertiajs/react'
import { PageProps } from '@/types'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import Breadcrumbs from '@/Components/Breadcrumbs'

interface User {
  id: number
  name: string
  email: string
  role: {
    id: number
    name: string
  }
  phone: string | null
  address: string | null
  bio: string | null
  profile_image: string | null
  email_verified_at: string | null
  created_at: string
  updated_at: string
}

interface ShowProps extends PageProps {
  user: User
}

export default function Show({ auth, user }: ShowProps) {
  const breadcrumbsItems = [
    { title: 'หน้าหลัก', url: route('dashboard') },
    { title: 'ผู้ใช้งาน', url: route('users.index') },
    { title: user.name, url: undefined }
  ]

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="row g-2 align-items-center">
          <div className="col">
            <h2 className="page-title">ข้อมูลผู้ใช้งาน</h2>
          </div>
          <div className="col-auto ms-auto">
            <div className="btn-list">
              <Link 
                href={route('users.edit', user.id)} 
                className="btn btn-primary d-none d-sm-inline-block"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-edit" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1"></path>
                  <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z"></path>
                  <path d="M16 5l3 3"></path>
                </svg>
                แก้ไขข้อมูล
              </Link>
              <Link 
                href={route('users.edit', user.id)} 
                className="btn btn-primary d-sm-none btn-icon"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-edit" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1"></path>
                  <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z"></path>
                  <path d="M16 5l3 3"></path>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      }
    >
      <Head title={`ผู้ใช้งาน: ${user.name}`} />

      <div className="page-body">
        <div className="container-xl">
          <Breadcrumbs items={breadcrumbsItems} />

          <div className="row">
            <div className="col-md-4">
              <div className="card">
                <div className="card-body text-center">
                  <div className="mb-3">
                    <img
                      className="avatar avatar-xl rounded-circle mb-3"
                      src={user.profile_image ? `/storage/profiles/${user.profile_image}` : '/assets/img/demo/user-placeholder.png'}
                      alt={user.name}
                    />
                    <h3 className="m-0">{user.name}</h3>
                    <p className="text-muted">{user.role?.name || 'ผู้ใช้งานทั่วไป'}</p>
                  </div>
                  <div className="d-flex">
                    <a href={`mailto:${user.email}`} className="btn btn-primary w-100">
                      ส่งอีเมล
                    </a>
                  </div>
                </div>
                <div className="card-body">
                  <div className="mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon me-2 text-muted" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                      <path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z" />
                      <path d="M3 7l9 6l9 -6" />
                    </svg>
                    <strong className="me-1">อีเมล:</strong>
                    {user.email}
                  </div>
                  {user.phone && (
                    <div className="mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="icon me-2 text-muted" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
                      </svg>
                      <strong className="me-1">เบอร์โทรศัพท์:</strong>
                      {user.phone}
                    </div>
                  )}
                  {user.address && (
                    <div className="mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="icon me-2 text-muted" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M3 7l6 -3l6 3l6 -3v13l-6 3l-6 -3l-6 3v-13" />
                        <path d="M9 4v13" />
                        <path d="M15 7v13" />
                      </svg>
                      <strong className="me-1">ที่อยู่:</strong>
                      {user.address}
                    </div>
                  )}
                  <div className="mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon me-2 text-muted" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                      <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                      <path d="M12 12l3 2" />
                      <path d="M12 7v5" />
                    </svg>
                    <strong className="me-1">สถานะอีเมล:</strong>
                    {user.email_verified_at ? 
                        <span className="badge bg-success">ยืนยันแล้ว</span> : 
                        <span className="badge bg-danger">ยังไม่ยืนยัน</span>
                    }
                  </div>
                  <div className="mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon me-2 text-muted" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                      <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                      <path d="M12 12l3 2" />
                      <path d="M12 7v5" />
                    </svg>
                    <strong className="me-1">วันที่สร้าง:</strong>
                    {new Date(user.created_at).toLocaleDateString('th-TH')}
                  </div>
                  <div className="mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon me-2 text-muted" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                      <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                      <path d="M12 12l3 2" />
                      <path d="M12 7v5" />
                    </svg>
                    <strong className="me-1">วันที่แก้ไขล่าสุด:</strong>
                    {new Date(user.updated_at).toLocaleDateString('th-TH')}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-8">
              {user.bio && (
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">ประวัติย่อ</h3>
                  </div>
                  <div className="card-body">
                    <p className="text-muted">
                      {user.bio}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  )
} 