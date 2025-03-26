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
  order_status: {
    value: number
    label: string
  }
  total_products: number
  sub_total: number
  vat: number
  total: number
  payment_type: string
  pay: number
  due: number
  customer: Customer
}

interface OrdersProps extends PageProps {
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

export default function Index({ auth, orders, filters }: OrdersProps) {
  const [loading, setLoading] = useState(false)

  // คอลัมน์ตาราง
  const columns = [
    {
      field: 'invoice_no',
      label: 'เลขที่ใบสั่งซื้อ',
      sortable: true,
      render: (order: Order) => (
        <Link href={route('orders.show', order.id)} className="text-decoration-none">
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
      field: 'total_products',
      label: 'รายการ',
      sortable: true
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
      field: 'order_status',
      label: 'สถานะ',
      sortable: true,
      render: (order: Order) => {
        const statusClass = order.order_status.value === 0 
          ? 'badge bg-warning me-1' 
          : 'badge bg-success me-1'
        
        return <span className={statusClass}>{order.order_status.label}</span>
      }
    },
    {
      field: 'actions',
      label: 'จัดการ',
      className: 'w-1',
      render: (order: Order) => (
        <div className="btn-list">
          <Link 
            href={route('orders.show', order.id)} 
            className="btn btn-sm"
          >
            ดู
          </Link>
          {order.order_status.value === 0 && (
            <Link 
              href={route('orders.edit', order.id)} 
              className="btn btn-sm btn-primary"
            >
              แก้ไข
            </Link>
          )}
          <Link 
            href={route('orders.invoice.download', order.id)} 
            className="btn btn-sm btn-info"
            target="_blank"
          >
            พิมพ์
          </Link>
        </div>
      )
    }
  ]

  // จัดการค้นหา
  const handleSearch = (value: string) => {
    setLoading(true)
    router.get(
      route('orders.index'),
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
      route('orders.index'),
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
      route('orders.index'),
      { ...filters, field, direction },
      {
        preserveState: true,
        preserveScroll: true,
        onSuccess: () => setLoading(false)
      }
    )
  }

  // ปุ่มสำหรับใส่ใน actions ของ DataTable
  const tableActions = (
    <>
      <Link 
        href={route('orders.create')}
        className="btn btn-primary d-none d-sm-inline-block"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <path d="M12 5l0 14" />
          <path d="M5 12l14 0" />
        </svg>
        สร้างคำสั่งซื้อใหม่
      </Link>
      <Link 
        href={route('orders.create')}
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

  // หน้าใหม่
  const tabs = (
    <div className="d-flex mt-2 mb-3">
      <Link href={route('orders.index')} className="btn active">
        รายการทั้งหมด
      </Link>
      <Link href={route('orders.pending')} className="btn">
        รออนุมัติ
      </Link>
      <Link href={route('orders.complete')} className="btn">
        เสร็จสิ้น
      </Link>
      <Link href={route('due.index')} className="btn">
        ค้างชำระ
      </Link>
    </div>
  )

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
    { title: 'รายการสั่งซื้อ', url: undefined }
  ]

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="page-header d-print-none">
          <div className="container-xl">
            <div className="page-pretitle">รายการ</div>
            <h2 className="page-title">รายการสั่งซื้อ</h2>
          </div>
        </div>
      }
    >
      <Head title="รายการสั่งซื้อ" />
      
      <div className="page-body">
        <div className="container-xl">
          <Breadcrumbs items={breadcrumbsItems} />
          
          {tabs}

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
            title="รายการคำสั่งซื้อ"
            actions={tableActions}
          />
        </div>
      </div>
    </AuthenticatedLayout>
  )
} 