import { useState, FormEvent, useEffect } from 'react'
import { Head, useForm, Link, router } from '@inertiajs/react'
import { PageProps } from '@/types'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import Breadcrumbs from '@/Components/Breadcrumbs'

interface Supplier {
  id: number
  name: string
}

interface Product {
  id: number
  name: string
  code: string
  image: string | null
  unit_price: number
  quantity: number
}

interface PurchaseItem {
  product_id: number
  name: string
  code: string
  quantity: number
  unit_price: number
  sub_total: number
}

interface CreateProps extends PageProps {
  suppliers: Supplier[]
  reference_no: string
}

export default function Create({ auth, suppliers, reference_no }: CreateProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState<Product[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [purchaseItems, setPurchaseItems] = useState<PurchaseItem[]>([])
  const [totalAmount, setTotalAmount] = useState(0)

  const { data, setData, post, errors, processing } = useForm({
    reference_no: reference_no,
    supplier_id: '',
    purchase_date: new Date().toISOString().split('T')[0],
    purchase_status: '0', // 0=รออนุมัติ, 1=เสร็จสิ้น
    payment_status: '0', // 0=ยังไม่ชำระ, 1=ชำระบางส่วน, 2=ชำระแล้ว
    paid_amount: 0,
    total_amount: 0,
    purchase_note: '',
    purchase_items: JSON.stringify([])
  })

  const breadcrumbsItems = [
    { title: 'หน้าหลัก', url: route('dashboard') },
    { title: 'รายการสั่งซื้อสินค้าเข้า', url: route('purchases.index') },
    { title: 'เพิ่มรายการใหม่', url: undefined }
  ]

  useEffect(() => {
    // คำนวณยอดรวมทุกครั้งที่รายการสินค้าเปลี่ยนแปลง
    calculateTotal()
  }, [purchaseItems])

  const searchProducts = () => {
    if (!searchTerm) return

    setIsSearching(true)
    
    router.get(
      route('api.search.products'),
      { term: searchTerm },
      {
        preserveState: true,
        onSuccess: (page: any) => {
          const products = page.props.products || []
          setSearchResults(products)
          setIsSearching(false)
        },
        onError: () => {
          setIsSearching(false)
        }
      }
    )
  }

  const addToCart = (product: Product) => {
    // ตรวจสอบว่ามีสินค้านี้ในรายการหรือไม่
    const existingItemIndex = purchaseItems.findIndex(item => item.product_id === product.id)
    
    if (existingItemIndex !== -1) {
      // ถ้ามีแล้ว เพิ่มจำนวน
      const updatedItems = [...purchaseItems]
      updatedItems[existingItemIndex].quantity += 1
      updatedItems[existingItemIndex].sub_total = 
        updatedItems[existingItemIndex].quantity * updatedItems[existingItemIndex].unit_price
      
      setPurchaseItems(updatedItems)
    } else {
      // ถ้ายังไม่มี เพิ่มรายการใหม่
      const newItem: PurchaseItem = {
        product_id: product.id,
        name: product.name,
        code: product.code,
        quantity: 1,
        unit_price: product.unit_price,
        sub_total: product.unit_price
      }
      
      setPurchaseItems([...purchaseItems, newItem])
    }
    
    // ล้างการค้นหาเมื่อเพิ่มสินค้าแล้ว
    setSearchTerm('')
    setSearchResults([])
  }

  const updateQuantity = (index: number, value: number) => {
    if (value < 1) value = 1
    
    const updatedItems = [...purchaseItems]
    updatedItems[index].quantity = value
    updatedItems[index].sub_total = value * updatedItems[index].unit_price
    
    setPurchaseItems(updatedItems)
  }

  const updateUnitPrice = (index: number, value: number) => {
    if (value < 0) value = 0
    
    const updatedItems = [...purchaseItems]
    updatedItems[index].unit_price = value
    updatedItems[index].sub_total = updatedItems[index].quantity * value
    
    setPurchaseItems(updatedItems)
  }

  const removeItem = (index: number) => {
    const updatedItems = [...purchaseItems]
    updatedItems.splice(index, 1)
    setPurchaseItems(updatedItems)
  }

  const calculateTotal = () => {
    const total = purchaseItems.reduce((sum, item) => sum + item.sub_total, 0)
    setTotalAmount(total)
    setData('total_amount', total)
    setData('purchase_items', JSON.stringify(purchaseItems))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    
    if (purchaseItems.length === 0) {
      alert('กรุณาเพิ่มสินค้าอย่างน้อย 1 รายการ')
      return
    }
    
    // เตรียมข้อมูลสำหรับส่ง
    setData('purchase_items', JSON.stringify(purchaseItems))
    
    post(route('purchases.store'))
  }

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="row g-2 align-items-center">
          <div className="col">
            <h2 className="page-title">เพิ่มรายการสั่งซื้อใหม่</h2>
          </div>
        </div>
      }
    >
      <Head title="เพิ่มรายการสั่งซื้อใหม่" />

      <div className="page-body">
        <div className="container-xl">
          <Breadcrumbs items={breadcrumbsItems} />

          <div className="row">
            <div className="col-12">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-4">
                    <div className="card">
                      <div className="card-header">
                        <h3 className="card-title">ข้อมูลการสั่งซื้อ</h3>
                      </div>
                      <div className="card-body">
                        <div className="mb-3">
                          <label className="form-label required" htmlFor="reference_no">เลขที่อ้างอิง</label>
                          <input
                            id="reference_no"
                            type="text"
                            className={`form-control ${errors.reference_no ? 'is-invalid' : ''}`}
                            value={data.reference_no}
                            onChange={(e) => setData('reference_no', e.target.value)}
                            readOnly
                          />
                          {errors.reference_no && <div className="invalid-feedback">{errors.reference_no}</div>}
                        </div>

                        <div className="mb-3">
                          <label className="form-label required" htmlFor="supplier_id">ซัพพลายเออร์</label>
                          <select
                            id="supplier_id"
                            className={`form-select ${errors.supplier_id ? 'is-invalid' : ''}`}
                            value={data.supplier_id}
                            onChange={(e) => setData('supplier_id', e.target.value)}
                            required
                          >
                            <option value="">เลือกซัพพลายเออร์</option>
                            {suppliers.map((supplier) => (
                              <option key={supplier.id} value={supplier.id}>{supplier.name}</option>
                            ))}
                          </select>
                          {errors.supplier_id && <div className="invalid-feedback">{errors.supplier_id}</div>}
                        </div>

                        <div className="mb-3">
                          <label className="form-label required" htmlFor="purchase_date">วันที่สั่งซื้อ</label>
                          <input
                            id="purchase_date"
                            type="date"
                            className={`form-control ${errors.purchase_date ? 'is-invalid' : ''}`}
                            value={data.purchase_date}
                            onChange={(e) => setData('purchase_date', e.target.value)}
                            required
                          />
                          {errors.purchase_date && <div className="invalid-feedback">{errors.purchase_date}</div>}
                        </div>

                        <div className="mb-3">
                          <label className="form-label required" htmlFor="purchase_status">สถานะการสั่งซื้อ</label>
                          <select
                            id="purchase_status"
                            className={`form-select ${errors.purchase_status ? 'is-invalid' : ''}`}
                            value={data.purchase_status}
                            onChange={(e) => setData('purchase_status', e.target.value)}
                            required
                          >
                            <option value="0">รออนุมัติ</option>
                            <option value="1">เสร็จสิ้น</option>
                          </select>
                          {errors.purchase_status && <div className="invalid-feedback">{errors.purchase_status}</div>}
                        </div>

                        <div className="mb-3">
                          <label className="form-label required" htmlFor="payment_status">สถานะการชำระเงิน</label>
                          <select
                            id="payment_status"
                            className={`form-select ${errors.payment_status ? 'is-invalid' : ''}`}
                            value={data.payment_status}
                            onChange={(e) => setData('payment_status', e.target.value)}
                            required
                          >
                            <option value="0">ยังไม่ชำระ</option>
                            <option value="1">ชำระบางส่วน</option>
                            <option value="2">ชำระแล้ว</option>
                          </select>
                          {errors.payment_status && <div className="invalid-feedback">{errors.payment_status}</div>}
                        </div>

                        {data.payment_status === '1' && (
                          <div className="mb-3">
                            <label className="form-label required" htmlFor="paid_amount">จำนวนเงินที่ชำระแล้ว</label>
                            <input
                              id="paid_amount"
                              type="number"
                              className={`form-control ${errors.paid_amount ? 'is-invalid' : ''}`}
                              value={data.paid_amount}
                              onChange={(e) => setData('paid_amount', parseFloat(e.target.value))}
                              required
                              min="0"
                              step="0.01"
                            />
                            {errors.paid_amount && <div className="invalid-feedback">{errors.paid_amount}</div>}
                          </div>
                        )}

                        <div className="mb-3">
                          <label className="form-label" htmlFor="purchase_note">หมายเหตุ</label>
                          <textarea
                            id="purchase_note"
                            className={`form-control ${errors.purchase_note ? 'is-invalid' : ''}`}
                            value={data.purchase_note}
                            onChange={(e) => setData('purchase_note', e.target.value)}
                            rows={3}
                          ></textarea>
                          {errors.purchase_note && <div className="invalid-feedback">{errors.purchase_note}</div>}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-8">
                    <div className="card mb-3">
                      <div className="card-header">
                        <h3 className="card-title">ค้นหาสินค้า</h3>
                      </div>
                      <div className="card-body">
                        <div className="row g-2">
                          <div className="col">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="พิมพ์ชื่อหรือรหัสสินค้า"
                              value={searchTerm}
                              onChange={(e) => setSearchTerm(e.target.value)}
                              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), searchProducts())}
                            />
                          </div>
                          <div className="col-auto">
                            <button 
                              type="button" 
                              className="btn btn-primary"
                              onClick={searchProducts}
                              disabled={isSearching}
                            >
                              {isSearching ? 'กำลังค้นหา...' : 'ค้นหา'}
                            </button>
                          </div>
                        </div>

                        {searchResults.length > 0 && (
                          <div className="table-responsive mt-3">
                            <table className="table table-vcenter card-table">
                              <thead>
                                <tr>
                                  <th>รหัส</th>
                                  <th>ชื่อสินค้า</th>
                                  <th>ราคา</th>
                                  <th>จัดการ</th>
                                </tr>
                              </thead>
                              <tbody>
                                {searchResults.map((product) => (
                                  <tr key={product.id}>
                                    <td>{product.code}</td>
                                    <td>{product.name}</td>
                                    <td>฿{(product.unit_price / 100).toLocaleString('th-TH', { minimumFractionDigits: 2 })}</td>
                                    <td>
                                      <button 
                                        type="button" 
                                        className="btn btn-sm btn-primary" 
                                        onClick={() => addToCart(product)}
                                      >
                                        เพิ่ม
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="card">
                      <div className="card-header">
                        <h3 className="card-title">รายการสินค้า</h3>
                      </div>
                      <div className="card-body">
                        <div className="table-responsive">
                          <table className="table table-vcenter card-table">
                            <thead>
                              <tr>
                                <th>รหัส</th>
                                <th>ชื่อสินค้า</th>
                                <th className="w-15">จำนวน</th>
                                <th className="w-20">ราคาต่อหน่วย</th>
                                <th className="w-20">รวม</th>
                                <th className="w-10">จัดการ</th>
                              </tr>
                            </thead>
                            <tbody>
                              {purchaseItems.length > 0 ? (
                                purchaseItems.map((item, index) => (
                                  <tr key={index}>
                                    <td>{item.code}</td>
                                    <td>{item.name}</td>
                                    <td>
                                      <input 
                                        type="number" 
                                        className="form-control" 
                                        min="1"
                                        value={item.quantity}
                                        onChange={(e) => updateQuantity(index, parseInt(e.target.value, 10))}
                                      />
                                    </td>
                                    <td>
                                      <div className="input-group">
                                        <span className="input-group-text">฿</span>
                                        <input 
                                          type="number" 
                                          className="form-control" 
                                          min="0"
                                          step="0.01"
                                          value={(item.unit_price / 100).toFixed(2)}
                                          onChange={(e) => updateUnitPrice(index, parseFloat(e.target.value) * 100)}
                                        />
                                      </div>
                                    </td>
                                    <td>฿{(item.sub_total / 100).toLocaleString('th-TH', { minimumFractionDigits: 2 })}</td>
                                    <td>
                                      <button 
                                        type="button" 
                                        className="btn btn-sm btn-danger" 
                                        onClick={() => removeItem(index)}
                                      >
                                        ลบ
                                      </button>
                                    </td>
                                  </tr>
                                ))
                              ) : (
                                <tr>
                                  <td colSpan={6} className="text-center py-3">
                                    ยังไม่มีรายการสินค้า
                                  </td>
                                </tr>
                              )}
                            </tbody>
                            <tfoot>
                              <tr>
                                <th colSpan={4} className="text-end">ยอดรวมทั้งสิ้น:</th>
                                <th>฿{(totalAmount / 100).toLocaleString('th-TH', { minimumFractionDigits: 2 })}</th>
                                <th></th>
                              </tr>
                            </tfoot>
                          </table>
                        </div>
                      </div>
                      <div className="card-footer text-end">
                        <Link href={route('purchases.index')} className="btn btn-outline-secondary me-2">
                          ยกเลิก
                        </Link>
                        <button type="submit" className="btn btn-primary" disabled={processing || purchaseItems.length === 0}>
                          {processing ? 'กำลังบันทึก...' : 'บันทึกข้อมูล'}
                        </button>
                      </div>
                    </div>
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