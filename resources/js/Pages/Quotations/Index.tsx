import { useState } from 'react'
import { Head, Link, router } from '@inertiajs/react'
import { PageProps } from '@/types'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import DataTable from '@/Components/Table/DataTable'
import Breadcrumbs from '@/Components/Breadcrumbs'

interface Customer {
  id: number
  name: string
}

interface Quotation {
  id: number
  reference: string
  date: string
  customer_name: string
  total_amount: number
  status: number
  customer: Customer
}

interface QuotationsProps extends PageProps {
  quotations: {
    data: Quotation[]
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

export default function Index({ auth, quotations, filters }: QuotationsProps) {
  const [loading, setLoading] = useState(false)

  // คอลัมน์ตาราง
  const columns = [
    {
      field: 'reference',
      label: 'เลขที่อ้างอิง',
      sortable: true
    },
    {
      field: 'date',
      label: 'วันที่',
      sortable: true,
      render: (quotation: Quotation) => {
        const date = new Date(quotation.date)
        return date.toLocaleDateString('th-TH')
      }
    },
    {
      field: 'customer_name',
      label: 'ลูกค้า',
      sortable: true
    },
    {
      field: 'total_amount',
      label: 'ยอดรวม',
      sortable: true,
      render: (quotation: Quotation) => (
        <span>฿{(quotation.total_amount / 100).toLocaleString('th-TH')}</span>
      )
    },
    {
      field: 'status',
      label: 'สถานะ',
      sortable: true,
      render: (quotation: Quotation) => {
        let statusClass = ''
        let statusText = ''
        
        switch (quotation.status) {
          case 0:
            statusClass = 'badge bg-secondary'
            statusText = 'ร่าง'
            break
          case 1:
            statusClass = 'badge bg-primary'
            statusText = 'ส่งแล้ว'
            break
          case 2:
            statusClass = 'badge bg-success'
            statusText = 'ขายแล้ว'
            break
          case 3:
            statusClass = 'badge bg-danger'
            statusText = 'ยกเลิก'
            break
          default:
            statusClass = 'badge bg-secondary'
            statusText = 'ไม่ระบุ'
        }
        
        return <span className={statusClass}>{statusText}</span>
      }
    },
    {
      field: 'actions',
      label: 'จัดการ',
      className: 'w-1',
      render: (quotation: Quotation) => (
        <div className="btn-list">
          <Link 
            href={route('quotations.show', quotation.id)} 
            className="btn btn-sm"
          >
            ดู
          </Link>
          <Link 
            href={route('quotations.edit', quotation.id)} 
            className="btn btn-sm btn-primary"
          >
            แก้ไข
          </Link>
          <button 
            onClick={() => handleDelete(quotation.id)}
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
      route('quotations.index'),
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
      route('quotations.index'),
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
      route('quotations.index'),
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
    if (confirm('คุณแน่ใจหรือไม่ที่จะลบใบเสนอราคานี้?')) {
      router.delete(route('quotations.destroy', id), {
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
        href={route('quotations.sales')}
        className="btn btn-info me-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2" />
          <path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" />
          <path d="M9 12l6 0" />
          <path d="M9 16l6 0" />
        </svg>
        ใบเสนอราคาที่ขายแล้ว
      </Link>
      <Link 
        href={route('quotations.create')}
        className="btn btn-primary"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <path d="M12 5l0 14" />
          <path d="M5 12l14 0" />
        </svg>
        สร้างใบเสนอราคาใหม่
      </Link>
      <Link 
        href={route('quotations.create')}
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
    total: quotations.total,
    currentPage: quotations.current_page,
    perPage: quotations.per_page,
    links: quotations.links,
    from: quotations.from,
    to: quotations.to
  }

  const breadcrumbsItems = [
    { title: 'หน้าหลัก', url: route('dashboard') },
    { title: 'ใบเสนอราคา', url: undefined }
  ]

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="page-header d-print-none">
          <div className="container-xl">
            <div className="page-pretitle">รายการ</div>
            <h2 className="page-title">ใบเสนอราคา</h2>
          </div>
        </div>
      }
    >
      <Head title="ใบเสนอราคา" />
      
      <div className="page-body">
        <div className="container-xl">
          <Breadcrumbs items={breadcrumbsItems} />
          
          <DataTable
            data={quotations.data}
            columns={columns}
            pagination={pagination}
            onSearch={handleSearch}
            onPerPageChange={handlePerPageChange}
            onSort={handleSort}
            sortField={filters.field}
            sortDirection={filters.direction}
            loading={loading}
            title="รายการใบเสนอราคา"
            actions={tableActions}
          />
        </div>
      </div>
    </AuthenticatedLayout>
  )
} 