import { Head, Link } from '@inertiajs/react'
import { PageProps } from '@/types'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import Breadcrumbs from '@/Components/Breadcrumbs'
import DataTable from '@/Components/Table/DataTable'

interface Purchase {
  id: number
  purchase_no: string
  supplier_id: number
  date: string
  total_amount: number
  status: string
}

interface Supplier {
  id: number
  name: string
  email: string
  phone: string
  shopname: string
  address: string
  type: {
    value: string
    label: string
  }
  photo: string | null
  account_holder: string | null
  account_number: string | null
  bank_name: string | null
  created_at: string
  updated_at: string
  purchases: Purchase[]
}

interface ShowProps extends PageProps {
  supplier: Supplier
}

export default function Show({ auth, supplier }: ShowProps) {
  const breadcrumbsItems = [
    { title: 'หน้าหลัก', url: route('dashboard') },
    { title: 'ซัพพลายเออร์', url: route('suppliers.index') },
    { title: supplier.name, url: undefined }
  ]

  // คอลัมน์ตารางสำหรับรายการซื้อ
  const purchaseColumns = [
    {
      field: 'purchase_no',
      label: 'เลขที่ใบสั่งซื้อ',
      sortable: true,
      render: (purchase: Purchase) => (
        <Link href={route('purchases.show', purchase.id)}>
          {purchase.purchase_no}
        </Link>
      )
    },
    {
      field: 'date',
      label: 'วันที่',
      sortable: true
    },
    {
      field: 'total_amount',
      label: 'จำนวนเงินรวม',
      sortable: true,
      render: (purchase: Purchase) => (
        <span>฿{parseFloat(purchase.total_amount.toString()).toLocaleString('th-TH', { minimumFractionDigits: 2 })}</span>
      )
    },
    {
      field: 'status',
      label: 'สถานะ',
      sortable: true,
      render: (purchase: Purchase) => {
        let statusClass = 'badge bg-secondary me-1'
        
        if (purchase.status === 'completed') {
          statusClass = 'badge bg-success me-1'
        } else if (purchase.status === 'pending') {
          statusClass = 'badge bg-warning me-1'
        } else if (purchase.status === 'cancelled') {
          statusClass = 'badge bg-danger me-1'
        }
        
        return <span className={statusClass}>{purchase.status}</span>
      }
    },
    {
      field: 'actions',
      label: 'จัดการ',
      render: (purchase: Purchase) => (
        <div className="btn-list">
          <Link 
            href={route('purchases.show', purchase.id)} 
            className="btn btn-sm"
          >
            ดู
          </Link>
          <Link 
            href={route('purchases.edit', purchase.id)} 
            className="btn btn-sm btn-primary"
          >
            แก้ไข
          </Link>
        </div>
      )
    }
  ]

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="page-header d-print-none">
          <div className="container-xl">
            <div className="page-pretitle">ข้อมูล</div>
            <h2 className="page-title">{supplier.name}</h2>
          </div>
        </div>
      }
    >
      <Head title={`ซัพพลายเออร์: ${supplier.name}`} />

      <div className="page-body">
        <div className="container-xl">
          <Breadcrumbs items={breadcrumbsItems} />

          <div className="row">
            <div className="col-lg-4">
              <div className="card">
                <div className="card-body">
                  <h3 className="card-title">รูปโปรไฟล์</h3>
                  <div className="text-center">
                    <img
                      src={supplier.photo ? `/storage/${supplier.photo}` : '/assets/img/demo/user-placeholder.svg'}
                      alt={supplier.name}
                      className="rounded"
                      style={{ maxWidth: '100%', height: 'auto', maxHeight: '250px' }}
                    />
                  </div>
                </div>
                <div className="card-footer">
                  <div className="d-flex">
                    <Link
                      href={route('suppliers.edit', supplier.id)}
                      className="btn btn-link"
                    >
                      แก้ไขซัพพลายเออร์
                    </Link>
                    <Link
                      href={route('suppliers.index')}
                      className="btn btn-link ms-auto"
                    >
                      กลับไปยังรายการซัพพลายเออร์
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-8">
              <div className="card">
                <div className="card-header">
                  <div>
                    <h3 className="card-title">รายละเอียดซัพพลายเออร์</h3>
                  </div>
                </div>
                <div className="table-responsive">
                  <table className="table table-bordered card-table table-vcenter text-nowrap">
                    <tbody>
                      <tr>
                        <td style={{ width: '30%' }}>ชื่อ</td>
                        <td>{supplier.name}</td>
                      </tr>
                      <tr>
                        <td>อีเมล</td>
                        <td>{supplier.email}</td>
                      </tr>
                      <tr>
                        <td>เบอร์โทรศัพท์</td>
                        <td>{supplier.phone}</td>
                      </tr>
                      <tr>
                        <td>ที่อยู่</td>
                        <td>{supplier.address}</td>
                      </tr>
                      <tr>
                        <td>ชื่อร้าน</td>
                        <td>{supplier.shopname}</td>
                      </tr>
                      <tr>
                        <td>ประเภท</td>
                        <td>{supplier.type.label}</td>
                      </tr>
                      {supplier.account_holder && (
                        <tr>
                          <td>ชื่อเจ้าของบัญชี</td>
                          <td>{supplier.account_holder}</td>
                        </tr>
                      )}
                      {supplier.account_number && (
                        <tr>
                          <td>เลขที่บัญชี</td>
                          <td>{supplier.account_number}</td>
                        </tr>
                      )}
                      {supplier.bank_name && (
                        <tr>
                          <td>ชื่อธนาคาร</td>
                          <td>{supplier.bank_name}</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {supplier.purchases && supplier.purchases.length > 0 && (
                <div className="card mt-3">
                  <div className="card-header">
                    <h3 className="card-title">รายการสั่งซื้อ</h3>
                  </div>
                  <div className="card-body">
                    <DataTable
                      data={supplier.purchases}
                      columns={purchaseColumns}
                      sortField="date"
                      sortDirection="desc"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  )
} 