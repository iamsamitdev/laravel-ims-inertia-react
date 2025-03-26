import { FormEvent, useEffect, useState } from 'react'
import { Head, Link, router, useForm } from '@inertiajs/react'
import { PageProps } from '@/types'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import Breadcrumbs from '@/Components/Breadcrumbs'
import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import TextInput from '@/Components/TextInput'
import SelectInput from '@/Components/SelectInput'
import DateInput from '@/Components/DateInput'
import TextArea from '@/Components/TextArea'

interface Customer {
  id: number
  name: string
  email: string
  phone: string
  address: string
}

interface Product {
  id: number
  name: string
  code: string
  selling_price: number
  stock: number
}

interface OrderItem {
  product_id: number
  product_name: string
  quantity: number
  unitcost: number
  total: number
}

interface CreateProps extends PageProps {
  customers: Customer[]
  products: Product[]
}

export default function Create({ auth, customers, products }: CreateProps) {
  const breadcrumbsItems = [
    { title: 'หน้าหลัก', url: route('dashboard') },
    { title: 'รายการสั่งซื้อ', url: route('orders.index') },
    { title: 'เพิ่มคำสั่งซื้อใหม่', url: undefined }
  ]

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [quantity, setQuantity] = useState<number>(1)
  const [orderItems, setOrderItems] = useState<OrderItem[]>([])
  const [subTotal, setSubTotal] = useState<number>(0)
  const [vat, setVat] = useState<number>(0)
  const [total, setTotal] = useState<number>(0)
  const [availableProducts, setAvailableProducts] = useState<Product[]>(products)

  // คำนวณราคาทั้งหมด
  useEffect(() => {
    const subTotalValue = orderItems.reduce((sum, item) => sum + item.total, 0)
    const vatValue = Math.round(subTotalValue * 0.07)
    const totalValue = subTotalValue + vatValue

    setSubTotal(subTotalValue)
    setVat(vatValue)
    setTotal(totalValue)
  }, [orderItems])

  // ฟอร์มสำหรับเพิ่มคำสั่งซื้อ
  const { data, setData, post, processing, errors, reset } = useForm({
    customer_id: '',
    order_date: new Date().toISOString().slice(0, 10),
    payment_type: 'เงินสด',
    pay: 0,
    order_items: '[]',
    sub_total: 0,
    vat: 0,
    total: 0,
    note: '',
  })

  // เปลี่ยนแปลงสินค้าที่เลือก
  const handleProductChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const productId = parseInt(e.target.value)
    const product = products.find(p => p.id === productId) || null
    setSelectedProduct(product)
    setQuantity(1)
  }

  // เพิ่มสินค้าลงในรายการ
  const handleAddProduct = () => {
    if (!selectedProduct || quantity <= 0) return

    if (quantity > selectedProduct.stock) {
      alert(`สินค้าในคลังมีไม่พอ (มี ${selectedProduct.stock} ชิ้น)`)
      return
    }

    const total = selectedProduct.selling_price * quantity

    const newItem: OrderItem = {
      product_id: selectedProduct.id,
      product_name: selectedProduct.name,
      quantity,
      unitcost: selectedProduct.selling_price,
      total
    }

    // ตรวจสอบว่าสินค้านี้มีในรายการแล้วหรือไม่
    const existingIndex = orderItems.findIndex(item => item.product_id === selectedProduct.id)
    
    if (existingIndex >= 0) {
      // ถ้ามีแล้ว ให้อัพเดทจำนวนและราคา
      const updatedItems = [...orderItems]
      const newQuantity = updatedItems[existingIndex].quantity + quantity
      
      if (newQuantity > selectedProduct.stock) {
        alert(`สินค้าในคลังมีไม่พอ (มี ${selectedProduct.stock} ชิ้น)`)
        return
      }
      
      updatedItems[existingIndex].quantity = newQuantity
      updatedItems[existingIndex].total = selectedProduct.selling_price * newQuantity
      setOrderItems(updatedItems)
    } else {
      // ถ้ายังไม่มี ให้เพิ่มใหม่
      setOrderItems([...orderItems, newItem])
    }

    // อัพเดทรายการสินค้าที่ยังไม่ได้เลือก
    const updatedAvailable = availableProducts.map(p => {
      if (p.id === selectedProduct.id) {
        return { ...p, stock: p.stock - quantity }
      }
      return p
    })
    setAvailableProducts(updatedAvailable)

    // รีเซ็ตค่า
    setSelectedProduct(null)
    setQuantity(1)
  }

  // ลบสินค้าออกจากรายการ
  const handleRemoveProduct = (index: number) => {
    const removedItem = orderItems[index]
    
    // คืนสินค้าเข้า availableProducts
    const updatedAvailable = availableProducts.map(p => {
      if (p.id === removedItem.product_id) {
        return { ...p, stock: p.stock + removedItem.quantity }
      }
      return p
    })
    setAvailableProducts(updatedAvailable)
    
    // ลบสินค้าออกจากรายการ
    const updatedItems = [...orderItems]
    updatedItems.splice(index, 1)
    setOrderItems(updatedItems)
  }

  // คำนวณราคาสุทธิ
  const formatPrice = (price: number) => {
    return (price / 100).toLocaleString('th-TH', { minimumFractionDigits: 2 })
  }

  // บันทึกคำสั่งซื้อ
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (orderItems.length === 0) {
      alert('กรุณาเพิ่มสินค้าอย่างน้อย 1 รายการ')
      return
    }

    if (!data.customer_id) {
      alert('กรุณาเลือกลูกค้า')
      return
    }

    const finalPay = parseInt(data.pay?.toString() || '0')
    if (isNaN(finalPay) || finalPay < 0) {
      alert('กรุณาระบุจำนวนเงินที่ชำระให้ถูกต้อง')
      return
    }

    if (finalPay > total) {
      alert('จำนวนเงินที่ชำระไม่สามารถมากกว่ายอดรวมได้')
      return
    }

    // อัพเดทข้อมูลล่าสุดก่อนส่ง
    setData({
      ...data,
      order_items: JSON.stringify(orderItems),
      sub_total: subTotal,
      vat: vat,
      total: total
    })

    // ส่งข้อมูลไปบันทึก
    post(route('orders.store'), {
      onSuccess: () => {
        reset()
        setOrderItems([])
        router.visit(route('orders.index'))
      }
    })
  }

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="page-header d-print-none">
          <div className="container-xl">
            <h2 className="page-title">เพิ่มคำสั่งซื้อใหม่</h2>
          </div>
        </div>
      }
    >
      <Head title="เพิ่มคำสั่งซื้อใหม่" />

      <div className="page-body">
        <div className="container-xl">
          <Breadcrumbs items={breadcrumbsItems} />

          <form onSubmit={handleSubmit}>
            <div className="row row-cards">
              <div className="col-lg-8">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">รายการสินค้า</h3>
                  </div>
                  <div className="card-body">
                    <div className="row g-3 mb-4">
                      <div className="col-lg-6">
                        <SelectInput
                          id="product"
                          value={selectedProduct?.id || ''}
                          label="เลือกสินค้า"
                          onChange={handleProductChange}
                        >
                          <option value="">-- เลือกสินค้า --</option>
                          {availableProducts.filter(p => p.stock > 0).map(product => (
                            <option key={product.id} value={product.id}>{product.name} ({product.stock})</option>
                          ))}
                        </SelectInput>
                      </div>
                      <div className="col-lg-2">
                        <div className="mb-3">
                          <InputLabel htmlFor="quantity" value="จำนวน" />
                          <TextInput
                            id="quantity"
                            type="number"
                            value={quantity}
                            min={1}
                            max={selectedProduct?.stock || 1}
                            onChange={(e) => setQuantity(parseInt(e.target.value))}
                            disabled={!selectedProduct}
                          />
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div className="mb-3">
                          <InputLabel htmlFor="price" value="ราคา" />
                          <div className="input-group">
                            <TextInput
                              id="price"
                              type="text"
                              value={selectedProduct ? `฿${formatPrice(selectedProduct.selling_price * quantity)}` : ''}
                              className="form-control"
                              disabled={true}
                            />
                            <button 
                              type="button" 
                              className="btn btn-primary"
                              onClick={handleAddProduct}
                              disabled={!selectedProduct}
                            >
                              เพิ่มสินค้า
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="table-responsive">
                      <table className="table table-vcenter card-table table-striped">
                        <thead>
                          <tr>
                            <th>ลำดับ</th>
                            <th>ชื่อสินค้า</th>
                            <th className="text-center">ราคา</th>
                            <th className="text-center">จำนวน</th>
                            <th className="text-center">รวม</th>
                            <th className="text-end">จัดการ</th>
                          </tr>
                        </thead>
                        <tbody>
                          {orderItems.length > 0 ? (
                            orderItems.map((item, index) => (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.product_name}</td>
                                <td className="text-center">฿{formatPrice(item.unitcost)}</td>
                                <td className="text-center">{item.quantity}</td>
                                <td className="text-center">฿{formatPrice(item.total)}</td>
                                <td className="text-end">
                                  <button 
                                    type="button"
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleRemoveProduct(index)}
                                  >
                                    ลบ
                                  </button>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={6} className="text-center">ไม่มีรายการสินค้า</td>
                            </tr>
                          )}
                        </tbody>
                        <tfoot>
                          <tr>
                            <td colSpan={4} className="text-end">รวม</td>
                            <td className="text-center">฿{formatPrice(subTotal)}</td>
                            <td></td>
                          </tr>
                          <tr>
                            <td colSpan={4} className="text-end">ภาษีมูลค่าเพิ่ม 7%</td>
                            <td className="text-center">฿{formatPrice(vat)}</td>
                            <td></td>
                          </tr>
                          <tr>
                            <td colSpan={4} className="text-end"><strong>ยอดรวมทั้งสิ้น</strong></td>
                            <td className="text-center"><strong>฿{formatPrice(total)}</strong></td>
                            <td></td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-4">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">ข้อมูลคำสั่งซื้อ</h3>
                  </div>
                  <div className="card-body">
                    <div className="mb-3">
                      <SelectInput
                        id="customer_id"
                        value={data.customer_id}
                        label="ลูกค้า"
                        onChange={(e) => setData('customer_id', e.target.value)}
                        error={errors.customer_id}
                        required
                      >
                        <option value="">-- เลือกลูกค้า --</option>
                        {customers.map(customer => (
                          <option key={customer.id} value={customer.id}>{customer.name}</option>
                        ))}
                      </SelectInput>
                      <InputError message={errors.customer_id} className="mt-2" />
                    </div>

                    <div className="mb-3">
                      <DateInput
                        id="order_date"
                        value={data.order_date}
                        label="วันที่สั่งซื้อ"
                        onChange={(e) => setData('order_date', e.target.value)}
                        error={errors.order_date}
                        required
                      />
                      <InputError message={errors.order_date} className="mt-2" />
                    </div>

                    <div className="mb-3">
                      <SelectInput
                        id="payment_type"
                        value={data.payment_type}
                        label="ประเภทการชำระเงิน"
                        onChange={(e) => setData('payment_type', e.target.value)}
                        error={errors.payment_type}
                        required
                      >
                        <option value="เงินสด">เงินสด</option>
                        <option value="โอนเงิน">โอนเงิน</option>
                        <option value="บัตรเครดิต">บัตรเครดิต</option>
                        <option value="เครดิต">เครดิต</option>
                      </SelectInput>
                      <InputError message={errors.payment_type} className="mt-2" />
                    </div>

                    <div className="mb-3">
                      <InputLabel htmlFor="pay" value="จำนวนเงินที่ชำระ" />
                      <TextInput
                        id="pay"
                        type="number"
                        value={data.pay}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('pay', parseInt(e.target.value))}
                        max={total}
                        min={0}
                        required
                      />
                      <InputError message={errors.pay} className="mt-2" />
                      <small className="text-muted">
                        จำนวนเงินที่ค้างชำระ: ฿{formatPrice(total - (parseInt(data.pay?.toString() || '0')))}
                      </small>
                    </div>

                    <div className="mb-3">
                      <TextArea
                        id="note"
                        value={data.note}
                        label="หมายเหตุ"
                        onChange={(e) => setData('note', e.target.value)}
                        error={errors.note}
                        rows={2}
                      />
                      <InputError message={errors.note} className="mt-2" />
                    </div>
                  </div>
                  <div className="card-footer text-end">
                    <div className="d-flex">
                      <Link href={route('orders.index')} className="btn btn-outline-secondary me-2">
                        ยกเลิก
                      </Link>
                      <button type="submit" className="btn btn-primary" disabled={processing || orderItems.length === 0}>
                        {processing ? 'กำลังบันทึก...' : 'บันทึกคำสั่งซื้อ'}
                      </button>
                    </div>
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