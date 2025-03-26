import { Head, Link } from '@inertiajs/react'
import { PageProps } from '@/types'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import Breadcrumbs from '@/Components/Breadcrumbs'

interface Supplier {
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

interface PurchaseDetail {
  id: number
  purchase_id: number
  product_id: number
  quantity: number
  unit_price: number
  sub_total: number
  product: Product
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
  purchase_note: string
  created_at: string
  supplier: Supplier
  details: PurchaseDetail[]
}

interface ShowProps extends PageProps {
  purchase: Purchase
}

export default function Show({ auth, purchase }: ShowProps) {
  const breadcrumbsItems = [
    { title: 'หน้าหลัก', url: route('dashboard') },
    { title: 'รายการสั่งซื้อ', url: route('purchases.index') },
    { title: `${purchase.reference_no}`, url: undefined }
  ]

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="page-header d-print-none">
          <div className="container-xl">
            <h2 className="page-title">รายละเอียดการสั่งซื้อ</h2>
          </div>
          <div className="col-auto ms-auto">
            <div className="btn-list">
              <Link 
                href={route('purchases.print', purchase.id)} 
                className="btn btn-info d-none d-sm-inline-block"
                target="_blank"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-printer" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M17 17h2a2 2 0 0 0 2 -2v-4a2 2 0 0 0 -2 -2h-14a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h2"></path>
                  <path d="M17 9v-4a2 2 0 0 0 -2 -2h-6a2 2 0 0 0 -2 2v4"></path>
                  <path d="M7 13m0 2a2 2 0 0 1 2 -2h6a2 2 0 0 1 2 2v4a2 2 0 0 1 -2 2h-6a2 2 0 0 1 -2 -2z"></path>
                </svg>
                พิมพ์รายการสั่งซื้อ
              </Link>

              {purchase.purchase_status.value === 0 && (
                <Link 
                  href={route('purchases.edit', purchase.id)} 
                  className="btn btn-primary d-none d-sm-inline-block"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-edit" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1"></path>
                    <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z"></path>
                    <path d="M16 5l3 3"></path>
                  </svg>
                  แก้ไขรายการสั่งซื้อ
                </Link>
              )}
            </div>
          </div>
        </div>
      }
    >
      <Head title={`รายการสั่งซื้อ: ${purchase.reference_no}`} />

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
                    <strong className="me-1">เลขที่อ้างอิง:</strong>
                    {purchase.reference_no}
                  </div>
                  <div className="mb-2">
                    <strong className="me-1">วันที่สั่งซื้อ:</strong>
                    {new Date(purchase.purchase_date).toLocaleDateString('th-TH')}
                  </div>
                  <div className="mb-2">
                    <strong className="me-1">วันที่บันทึก:</strong>
                    {new Date(purchase.created_at).toLocaleDateString('th-TH')}
                  </div>
                  <div className="mb-2">
                    <strong className="me-1">ยอดรวมทั้งสิ้น:</strong>
                    ฿{(purchase.total_amount / 100).toLocaleString('th-TH', { minimumFractionDigits: 2 })}
                  </div>
                  <div className="mb-2">
                    <strong className="me-1">ชำระแล้ว:</strong>
                    ฿{(purchase.paid_amount / 100).toLocaleString('th-TH', { minimumFractionDigits: 2 })}
                  </div>
                  <div className="mb-2">
                    <strong className="me-1">ค้างชำระ:</strong>
                    {purchase.due_amount > 0 ? (
                      <span className="text-danger">
                        ฿{(purchase.due_amount / 100).toLocaleString('th-TH', { minimumFractionDigits: 2 })}
                      </span>
                    ) : (
                      <span>
                        ฿{(purchase.due_amount / 100).toLocaleString('th-TH', { minimumFractionDigits: 2 })}
                      </span>
                    )}
                  </div>
                  <div className="mb-2">
                    <strong className="me-1">สถานะการสั่งซื้อ:</strong>
                    <span className={purchase.purchase_status.value === 0 ? 'badge bg-warning' : 'badge bg-success'}>
                      {purchase.purchase_status.label}
                    </span>
                  </div>
                  <div className="mb-2">
                    <strong className="me-1">สถานะการชำระเงิน:</strong>
                    <span className={
                      purchase.payment_status.value === 0 ? 'badge bg-danger' : 
                      purchase.payment_status.value === 1 ? 'badge bg-warning' : 
                      'badge bg-success'
                    }>
                      {purchase.payment_status.label}
                    </span>
                  </div>
                  {purchase.purchase_note && (
                    <div className="mb-2">
                      <strong className="me-1">หมายเหตุ:</strong>
                      <p>{purchase.purchase_note}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="col-lg-8">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">ข้อมูลซัพพลายเออร์</h3>
                </div>
                <div className="card-body">
                  <div className="mb-2">
                    <strong className="me-1">ชื่อ:</strong>
                    <Link href={route('suppliers.show', purchase.supplier_id)}>
                      {purchase.supplier.name}
                    </Link>
                  </div>
                  <div className="mb-2">
                    <strong className="me-1">อีเมล:</strong>
                    <a href={`mailto:${purchase.supplier.email}`}>{purchase.supplier.email}</a>
                  </div>
                  <div className="mb-2">
                    <strong className="me-1">เบอร์โทรศัพท์:</strong>
                    {purchase.supplier.phone}
                  </div>
                  <div className="mb-2">
                    <strong className="me-1">ที่อยู่:</strong>
                    {purchase.supplier.address}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">รายการสินค้าที่สั่งซื้อ</h3>
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
                        {purchase.details.map((item, index) => (
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
                            <td className="text-end">฿{(item.unit_price / 100).toLocaleString('th-TH', { minimumFractionDigits: 2 })}</td>
                            <td className="text-end">฿{(item.sub_total / 100).toLocaleString('th-TH', { minimumFractionDigits: 2 })}</td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr>
                          <th colSpan={7} className="text-end">ยอดรวมทั้งสิ้น</th>
                          <th className="text-end">฿{(purchase.total_amount / 100).toLocaleString('th-TH', { minimumFractionDigits: 2 })}</th>
                        </tr>
                        <tr>
                          <th colSpan={7} className="text-end">ชำระแล้ว</th>
                          <th className="text-end">฿{(purchase.paid_amount / 100).toLocaleString('th-TH', { minimumFractionDigits: 2 })}</th>
                        </tr>
                        <tr>
                          <th colSpan={7} className="text-end">ค้างชำระ</th>
                          <th className="text-end">
                            {purchase.due_amount > 0 ? (
                              <span className="text-danger">
                                ฿{(purchase.due_amount / 100).toLocaleString('th-TH', { minimumFractionDigits: 2 })}
                              </span>
                            ) : (
                              <span>
                                ฿{(purchase.due_amount / 100).toLocaleString('th-TH', { minimumFractionDigits: 2 })}
                              </span>
                            )}
                          </th>
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