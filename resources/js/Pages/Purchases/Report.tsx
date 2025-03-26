import { useState, FormEvent } from 'react'
import { Head, Link, router, useForm } from '@inertiajs/react'
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

interface ReportProps extends PageProps {
  purchases: {
    data: Purchase[]
    total: number
    current_page: number
    per_page: number
    links: Array<{ url: string | null; label: string; active: boolean }>
    from: number
    to: number
  } | null
  filters: {
    search: string
    perPage: number
    field: string
    direction: 'asc' | 'desc'
    start_date: string
    end_date: string
  }
  total_amount: number | null
  start_date: string | null
  end_date: string | null
}

export default function Report({ auth, purchases, filters, total_amount, start_date, end_date }: ReportProps) {
  const [loading, setLoading] = useState(false)
  
  // สำหรับฟอร์มค้นหา
  const { data, setData, post, processing, errors } = useForm({
    start_date: start_date || '',
    end_date: end_date || ''
  })

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

  // จัดการการส่งฟอร์ม
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    post(route('purchases.getPurchaseReport'), {
      preserveState: true,
      preserveScroll: true,
      onSuccess: () => setLoading(false)
    })
  }

  // จัดการค้นหา
  const handleSearch = (value: string) => {
    if (!purchases) return
    
    setLoading(true)
    router.get(
      route('purchases.getPurchaseReport'),
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
    if (!purchases) return
    
    setLoading(true)
    router.get(
      route('purchases.getPurchaseReport'),
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
    if (!purchases) return
    
    setLoading(true)
    
    const direction = field === filters.field && filters.direction === 'asc' ? 'desc' : 'asc'
    
    router.get(
      route('purchases.getPurchaseReport'),
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
      <Link href={route('purchases.dailyPurchaseReport')} className="btn">
        รายงานประจำวัน
      </Link>
      <Link href={route('purchases.getPurchaseReport')} className="btn active">
        ออกรายงาน
      </Link>
    </div>
  )

  // การจัดรูปแบบข้อมูลการแบ่งหน้าสำหรับ DataTable เมื่อมีข้อมูล
  const pagination = purchases ? {
    total: purchases.total,
    currentPage: purchases.current_page,
    perPage: purchases.per_page,
    links: purchases.links,
    from: purchases.from,
    to: purchases.to
  } : undefined

  const breadcrumbsItems = [
    { title: 'หน้าหลัก', url: route('dashboard') },
    { title: 'รายการสั่งซื้อ', url: route('purchases.index') },
    { title: 'ออกรายงาน', url: undefined }
  ]

  // สร้างปุ่มสำหรับส่วนหัว
  const tableActions = purchases && start_date && end_date && (
    <Link 
      href={route('purchases.exportPurchaseReport', { start_date, end_date })}
      className="btn btn-primary d-none d-sm-inline-block"
      target="_blank"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-file-export" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M14 3v4a1 1 0 0 0 1 1h4" />
        <path d="M11.5 21h-4.5a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v5m-5 6h7m-3 -3l3 3l-3 3" />
      </svg>
      ส่งออก Excel
    </Link>
  )

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="page-header d-print-none">
          <div className="container-xl">
            <div className="page-pretitle">ระบบจัดการ</div>
            <h2 className="page-title">ออกรายงานการสั่งซื้อ</h2>
          </div>
          <div className="col-auto ms-auto">
            <div className="btn-list">
              {tableActions}
            </div>
          </div>
        </div>
      }
    >
      <Head title="ออกรายงานการสั่งซื้อ" />
      
      <div className="page-body">
        <div className="container-xl">
          <Breadcrumbs items={breadcrumbsItems} />
          
          {tabs}
          
          <div className="card mb-4">
            <div className="card-header">
              <h3 className="card-title">เลือกช่วงเวลา</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-5">
                    <div className="mb-3">
                      <label className="form-label required">วันที่เริ่มต้น</label>
                      <input 
                        type="date" 
                        className={`form-control ${errors.start_date ? 'is-invalid' : ''}`}
                        value={data.start_date}
                        onChange={(e) => setData('start_date', e.target.value)}
                        required
                      />
                      {errors.start_date && (
                        <div className="invalid-feedback">{errors.start_date}</div>
                      )}
                    </div>
                  </div>
                  <div className="col-md-5">
                    <div className="mb-3">
                      <label className="form-label required">วันที่สิ้นสุด</label>
                      <input 
                        type="date" 
                        className={`form-control ${errors.end_date ? 'is-invalid' : ''}`}
                        value={data.end_date}
                        onChange={(e) => setData('end_date', e.target.value)}
                        required
                      />
                      {errors.end_date && (
                        <div className="invalid-feedback">{errors.end_date}</div>
                      )}
                    </div>
                  </div>
                  <div className="col-md-2">
                    <div className="mb-3 d-flex align-items-end">
                      <label className="form-label">&nbsp;</label>
                      <button 
                        type="submit" 
                        className="btn btn-primary w-100" 
                        disabled={processing || loading}
                      >
                        {processing || loading ? 'กำลังค้นหา...' : 'ค้นหา'}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          
          {purchases && start_date && end_date && (
            <>
              <div className="row mb-4">
                <div className="col-md-6">
                  <div className="card">
                    <div className="card-body">
                      <div className="d-flex align-items-center mb-3">
                        <div className="subheader">ช่วงเวลา</div>
                      </div>
                      <div className="h3 mb-3">
                        {new Date(start_date).toLocaleDateString('th-TH')} - {new Date(end_date).toLocaleDateString('th-TH')}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card">
                    <div className="card-body">
                      <div className="d-flex align-items-center mb-3">
                        <div className="subheader">ยอดรวมการสั่งซื้อในช่วงเวลาที่เลือก</div>
                      </div>
                      <div className="h3 mb-3">฿{(total_amount! / 100).toLocaleString('th-TH', { minimumFractionDigits: 2 })}</div>
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
                title={`รายงานการสั่งซื้อ ${new Date(start_date).toLocaleDateString('th-TH')} - ${new Date(end_date).toLocaleDateString('th-TH')}`}
              />
            </>
          )}
          
          {!purchases && (
            <div className="empty">
              <div className="empty-img">
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-search" width="50" height="50" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"></path>
                  <path d="M21 21l-6 -6"></path>
                </svg>
              </div>
              <p className="empty-title">โปรดเลือกช่วงเวลาที่ต้องการดูรายงาน</p>
              <p className="empty-subtitle text-muted">
                เลือกวันที่เริ่มต้นและวันที่สิ้นสุดเพื่อดูรายงานการสั่งซื้อในช่วงเวลาที่ต้องการ
              </p>
            </div>
          )}
        </div>
      </div>
    </AuthenticatedLayout>
  )
} 