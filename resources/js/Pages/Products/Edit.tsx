import { useState, useEffect } from 'react'
import { Head, useForm, Link } from '@inertiajs/react'
import { PageProps } from '@/types'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import Breadcrumbs from '@/Components/Breadcrumbs'

interface Category {
  id: number
  name: string
}

interface Unit {
  id: number
  name: string
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
  category_id: number
  unit_id: number
  created_at: string
  updated_at: string
}

interface EditProps extends PageProps {
  categories: Category[]
  units: Unit[]
  product: Product
}

export default function Edit({ auth, categories, units, product }: EditProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(
    product.product_image ? `/storage/products/${product.product_image}` : null
  )

  const { data, setData, post, errors, processing } = useForm({
    _method: 'PUT',
    name: product.name || '',
    slug: product.slug || '',
    category_id: product.category_id || (categories.length > 0 ? categories[0].id : ''),
    unit_id: product.unit_id || (units.length > 0 ? units[0].id : ''),
    quantity: product.quantity || 0,
    quantity_alert: product.quantity_alert || 0,
    buying_price: product.buying_price || 0,
    selling_price: product.selling_price || 0,
    tax: product.tax || 0,
    tax_type: product.tax_type || 0,
    product_image: null as File | null,
    notes: product.notes || '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    post(route('products.update', product.slug))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setData('product_image', file)
      
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          setImagePreview(e.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const breadcrumbsItems = [
    { title: 'หน้าหลัก', url: route('dashboard') },
    { title: 'สินค้า', url: route('products.index') },
    { title: product.name, url: route('products.show', product.slug) },
    { title: 'แก้ไข', url: undefined }
  ]

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="page-header d-print-none">
          <div className="container-xl">
            <div className="page-pretitle">ฟอร์ม</div>
            <h2 className="page-title">แก้ไขสินค้า: {product.name}</h2>
          </div>
        </div>
      }
    >
      <Head title={`แก้ไขสินค้า: ${product.name}`} />

      <div className="page-body">
        <div className="container-xl">
          <Breadcrumbs items={breadcrumbsItems} />

          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="row">
              <div className="col-lg-4">
                <div className="card">
                  <div className="card-body">
                    <h3 className="card-title">รูปสินค้า</h3>

                    <img
                      className="img-account-profile mb-2 img-thumbnail"
                      src={imagePreview || '/assets/img/demo/product-placeholder.png'}
                      alt="รูปสินค้า"
                      style={{ maxWidth: '100%', height: 'auto' }}
                    />

                    <div className="small font-italic text-muted mb-2">
                      JPG หรือ PNG ขนาดไม่เกิน 2 MB
                    </div>

                    <input
                      className={`form-control ${errors.product_image ? 'is-invalid' : ''}`}
                      type="file"
                      id="image"
                      name="product_image"
                      accept="image/*"
                      onChange={handleImageChange}
                    />

                    {errors.product_image && (
                      <div className="invalid-feedback">{errors.product_image}</div>
                    )}
                  </div>
                </div>
              </div>

              <div className="col-lg-8">
                <div className="card">
                  <div className="card-body">
                    <h3 className="card-title">รายละเอียดสินค้า</h3>

                    <div className="row row-cards">
                      <div className="col-md-12">
                        <div className="mb-3">
                          <label htmlFor="name" className="form-label required">
                            ชื่อสินค้า
                          </label>
                          <input
                            id="name"
                            type="text"
                            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                          />
                          {errors.name && (
                            <div className="invalid-feedback">{errors.name}</div>
                          )}
                        </div>

                        <div className="mb-3">
                          <label htmlFor="slug" className="form-label required">
                            Slug
                          </label>
                          <input
                            id="slug"
                            type="text"
                            className={`form-control ${errors.slug ? 'is-invalid' : ''}`}
                            value={data.slug}
                            onChange={(e) => setData('slug', e.target.value)}
                          />
                          {errors.slug && (
                            <div className="invalid-feedback">{errors.slug}</div>
                          )}
                          <small className="text-muted">
                            ใช้สำหรับ URL และระบบภายใน ควรเป็นตัวพิมพ์เล็ก ไม่มีช่องว่าง
                          </small>
                        </div>

                        <div className="mb-3">
                          <label htmlFor="category_id" className="form-label required">
                            หมวดหมู่
                          </label>
                          <select
                            id="category_id"
                            className={`form-select ${errors.category_id ? 'is-invalid' : ''}`}
                            value={data.category_id}
                            onChange={(e) => setData('category_id', e.target.value)}
                          >
                            {categories.map((category) => (
                              <option key={category.id} value={category.id}>
                                {category.name}
                              </option>
                            ))}
                          </select>
                          {errors.category_id && (
                            <div className="invalid-feedback">{errors.category_id}</div>
                          )}
                        </div>

                        <div className="mb-3">
                          <label htmlFor="unit_id" className="form-label required">
                            หน่วยวัด
                          </label>
                          <select
                            id="unit_id"
                            className={`form-select ${errors.unit_id ? 'is-invalid' : ''}`}
                            value={data.unit_id}
                            onChange={(e) => setData('unit_id', e.target.value)}
                          >
                            {units.map((unit) => (
                              <option key={unit.id} value={unit.id}>
                                {unit.name}
                              </option>
                            ))}
                          </select>
                          {errors.unit_id && (
                            <div className="invalid-feedback">{errors.unit_id}</div>
                          )}
                        </div>
                      </div>

                      <div className="col-sm-6 col-md-4">
                        <div className="mb-3">
                          <label htmlFor="quantity" className="form-label required">
                            จำนวนคงเหลือ
                          </label>
                          <input
                            id="quantity"
                            type="number"
                            className={`form-control ${errors.quantity ? 'is-invalid' : ''}`}
                            value={data.quantity}
                            onChange={(e) => setData('quantity', Number(e.target.value))}
                            min="0"
                          />
                          {errors.quantity && (
                            <div className="invalid-feedback">{errors.quantity}</div>
                          )}
                        </div>
                      </div>

                      <div className="col-sm-6 col-md-4">
                        <div className="mb-3">
                          <label htmlFor="quantity_alert" className="form-label required">
                            จำนวนแจ้งเตือน
                          </label>
                          <input
                            id="quantity_alert"
                            type="number"
                            className={`form-control ${errors.quantity_alert ? 'is-invalid' : ''}`}
                            value={data.quantity_alert}
                            onChange={(e) => setData('quantity_alert', Number(e.target.value))}
                            min="0"
                          />
                          {errors.quantity_alert && (
                            <div className="invalid-feedback">{errors.quantity_alert}</div>
                          )}
                          <small className="text-muted">
                            แจ้งเตือนเมื่อสินค้าในสต๊อกต่ำกว่านี้
                          </small>
                        </div>
                      </div>

                      <div className="col-sm-6 col-md-4">
                        <div className="mb-3">
                          <label htmlFor="buying_price" className="form-label required">
                            ราคาซื้อ (บาท)
                          </label>
                          <input
                            id="buying_price"
                            type="number"
                            className={`form-control ${errors.buying_price ? 'is-invalid' : ''}`}
                            value={data.buying_price}
                            onChange={(e) => setData('buying_price', Number(e.target.value))}
                            min="0"
                            step="0.01"
                          />
                          {errors.buying_price && (
                            <div className="invalid-feedback">{errors.buying_price}</div>
                          )}
                        </div>
                      </div>

                      <div className="col-sm-6 col-md-4">
                        <div className="mb-3">
                          <label htmlFor="selling_price" className="form-label required">
                            ราคาขาย (บาท)
                          </label>
                          <input
                            id="selling_price"
                            type="number"
                            className={`form-control ${errors.selling_price ? 'is-invalid' : ''}`}
                            value={data.selling_price}
                            onChange={(e) => setData('selling_price', Number(e.target.value))}
                            min="0"
                            step="0.01"
                          />
                          {errors.selling_price && (
                            <div className="invalid-feedback">{errors.selling_price}</div>
                          )}
                        </div>
                      </div>

                      <div className="col-sm-6 col-md-4">
                        <div className="mb-3">
                          <label htmlFor="tax" className="form-label">
                            ภาษี (%)
                          </label>
                          <input
                            id="tax"
                            type="number"
                            className={`form-control ${errors.tax ? 'is-invalid' : ''}`}
                            value={data.tax}
                            onChange={(e) => setData('tax', Number(e.target.value))}
                            min="0"
                            max="100"
                            step="0.01"
                          />
                          {errors.tax && (
                            <div className="invalid-feedback">{errors.tax}</div>
                          )}
                        </div>
                      </div>

                      <div className="col-sm-6 col-md-4">
                        <div className="mb-3">
                          <label htmlFor="tax_type" className="form-label">
                            ประเภทภาษี
                          </label>
                          <select
                            id="tax_type"
                            className={`form-select ${errors.tax_type ? 'is-invalid' : ''}`}
                            value={data.tax_type}
                            onChange={(e) => setData('tax_type', Number(e.target.value))}
                          >
                            <option value="0">รวมในราคาสินค้า</option>
                            <option value="1">แยกต่างหาก</option>
                          </select>
                          {errors.tax_type && (
                            <div className="invalid-feedback">{errors.tax_type}</div>
                          )}
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="mb-3">
                          <label htmlFor="notes" className="form-label">
                            หมายเหตุ
                          </label>
                          <textarea
                            id="notes"
                            className={`form-control ${errors.notes ? 'is-invalid' : ''}`}
                            rows={3}
                            value={data.notes}
                            onChange={(e) => setData('notes', e.target.value)}
                          ></textarea>
                          {errors.notes && (
                            <div className="invalid-feedback">{errors.notes}</div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="card-footer text-end">
                    <button 
                      type="submit" 
                      className="btn btn-primary"
                      disabled={processing}
                    >
                      บันทึก
                    </button>
                    <Link
                      href={route('products.show', product.slug)}
                      className="btn btn-outline-secondary ms-2"
                    >
                      ยกเลิก
                    </Link>
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