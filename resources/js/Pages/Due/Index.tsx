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

interface Order {
  id: number
  invoice_no: string
  customer_id: number
  order_date: string
  total_products: number
  sub_total: number
  vat: number
  total: number
  pay: number
  due: number
  order_status: number
  customer: Customer
}

interface DueOrdersProps extends PageProps {
  orders: {
    data: Order[]
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

export default function Index({ auth, orders, filters }: DueOrdersProps) {
  const [loading, setLoading] = useState(false)

  // คอลัมน์ตาราง
  const columns = [
    {
      field: 'invoice_no',
      label: 'เลขที่ใบแจ้งหนี้',
      sortable: true,
      render: (order: Order) => (
        <Link href={route('due.show', order.id)} className="text-decoration-none">
          {order.invoice_no}
        </Link>
      )
    },
    {
      field: 'customer.name',
      label: 'ลูกค้า',
      sortable: true,
      render: (order: Order) => (
        <Link href={route('customers.show', order.customer_id)} className="text-decoration-none">
          {order.customer.name}
        </Link>
      )
    },
    {
      field: 'order_date',
      label: 'วันที่',
      sortable: true,
      render: (order: Order) => (
        <span>{new Date(order.order_date).toLocaleDateString('th-TH')}</span>
      )
    },
    {
      field: 'total',
      label: 'ยอดรวม',
      sortable: true,
      render: (order: Order) => (
        <span>฿{(order.total / 100).toLocaleString('th-TH', { minimumFractionDigits: 2 })}</span>
      )
    },
    {
      field: 'pay',
      label: 'ชำระแล้ว',
      sortable: true,
      render: (order: Order) => (
        <span>฿{(order.pay / 100).toLocaleString('th-TH', { minimumFractionDigits: 2 })}</span>
      )
    },
    {
      field: 'due',
      label: 'ค้างชำระ',
      sortable: true,
      render: (order: Order) => (
        <span className="text-danger">฿{(order.due / 100).toLocaleString('th-TH', { minimumFractionDigits: 2 })}</span>
      )
    },
    {
      field: 'actions',
      label: 'จัดการ',
      className: 'w-1',
      render: (order: Order) => (
        <div className="btn-list">
          <Link 
            href={route('due.show', order.id)} 
            className="btn btn-sm"
          >
            ดู
          </Link>
          <Link 
            href={route('due.edit', order.id)} 
            className="btn btn-sm btn-primary"
          >
            ชำระเงิน
          </Link>
        </div>
      )
    }
  ]

  // จัดการค้นหา
  const handleSearch = (value: string) => {
    setLoading(true)
    router.get(
      route('due.index'),
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
      route('due.index'),
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
      route('due.index'),
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
    total: orders.total,
    currentPage: orders.current_page,
    perPage: orders.per_page,
    links: orders.links,
    from: orders.from,
    to: orders.to
  }

  const breadcrumbsItems = [
    { title: 'หน้าหลัก', url: route('dashboard') },
    { title: 'รายการค้างชำระ', url: undefined }
  ]

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="page-header d-print-none">
          <div className="container-xl">
            <div className="page-pretitle">รายการ</div>
            <h2 className="page-title">รายการค้างชำระ</h2>
          </div>
        </div>
      }
    >
      <Head title="รายการค้างชำระ" />
      
      <div className="page-body">
        <div className="container-xl">
          <Breadcrumbs items={breadcrumbsItems} />
          
          <DataTable
            data={orders.data}
            columns={columns}
            pagination={pagination}
            onSearch={handleSearch}
            onPerPageChange={handlePerPageChange}
            onSort={handleSort}
            sortField={filters.field}
            sortDirection={filters.direction}
            loading={loading}
            title="รายการค้างชำระ"
          />
        </div>
      </div>
    </AuthenticatedLayout>
  )
} 