import { useState } from 'react'
import { Head, Link, router } from '@inertiajs/react'
import { PageProps } from '@/types'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import DataTable from '@/Components/Table/DataTable'
import Breadcrumbs from '@/Components/Breadcrumbs'

interface Supplier {
  id: number
  name: string
  email: string
  phone: string
  shopname: string
  type: string
  address: string
  photo: string | null
  created_at: string
  updated_at: string
}

interface SuppliersProps extends PageProps {
  suppliers: {
    data: Supplier[]
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

export default function Index({ auth, suppliers, filters }: SuppliersProps) {
  const [loading, setLoading] = useState(false)

  // คอลัมน์ตาราง
  const columns = [
    {
      field: 'name',
      label: 'ชื่อซัพพลายเออร์',
      sortable: true,
      render: (supplier: Supplier) => (
        <div className="d-flex align-items-center">
          <span className="avatar me-2" style={{ 
            backgroundImage: supplier.photo 
              ? `url(/storage/suppliers/${supplier.photo})` 
              : undefined 
          }}>
            {!supplier.photo && supplier.name.charAt(0).toUpperCase()}
          </span>
          <div>
            <div className="font-weight-medium">{supplier.name}</div>
            <div className="text-muted">{supplier.email}</div>
          </div>
        </div>
      )
    },
    {
      field: 'shopname',
      label: 'ชื่อร้าน',
      sortable: true
    },
    {
      field: 'phone',
      label: 'เบอร์โทรศัพท์',
      sortable: true
    },
    {
      field: 'type',
      label: 'ประเภท',
      sortable: true,
      render: (supplier: Supplier) => {
        let label = ''
        let badgeClass = 'badge bg-primary me-1'
        
        if (supplier.type === 'distributor') {
          label = 'ผู้จัดจำหน่าย'
        } else if (supplier.type === 'wholesaler') {
          label = 'ผู้ค้าส่ง'
          badgeClass = 'badge bg-green me-1'
        } else if (supplier.type === 'producer') {
          label = 'ผู้ผลิต'
          badgeClass = 'badge bg-purple me-1'
        }
        
        return <span className={badgeClass}>{label}</span>
      }
    },
    {
      field: 'actions',
      label: 'จัดการ',
      className: 'w-1',
      render: (supplier: Supplier) => (
        <div className="btn-list">
          <Link 
            href={route('suppliers.show', supplier.id)} 
            className="btn btn-sm"
          >
            ดู
          </Link>
          <Link 
            href={route('suppliers.edit', supplier.id)} 
            className="btn btn-sm btn-primary"
          >
            แก้ไข
          </Link>
          <button 
            onClick={() => handleDelete(supplier.id)}
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
      route('suppliers.index'),
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
      route('suppliers.index'),
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
      route('suppliers.index'),
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
    if (confirm('คุณแน่ใจหรือไม่ที่จะลบซัพพลายเออร์นี้?')) {
      router.delete(route('suppliers.destroy', id), {
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
        href={route('suppliers.create')}
        className="btn btn-primary d-none d-sm-inline-block"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <path d="M12 5l0 14" />
          <path d="M5 12l14 0" />
        </svg>
        เพิ่มซัพพลายเออร์ใหม่
      </Link>
      <Link 
        href={route('suppliers.create')}
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
    total: suppliers.total,
    currentPage: suppliers.current_page,
    perPage: suppliers.per_page,
    links: suppliers.links,
    from: suppliers.from,
    to: suppliers.to
  }

  const breadcrumbsItems = [
    { title: 'หน้าหลัก', url: route('dashboard') },
    { title: 'ซัพพลายเออร์', url: undefined }
  ]

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="page-header d-print-none">
          <div className="container-xl">
            <div className="page-pretitle">รายการ</div>
            <h2 className="page-title">ซัพพลายเออร์</h2>
          </div>
        </div>
      }
    >
      <Head title="ซัพพลายเออร์" />
      
      <div className="page-body">
        <div className="container-xl">
          <Breadcrumbs items={breadcrumbsItems} />
          
          <DataTable
            data={suppliers.data}
            columns={columns}
            pagination={pagination}
            onSearch={handleSearch}
            onPerPageChange={handlePerPageChange}
            onSort={handleSort}
            sortField={filters.field}
            sortDirection={filters.direction}
            loading={loading}
            title="รายการซัพพลายเออร์"
            actions={tableActions}
          />
        </div>
      </div>
    </AuthenticatedLayout>
  )
} 