import { useState } from 'react'
import { Head, Link, router } from '@inertiajs/react'
import { PageProps } from '@/types'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import DataTable from '@/Components/Table/DataTable'
import Breadcrumbs from '@/Components/Breadcrumbs'

interface User {
  id: number
  name: string
  email: string
  role: {
    id: number
    name: string
  }
  email_verified_at: string | null
  created_at: string
}

interface UsersProps extends PageProps {
  users: {
    data: User[]
    total: number
    current_page: number
    per_page: number
    links: Array<{ url: string | null; label: string; active: boolean }>
    from: number
    to: number
  }
  filters: {
    search: string
    perPage: number
    field: string
    direction: 'asc' | 'desc'
  }
}

export default function Index({ auth, users, filters }: UsersProps) {
  const [loading, setLoading] = useState(false)

  // คอลัมน์ตาราง
  const columns = [
    {
      field: 'name',
      label: 'ชื่อ',
      sortable: true
    },
    {
      field: 'email',
      label: 'อีเมล',
      sortable: true
    },
    {
      field: 'role.name',
      label: 'สิทธิ์การใช้งาน',
      sortable: true,
      render: (user: User) => (
        <span className="badge bg-blue me-1">{user.role?.name || 'ผู้ใช้งานทั่วไป'}</span>
      )
    },
    {
      field: 'email_verified_at',
      label: 'ยืนยันอีเมล',
      sortable: true,
      render: (user: User) => (
        user.email_verified_at ? 
          <span className="badge bg-success me-1">ยืนยันแล้ว</span> : 
          <span className="badge bg-danger me-1">ยังไม่ยืนยัน</span>
      )
    },
    {
      field: 'created_at',
      label: 'วันที่สร้าง',
      sortable: true,
      render: (user: User) => (
        <span>{new Date(user.created_at).toLocaleDateString('th-TH')}</span>
      )
    },
    {
      field: 'actions',
      label: 'จัดการ',
      className: 'w-1',
      render: (user: User) => (
        <div className="btn-list">
          <Link 
            href={route('users.show', user.id)} 
            className="btn btn-sm"
          >
            ดู
          </Link>
          <Link 
            href={route('users.edit', user.id)} 
            className="btn btn-sm btn-primary"
          >
            แก้ไข
          </Link>
          <button 
            onClick={() => handleDelete(user.id)}
            className="btn btn-sm btn-danger"
            disabled={user.id === auth.user.id}
          >
            ลบ
          </button>
        </div>
      )
    }
  ]

  // จัดการค้นหา
  const handleSearch = (value: string) => {
    setLoading(true)
    router.get(
      route('users.index'),
      { ...filters, search: value },
      {
        preserveState: true,
        preserveScroll: true,
        onSuccess: () => setLoading(false)
      }
    )
  }

  // จัดการจำนวนแสดงต่อหน้า
  const handlePerPageChange = (value: number) => {
    setLoading(true)
    router.get(
      route('users.index'),
      { ...filters, perPage: value },
      {
        preserveState: true,
        preserveScroll: true,
        onSuccess: () => setLoading(false)
      }
    )
  }

  // จัดการการเรียงลำดับ
  const handleSort = (field: string) => {
    setLoading(true)
    
    const direction = field === filters.field && filters.direction === 'asc' ? 'desc' : 'asc'
    
    router.get(
      route('users.index'),
      { ...filters, field, direction },
      {
        preserveState: true,
        preserveScroll: true,
        onSuccess: () => setLoading(false)
      }
    )
  }

  // จัดการการลบรายการ
  const handleDelete = (id: number) => {
    if (id === auth.user.id) {
      alert('ไม่สามารถลบบัญชีของตัวเองได้')
      return
    }

    if (confirm('คุณแน่ใจหรือไม่ที่จะลบผู้ใช้นี้?')) {
      router.delete(route('users.destroy', id), {
        onSuccess: () => {
          // แสดง toast หรือ notification แจ้งลบสำเร็จ
        }
      })
    }
  }

  // ปุ่มสำหรับใส่ใน actions ของ DataTable
  const tableActions = (
    <>
      <Link 
        href={route('users.create')}
        className="btn btn-primary d-none d-sm-inline-block"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <path d="M12 5l0 14" />
          <path d="M5 12l14 0" />
        </svg>
        เพิ่มผู้ใช้ใหม่
      </Link>
      <Link 
        href={route('users.create')}
        className="btn btn-primary d-sm-none btn-icon"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <path d="M12 5l0 14" />
          <path d="M5 12l14 0" />
        </svg>
      </Link>
    </>
  )

  // การจัดรูปแบบข้อมูลการแบ่งหน้าสำหรับ DataTable
  const pagination = {
    total: users.total,
    currentPage: users.current_page,
    perPage: users.per_page,
    links: users.links,
    from: users.from,
    to: users.to
  }

  const breadcrumbsItems = [
    { title: 'หน้าหลัก', url: route('dashboard') },
    { title: 'ผู้ใช้งาน', url: undefined }
  ]

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="row g-2 align-items-center">
          <div className="col">
            <div className="page-pretitle">รายการ</div>
            <h2 className="page-title">ผู้ใช้งาน</h2>
          </div>
        </div>
      }
    >
      <Head title="ผู้ใช้งาน" />
      
      <div className="page-body">
        <div className="container-xl">
          <Breadcrumbs items={breadcrumbsItems} />
          
          <DataTable
            data={users.data}
            columns={columns}
            pagination={pagination}
            onSearch={handleSearch}
            onPerPageChange={handlePerPageChange}
            onSort={handleSort}
            sortField={filters.field}
            sortDirection={filters.direction}
            loading={loading}
            title="รายการผู้ใช้งาน"
            actions={tableActions}
          />
        </div>
      </div>
    </AuthenticatedLayout>
  )
} 