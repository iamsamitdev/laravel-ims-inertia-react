import { useState } from 'react'
import { Head, Link, router } from '@inertiajs/react'
import { PageProps } from '@/types'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import DataTable from '@/Components/Table/DataTable'
import Breadcrumbs from '@/Components/Breadcrumbs'

interface Supplier {
  id: number
  name: string
}

interface Purchase {
  id: number
  reference_no: string
  supplier_id: number
  purchase_date: string
  total_amount: number
  paid_amount: number
  due_amount: number
  purchase_status: {
    value: number
    label: string
  }
  payment_status: {
    value: number
    label: string
  }
  supplier: Supplier
}

interface ApprovedProps extends PageProps {
  purchases: {
    data: Purchase[]
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

export default function Approved({ auth, purchases, filters }: ApprovedProps) {
  const [loading, setLoading] = useState(false)

  // คอลัมน์ตาราง
  const columns = [
    {
      field: 'reference_no',
      label: 'เลขที่อ้างอิง',
      sortable: true,
      render: (purchase: Purchase) => (
        <Link href={route('purchases.show', purchase.id)} className="text-decoration-none">
          {purchase.reference_no}
        </Link>
      )
    },
    {
      field: 'supplier.name',
      label: 'ซัพพลายเออร์',
      sortable: true,
      render: (purchase: Purchase) => (
        <Link href={route('suppliers.show', purchase.supplier_id)} className="text-decoration-none">
          {purchase.supplier.name}
        </Link>
      )
    },
    {
      field: 'purchase_date',
      label: 'วันที่',
      sortable: true,
      render: (purchase: Purchase) => (
        <span>{new Date(purchase.purchase_date).toLocaleDateString('th-TH')}</span>
      )
    },
    {
      field: 'total_amount',
      label: 'ยอดรวม',
      sortable: true,
      render: (purchase: Purchase) => (
        <span>฿{(purchase.total_amount / 100).toLocaleString('th-TH', { minimumFractionDigits: 2 })}</span>
      )
    },
    {
      field: 'payment_status',
      label: 'สถานะการชำระเงิน',
      sortable: true,
      render: (purchase: Purchase) => {
        let statusClass
        
        switch (purchase.payment_status.value) {
          case 0: // ยังไม่ชำระ
            statusClass = 'badge bg-danger me-1'
            break
          case 1: // ชำระบางส่วน
            statusClass = 'badge bg-warning me-1'
            break
          case 2: // ชำระแล้ว
            statusClass = 'badge bg-success me-1'
            break
          default:
            statusClass = 'badge me-1'
        }
        
        return <span className={statusClass}>{purchase.payment_status.label}</span>
      }
    },
    {
      field: 'actions',
      label: 'จัดการ',
      className: 'w-1',
      render: (purchase: Purchase) => (
        <div className="btn-list">
          <Link 
            href={route('purchases.show', purchase.id)} 
            className="btn btn-sm"
          >
            ดู
          </Link>
          <Link 
            href={route('purchases.print', purchase.id)} 
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
      route('purchases.approvedPurchases'),
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
      route('purchases.approvedPurchases'),
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
      route('purchases.approvedPurchases'),
      { ...filters, field, direction },
      {
        preserveState: true,
        preserveScroll: true,
        onSuccess: () => setLoading(false)
      }
    )
  }

  // หน้าใหม่
  const tabs = (
    <div className="d-flex mt-2 mb-3">
      <Link href={route('purchases.index')} className="btn">
        รายการทั้งหมด
      </Link>
      <Link href={route('purchases.approvedPurchases')} className="btn active">
        รายการที่อนุมัติแล้ว
      </Link>
      <Link href={route('purchases.dailyPurchaseReport')} className="btn">
        รายงานประจำวัน
      </Link>
    </div>
  )

  // การจัดรูปแบบข้อมูลการแบ่งหน้าสำหรับ DataTable
  const pagination = {
    total: purchases.total,
    currentPage: purchases.current_page,
    perPage: purchases.per_page,
    links: purchases.links,
    from: purchases.from,
    to: purchases.to
  }

  const breadcrumbsItems = [
    { title: 'หน้าหลัก', url: route('dashboard') },
    { title: 'รายการสั่งซื้อ', url: route('purchases.index') },
    { title: 'รายการที่อนุมัติแล้ว', url: undefined }
  ]

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="page-header d-print-none">
          <div className="container-xl">
            <div className="page-pretitle">ระบบจัดการ</div>
            <h2 className="page-title">รายการสั่งซื้อที่อนุมัติแล้ว</h2>
          </div>
        </div>
      }
    >
      <Head title="รายการสั่งซื้อที่อนุมัติแล้ว" />
      
      <div className="page-body">
        <div className="container-xl">
          <Breadcrumbs items={breadcrumbsItems} />
          
          {tabs}
          
          <DataTable
            data={purchases.data}
            columns={columns}
            pagination={pagination}
            onSearch={handleSearch}
            onPerPageChange={handlePerPageChange}
            onSort={handleSort}
            sortField={filters.field}
            sortDirection={filters.direction}
            loading={loading}
            title="รายการสั่งซื้อที่อนุมัติแล้ว"
          />
        </div>
      </div>
    </AuthenticatedLayout>
  )
} 