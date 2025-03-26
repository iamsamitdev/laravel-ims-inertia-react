import { Head } from '@inertiajs/react'
import { PageProps } from '@/types'

interface Product {
  id: number
  name: string
  code: string
  category: {
    id: number
    name: string
  }
  unit: {
    id: number
    name: string
    short_code: string
  }
}

interface CartItem {
  id: string
  name: string
  qty: number
  price: number
  weight: number
  options: {
    image: string | null
    product_id: number
    product?: Product
  }
}

interface Customer {
  id: number
  name: string
  email: string
  phone: string
  address: string
}

interface InvoiceProps extends PageProps {
  customer: Customer
  carts: CartItem[]
}

export default function Index({ auth, customer, carts }: InvoiceProps) {
  // คำนวณยอดรวม
  const calculateSubTotal = () => {
    return carts.reduce((total, item) => total + (item.price * item.qty), 0)
  }

  const subTotal = calculateSubTotal()
  const vat = subTotal * 0.07
  const total = subTotal + vat
  
  // ฟังก์ชันสำหรับการพิมพ์
  const handlePrint = () => {
    window.print()
  }

  const today = new Date().toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <div className="container-xl print-margin">
      <Head title={`ใบแจ้งหนี้: ${customer.name}`} />

      <div className="d-flex justify-content-between mb-3 no-print">
        <button onClick={() => window.history.back()} className="btn btn-outline-secondary">
          <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-left" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M5 12l14 0"></path>
            <path d="M5 12l6 6"></path>
            <path d="M5 12l6 -6"></path>
          </svg>
          ย้อนกลับ
        </button>
        
        <button onClick={handlePrint} className="btn btn-primary">
          <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-printer" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M17 17h2a2 2 0 0 0 2 -2v-4a2 2 0 0 0 -2 -2h-14a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h2"></path>
            <path d="M17 9v-4a2 2 0 0 0 -2 -2h-6a2 2 0 0 0 -2 2v4"></path>
            <path d="M7 13m0 2a2 2 0 0 1 2 -2h6a2 2 0 0 1 2 2v4a2 2 0 0 1 -2 2h-6a2 2 0 0 1 -2 -2z"></path>
          </svg>
          พิมพ์ใบแจ้งหนี้
        </button>
      </div>

      <div className="card print-content">
        <div className="card-body">
          <div className="d-flex justify-content-between mb-4">
            <div>
              <h1 className="mb-1">ใบแจ้งหนี้</h1>
              <h2 className="text-muted">เลขที่: INV-{new Date().getFullYear()}-{String(customer.id).padStart(4, '0')}</h2>
            </div>
            <div className="text-end">
              <h2 className="mb-1">บริษัท ABC จำกัด</h2>
              <p className="mb-0">123 ถนนสุขุมวิท แขวงคลองเตย</p>
              <p className="mb-0">เขตคลองเตย กรุงเทพฯ 10110</p>
              <p className="mb-0">โทร: 02-123-4567</p>
              <p className="mb-0">อีเมล: info@abccompany.co.th</p>
            </div>
          </div>

          <hr className="mb-4" />

          <div className="row mb-4">
            <div className="col-6">
              <h3 className="mb-2">ลูกค้า</h3>
              <p className="mb-1"><strong>ชื่อ:</strong> {customer.name}</p>
              <p className="mb-1"><strong>อีเมล:</strong> {customer.email}</p>
              <p className="mb-1"><strong>โทรศัพท์:</strong> {customer.phone}</p>
              <p className="mb-1"><strong>ที่อยู่:</strong> {customer.address}</p>
            </div>
            <div className="col-6 text-end">
              <h3 className="mb-2">รายละเอียด</h3>
              <p className="mb-1"><strong>วันที่:</strong> {today}</p>
              <p className="mb-1"><strong>เลขประจำตัวผู้เสียภาษี:</strong> 0123456789012</p>
              <p className="mb-1"><strong>เงื่อนไขการชำระเงิน:</strong> 30 วัน</p>
            </div>
          </div>

          <div className="table-responsive mb-4">
            <table className="table table-bordered table-vcenter">
              <thead>
                <tr className="bg-light">
                  <th className="text-center">ลำดับ</th>
                  <th>รหัสสินค้า</th>
                  <th>รายการ</th>
                  <th className="text-end">จำนวน</th>
                  <th className="text-end">ราคาต่อหน่วย</th>
                  <th className="text-end">จำนวนเงิน</th>
                </tr>
              </thead>
              <tbody>
                {carts.map((item, index) => (
                  <tr key={item.id}>
                    <td className="text-center">{index + 1}</td>
                    <td>{item.options.product?.code || '-'}</td>
                    <td>{item.name}</td>
                    <td className="text-end">{item.qty}</td>
                    <td className="text-end">฿{(item.price / 100).toLocaleString('th-TH', { minimumFractionDigits: 2 })}</td>
                    <td className="text-end">฿{((item.price * item.qty) / 100).toLocaleString('th-TH', { minimumFractionDigits: 2 })}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <th colSpan={5} className="text-end">ยอดรวม:</th>
                  <th className="text-end">฿{(subTotal / 100).toLocaleString('th-TH', { minimumFractionDigits: 2 })}</th>
                </tr>
                <tr>
                  <th colSpan={5} className="text-end">ภาษีมูลค่าเพิ่ม (7%):</th>
                  <th className="text-end">฿{(vat / 100).toLocaleString('th-TH', { minimumFractionDigits: 2 })}</th>
                </tr>
                <tr>
                  <th colSpan={5} className="text-end">ยอดรวมทั้งสิ้น:</th>
                  <th className="text-end">฿{(total / 100).toLocaleString('th-TH', { minimumFractionDigits: 2 })}</th>
                </tr>
              </tfoot>
            </table>
          </div>

          <hr className="mb-4" />

          <div className="row mb-4">
            <div className="col-8">
              <h3 className="mb-2">หมายเหตุ</h3>
              <p>กรุณาชำระเงินภายในกำหนด 30 วัน นับจากวันที่ออกใบแจ้งหนี้</p>
              <p>การชำระเงินสามารถทำได้โดยการโอนเงินเข้าบัญชีบริษัท หรือชำระเป็นเงินสด</p>
              <h4 className="mt-3">รายละเอียดการชำระเงิน</h4>
              <p className="mb-1">ธนาคารกสิกรไทย</p>
              <p className="mb-1">เลขที่บัญชี: 123-4-56789-0</p>
              <p className="mb-1">ชื่อบัญชี: บริษัท ABC จำกัด</p>
            </div>
            <div className="col-4">
              <div className="text-center">
                <div className="mb-5">
                  <br />
                  <br />
                  <p className="border-top pt-2">ลายเซ็นผู้รับสินค้า</p>
                </div>
                <div>
                  <br />
                  <br />
                  <p className="border-top pt-2">ลายเซ็นผู้มีอำนาจ</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center text-muted mt-5">
            <p>เอกสารนี้ออกโดยระบบคอมพิวเตอร์ ไม่ต้องลงลายมือชื่อ</p>
            <p>ขอบคุณที่ใช้บริการ</p>
          </div>
        </div>
      </div>

      <style>
        {`
        @media print {
          .no-print {
            display: none !important;
          }
          .print-margin {
            margin: 0;
            padding: 0;
          }
          .print-content {
            border: none !important;
            box-shadow: none !important;
          }
          body {
            font-size: 12pt;
          }
        }
      `}
      </style>
    </div>
  )
} 