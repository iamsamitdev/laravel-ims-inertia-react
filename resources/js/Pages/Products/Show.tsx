import { Head, Link } from '@inertiajs/react'
import { PageProps } from '@/types'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import Breadcrumbs from '@/Components/Breadcrumbs'

interface Category {
  id: number
  name: string
  slug: string
}

interface Unit {
  id: number
  name: string
  short_code: string
}

interface Product {
  id: number
  name: string
  slug: string
  code: string
  quantity: number
  quantity_alert: number
  buying_price: number
  selling_price: number
  tax: number
  tax_type: number
  notes: string
  product_image: string | null
  category: Category
  unit: Unit
  created_at: string
  updated_at: string
}

interface ShowProps extends PageProps {
  product: Product
  barcode: string
}

export default function Show({ auth, product, barcode }: ShowProps) {
  const breadcrumbsItems = [
    { title: 'หน้าหลัก', url: route('dashboard') },
    { title: 'สินค้า', url: route('products.index') },
    { title: product.name, url: undefined }
  ]

  // แปลงค่าภาษี
  const taxTypeText = product.tax_type === 0 ? 'รวมในราคาสินค้า' : 'แยกต่างหาก'

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="page-header d-print-none">
          <div className="container-xl">
            <div className="page-pretitle">รายละเอียด</div>
            <h2 className="page-title">{product.name}</h2>
          </div>
          <div className="col-auto ms-auto">
            <div className="btn-list">
              <Link
                href={route('products.edit', product.slug)}
                className="btn btn-primary d-none d-sm-inline-block"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-edit" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1"></path>
                  <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z"></path>
                  <path d="M16 5l3 3"></path>
                </svg>
                แก้ไขสินค้า
              </Link>
            </div>
          </div>
        </div>
      }
    >
      <Head title={`สินค้า: ${product.name}`} />

      <div className="page-body">
        <div className="container-xl">
          <Breadcrumbs items={breadcrumbsItems} />

          <div className="row row-cards">
            <div className="col-lg-4">
              <div className="card">
                <div className="card-body">
                  <h3 className="card-title">รูปสินค้า</h3>
                  <div className="text-center">
                    <img
                      src={product.product_image ? `/storage/products/${product.product_image}` : '/assets/img/demo/product-placeholder.png'}
                      alt={product.name}
                      className="img-thumbnail"
                      style={{ maxWidth: '100%', height: 'auto', maxHeight: '250px' }}
                    />
                  </div>
                </div>
              </div>

              <div className="card mt-3">
                <div className="card-body">
                  <h3 className="card-title">บาร์โค้ด</h3>
                  <div className="text-center">
                    <div dangerouslySetInnerHTML={{ __html: barcode }} />
                    <div className="mt-2">{product.code}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-8">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">ข้อมูลสินค้า</h3>
                </div>
                <div className="table-responsive">
                  <table className="table table-bordered card-table table-vcenter text-nowrap">
                    <tbody>
                      <tr>
                        <td style={{ width: '30%' }}>ชื่อสินค้า</td>
                        <td>{product.name}</td>
                      </tr>
                      <tr>
                        <td>Slug</td>
                        <td>{product.slug}</td>
                      </tr>
                      <tr>
                        <td>รหัสสินค้า</td>
                        <td>{product.code}</td>
                      </tr>
                      <tr>
                        <td>หมวดหมู่</td>
                        <td>
                          <Link href={route('categories.show', product.category.slug)}>
                            {product.category.name}
                          </Link>
                        </td>
                      </tr>
                      <tr>
                        <td>หน่วยวัด</td>
                        <td>
                          <Link href={route('units.show', product.unit.id)}>
                            {product.unit.name} ({product.unit.short_code})
                          </Link>
                        </td>
                      </tr>
                      <tr>
                        <td>จำนวนคงเหลือ</td>
                        <td>
                          <span className={product.quantity <= product.quantity_alert ? 'text-danger' : ''}>
                            {product.quantity.toLocaleString()} {product.unit.short_code}
                          </span>
                          {product.quantity <= product.quantity_alert && (
                            <span className="badge bg-danger ms-2">สินค้าใกล้หมด</span>
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>จำนวนแจ้งเตือน</td>
                        <td>{product.quantity_alert.toLocaleString()} {product.unit.short_code}</td>
                      </tr>
                      <tr>
                        <td>ราคาซื้อ</td>
                        <td>฿{product.buying_price.toLocaleString('th-TH', { minimumFractionDigits: 2 })}</td>
                      </tr>
                      <tr>
                        <td>ราคาขาย</td>
                        <td>฿{product.selling_price.toLocaleString('th-TH', { minimumFractionDigits: 2 })}</td>
                      </tr>
                      <tr>
                        <td>ภาษี</td>
                        <td>{product.tax > 0 ? `${product.tax}% (${taxTypeText})` : 'ไม่มี'}</td>
                      </tr>
                      <tr>
                        <td>วันที่สร้าง</td>
                        <td>{new Date(product.created_at).toLocaleDateString('th-TH', { dateStyle: 'long' })}</td>
                      </tr>
                      <tr>
                        <td>วันที่อัปเดต</td>
                        <td>{new Date(product.updated_at).toLocaleDateString('th-TH', { dateStyle: 'long' })}</td>
                      </tr>
                      {product.notes && (
                        <tr>
                          <td>หมายเหตุ</td>
                          <td>{product.notes}</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <div className="card-footer text-end">
                  <Link href={route('products.index')} className="btn btn-outline-secondary">
                    กลับไปยังรายการสินค้า
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  )
} 