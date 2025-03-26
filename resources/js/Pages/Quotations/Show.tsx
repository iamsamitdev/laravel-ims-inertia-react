import { Head, Link } from '@inertiajs/react'
import { PageProps } from '@/types'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import Breadcrumbs from '@/Components/Breadcrumbs'

interface QuotationItem {
  id: number
  product_id: number
  product_name: string
  unit_price: number
  quantity: number
  total_price: number
}

interface Customer {
  id: number
  name: string
  email: string
  phone: string
  address: string
}

interface Quotation {
  id: number
  reference: string
  date: string
  due_date: string
  customer_id: number
  customer: Customer
  total_amount: number
  discount_amount: number
  tax_amount: number
  grand_total: number
  notes: string
  terms: string
  status: number
  items: QuotationItem[]
}

interface ShowProps extends PageProps {
  quotation: Quotation
}

export default function Show({ auth, quotation }: ShowProps) {
  // แปลงสถานะเป็นข้อความ
  const getStatusText = (status: number) => {
    switch (status) {
      case 0: return 'ร่าง'
      case 1: return 'ส่งแล้ว'
      case 2: return 'ขายแล้ว'
      case 3: return 'ยกเลิก'
      default: return 'ไม่ระบุ'
    }
  }

  // แปลงสถานะเป็น CSS class
  const getStatusClass = (status: number) => {
    switch (status) {
      case 0: return 'badge bg-secondary'
      case 1: return 'badge bg-primary'
      case 2: return 'badge bg-success'
      case 3: return 'badge bg-danger'
      default: return 'badge bg-secondary'
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('th-TH')
  }

  const formatCurrency = (amount: number) => {
    return (amount / 100).toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  }

  const breadcrumbsItems = [
    { title: 'หน้าหลัก', url: route('dashboard') },
    { title: 'ใบเสนอราคา', url: route('quotations.index') },
    { title: 'รายละเอียด', url: undefined }
  ]

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="page-header d-print-none">
          <div className="container-xl">
            <div className="page-pretitle">รายละเอียด</div>
            <h2 className="page-title">ใบเสนอราคา #{quotation.reference}</h2>
          </div>
          <div className="col-auto ms-auto d-print-none">
            <div className="btn-list">
              <button
                className="btn btn-ghost-primary d-none d-sm-inline-block"
                onClick={() => window.print()}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-printer" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M17 17h2a2 2 0 0 0 2 -2v-4a2 2 0 0 0 -2 -2h-14a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h2"></path>
                  <path d="M17 9v-4a2 2 0 0 0 -2 -2h-6a2 2 0 0 0 -2 2v4"></path>
                  <path d="M7 13m0 2a2 2 0 0 1 2 -2h6a2 2 0 0 1 2 2v4a2 2 0 0 1 -2 2h-6a2 2 0 0 1 -2 -2z"></path>
                </svg>
                พิมพ์ใบเสนอราคา
              </button>
              {quotation.status !== 2 && quotation.status !== 3 && (
                <Link
                  href={route('quotations.edit', quotation.id)}
                  className="btn btn-primary d-none d-sm-inline-block"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-edit" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1"></path>
                    <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z"></path>
                    <path d="M16 5l3 3"></path>
                  </svg>
                  แก้ไข
                </Link>
              )}
              {quotation.status === 1 && (
                <Link
                  href={route('quotations.convert-to-sale', quotation.id)}
                  className="btn btn-success d-none d-sm-inline-block"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-shopping-cart" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
                    <path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
                    <path d="M17 17h-11v-14h-2"></path>
                    <path d="M6 5l14 1l-1 7h-13"></path>
                  </svg>
                  แปลงเป็นรายการขาย
                </Link>
              )}
            </div>
          </div>
        </div>
      }
    >
      <Head title={`ใบเสนอราคา #${quotation.reference}`} />
      
      <div className="page-body">
        <div className="container-xl">
          <Breadcrumbs items={breadcrumbsItems} />
          
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">รายละเอียดใบเสนอราคา</h3>
              <div className="card-actions">
                <span className={getStatusClass(quotation.status)}>
                  {getStatusText(quotation.status)}
                </span>
              </div>
            </div>
            <div className="card-body">
              <div className="row mb-4">
                <div className="col-md-6">
                  <h4>ข้อมูลลูกค้า</h4>
                  <address>
                    <strong>{quotation.customer.name}</strong><br />
                    อีเมล: {quotation.customer.email}<br />
                    โทร: {quotation.customer.phone}<br />
                    ที่อยู่: {quotation.customer.address}
                  </address>
                </div>
                <div className="col-md-6 text-md-end">
                  <h4>รายละเอียดใบเสนอราคา</h4>
                  <p>
                    <strong>เลขที่อ้างอิง:</strong> {quotation.reference}<br />
                    <strong>วันที่:</strong> {formatDate(quotation.date)}<br />
                    <strong>วันที่หมดอายุ:</strong> {formatDate(quotation.due_date)}<br />
                  </p>
                </div>
              </div>
              
              <div className="table-responsive">
                <table className="table table-vcenter card-table">
                  <thead>
                    <tr>
                      <th style={{ width: '50px' }}>ลำดับ</th>
                      <th>สินค้า</th>
                      <th className="text-end" style={{ width: '100px' }}>ราคาต่อหน่วย</th>
                      <th className="text-center" style={{ width: '100px' }}>จำนวน</th>
                      <th className="text-end" style={{ width: '150px' }}>ยอดรวม</th>
                    </tr>
                  </thead>
                  <tbody>
                    {quotation.items.map((item, index) => (
                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>{item.product_name}</td>
                        <td className="text-end">฿{formatCurrency(item.unit_price)}</td>
                        <td className="text-center">{item.quantity}</td>
                        <td className="text-end">฿{formatCurrency(item.total_price)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan={4} className="text-end"><strong>ยอดรวม:</strong></td>
                      <td className="text-end">฿{formatCurrency(quotation.total_amount)}</td>
                    </tr>
                    {quotation.discount_amount > 0 && (
                      <tr>
                        <td colSpan={4} className="text-end"><strong>ส่วนลด:</strong></td>
                        <td className="text-end">-฿{formatCurrency(quotation.discount_amount)}</td>
                      </tr>
                    )}
                    <tr>
                      <td colSpan={4} className="text-end"><strong>ภาษีมูลค่าเพิ่ม (7%):</strong></td>
                      <td className="text-end">฿{formatCurrency(quotation.tax_amount)}</td>
                    </tr>
                    <tr>
                      <td colSpan={4} className="text-end"><strong>ยอดรวมสุทธิ:</strong></td>
                      <td className="text-end"><strong>฿{formatCurrency(quotation.grand_total)}</strong></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
              
              {quotation.notes && (
                <div className="mt-4">
                  <h4>หมายเหตุ</h4>
                  <p>{quotation.notes}</p>
                </div>
              )}
              
              {quotation.terms && (
                <div className="mt-4">
                  <h4>เงื่อนไขและข้อตกลง</h4>
                  <p>{quotation.terms}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  )
} 