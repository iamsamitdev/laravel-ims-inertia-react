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
  id?: number
  product_id: number
  name: string
  code: string
  quantity: number
  unit_price: number
  sub_total: number
}

interface PurchaseDetail {
  id: number
  purchase_id: number
  product_id: number
  quantity: number
  unit_price: number
  sub_total: number
  product: {
    id: number
    name: string
    code: string
  }
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

interface EditProps extends PageProps {
  purchase: Purchase
  suppliers: Supplier[]
}

export default function Edit({ auth, purchase, suppliers }: EditProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState<Product[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [purchaseItems, setPurchaseItems] = useState<PurchaseItem[]>([])
  const [totalAmount, setTotalAmount] = useState(purchase.total_amount / 100)

  // แปลง purchase.details เป็น purchaseItems
  useEffect(() => {
    const items = purchase.details.map(detail => ({
      id: detail.id,
      product_id: detail.product_id,
      name: detail.product.name,
      code: detail.product.code,
      quantity: detail.quantity,
      unit_price: detail.unit_price / 100,
      sub_total: detail.sub_total / 100
    }))
    
    setPurchaseItems(items)
  }, [purchase.details])

  const { data, setData, put, errors, processing } = useForm({
    reference_no: purchase.reference_no,
    supplier_id: purchase.supplier_id.toString(),
    purchase_date: new Date(purchase.purchase_date).toISOString().split('T')[0],
    purchase_status: purchase.purchase_status.value.toString(),
    payment_status: purchase.payment_status.value.toString(),
    paid_amount: purchase.paid_amount / 100,
    total_amount: purchase.total_amount / 100,
    purchase_note: purchase.purchase_note || '',
    purchase_items: JSON.stringify(purchaseItems)
  })

  // ค้นหาสินค้า
  const searchProducts = () => {
    if (!searchTerm.trim()) return
    
    setIsSearching(true)
    
    router.get(
      route('purchases.search-product'),
      { search: searchTerm },
      {
        preserveState: true,
        onSuccess: (page) => {
          setSearchResults(Array.isArray(page.props.products) ? page.props.products : [])
          setIsSearching(false)
        },
        onError: () => {
          setIsSearching(false)
        }
      }
    )
  }

  // เพิ่มสินค้าลงตะกร้า
  const addToCart = (product: Product) => {
    // ตรวจสอบว่ามีสินค้านี้ในตะกร้าแล้วหรือไม่
    const existingItemIndex = purchaseItems.findIndex(
      item => item.product_id === product.id
    )
    
    if (existingItemIndex !== -1) {
      // หากมีสินค้าอยู่แล้ว เพิ่มจำนวน
      const updatedItems = [...purchaseItems]
      updatedItems[existingItemIndex].quantity += 1
      updatedItems[existingItemIndex].sub_total = 
        updatedItems[existingItemIndex].quantity * updatedItems[existingItemIndex].unit_price
      
      setPurchaseItems(updatedItems)
    } else {
      // หากยังไม่มีสินค้า เพิ่มสินค้าใหม่
      const newItem: PurchaseItem = {
        product_id: product.id,
        name: product.name,
        code: product.code,
        quantity: 1,
        unit_price: product.unit_price / 100,
        sub_total: product.unit_price / 100
      }
      
      setPurchaseItems([...purchaseItems, newItem])
    }
    
    // ล้างผลการค้นหา
    setSearchTerm('')
    setSearchResults([])
  }

  // อัปเดตจำนวนสินค้า
  const updateQuantity = (index: number, value: number) => {
    const updatedItems = [...purchaseItems]
    updatedItems[index].quantity = value
    updatedItems[index].sub_total = value * updatedItems[index].unit_price
    
    setPurchaseItems(updatedItems)
  }

  // อัปเดตราคาต่อหน่วย
  const updateUnitPrice = (index: number, value: number) => {
    const updatedItems = [...purchaseItems]
    updatedItems[index].unit_price = value
    updatedItems[index].sub_total = value * updatedItems[index].quantity
    
    setPurchaseItems(updatedItems)
  }

  // ลบสินค้าออกจากตะกร้า
  const removeItem = (index: number) => {
    const updatedItems = purchaseItems.filter((_, i) => i !== index)
    setPurchaseItems(updatedItems)
  }

  // คำนวณยอดรวม
  const calculateTotal = () => {
    return purchaseItems.reduce((total, item) => total + item.sub_total, 0)
  }

  // เมื่อมีการเปลี่ยนแปลงราคารวม
  useEffect(() => {
    const total = calculateTotal()
    setTotalAmount(total)
    setData('total_amount', total)
    
    // อัปเดต purchase_items ในฟอร์ม
    setData('purchase_items', JSON.stringify(purchaseItems))
  }, [purchaseItems])

  // ผูกค่า paid_amount กับ payment_status
  useEffect(() => {
    const paid = parseFloat(data.paid_amount as any || 0)
    
    if (paid <= 0) {
      setData('payment_status', '0') // ยังไม่ชำระ
    } else if (paid < totalAmount) {
      setData('payment_status', '1') // ชำระบางส่วน
    } else {
      setData('payment_status', '2') // ชำระแล้ว
    }
  }, [data.paid_amount, totalAmount])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    
    // ตรวจสอบว่ามีสินค้าในรายการหรือไม่
    if (purchaseItems.length === 0) {
      alert('กรุณาเพิ่มสินค้าอย่างน้อย 1 รายการ')
      return
    }
    
    put(route('purchases.update', purchase.id))
  }

  const breadcrumbsItems = [
    { title: 'หน้าหลัก', url: route('dashboard') },
    { title: 'รายการสั่งซื้อ', url: route('purchases.index') },
    { title: purchase.reference_no, url: route('purchases.show', purchase.id) },
    { title: 'แก้ไขรายการสั่งซื้อ', url: undefined }
  ]

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="row g-2 align-items-center">
          <div className="col">
            <h2 className="page-title">แก้ไขรายการสั่งซื้อ</h2>
          </div>
        </div>
      }
    >
      <Head title={`แก้ไขรายการสั่งซื้อ: ${purchase.reference_no}`} />

