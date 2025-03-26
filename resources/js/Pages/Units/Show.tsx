import { Head, Link } from '@inertiajs/react'
import { PageProps } from '@/types'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import Breadcrumbs from '@/Components/Breadcrumbs'
import DataTable from '@/Components/Table/DataTable'

interface Product {
  id: number
  name: string
  code: string
  category: {
    name: string
  }
  unit_id: number
  stock: number
  selling_price: number
  created_at: string
}

interface Unit {
  id: number
  name: string
  slug: string
  short_code: string
  created_at: string
  updated_at: string
  products: Product[]
}

interface ShowProps extends PageProps {
  unit: Unit
}

export default function Show({ auth, unit }: ShowProps) {
  const breadcrumbsItems = [
    { title: 'หน้าหลัก', url: route('dashboard') },
    { title: 'หน่วยวัด', url: route('units.index') },
    { title: unit.name, url: undefined }
  ]

  // คอลัมน์ตารางสินค้า
  const productColumns = [
    {
      field: 'name',
      label: 'ชื่อสินค้า',
      sortable: true,
      render: (product: Product) => (
        <Link href={route('products.show', product.id)} className="text-decoration-none">
          {product.name}
        </Link>
      )
    },
    {
      field: 'code',
      label: 'รหัสสินค้า',
      sortable: true
    },
    {
      field: 'category.name',
      label: 'หมวดหมู่',
      sortable: true,
      render: (product: Product) => (
        <span>{product.category?.name || '-'}</span>
      )
    },
    {
      field: 'stock',
      label: 'คงเหลือ',
      sortable: true,
      render: (product: Product) => (
        <span>{product.stock} {unit.short_code}</span>
      )
    },
    {
      field: 'selling_price',
      label: 'ราคาขาย',
      sortable: true,
      render: (product: Product) => (
        <span>฿{parseFloat(product.selling_price.toString()).toLocaleString('th-TH', { minimumFractionDigits: 2 })}</span>
      )
    },
    {
      field: 'actions',
      label: 'จัดการ',
      render: (product: Product) => (
        <div className="btn-list">
          <Link 
            href={route('products.show', product.id)} 
            className="btn btn-sm"
          >
            ดู
          </Link>
          <Link 
            href={route('products.edit', product.id)} 
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
        <div className="row g-2 align-items-center">
          <div className="col">
            <div className="page-pretitle">ข้อมูล</div>
            <h2 className="page-title">หน่วยวัด: {unit.name}</h2>
          </div>
          <div className="col-auto ms-auto">
            <div className="btn-list">
              <Link
                href={route('units.edit', unit.slug)}
                className="btn btn-primary d-none d-sm-inline-block"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-edit" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1"></path>
                  <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z"></path>
                  <path d="M16 5l3 3"></path>
                </svg>
                แก้ไขหน่วยวัด
              </Link>
            </div>
          </div>
        </div>
      }
    >
      <Head title={`หน่วยวัด: ${unit.name}`} />

      <div className="page-body">
        <div className="container-xl">
          <Breadcrumbs items={breadcrumbsItems} />

          <div className="row row-cards">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">รายละเอียดหน่วยวัด</h3>
                </div>
                <div className="card-body">
                  <div className="datagrid">
                    <div className="datagrid-item">
                      <div className="datagrid-title">ชื่อหน่วยวัด</div>
                      <div className="datagrid-content">{unit.name}</div>
                    </div>
                    <div className="datagrid-item">
                      <div className="datagrid-title">Slug</div>
                      <div className="datagrid-content">{unit.slug}</div>
                    </div>
                    <div className="datagrid-item">
                      <div className="datagrid-title">โค้ดย่อ</div>
                      <div className="datagrid-content">{unit.short_code}</div>
                    </div>
                    <div className="datagrid-item">
                      <div className="datagrid-title">จำนวนสินค้าที่ใช้หน่วยวัดนี้</div>
                      <div className="datagrid-content">{unit.products?.length || 0} รายการ</div>
                    </div>
                    <div className="datagrid-item">
                      <div className="datagrid-title">วันที่สร้าง</div>
                      <div className="datagrid-content">
                        {new Date(unit.created_at).toLocaleDateString('th-TH', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </div>
                    <div className="datagrid-item">
                      <div className="datagrid-title">วันที่แก้ไขล่าสุด</div>
                      <div className="datagrid-content">
                        {new Date(unit.updated_at).toLocaleDateString('th-TH', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">สินค้าที่ใช้หน่วยวัดนี้</h3>
                </div>
                <div className="card-body">
                  {unit.products && unit.products.length > 0 ? (
                    <DataTable
                      data={unit.products}
                      columns={productColumns}
                      sortField="name"
                      sortDirection="asc"
                    />
                  ) : (
                    <div className="empty">
                      <div className="empty-img">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-package" width="50" height="50" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                          <polyline points="12 3 20 7.5 20 16.5 12 21 4 16.5 4 7.5 12 3"></polyline>
                          <line x1="12" y1="12" x2="20" y2="7.5"></line>
                          <line x1="12" y1="12" x2="12" y2="21"></line>
                          <line x1="12" y1="12" x2="4" y2="7.5"></line>
                        </svg>
                      </div>
                      <p className="empty-title">ไม่มีสินค้าที่ใช้หน่วยวัดนี้</p>
                      <p className="empty-subtitle text-muted">
                        คุณสามารถเพิ่มสินค้าใหม่และเลือกหน่วยวัดนี้ได้
                      </p>
                      <div className="empty-action">
                        <Link href={route('products.create')} className="btn btn-primary">
                          <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                          </svg>
                          เพิ่มสินค้าใหม่
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  )
} 