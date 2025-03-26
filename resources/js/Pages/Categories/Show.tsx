import { Head, Link } from '@inertiajs/react'
import { PageProps } from '@/types'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import Breadcrumbs from '@/Components/Breadcrumbs'
import DataTable from '@/Components/Table/DataTable'

interface Category {
  id: number
  name: string
  slug: string
  created_at: string
  updated_at: string
}

interface Product {
  id: number
  name: string
  code: string
  selling_price: number
  quantity: number
  unit: {
    id: number
    name: string
  } | null
}

interface ShowProps extends PageProps {
  category: Category
  products: Product[]
}

export default function Show({ auth, category, products }: ShowProps) {
  // คอลัมน์ตาราง
  const columns = [
    {
      field: 'name',
      label: 'ชื่อสินค้า',
      render: (product: Product) => (
        <div>
          <div className="font-medium text-gray-900">{product.name}</div>
        </div>
      )
    },
    {
      field: 'code',
      label: 'รหัสสินค้า'
    },
    {
      field: 'unit.name',
      label: 'หน่วย',
      render: (product: Product) => product.unit?.name || '-'
    },
    {
      field: 'quantity',
      label: 'จำนวน'
    },
    {
      field: 'selling_price',
      label: 'ราคาขาย',
      render: (product: Product) => (
        <span>฿{product.selling_price.toLocaleString('th-TH')}</span>
      )
    },
    {
      field: 'actions',
      label: 'จัดการ',
      className: 'w-1',
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

  const breadcrumbsItems = [
    { title: 'หน้าหลัก', url: route('dashboard') },
    { title: 'หมวดหมู่', url: route('categories.index') },
    { title: category.name, url: undefined }
  ]

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="row g-2 align-items-center">
          <div className="container-xl">
            <div className="page-pretitle">รายละเอียด</div>
            <h2 className="page-title">หมวดหมู่: {category.name}</h2>
          </div>
        </div>
      }
    >
      <Head title={`รายละเอียดหมวดหมู่ - ${category.name}`} />

      <div className="page-body">
        <div className="container-xl">
          <Breadcrumbs items={breadcrumbsItems} />
          
          <div className="row">
            <div className="col-md-4">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">ข้อมูลหมวดหมู่</h3>
                  <div className="card-actions">
                    <Link href={route('categories.edit', category.id)} className="btn btn-primary">
                      แก้ไขข้อมูล
                    </Link>
                  </div>
                </div>
                <div className="card-body">
                  <div className="mb-3">
                    <div className="row">
                      <div className="col-md-4 fw-bold">ชื่อ</div>
                      <div className="col-md-8">{category.name}</div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="row">
                      <div className="col-md-4 fw-bold">Slug</div>
                      <div className="col-md-8">{category.slug}</div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="row">
                      <div className="col-md-4 fw-bold">วันที่สร้าง</div>
                      <div className="col-md-8">{new Date(category.created_at).toLocaleDateString('th-TH')}</div>
                    </div>
                  </div>
                  <div>
                    <div className="row">
                      <div className="col-md-4 fw-bold">อัปเดตล่าสุด</div>
                      <div className="col-md-8">{new Date(category.updated_at).toLocaleDateString('th-TH')}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-md-8">
              <DataTable
                data={products}
                columns={columns}
                title={`สินค้าในหมวดหมู่ (${products.length})`}
                noDataText="ไม่พบสินค้าในหมวดหมู่นี้"
              />
            </div>
          </div>
          
          <div className="mt-3">
            <Link href={route('categories.index')} className="btn btn-link">
              กลับไปยังรายการหมวดหมู่
            </Link>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  )
} 