      <div className="page-body">
        <div className="container-xl">
          <Breadcrumbs items={breadcrumbsItems} />

          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-8">
                <div className="card mb-3">
                  <div className="card-header">
                    <h3 className="card-title">สินค้า</h3>
                  </div>
                  <div className="card-body">
                    <div className="mb-3">
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="ค้นหาสินค้าด้วยชื่อหรือรหัส"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button 
                          type="button" 
                          className="btn btn-primary" 
                          onClick={searchProducts}
                          disabled={isSearching}
                        >
                          {isSearching ? 'กำลังค้นหา...' : 'ค้นหา'}
                        </button>
                      </div>
                      
                      {searchResults.length > 0 && (
                        <div className="search-results mt-2">
                          <div className="list-group">
                            {searchResults.map((product) => (
                              <button
                                key={product.id}
                                type="button"
                                className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                                onClick={() => addToCart(product)}
                              >
                                <div>
                                  <span className="fw-bold">{product.name}</span>
                                  <span className="ms-2 text-muted">({product.code})</span>
                                </div>
                                <div>
                                  <span className="badge bg-primary">
                                    ฿{(product.unit_price / 100).toLocaleString('th-TH', { minimumFractionDigits: 2 })}
                                  </span>
                                  <span className="badge bg-secondary ms-1">
                                    คงเหลือ: {product.quantity}
                                  </span>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="mb-3">
                      <div className="table-responsive">
                        <table className="table table-vcenter">
                          <thead>
                            <tr>
                              <th>สินค้า</th>
                              <th style={{ width: '15%' }}>จำนวน</th>
                              <th style={{ width: '20%' }}>ราคา/หน่วย</th>
                              <th style={{ width: '20%' }}>รวม</th>
                              <th style={{ width: '5%' }}></th>
                            </tr>
                          </thead>
                          <tbody>
                            {purchaseItems.length === 0 ? (
                              <tr>
                                <td colSpan={5} className="text-center py-3">
                                  <div className="text-muted">ยังไม่มีสินค้าในรายการ ค้นหาและเพิ่มสินค้า</div>
                                </td>
                              </tr>
                            ) : (
                              purchaseItems.map((item, index) => (
                                <tr key={index}>
                                  <td>
                                    <div>{item.name}</div>
                                    <div className="text-muted">{item.code}</div>
                                  </td>
                                  <td>
                                    <input
                                      type="number"
                                      className="form-control"
                                      min="1"
                                      value={item.quantity}
                                      onChange={(e) => updateQuantity(index, parseInt(e.target.value))}
                                    />
                                  </td>
                                  <td>
                                    <div className="input-group">
                                      <span className="input-group-text">฿</span>
                                      <input
                                        type="number"
                                        className="form-control"
                                        min="0.01"
                                        step="0.01"
                                        value={item.unit_price}
                                        onChange={(e) => updateUnitPrice(index, parseFloat(e.target.value))}
                                      />
                                    </div>
                                  </td>
                                  <td>
                                    ฿{item.sub_total.toLocaleString('th-TH', { minimumFractionDigits: 2 })}
                                  </td>
                                  <td>
                                    <button
                                      type="button"
                                      className="btn btn-sm btn-danger"
                                      onClick={() => removeItem(index)}
                                    >
                                      <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                        <path d="M18 6l-12 12" />
                                        <path d="M6 6l12 12" />
                                      </svg>
                                    </button>
                                  </td>
                                </tr>
                              ))
                            )}
                          </tbody>
                          <tfoot>
                            <tr>
                              <th colSpan={3} className="text-end">ยอดรวมทั้งสิ้น:</th>
                              <th>฿{totalAmount.toLocaleString('th-TH', { minimumFractionDigits: 2 })}</th>
                              <th></th>
                            </tr>
                          </tfoot>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="card mb-3">
                  <div className="card-header">
                    <h3 className="card-title">ข้อมูลทั่วไป</h3>
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
                        disabled // ไม่อนุญาตให้เปลี่ยนซัพพลายเออร์เมื่อแก้ไข
                      >
                        <option value="">เลือกซัพพลายเออร์</option>
                        {suppliers.map((supplier) => (
                          <option key={supplier.id} value={supplier.id}>
                            {supplier.name}
                          </option>
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
                      >
                        <option value="0">รออนุมัติ</option>
                        <option value="1">เสร็จสิ้น</option>
                      </select>
                      {errors.purchase_status && <div className="invalid-feedback">{errors.purchase_status}</div>}
                    </div>

                    <div className="mb-3">
                      <label className="form-label" htmlFor="payment_status">สถานะการชำระเงิน</label>
                      <select
                        id="payment_status"
                        className={`form-select ${errors.payment_status ? 'is-invalid' : ''}`}
                        value={data.payment_status}
                        disabled
                      >
                        <option value="0">ยังไม่ชำระ</option>
                        <option value="1">ชำระบางส่วน</option>
                        <option value="2">ชำระแล้ว</option>
                      </select>
                      <small className="form-hint">สถานะการชำระเงินจะเปลี่ยนแปลงอัตโนมัติตามยอดเงินที่ชำระ</small>
                      {errors.payment_status && <div className="invalid-feedback">{errors.payment_status}</div>}
                    </div>

                    <div className="mb-3">
                      <label className="form-label" htmlFor="paid_amount">ยอดเงินที่ชำระแล้ว</label>
                      <div className="input-group">
                        <span className="input-group-text">฿</span>
                        <input
                          id="paid_amount"
                          type="number"
                          className={`form-control ${errors.paid_amount ? 'is-invalid' : ''}`}
                          value={data.paid_amount}
                          onChange={(e) => setData('paid_amount', parseFloat(e.target.value) || 0)}
                          min="0"
                          max={totalAmount}
                          step="0.01"
                        />
                        {errors.paid_amount && <div className="invalid-feedback">{errors.paid_amount}</div>}
                      </div>
                      <small className="form-hint">ยอดรวมทั้งสิ้น: ฿{totalAmount.toLocaleString('th-TH', { minimumFractionDigits: 2 })}</small>
                    </div>

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

                <div className="d-flex gap-3">
                  <Link href={route('purchases.show', purchase.id)} className="btn btn-outline-secondary w-100">
                    ยกเลิก
                  </Link>
                  <button type="submit" className="btn btn-primary w-100" disabled={processing}>
                    {processing ? 'กำลังบันทึก...' : 'บันทึกรายการ'}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </AuthenticatedLayout>
  )
} 