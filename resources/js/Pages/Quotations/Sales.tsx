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
  order_id?: number
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

export default function Sales({ auth, quotations, filters }: QuotationsProps) {
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
      field: 'actions',
      label: 'จัดการ',
      className: 'w-1',
      render: (quotation: Quotation) => (
        <div className="btn-list">
          <Link 
            href={route('quotations.show', quotation.id)} 
            className="btn btn-sm"
          >
            ดูใบเสนอราคา
          </Link>
          {quotation.order_id && (
            <Link 
              href={route('orders.show', quotation.order_id)} 
              className="btn btn-sm btn-success"
            >
              ดูออเดอร์
            </Link>
          )}
        </div>
      )
    }
  ]

  // จัดการค้นหา
  const handleSearch = (value: string) => {
    setLoading(true)
    router.get(
      route('quotations.sales'),
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
      route('quotations.sales'),
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
      route('quotations.sales'),
      { ...filters, field, direction },
      {
        preserveState: true,
        preserveScroll: true,
        onSuccess: () => setLoading(false)
      }
    )
  }

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
    { title: 'ใบเสนอราคา', url: route('quotations.index') },
    { title: 'ใบเสนอราคาที่ขายแล้ว', url: undefined }
  ]

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="page-header d-print-none">
          <div className="container-xl">
            <div className="page-pretitle">รายการ</div>
            <h2 className="page-title">ใบเสนอราคาที่ขายแล้ว</h2>
          </div>
        </div>
      }
    >
      <Head title="ใบเสนอราคาที่ขายแล้ว" />
      
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
            title="รายการใบเสนอราคาที่ขายแล้ว"
          />
        </div>
      </div>
    </AuthenticatedLayout>
  )
} 