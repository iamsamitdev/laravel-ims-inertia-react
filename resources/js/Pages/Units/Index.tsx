import { useState } from 'react'
import { Head, Link, router } from '@inertiajs/react'
import { PageProps } from '@/types'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import DataTable from '@/Components/Table/DataTable'
import Breadcrumbs from '@/Components/Breadcrumbs'

interface Unit {
  id: number
  name: string
  slug: string
  short_code: string
  created_at: string
  updated_at: string
}

interface UnitsProps extends PageProps {
  units: {
    data: Unit[]
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

export default function Index({ auth, units, filters }: UnitsProps) {
  const [loading, setLoading] = useState(false)

  // คอลัมน์ตาราง
  const columns = [
    {
      field: 'name',
      label: 'ชื่อหน่วยวัด',
      sortable: true,
      render: (unit: Unit) => (
        <div>
          <div className="font-medium text-gray-900">{unit.name}</div>
        </div>
      )
    },
    {
      field: 'slug',
      label: 'Slug',
      sortable: true
    },
    {
      field: 'short_code',
      label: 'โค้ดย่อ',
      sortable: true
    },
    {
      field: 'actions',
      label: 'จัดการ',
      className: 'w-1',
      render: (unit: Unit) => (
        <div className="btn-list">
          <Link 
            href={route('units.show', unit.slug)} 
            className="btn btn-sm"
          >
            ดู
          </Link>
          <Link 
            href={route('units.edit', unit.slug)} 
            className="btn btn-sm btn-primary"
          >
            แก้ไข
          </Link>
          <button 
            onClick={() => handleDelete(unit.id)}
            className="btn btn-sm btn-danger"
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
      route('units.index'),
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
      route('units.index'),
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
      route('units.index'),
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
    if (confirm('คุณแน่ใจหรือไม่ที่จะลบหน่วยวัดนี้?')) {
      router.delete(route('units.destroy', id), {
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
        href={route('units.create')}
        className="btn btn-primary d-none d-sm-inline-block"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <path d="M12 5l0 14" />
          <path d="M5 12l14 0" />
        </svg>
        เพิ่มหน่วยวัดใหม่
      </Link>
      <Link 
        href={route('units.create')}
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
    total: units.total,
    currentPage: units.current_page,
    perPage: units.per_page,
    links: units.links,
    from: units.from,
    to: units.to
  }

  const breadcrumbsItems = [
    { title: 'หน้าหลัก', url: route('dashboard') },
    { title: 'หน่วยวัด', url: undefined }
  ]

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="row g-2 align-items-center">
          <div className="col">
            <div className="page-pretitle">รายการ</div>
            <h2 className="page-title">หน่วยวัด</h2>
          </div>
        </div>
      }
    >
      <Head title="หน่วยวัด" />
      
      <div className="page-body">
        <div className="container-xl">
          <Breadcrumbs items={breadcrumbsItems} />
          
          <DataTable
            data={units.data}
            columns={columns}
            pagination={pagination}
            onSearch={handleSearch}
            onPerPageChange={handlePerPageChange}
            onSort={handleSort}
            sortField={filters.field}
            sortDirection={filters.direction}
            loading={loading}
            title="รายการหน่วยวัด"
            actions={tableActions}
          />
        </div>
      </div>
    </AuthenticatedLayout>
  )
} 