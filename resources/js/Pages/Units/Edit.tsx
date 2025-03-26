import { Head, Link, useForm } from '@inertiajs/react'
import { PageProps } from '@/types'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import Breadcrumbs from '@/Components/Breadcrumbs'

interface Unit {
  id: number
  name: string
  slug: string
  short_code: string
}

interface EditProps extends PageProps {
  unit: Unit
}

export default function Edit({ auth, unit }: EditProps) {
  const { data, setData, post, processing, errors } = useForm({
    name: unit.name || '',
    slug: unit.slug || '',
    short_code: unit.short_code || '',
    _method: 'put',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    post(route('units.update', unit.slug))
  }

  const breadcrumbsItems = [
    { title: 'หน้าหลัก', url: route('dashboard') },
    { title: 'หน่วยวัด', url: route('units.index') },
    { title: unit.name, url: route('units.show', unit.slug) },
    { title: 'แก้ไข', url: undefined }
  ]

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="row g-2 align-items-center">
          <div className="col">
            <div className="page-pretitle">ฟอร์ม</div>
            <h2 className="page-title">แก้ไขหน่วยวัด: {unit.name}</h2>
          </div>
        </div>
      }
    >
      <Head title={`แก้ไขหน่วยวัด: ${unit.name}`} />

      <div className="page-body">
        <div className="container-xl">
          <Breadcrumbs items={breadcrumbsItems} />

          <div className="row row-cards">
            <div className="col-12">
              <form onSubmit={handleSubmit} className="card">
                <div className="card-header">
                  <h4 className="card-title">ข้อมูลหน่วยวัด</h4>
                </div>
                <div className="card-body">
                  <div className="mb-3 row">
                    <label className="col-3 col-form-label required">ชื่อหน่วยวัด</label>
                    <div className="col">
                      <input 
                        type="text" 
                        className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                        placeholder="เช่น กล่อง, ชิ้น, เมตร" 
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                      />
                      {errors.name && (
                        <div className="invalid-feedback">{errors.name}</div>
                      )}
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label className="col-3 col-form-label required">Slug</label>
                    <div className="col">
                      <input 
                        type="text" 
                        className={`form-control ${errors.slug ? 'is-invalid' : ''}`}
                        placeholder="slug-url-format" 
                        value={data.slug}
                        onChange={(e) => setData('slug', e.target.value)}
                      />
                      {errors.slug && (
                        <div className="invalid-feedback">{errors.slug}</div>
                      )}
                      <small className="form-hint">
                        ใช้สำหรับ URL และระบบภายใน ควรเป็นภาษาอังกฤษ ตัวพิมพ์เล็ก ไม่มีช่องว่าง
                      </small>
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label className="col-3 col-form-label required">โค้ดย่อ</label>
                    <div className="col">
                      <input 
                        type="text" 
                        className={`form-control ${errors.short_code ? 'is-invalid' : ''}`}
                        placeholder="เช่น pcs, kg, m" 
                        value={data.short_code}
                        onChange={(e) => setData('short_code', e.target.value)}
                      />
                      {errors.short_code && (
                        <div className="invalid-feedback">{errors.short_code}</div>
                      )}
                      <small className="form-hint">
                        ใช้แสดงตัวย่อสั้นๆ ของหน่วยวัด เช่น pcs, kg, m
                      </small>
                    </div>
                  </div>
                </div>
                <div className="card-footer text-end">
                  <div className="d-flex">
                    <Link 
                      href={route('units.index')} 
                      className="btn btn-link"
                    >
                      ยกเลิก
                    </Link>
                    <button 
                      type="submit" 
                      className="btn btn-primary ms-auto"
                      disabled={processing}
                    >
                      อัปเดตข้อมูล
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  )
} 