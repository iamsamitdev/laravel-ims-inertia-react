import { Head, Link } from '@inertiajs/react'
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
  details: OrderDetail[]
}

interface ShowProps extends PageProps {
  order: Order
}

export default function Show({ auth, order }: ShowProps) {
  const breadcrumbsItems = [
    { title: 'หน้าหลัก', url: route('dashboard') },
    { title: 'รายการสั่งซื้อ', url: route('orders.index') },
    { title: order.invoice_no, url: undefined }
  ]

  // คำนวณราคาสุทธิ
  const formatPrice = (price: number) => {
    return (price / 100).toLocaleString('th-TH', { minimumFractionDigits: 2 })
  }

  // ปุ่มในการจัดการคำสั่งซื้อ
  const orderActions = (
    <div className="btn-list">
      <Link
        href={route('orders.invoice.download', order.id)}
        className="btn btn-outline-primary"
        target="_blank"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-printer" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M17 17h2a2 2 0 0 0 2 -2v-4a2 2 0 0 0 -2 -2h-14a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h2"></path>
          <path d="M17 9v-4a2 2 0 0 0 -2 -2h-6a2 2 0 0 0 -2 2v4"></path>
          <path d="M7 13m0 2a2 2 0 0 1 2 -2h6a2 2 0 0 1 2 2v4a2 2 0 0 1 -2 2h-6a2 2 0 0 1 -2 -2z"></path>
        </svg>
        พิมพ์ใบสั่งซื้อ
      </Link>
      {order.order_status.value === 0 && (
        <Link
          href={route('orders.edit', order.id)}
          className="btn btn-outline-warning"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-edit" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1"></path>
            <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z"></path>
            <path d="M16 5l3 3"></path>
          </svg>
          แก้ไขคำสั่งซื้อ
        </Link>
      )}
      {order.order_status.value === 0 && (
        <Link
          href={route('orders.update', order.id)}
          className="btn btn-success"
          method="put"
          as="button"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-check" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M5 12l5 5l10 -10"></path>
          </svg>
          ยืนยันคำสั่งซื้อ
        </Link>
      )}
      <Link
        href={route('orders.index')}
        className="btn btn-outline-secondary"
      >
        กลับไปยังรายการคำสั่งซื้อ
      </Link>
    </div>
  )

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="row g-2 align-items-center">
          <div className="col">
            <div className="page-pretitle">รายละเอียด</div>
            <h2 className="page-title">คำสั่งซื้อ {order.invoice_no}</h2>
          </div>
          <div className="col-auto">
            <div className="btn-list">
              <span className={`badge me-1 ${order.order_status.value === 0 ? 'bg-warning' : 'bg-success'}`}>
                {order.order_status.label}
              </span>
            </div>
          </div>
        </div>
      }
    >
      <Head title={`คำสั่งซื้อ: ${order.invoice_no}`} />

      <div className="page-body">
        <div className="container-xl">
          <Breadcrumbs items={breadcrumbsItems} />

          <div className="row row-cards">
            <div className="col-lg-8">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">รายการสินค้า</h3>
                </div>
                <div className="table-responsive">
                  <table className="table card-table table-vcenter text-nowrap">
                    <thead>
                      <tr>
                        <th>รหัสสินค้า</th>
                        <th>ชื่อสินค้า</th>
                        <th className="text-end">ราคา</th>
                        <th className="text-end">จำนวน</th>
                        <th className="text-end">รวม</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.details.map((detail) => (
                        <tr key={detail.id}>
                          <td>{detail.product.code}</td>
                          <td>
                            <Link href={route('products.show', detail.product_id)}>
                              {detail.product.name}
                            </Link>
                          </td>
                          <td className="text-end">฿{formatPrice(detail.unitcost)}</td>
                          <td className="text-end">{detail.quantity}</td>
                          <td className="text-end">฿{formatPrice(detail.total)}</td>
                        </tr>
                      ))}
                      <tr>
                        <td colSpan={4} className="strong text-end">รวม</td>
                        <td className="text-end">฿{formatPrice(order.sub_total)}</td>
                      </tr>
                      <tr>
                        <td colSpan={4} className="strong text-end">ภาษีมูลค่าเพิ่ม 7%</td>
                        <td className="text-end">฿{formatPrice(order.vat)}</td>
                      </tr>
                      <tr>
                        <td colSpan={4} className="font-weight-bold text-uppercase text-end">ยอดรวมสุทธิ</td>
                        <td className="font-weight-bold text-end">฿{formatPrice(order.total)}</td>
                      </tr>
                      <tr>
                        <td colSpan={4} className="text-green text-end">ชำระแล้ว</td>
                        <td className="text-green text-end">฿{formatPrice(order.pay)}</td>
                      </tr>
                      {order.due > 0 && (
                        <tr>
                          <td colSpan={4} className="text-danger text-end">ค้างชำระ</td>
                          <td className="text-danger text-end">฿{formatPrice(order.due)}</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <div className="card-footer text-end">
                  {orderActions}
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">ข้อมูลลูกค้า</h3>
                </div>
                <div className="table-responsive">
                  <table className="table card-table table-vcenter">
                    <tbody>
                      <tr>
                        <td className="w-50">ชื่อลูกค้า</td>
                        <td>
                          <Link href={route('customers.show', order.customer_id)}>
                            {order.customer.name}
                          </Link>
                        </td>
                      </tr>
                      <tr>
                        <td>อีเมล</td>
                        <td>{order.customer.email}</td>
                      </tr>
                      <tr>
                        <td>เบอร์โทรศัพท์</td>
                        <td>{order.customer.phone}</td>
                      </tr>
                      <tr>
                        <td>ที่อยู่</td>
                        <td>{order.customer.address}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="card mt-3">
                <div className="card-header">
                  <h3 className="card-title">ข้อมูลคำสั่งซื้อ</h3>
                </div>
                <div className="table-responsive">
                  <table className="table card-table table-vcenter">
                    <tbody>
                      <tr>
                        <td className="w-50">เลขที่ใบสั่งซื้อ</td>
                        <td>{order.invoice_no}</td>
                      </tr>
                      <tr>
                        <td>วันที่สั่งซื้อ</td>
                        <td>{new Date(order.order_date).toLocaleDateString('th-TH', { dateStyle: 'full' })}</td>
                      </tr>
                      <tr>
                        <td>สถานะ</td>
                        <td>
                          <span className={`badge ${order.order_status.value === 0 ? 'bg-warning' : 'bg-success'}`}>
                            {order.order_status.label}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td>ประเภทการชำระเงิน</td>
                        <td>{order.payment_type}</td>
                      </tr>
                      <tr>
                        <td>จำนวนสินค้า</td>
                        <td>{order.total_products} รายการ</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  )
} 