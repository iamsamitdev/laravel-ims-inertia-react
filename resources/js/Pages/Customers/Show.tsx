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
  photo: string | null
  account_holder: string | null
  account_number: string | null
  bank_name: string | null
  created_at: string
  updated_at: string
  quotations: any[]
  orders: any[]
}

interface ShowProps extends PageProps {
  customer: Customer
}

export default function Show({ auth, customer }: ShowProps) {
  const breadcrumbsItems = [
    { title: 'หน้าหลัก', url: route('dashboard') },
    { title: 'ลูกค้า', url: route('customers.index') },
    { title: customer.name, url: undefined }
  ]

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="page-header d-print-none">
          <div className="container-xl">
            <div className="page-pretitle">รายละเอียด</div>
            <h2 className="page-title">{customer.name}</h2>
          </div>
        </div>
      }
    >
      <Head title={`รายละเอียดลูกค้า - ${customer.name}`} />

      <div className="page-body">
        <div className="container-xl">
          <Breadcrumbs items={breadcrumbsItems} />

          <div className="row row-cards">
            <div className="col-lg-4">
              <div className="card">
                <div className="card-body">
                  <h3 className="card-title">รูปลูกค้า</h3>
                  <div className="text-center">
                    <img 
                      src={customer.photo 
                        ? `/storage/customers/${customer.photo}` 
                        : '/assets/img/demo/user-placeholder.svg'} 
                      alt={customer.name} 
                      className="img-account-profile rounded-2" 
                      style={{ maxWidth: '100%', height: 'auto' }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-8">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">ข้อมูลลูกค้า</h3>
                  <div className="card-actions">
                    <Link href={route('customers.edit', customer.id)} className="btn btn-primary">
                      แก้ไขข้อมูล
                    </Link>
                  </div>
                </div>
                <div className="table-responsive">
                  <table className="table table-bordered card-table table-vcenter text-nowrap datatable">
                    <tbody>
                      <tr>
                        <td className="w-25">ชื่อ</td>
                        <td>{customer.name}</td>
                      </tr>
                      <tr>
                        <td>อีเมล</td>
                        <td>{customer.email}</td>
                      </tr>
                      <tr>
                        <td>เบอร์โทรศัพท์</td>
                        <td>{customer.phone}</td>
                      </tr>
                      <tr>
                        <td>ที่อยู่</td>
                        <td>{customer.address}</td>
                      </tr>
                      <tr>
                        <td>ชื่อเจ้าของบัญชี</td>
                        <td>{customer.account_holder || '-'}</td>
                      </tr>
                      <tr>
                        <td>เลขที่บัญชี</td>
                        <td>{customer.account_number || '-'}</td>
                      </tr>
                      <tr>
                        <td>ธนาคาร</td>
                        <td>{customer.bank_name || '-'}</td>
                      </tr>
                      <tr>
                        <td>วันที่สร้าง</td>
                        <td>{new Date(customer.created_at).toLocaleDateString('th-TH')}</td>
                      </tr>
                      <tr>
                        <td>วันที่อัปเดตล่าสุด</td>
                        <td>{new Date(customer.updated_at).toLocaleDateString('th-TH')}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="card-footer text-end">
                  <Link href={route('customers.index')} className="btn btn-link">
                    กลับไปยังรายการลูกค้า
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {(customer.quotations?.length > 0 || customer.orders?.length > 0) && (
            <div className="row mt-3">
              {customer.quotations?.length > 0 && (
                <div className="col-lg-6">
                  <div className="card">
                    <div className="card-header">
                      <h3 className="card-title">ประวัติการเสนอราคา</h3>
                    </div>
                    <div className="table-responsive">
                      <table className="table table-vcenter card-table">
                        <thead>
                          <tr>
                            <th>รหัส</th>
                            <th>วันที่</th>
                            <th>ยอดรวม</th>
                            <th className="w-1"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {customer.quotations.map((quotation) => (
                            <tr key={quotation.id}>
                              <td>{quotation.quotation_number}</td>
                              <td>{new Date(quotation.date).toLocaleDateString('th-TH')}</td>
                              <td>฿{quotation.total.toLocaleString('th-TH')}</td>
                              <td>
                                <Link href={route('quotations.show', quotation.id)} className="btn btn-sm">
                                  ดู
                                </Link>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {customer.orders?.length > 0 && (
                <div className="col-lg-6">
                  <div className="card">
                    <div className="card-header">
                      <h3 className="card-title">ประวัติการสั่งซื้อ</h3>
                    </div>
                    <div className="table-responsive">
                      <table className="table table-vcenter card-table">
                        <thead>
                          <tr>
                            <th>รหัส</th>
                            <th>วันที่</th>
                            <th>ยอดรวม</th>
                            <th className="w-1"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {customer.orders.map((order) => (
                            <tr key={order.id}>
                              <td>{order.order_number}</td>
                              <td>{new Date(order.date).toLocaleDateString('th-TH')}</td>
                              <td>฿{order.total.toLocaleString('th-TH')}</td>
                              <td>
                                <Link href={route('orders.show', order.id)} className="btn btn-sm">
                                  ดู
                                </Link>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </AuthenticatedLayout>
  )
} 