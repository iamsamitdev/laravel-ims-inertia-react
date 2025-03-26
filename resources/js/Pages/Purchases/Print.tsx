import { Head } from '@inertiajs/react'
import { PageProps } from '@/types'
import { useEffect, useRef } from 'react'

interface Product {
  id: number
  name: string
  code: string
  category: {
    id: number
    name: string
  }
  unit: string
}

interface PurchaseItem {
  id: number
  product_id: number
  quantity: number
  unit_price: number
  total_price: number
  product: Product
}

interface Supplier {
  id: number
  name: string
  email: string
  phone: string
  address: string
  shop_name: string
}

interface Purchase {
  id: number
  reference_no: string
  supplier_id: number
  purchase_date: string
  total_amount: number
  paid_amount: number
  due_amount: number
  subtotal: number
  vat: number
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
  updated_at: string
  supplier: Supplier
  purchase_items: PurchaseItem[]
}

interface PrintProps extends PageProps {
  purchase: Purchase
  company: {
    name: string
    email: string
    phone: string
    address: string
    logo: string
  }
}

export default function Print({ purchase, company }: PrintProps) {
  const printRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setTimeout(() => {
      window.print()
    }, 500)
  }, [])

  return (
    <>
      <Head title={`พิมพ์ใบสั่งซื้อ #${purchase.reference_no}`} />
      
      <div className="d-print-none p-4 text-end">
        <button 
          className="btn btn-primary" 
          onClick={() => window.print()}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-printer" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M17 17h2a2 2 0 0 0 2 -2v-4a2 2 0 0 0 -2 -2h-14a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h2"></path>
            <path d="M17 9v-4a2 2 0 0 0 -2 -2h-6a2 2 0 0 0 -2 2v4"></path>
            <path d="M7 13m0 2a2 2 0 0 1 2 -2h6a2 2 0 0 1 2 2v4a2 2 0 0 1 -2 2h-6a2 2 0 0 1 -2 -2z"></path>
          </svg>
          พิมพ์
        </button>
      </div>
      
      <div className="invoice-print p-4" ref={printRef}>
        <div className="card">
          <div className="card-body">
            <div className="d-flex justify-content-between mb-4">
              <div>
                <h2 className="mb-1">ใบสั่งซื้อ #{purchase.reference_no}</h2>
                <div className="text-muted">วันที่: {new Date(purchase.purchase_date).toLocaleDateString('th-TH')}</div>
              </div>
              <div className="text-end">
                {company.logo && (
                  <img src={company.logo} alt={company.name} className="mb-2" style={{ maxHeight: '70px' }} />
                )}
                <h3 className="mb-1">{company.name}</h3>
                <div>{company.address}</div>
                <div>โทร: {company.phone}</div>
                <div>อีเมล: {company.email}</div>
              </div>
            </div>

            <div className="row mb-4">
              <div className="col-md-6">
                <h3 className="mb-2">ข้อมูลซัพพลายเออร์</h3>
                <div className="mb-1">{purchase.supplier.name}</div>
                {purchase.supplier.shop_name && (
                  <div className="mb-1">{purchase.supplier.shop_name}</div>
                )}
                <div className="mb-1">{purchase.supplier.address}</div>
                <div className="mb-1">โทร: {purchase.supplier.phone}</div>
                <div className="mb-1">อีเมล: {purchase.supplier.email}</div>
              </div>
              <div className="col-md-6 text-end">
                <h3 className="mb-2">สถานะ</h3>
                <div className="mb-1">
                  <span className="fw-bold">สถานะการสั่งซื้อ:</span> {purchase.purchase_status.label}
                </div>
                <div className="mb-1">
                  <span className="fw-bold">สถานะการชำระเงิน:</span> {purchase.payment_status.label}
                </div>
                <div className="mb-1">
                  <span className="fw-bold">วันที่สร้าง:</span> {new Date(purchase.created_at).toLocaleDateString('th-TH')}
                </div>
              </div>
            </div>

            <div className="table-responsive">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th className="text-center" style={{ width: '5%' }}>ลำดับ</th>
                    <th style={{ width: '15%' }}>รหัสสินค้า</th>
                    <th style={{ width: '30%' }}>ชื่อสินค้า</th>
                    <th className="text-center" style={{ width: '10%' }}>จำนวน</th>
                    <th className="text-end" style={{ width: '15%' }}>ราคาต่อหน่วย</th>
                    <th className="text-end" style={{ width: '15%' }}>ราคารวม</th>
                  </tr>
                </thead>
                <tbody>
                  {purchase.purchase_items.map((item, index) => (
                    <tr key={item.id}>
                      <td className="text-center">{index + 1}</td>
                      <td>{item.product.code}</td>
                      <td>
                        {item.product.name}
                        <br />
                        <small className="text-muted">
                          หมวดหมู่: {item.product.category.name}
                        </small>
                      </td>
                      <td className="text-center">
                        {item.quantity} {item.product.unit}
                      </td>
                      <td className="text-end">
                        ฿{(item.unit_price / 100).toLocaleString('th-TH', { minimumFractionDigits: 2 })}
                      </td>
                      <td className="text-end">
                        ฿{(item.total_price / 100).toLocaleString('th-TH', { minimumFractionDigits: 2 })}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <th colSpan={5} className="text-end">ยอดรวมก่อนภาษี</th>
                    <th className="text-end">฿{(purchase.subtotal / 100).toLocaleString('th-TH', { minimumFractionDigits: 2 })}</th>
                  </tr>
                  <tr>
                    <th colSpan={5} className="text-end">ภาษีมูลค่าเพิ่ม (7%)</th>
                    <th className="text-end">฿{(purchase.vat / 100).toLocaleString('th-TH', { minimumFractionDigits: 2 })}</th>
                  </tr>
                  <tr>
                    <th colSpan={5} className="text-end">ยอดรวมทั้งสิ้น</th>
                    <th className="text-end">฿{(purchase.total_amount / 100).toLocaleString('th-TH', { minimumFractionDigits: 2 })}</th>
                  </tr>
                  <tr>
                    <th colSpan={5} className="text-end">ชำระแล้ว</th>
                    <th className="text-end">฿{(purchase.paid_amount / 100).toLocaleString('th-TH', { minimumFractionDigits: 2 })}</th>
                  </tr>
                  <tr>
                    <th colSpan={5} className="text-end">ยอดค้างชำระ</th>
                    <th className="text-end">฿{(purchase.due_amount / 100).toLocaleString('th-TH', { minimumFractionDigits: 2 })}</th>
                  </tr>
                </tfoot>
              </table>
            </div>

            {purchase.purchase_note && (
              <div className="mt-4">
                <h4>หมายเหตุ</h4>
                <p>{purchase.purchase_note}</p>
              </div>
            )}

            <div className="row mt-5">
              <div className="col-4 text-center">
                <div className="border-top pt-2">ลงชื่อผู้สั่งซื้อ</div>
              </div>
              <div className="col-4 text-center">
                <div className="border-top pt-2">ลงชื่อผู้อนุมัติ</div>
              </div>
              <div className="col-4 text-center">
                <div className="border-top pt-2">ลงชื่อซัพพลายเออร์</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media print {
          @page {
            size: A4;
            margin: 10mm;
          }
          body {
            background-color: #fff;
          }
          .d-print-none {
            display: none !important;
          }
          .card {
            box-shadow: none;
            border: none;
          }
        }
      `}</style>
    </>
  )
} 