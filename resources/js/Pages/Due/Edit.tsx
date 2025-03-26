import { FormEvent } from 'react'
import { Head, useForm, Link } from '@inertiajs/react'
import { PageProps } from '@/types'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import Breadcrumbs from '@/Components/Breadcrumbs'

interface Customer {
  id: number
  name: string
  email: string
  phone: string
  address: string
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
  created_at: string
  updated_at: string
  customer: Customer
}

interface EditProps extends PageProps {
  order: Order
}

export default function Edit({ auth, order }: EditProps) {
  const { data, setData, post, errors, processing } = useForm({
    _method: 'PUT',
    pay: 0
  })

  const maxAmount = order.due / 100

  const breadcrumbsItems = [
    { title: 'หน้าหลัก', url: route('dashboard') },
    { title: 'รายการค้างชำระ', url: route('due.index') },
    { title: order.invoice_no, url: route('due.show', order.id) },
    { title: 'ชำระเงิน', url: undefined }
  ]

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    post(route('due.update', order.id))
  }

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="page-header d-print-none">
          <div className="container-xl">
            <h2 className="page-title">ชำระเงินค้างชำระ</h2>
          </div>
        </div>
      }
    >
      <Head title={`ชำระเงินค้างชำระ: ${order.invoice_no}`} />

      <div className="page-body">
        <div className="container-xl">
          <Breadcrumbs items={breadcrumbsItems} />

          <div className="row row-cards">
            <div className="col-lg-4">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">ข้อมูลการสั่งซื้อ</h3>
                </div>
                <div className="card-body">
                  <div className="mb-2">
                    <strong className="me-1">เลขที่ใบแจ้งหนี้:</strong>
                    {order.invoice_no}
                  </div>
                  <div className="mb-2">
                    <strong className="me-1">วันที่สั่งซื้อ:</strong>
                    {new Date(order.order_date).toLocaleDateString('th-TH')}
                  </div>
                  <div className="mb-2">
                    <strong className="me-1">ลูกค้า:</strong>
                    <Link href={route('customers.show', order.customer_id)}>
                      {order.customer.name}
                    </Link>
                  </div>
                  <div className="mb-2">
                    <strong className="me-1">ยอดรวมทั้งสิ้น:</strong>
                    ฿{(order.total / 100).toLocaleString('th-TH', { minimumFractionDigits: 2 })}
                  </div>
                  <div className="mb-2">
                    <strong className="me-1">ชำระแล้ว:</strong>
                    ฿{(order.pay / 100).toLocaleString('th-TH', { minimumFractionDigits: 2 })}
                  </div>
                  <div className="mb-2">
                    <strong className="me-1">ยอดค้างชำระ:</strong>
                    <span className="text-danger">฿{(order.due / 100).toLocaleString('th-TH', { minimumFractionDigits: 2 })}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-8">
              <form onSubmit={handleSubmit}>
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">ชำระเงิน</h3>
                  </div>
                  <div className="card-body">
                    <div className="mb-3">
                      <label className="form-label required" htmlFor="pay">จำนวนเงินที่ต้องการชำระ</label>
                      <div className="input-group">
                        <span className="input-group-text">฿</span>
                        <input
                          id="pay"
                          type="number"
                          className={`form-control ${errors.pay ? 'is-invalid' : ''}`}
                          value={data.pay}
                          onChange={(e) => setData('pay', parseFloat(e.target.value))}
                          required
                          min="0.01"
                          max={maxAmount}
                          step="0.01"
                          placeholder={`ยอดค้างชำระทั้งหมด ${maxAmount.toLocaleString('th-TH', { minimumFractionDigits: 2 })} บาท`}
                        />
                        {errors.pay && <div className="invalid-feedback">{errors.pay}</div>}
                      </div>
                      <small className="form-hint">ระบุจำนวนเงินที่ต้องการชำระ (สูงสุด {maxAmount.toLocaleString('th-TH', { minimumFractionDigits: 2 })} บาท)</small>
                    </div>
                    
                    <div className="form-footer">
                      <div className="row">
                        <div className="col">
                          <Link href={route('due.show', order.id)} className="btn btn-outline-secondary w-100">
                            ยกเลิก
                          </Link>
                        </div>
                        <div className="col">
                          <button type="submit" className="btn btn-primary w-100" disabled={processing || data.pay <= 0 || data.pay > maxAmount}>
                            {processing ? 'กำลังบันทึก...' : 'บันทึกการชำระเงิน'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  )
} 