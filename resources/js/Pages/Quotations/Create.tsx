import { useState, useEffect, FormEvent } from 'react'
import { Head, useForm, Link, router } from '@inertiajs/react'
import { PageProps } from '@/types'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import Breadcrumbs from '@/Components/Breadcrumbs'
import TextInput from '@/Components/TextInput'
import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import SelectInput from '@/Components/SelectInput'
import TextArea from '@/Components/TextArea'

interface Product {
  id: number
  name: string
  code: string
  price: number
  stock: number
}

interface Customer {
  id: number
  name: string
  email: string
  phone: string
  address: string
}

interface QuotationItem {
  product_id: number
  product_name: string
  unit_price: number
  quantity: number
  total_price: number
}

interface CreateProps extends PageProps {
  customers: Customer[]
  products: Product[]
}

export default function Create({ auth, customers, products }: CreateProps) {
  const [loading, setLoading] = useState(false)
  const [items, setItems] = useState<QuotationItem[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState<Product[]>([])
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [subtotal, setSubtotal] = useState(0)
  const [taxRate, setTaxRate] = useState(7) // 7% VAT by default
  const [taxAmount, setTaxAmount] = useState(0)
  const [grandTotal, setGrandTotal] = useState(0)

  const { data, setData, post, processing, errors, reset } = useForm({
    customer_id: '',
    date: new Date().toISOString().split('T')[0], // วันที่ปัจจุบัน
    due_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 วันจากวันนี้
    reference: '',
    notes: '',
    terms: 'ราคานี้มีผลเป็นเวลา 30 วันนับจากวันที่ในใบเสนอราคา',
    status: '0', // Draft as default
    discount_type: 'fixed',
    discount_value: '0',
    discount_amount: '0',
    tax_rate: '7',
    tax_amount: '0',
    total_amount: '0',
    grand_total: '0',
    items: JSON.stringify([])
  })

  // คำนวณยอดรวมเมื่อรายการสินค้าเปลี่ยนแปลง
  useEffect(() => {
    if (items.length > 0) {
      const calculatedSubtotal = items.reduce((sum, item) => sum + item.total_price, 0)
      setSubtotal(calculatedSubtotal)
      
      const discountAmount = parseFloat(data.discount_amount) || 0
      const calculatedTaxAmount = ((calculatedSubtotal - discountAmount) * taxRate) / 100
      setTaxAmount(calculatedTaxAmount)
      
      const calculatedGrandTotal = calculatedSubtotal - discountAmount + calculatedTaxAmount
      setGrandTotal(calculatedGrandTotal)
      
      // อัปเดตข้อมูลฟอร์ม
      setData({
        ...data,
        total_amount: calculatedSubtotal.toString(),
        tax_amount: calculatedTaxAmount.toString(),
        grand_total: calculatedGrandTotal.toString(),
        items: JSON.stringify(items)
      })
    } else {
      setSubtotal(0)
      setTaxAmount(0)
      setGrandTotal(0)
      
      setData({
        ...data,
        total_amount: '0',
        tax_amount: '0',
        grand_total: '0',
        items: JSON.stringify([])
      })
    }
  }, [items, data.discount_amount, taxRate])

  // คำนวณส่วนลดเมื่อประเภทส่วนลดและมูลค่าเปลี่ยนแปลง
  useEffect(() => {
    let discountAmount = 0
    
    if (data.discount_type === 'percentage') {
      discountAmount = (subtotal * (parseFloat(data.discount_value) || 0)) / 100
    } else {
      discountAmount = parseFloat(data.discount_value) || 0
    }
    
    setData('discount_amount', discountAmount.toString())
  }, [data.discount_type, data.discount_value, subtotal])

  // ค้นหาสินค้า
  const handleSearchProducts = (term: string) => {
    setSearchTerm(term)
    if (term.length > 1) {
      const filtered = products.filter(
        p => p.name.toLowerCase().includes(term.toLowerCase()) || 
             p.code.toLowerCase().includes(term.toLowerCase())
      )
      setSearchResults(filtered.slice(0, 10)) // จำกัดผลลัพธ์ 10 รายการ
      setShowSearchResults(true)
    } else {
      setSearchResults([])
      setShowSearchResults(false)
    }
  }

  // เพิ่มสินค้าลงในรายการ
  const handleAddProduct = (product: Product) => {
    const existingItem = items.find(item => item.product_id === product.id)
    
    if (existingItem) {
      // อัปเดตจำนวนและราคารวมสำหรับรายการที่มีอยู่แล้ว
      const updatedItems = items.map(item => {
        if (item.product_id === product.id) {
          const newQuantity = item.quantity + 1
          return {
            ...item,
            quantity: newQuantity,
            total_price: newQuantity * item.unit_price
          }
        }
        return item
      })
      
      setItems(updatedItems)
    } else {
      // เพิ่มรายการใหม่
      const newItem: QuotationItem = {
        product_id: product.id,
        product_name: product.name,
        unit_price: product.price,
        quantity: 1,
        total_price: product.price
      }
      
      setItems([...items, newItem])
    }
    
    // ล้างการค้นหา
    setSearchTerm('')
    setShowSearchResults(false)
  }

  // อัปเดตจำนวนสินค้า
  const handleQuantityChange = (index: number, value: number) => {
    if (value <= 0) return // ไม่อนุญาตให้ใส่จำนวนน้อยกว่าหรือเท่ากับศูนย์
    
    const updatedItems = [...items]
    updatedItems[index].quantity = value
    updatedItems[index].total_price = value * updatedItems[index].unit_price
    
    setItems(updatedItems)
  }

  // อัปเดตราคาต่อหน่วย
  const handleUnitPriceChange = (index: number, value: number) => {
    if (value <= 0) return // ไม่อนุญาตให้ใส่ราคาน้อยกว่าหรือเท่ากับศูนย์
    
    const updatedItems = [...items]
    updatedItems[index].unit_price = value
    updatedItems[index].total_price = value * updatedItems[index].quantity
    
    setItems(updatedItems)
  }

  // ลบรายการสินค้า
  const handleRemoveItem = (index: number) => {
    const updatedItems = [...items]
    updatedItems.splice(index, 1)
    setItems(updatedItems)
  }

  // บันทึกใบเสนอราคา
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    
    if (items.length === 0) {
      alert('กรุณาเพิ่มสินค้าอย่างน้อย 1 รายการ')
      return
    }
    
    setLoading(true)
    
    post(route('quotations.store'), {
      onSuccess: () => {
        reset()
        setItems([])
        setLoading(false)
      },
      onError: () => {
        setLoading(false)
      }
    })
  }

  const breadcrumbsItems = [
    { title: 'หน้าหลัก', url: route('dashboard') },
    { title: 'ใบเสนอราคา', url: route('quotations.index') },
    { title: 'สร้างใหม่', url: undefined }
  ]

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="row g-2 align-items-center">
          <div className="col">
            <div className="page-pretitle">เอกสาร</div>
            <h2 className="page-title">สร้างใบเสนอราคาใหม่</h2>
          </div>
        </div>
      }
    >
      <Head title="สร้างใบเสนอราคาใหม่" />
      
      <div className="page-body">
        <div className="container-xl">
          <Breadcrumbs items={breadcrumbsItems} />
          
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-8">
                <div className="card mb-3">
                  <div className="card-header">
                    <h3 className="card-title">รายการสินค้า</h3>
                  </div>
                  <div className="card-body">
                    <div className="mb-3">
                      <InputLabel htmlFor="product_search" value="ค้นหาสินค้า" />
                      <div className="position-relative">
                        <TextInput
                          id="product_search"
                          className="block w-full mt-1"
                          value={searchTerm}
                          onChange={(e) => handleSearchProducts(e.target.value)}
                          placeholder="พิมพ์ชื่อหรือรหัสสินค้า"
                          autoComplete="off"
                        />
                        
                        {showSearchResults && searchResults.length > 0 && (
                          <div className="position-absolute start-0 end-0 mt-1 bg-white border rounded-3 shadow-sm z-9999 search-results">
                            <div className="list-group list-group-flush">
                              {searchResults.map(product => (
                                <button
                                  key={product.id}
                                  type="button"
                                  className="list-group-item list-group-item-action py-2"
                                  onClick={() => handleAddProduct(product)}
                                >
                                  <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                      <div className="fw-bold">{product.name}</div>
                                      <div className="text-muted small">รหัส: {product.code}</div>
                                    </div>
                                    <div className="text-end">
                                      <div>฿{(product.price / 100).toLocaleString('th-TH')}</div>
                                      <div className="text-muted small">คงเหลือ: {product.stock}</div>
                                    </div>
                                  </div>
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      {searchTerm && searchResults.length === 0 && showSearchResults && (
                        <div className="text-danger mt-1">ไม่พบสินค้าที่ค้นหา</div>
                      )}
                    </div>
                    
                    <div className="table-responsive">
                      <table className="table table-vcenter">
                        <thead>
                          <tr>
                            <th>สินค้า</th>
                            <th style={{ width: '140px' }}>ราคา/หน่วย</th>
                            <th style={{ width: '100px' }}>จำนวน</th>
                            <th style={{ width: '140px' }}>ยอดรวม</th>
                            <th style={{ width: '50px' }}></th>
                          </tr>
                        </thead>
                        <tbody>
                          {items.length === 0 ? (
                            <tr>
                              <td colSpan={5} className="text-center py-3">
                                ยังไม่มีรายการสินค้า
                              </td>
                            </tr>
                          ) : (
                            items.map((item, index) => (
                              <tr key={index}>
                                <td>{item.product_name}</td>
                                <td>
                                  <TextInput
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={item.unit_price / 100} // แสดงราคาในรูปแบบบาท
                                    onChange={(e) => handleUnitPriceChange(index, parseFloat(e.target.value) * 100)} // แปลงกลับเป็นสตางค์
                                  />
                                </td>
                                <td>
                                  <TextInput
                                    type="number"
                                    min="1"
                                    value={item.quantity}
                                    onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))}
                                  />
                                </td>
                                <td className="text-end">
                                  ฿{(item.total_price / 100).toLocaleString('th-TH')}
                                </td>
                                <td>
                                  <button
                                    type="button"
                                    className="btn btn-icon btn-sm btn-ghost-danger"
                                    onClick={() => handleRemoveItem(index)}
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
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="col-md-4">
                <div className="card mb-3">
                  <div className="card-header">
                    <h3 className="card-title">ข้อมูลใบเสนอราคา</h3>
                  </div>
                  <div className="card-body">
                    <div className="mb-3">
                      <InputLabel htmlFor="customer_id" value="ลูกค้า" required />
                      <SelectInput
                        id="customer_id"
                        className="mt-1 block w-full"
                        value={data.customer_id}
                        onChange={(e) => setData('customer_id', e.target.value)}
                      >
                        <option value="">-- เลือกลูกค้า --</option>
                        {customers.map(customer => (
                          <option key={customer.id} value={customer.id}>
                            {customer.name}
                          </option>
                        ))}
                      </SelectInput>
                      <InputError message={errors.customer_id} className="mt-2" />
                    </div>
                    
                    <div className="mb-3">
                      <InputLabel htmlFor="reference" value="เลขที่อ้างอิง" />
                      <TextInput
                        id="reference"
                        value={data.reference}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('reference', e.target.value)}
                        placeholder="เลขที่อ้างอิง (สร้างอัตโนมัติหากไม่ระบุ)"
                      />
                      <InputError message={errors.reference} className="mt-2" />
                    </div>
                    
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <InputLabel htmlFor="date" value="วันที่" required />
                          <TextInput
                            id="date"
                            type="date"
                            value={data.date}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('date', e.target.value)}
                          />
                          <InputError message={errors.date} className="mt-2" />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <InputLabel htmlFor="due_date" value="วันที่หมดอายุ" required />
                          <TextInput
                            id="due_date"
                            type="date"
                            value={data.due_date}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('due_date', e.target.value)}
                          />
                          <InputError message={errors.due_date} className="mt-2" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <InputLabel htmlFor="status" value="สถานะ" required />
                      <SelectInput
                        id="status"
                        className="mt-1 block w-full"
                        value={data.status}
                        onChange={(e) => setData('status', e.target.value)}
                      >
                        <option value="0">ร่าง</option>
                        <option value="1">ส่งแล้ว</option>
                      </SelectInput>
                      <InputError message={errors.status} className="mt-2" />
                    </div>
                  </div>
                </div>
                
                <div className="card mb-3">
                  <div className="card-header">
                    <h3 className="card-title">ส่วนลดและภาษี</h3>
                  </div>
                  <div className="card-body">
                    <div className="mb-3">
                      <InputLabel htmlFor="discount_type" value="ประเภทส่วนลด" />
                      <SelectInput
                        id="discount_type"
                        className="mt-1 block w-full"
                        value={data.discount_type}
                        onChange={(e) => setData('discount_type', e.target.value)}
                      >
                        <option value="fixed">จำนวนเงิน</option>
                        <option value="percentage">เปอร์เซ็นต์</option>
                      </SelectInput>
                    </div>
                    
                    <div className="mb-3">
                      <InputLabel htmlFor="discount_value" value={`ส่วนลด ${data.discount_type === 'percentage' ? '(%)' : '(฿)'}`} />
                      <TextInput
                        id="discount_value"
                        type="number"
                        min="0"
                        step={data.discount_type === 'percentage' ? '0.01' : '1'}
                        value={data.discount_value}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('discount_value', e.target.value)}
                      />
                      <InputError message={errors.discount_value} className="mt-2" />
                    </div>
                    
                    <div className="mb-3">
                      <InputLabel htmlFor="tax_rate" value="อัตราภาษีมูลค่าเพิ่ม (%)" />
                      <TextInput
                        id="tax_rate"
                        type="number"
                        min="0"
                        max="100"
                        step="0.01"
                        value={data.tax_rate}
                        className="mt-1 block w-full"
                        onChange={(e) => {
                          const value = parseFloat(e.target.value) || 0
                          setData('tax_rate', e.target.value)
                          setTaxRate(value)
                        }}
                      />
                      <InputError message={errors.tax_rate} className="mt-2" />
                    </div>
                    
                    <div className="py-2">
                      <div className="d-flex justify-content-between mb-1">
                        <span>ยอดรวม:</span>
                        <span>฿{(subtotal / 100).toLocaleString('th-TH')}</span>
                      </div>
                      <div className="d-flex justify-content-between mb-1">
                        <span>ส่วนลด:</span>
                        <span>-฿{(parseFloat(data.discount_amount) / 100).toLocaleString('th-TH')}</span>
                      </div>
                      <div className="d-flex justify-content-between mb-1">
                        <span>ภาษีมูลค่าเพิ่ม ({taxRate}%):</span>
                        <span>฿{(taxAmount / 100).toLocaleString('th-TH')}</span>
                      </div>
                      <hr />
                      <div className="d-flex justify-content-between fw-bold">
                        <span>ยอดรวมสุทธิ:</span>
                        <span>฿{(grandTotal / 100).toLocaleString('th-TH')}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="card mb-3">
                  <div className="card-header">
                    <h3 className="card-title">หมายเหตุและเงื่อนไข</h3>
                  </div>
                  <div className="card-body">
                    <div className="mb-3">
                      <InputLabel htmlFor="notes" value="หมายเหตุ" />
                      <TextArea
                        id="notes"
                        className="mt-1 block w-full"
                        value={data.notes}
                        onChange={(e) => setData('notes', e.target.value)}
                        rows={2}
                      ></TextArea>
                      <InputError message={errors.notes} className="mt-2" />
                    </div>
                    
                    <div className="mb-3">
                      <InputLabel htmlFor="terms" value="เงื่อนไขและข้อตกลง" />
                      <TextArea
                        id="terms"
                        className="mt-1 block w-full"
                        value={data.terms}
                        onChange={(e) => setData('terms', e.target.value)}
                        rows={3}
                      ></TextArea>
                      <InputError message={errors.terms} className="mt-2" />
                    </div>
                  </div>
                </div>
                
                <div className="d-flex justify-content-between">
                  <Link href={route('quotations.index')} className="btn btn-outline-primary">
                    ยกเลิก
                  </Link>
                  <button 
                    type="submit" 
                    className="btn btn-primary" 
                    disabled={processing || loading}
                  >
                    {processing || loading ? 'กำลังบันทึก...' : 'บันทึก'}
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