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

interface DailyReportProps extends PageProps {
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
  today: string
  total_amount: number
}

export default function DailyReport({ auth, purchases, filters, today, total_amount }: DailyReportProps) {
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
      route('purchases.dailyPurchaseReport'),
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
      route('purchases.dailyPurchaseReport'),
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
      route('purchases.dailyPurchaseReport'),
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
      <Link href={route('purchases.approvedPurchases')} className="btn">
        รายการที่อนุมัติแล้ว
      </Link>
      <Link href={route('purchases.dailyPurchaseReport')} className="btn active">
        รายงานประจำวัน
      </Link>
      <Link href={route('purchases.getPurchaseReport')} className="btn">
        ออกรายงาน
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
    { title: 'รายงานประจำวัน', url: undefined }
  ]

  // สร้างปุ่มสำหรับส่วนหัว
  const tableActions = (
    <Link 
      href={route('purchases.getPurchaseReport')}
      className="btn btn-primary d-none d-sm-inline-block"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-download" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" />
        <path d="M7 11l5 5l5 -5" />
        <path d="M12 4l0 12" />
      </svg>
      ออกรายงาน
    </Link>
  )

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="row g-2 align-items-center">
          <div className="col">
            <div className="page-pretitle">ระบบจัดการ</div>
            <h2 className="page-title">รายงานการสั่งซื้อประจำวัน</h2>
          </div>
          <div className="col-auto ms-auto">
            <div className="btn-list">
              {tableActions}
            </div>
          </div>
        </div>
      }
    >
      <Head title="รายงานการสั่งซื้อประจำวัน" />
      
      <div className="page-body">
        <div className="container-xl">
          <Breadcrumbs items={breadcrumbsItems} />
          
          {tabs}

          <div className="row mb-4">
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex align-items-center mb-3">
                    <div className="subheader">วันที่</div>
                  </div>
                  <div className="h3 mb-3">{new Date(today).toLocaleDateString('th-TH', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex align-items-center mb-3">
                    <div className="subheader">ยอดรวมการสั่งซื้อวันนี้</div>
                  </div>
                  <div className="h3 mb-3">฿{(total_amount / 100).toLocaleString('th-TH', { minimumFractionDigits: 2 })}</div>
                </div>
              </div>
            </div>
          </div>
          
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
            title={`รายงานการสั่งซื้อประจำวันที่ ${new Date(today).toLocaleDateString('th-TH')}`}
          />
        </div>
      </div>
    </AuthenticatedLayout>
  )
} 