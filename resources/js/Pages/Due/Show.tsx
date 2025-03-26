import { Head, Link } from '@inertiajs/react'
import { PageProps } from '@/types'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import Breadcrumbs from '@/Components/Breadcrumbs'

interface OrderDetail {
  id: number
  order_id: number
  product_id: number
  quantity: number
  unitcost: number
  total: number
  product: {
    id: number
    name: string
    code: string
    category: {
      id: number
      name: string
    }
    unit: {
      id: number
      name: string
      short_code: string
    }
  }
}

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
  details: OrderDetail[]
}

interface ShowProps extends PageProps {
  order: Order
}

export default function Show({ auth, order }: ShowProps) {
  const breadcrumbsItems = [
    { title: 'หน้าหลัก', url: route('dashboard') },
    { title: 'รายการค้างชำระ', url: route('due.index') },
    { title: order.invoice_no, url: undefined }
  ]

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="page-header d-print-none">
          <div className="container-xl">
            <h2 className="page-title">รายละเอียดรายการค้างชำระ</h2>
          </div>
          <div className="col-auto ms-auto">
            <div className="btn-list">
              <Link 
                href={route('orders.print', order.id)} 
                className="btn btn-info d-none d-sm-inline-block"
                target="_blank"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-printer" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M17 17h2a2 2 0 0 0 2 -2v-4a2 2 0 0 0 -2 -2h-14a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h2"></path>
                  <path d="M17 9v-4a2 2 0 0 0 -2 -2h-6a2 2 0 0 0 -2 2v4"></path>
                  <path d="M7 13m0 2a2 2 0 0 1 2 -2h6a2 2 0 0 1 2 2v4a2 2 0 0 1 -2 2h-6a2 2 0 0 1 -2 -2z"></path>
                </svg>
                พิมพ์ใบเสร็จ
              </Link>

              <Link 
                href={route('due.edit', order.id)} 
                className="btn btn-primary d-none d-sm-inline-block"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-cash" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M7 9m0 2a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2z"></path>
                  <path d="M14 14m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
                  <path d="M17 9v-2a2 2 0 0 0 -2 -2h-10a2 2 0 0 0 -2 2v6a2 2 0 0 0 2 2h2"></path>
                </svg>
                ชำระเงิน
              </Link>
            </div>
          </div>
        </div>
      }
    >
      <Head title={`รายการค้างชำระ: ${order.invoice_no}`} />

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
                    <strong className="me-1">จำนวนสินค้า:</strong>
                    {order.total_products} รายการ
                  </div>
                  <div className="mb-2">
                    <strong className="me-1">ราคารวม:</strong>
                    ฿{(order.sub_total / 100).toLocaleString('th-TH', { minimumFractionDigits: 2 })}
                  </div>
                  <div className="mb-2">
                    <strong className="me-1">ภาษี (7%):</strong>
                    ฿{(order.vat / 100).toLocaleString('th-TH', { minimumFractionDigits: 2 })}
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
                    <strong className="me-1">ค้างชำระ:</strong>
                    <span className="text-danger">฿{(order.due / 100).toLocaleString('th-TH', { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="mb-2">
                    <strong className="me-1">สถานะ:</strong>
                    <span className={order.order_status === 0 ? 'badge bg-warning' : 'badge bg-success'}>
                      {order.order_status === 0 ? 'รอดำเนินการ' : 'เสร็จสิ้น'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-8">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">ข้อมูลลูกค้า</h3>
                </div>
                <div className="card-body">
                  <div className="mb-2">
                    <strong className="me-1">ชื่อ:</strong>
                    <Link href={route('customers.show', order.customer_id)}>
                      {order.customer.name}
                    </Link>
                  </div>
                  <div className="mb-2">
                    <strong className="me-1">อีเมล:</strong>
                    <a href={`mailto:${order.customer.email}`}>{order.customer.email}</a>
                  </div>
                  <div className="mb-2">
                    <strong className="me-1">เบอร์โทรศัพท์:</strong>
                    {order.customer.phone}
                  </div>
                  <div className="mb-2">
                    <strong className="me-1">ที่อยู่:</strong>
                    {order.customer.address}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">รายการสินค้า</h3>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-vcenter card-table">
                      <thead>
                        <tr>
                          <th className="w-1">ลำดับ</th>
                          <th>รหัสสินค้า</th>
                          <th>ชื่อสินค้า</th>
                          <th>หมวดหมู่</th>
                          <th>หน่วย</th>
                          <th className="text-end">จำนวน</th>
                          <th className="text-end">ราคา/หน่วย</th>
                          <th className="text-end">รวม</th>
                        </tr>
                      </thead>
                      <tbody>
                        {order.details.map((item, index) => (
                          <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>{item.product.code}</td>
                            <td>
                              <Link href={route('products.show', item.product_id)}>
                                {item.product.name}
                              </Link>
                            </td>
                            <td>{item.product.category.name}</td>
                            <td>{item.product.unit.short_code}</td>
                            <td className="text-end">{item.quantity}</td>
                            <td className="text-end">฿{(item.unitcost / 100).toLocaleString('th-TH', { minimumFractionDigits: 2 })}</td>
                            <td className="text-end">฿{(item.total / 100).toLocaleString('th-TH', { minimumFractionDigits: 2 })}</td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr>
                          <th colSpan={7} className="text-end">ราคารวม</th>
                          <th className="text-end">฿{(order.sub_total / 100).toLocaleString('th-TH', { minimumFractionDigits: 2 })}</th>
                        </tr>
                        <tr>
                          <th colSpan={7} className="text-end">ภาษี (7%)</th>
                          <th className="text-end">฿{(order.vat / 100).toLocaleString('th-TH', { minimumFractionDigits: 2 })}</th>
                        </tr>
                        <tr>
                          <th colSpan={7} className="text-end">ยอดรวมทั้งสิ้น</th>
                          <th className="text-end">฿{(order.total / 100).toLocaleString('th-TH', { minimumFractionDigits: 2 })}</th>
                        </tr>
                        <tr>
                          <th colSpan={7} className="text-end">ชำระแล้ว</th>
                          <th className="text-end">฿{(order.pay / 100).toLocaleString('th-TH', { minimumFractionDigits: 2 })}</th>
                        </tr>
                        <tr>
                          <th colSpan={7} className="text-end">ค้างชำระ</th>
                          <th className="text-end text-danger">฿{(order.due / 100).toLocaleString('th-TH', { minimumFractionDigits: 2 })}</th>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  )
} 