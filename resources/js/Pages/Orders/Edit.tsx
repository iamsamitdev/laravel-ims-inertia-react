import { FormEvent, useEffect, useState } from 'react'
import { Head, Link, router, useForm } from '@inertiajs/react'
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

interface Product {
  id: number
  name: string
  code: string
  selling_price: number
  stock: number
}

interface OrderDetail {
  id: number
  order_id: number
  product_id: number
  quantity: number
  unitcost: number
  total: number
  product: Product
}

interface Order {
  id: number
  invoice_no: string
  customer_id: number
  order_date: string
  payment_type: string
  sub_total: number
  vat: number
  total: number
  pay: number
  due: number
  note: string
  details: OrderDetail[]
}

interface EditProps extends PageProps {
  order: Order
  customers: Customer[]
}

export default function Edit({ auth, order, customers }: EditProps) {
  const breadcrumbsItems = [
    { title: 'หน้าหลัก', url: route('dashboard') },
    { title: 'รายการสั่งซื้อ', url: route('orders.index') },
    { title: 'แก้ไขคำสั่งซื้อ', url: undefined }
  ]

  // สร้าง state สำหรับการจัดการข้อมูล
  const [orderDetails, setOrderDetails] = useState<OrderDetail[]>(order.details)
  const [subTotal, setSubTotal] = useState<number>(order.sub_total)
  const [vat, setVat] = useState<number>(order.vat)
  const [total, setTotal] = useState<number>(order.total)

  // ฟอร์มสำหรับแก้ไขคำสั่งซื้อ
  const { data, setData, put, processing, errors } = useForm({
    customer_id: order.customer_id.toString(),
    order_date: order.order_date,
    payment_type: order.payment_type,
    pay: order.pay,
    order_details: JSON.stringify(orderDetails),
    sub_total: order.sub_total,
    vat: order.vat,
    total: order.total,
    note: order.note || '',
  })

  // คำนวณราคาทั้งหมดเมื่อรายการสินค้าเปลี่ยนแปลง
  useEffect(() => {
    const subTotalValue = orderDetails.reduce((sum, item) => sum + item.total, 0)
    const vatValue = Math.round(subTotalValue * 0.07)
    const totalValue = subTotalValue + vatValue

    setSubTotal(subTotalValue)
    setVat(vatValue)
    setTotal(totalValue)
  }, [orderDetails])

  // ลบสินค้าออกจากรายการ
  const handleRemoveProduct = (index: number) => {
    const updatedItems = [...orderDetails]
    updatedItems.splice(index, 1)
    setOrderDetails(updatedItems)
  }

  // คำนวณราคาสุทธิ
  const formatPrice = (price: number) => {
    return (price / 100).toLocaleString('th-TH', { minimumFractionDigits: 2 })
  }

  // บันทึกคำสั่งซื้อ
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (orderDetails.length === 0) {
      alert('กรุณามีสินค้าอย่างน้อย 1 รายการ')
      return
    }

    const finalPay = typeof data.pay === 'string' ? parseInt(data.pay) : data.pay as number
    if (isNaN(finalPay) || finalPay < 0) {
      alert('กรุณาระบุจำนวนเงินที่ชำระให้ถูกต้อง')
      return
    }

    if (finalPay > total) {
      alert('จำนวนเงินที่ชำระไม่สามารถมากกว่ายอดรวมได้')
      return
    }

    // อัพเดทข้อมูลล่าสุดก่อนส่ง
    setData({
      ...data,
      order_details: JSON.stringify(orderDetails),
      sub_total: subTotal,
      vat: vat,
      total: total
    })

    // ส่งข้อมูลไปบันทึก
    put(route('orders.update', order.id), {
      onSuccess: () => {
        router.visit(route('orders.show', order.id))
      }
    })
  }

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="page-header d-print-none">
          <div className="container-xl">
            <h2 className="page-title">แก้ไขคำสั่งซื้อ #{order.invoice_no}</h2>
          </div>
        </div>
      }
    >
      <Head title={`แก้ไขคำสั่งซื้อ: ${order.invoice_no}`} />

      <div className="page-body">
        <div className="container-xl">
          <Breadcrumbs items={breadcrumbsItems} />

          <form onSubmit={handleSubmit}>
            <div className="row row-cards">
              <div className="col-lg-8">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">รายการสินค้า</h3>
                  </div>
                  <div className="card-body">
                    <div className="alert alert-info">
                      การแก้ไขคำสั่งซื้อจะไม่สามารถเพิ่มสินค้าได้ แต่สามารถลบสินค้าออกจากรายการได้
                    </div>

                    <div className="table-responsive">
                      <table className="table table-vcenter card-table table-striped">
                        <thead>
                          <tr>
                            <th>ลำดับ</th>
                            <th>ชื่อสินค้า</th>
                            <th className="text-center">ราคา</th>
                            <th className="text-center">จำนวน</th>
                            <th className="text-center">รวม</th>
                            <th className="text-end">จัดการ</th>
                          </tr>
                        </thead>
                        <tbody>
                          {orderDetails.length > 0 ? (
                            orderDetails.map((detail, index) => (
                              <tr key={detail.id}>
                                <td>{index + 1}</td>
                                <td>{detail.product.name}</td>
                                <td className="text-center">฿{formatPrice(detail.unitcost)}</td>
                                <td className="text-center">{detail.quantity}</td>
                                <td className="text-center">฿{formatPrice(detail.total)}</td>
                                <td className="text-end">
                                  <button 
                                    type="button"
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleRemoveProduct(index)}
                                  >
                                    ลบ
                                  </button>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={6} className="text-center">ไม่มีรายการสินค้า</td>
                            </tr>
                          )}
                        </tbody>
                        <tfoot>
                          <tr>
                            <td colSpan={4} className="text-end">รวม</td>
                            <td className="text-center">฿{formatPrice(subTotal)}</td>
                            <td></td>
                          </tr>
                          <tr>
                            <td colSpan={4} className="text-end">ภาษีมูลค่าเพิ่ม 7%</td>
                            <td className="text-center">฿{formatPrice(vat)}</td>
                            <td></td>
                          </tr>
                          <tr>
                            <td colSpan={4} className="text-end"><strong>ยอดรวมทั้งสิ้น</strong></td>
                            <td className="text-center"><strong>฿{formatPrice(total)}</strong></td>
                            <td></td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-4">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">ข้อมูลคำสั่งซื้อ</h3>
                  </div>
                  <div className="card-body">
                    <div className="mb-3">
                      <label className="form-label" htmlFor="customer_id">ลูกค้า</label>
                      <select
                        id="customer_id"
                        className={`form-select ${errors.customer_id ? 'is-invalid' : ''}`}
                        value={data.customer_id}
                        onChange={(e) => setData('customer_id', e.target.value)}
                        required
                      >
                        <option value="">-- เลือกลูกค้า --</option>
                        {customers.map(customer => (
                          <option key={customer.id} value={customer.id}>{customer.name}</option>
                        ))}
                      </select>
                      {errors.customer_id && <div className="invalid-feedback">{errors.customer_id}</div>}
                    </div>

                    <div className="mb-3">
                      <label className="form-label" htmlFor="order_date">วันที่สั่งซื้อ</label>
                      <input
                        id="order_date"
                        type="date"
                        className={`form-control ${errors.order_date ? 'is-invalid' : ''}`}
                        value={data.order_date}
                        onChange={(e) => setData('order_date', e.target.value)}
                        required
                      />
                      {errors.order_date && <div className="invalid-feedback">{errors.order_date}</div>}
                    </div>

                    <div className="mb-3">
                      <label className="form-label" htmlFor="payment_type">ประเภทการชำระเงิน</label>
                      <select
                        id="payment_type"
                        className={`form-select ${errors.payment_type ? 'is-invalid' : ''}`}
                        value={data.payment_type}
                        onChange={(e) => setData('payment_type', e.target.value)}
                        required
                      >
                        <option value="เงินสด">เงินสด</option>
                        <option value="โอนเงิน">โอนเงิน</option>
                        <option value="บัตรเครดิต">บัตรเครดิต</option>
                        <option value="เครดิต">เครดิต</option>
                      </select>
                      {errors.payment_type && <div className="invalid-feedback">{errors.payment_type}</div>}
                    </div>

                    <div className="mb-3">
                      <label className="form-label" htmlFor="pay">จำนวนเงินที่ชำระ</label>
                      <input
                        id="pay"
                        type="number"
                        className={`form-control ${errors.pay ? 'is-invalid' : ''}`}
                        value={data.pay}
                        onChange={(e) => setData('pay', parseInt(e.target.value))}
                        max={total}
                        min={0}
                        required
                      />
                      {errors.pay && <div className="invalid-feedback">{errors.pay}</div>}
                      <small className="text-muted">
                        จำนวนเงินที่ค้างชำระ: ฿{formatPrice(total - (typeof data.pay === 'string' ? parseInt(data.pay || '0') : (data.pay || 0)))}
                      </small>
                    </div>

                    <div className="mb-3">
                      <label className="form-label" htmlFor="note">หมายเหตุ</label>
                      <textarea
                        id="note"
                        className={`form-control ${errors.note ? 'is-invalid' : ''}`}
                        value={data.note}
                        onChange={(e) => setData('note', e.target.value)}
                        rows={2}
                      ></textarea>
                      {errors.note && <div className="invalid-feedback">{errors.note}</div>}
                    </div>
                  </div>
                  <div className="card-footer text-end">
                    <div className="d-flex">
                      <Link href={route('orders.show', order.id)} className="btn btn-outline-secondary me-2">
                        ยกเลิก
                      </Link>
                      <button type="submit" className="btn btn-primary" disabled={processing || orderDetails.length === 0}>
                        {processing ? 'กำลังบันทึก...' : 'บันทึกคำสั่งซื้อ'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </AuthenticatedLayout>
  )
} 