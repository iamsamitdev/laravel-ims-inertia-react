import { useState, useEffect } from 'react'
import { Head, Link } from '@inertiajs/react'
import { PageProps } from '@/types'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'

// นำเข้า ApexCharts
declare global {
  interface Window {
    ApexCharts: any
  }
}

interface DashboardProps extends PageProps {
  products: number
  orders: number
  completedOrders: number
  purchases: number
  todayPurchases: number
  categories: number
  quotations: number
  todayQuotations: number
  chartDates: string[]
  orderData: number[]
  purchaseData: number[]
}

export default function Dashboard({
  auth,
  products = 0,
  orders = 0,
  completedOrders = 0,
  purchases = 0,
  todayPurchases = 0,
  categories = 0,
  quotations = 0,
  todayQuotations = 0,
  chartDates = [],
  orderData = [],
  purchaseData = []
}: DashboardProps) {
  // สร้างกราฟ ApexCharts เมื่อ Component ถูกโหลด
  useEffect(() => {
    // สร้างฟังก์ชันสำหรับโหลด ApexCharts
    const loadApexCharts = () => {
      const script = document.createElement('script')
      script.src = '/dist/libs/apexcharts/dist/apexcharts.min.js'
      script.async = true
      script.onload = initializeChart
      document.body.appendChild(script)
      return () => {
        document.body.removeChild(script)
      }
    }

    // ฟังก์ชันเริ่มต้นกราฟเมื่อ ApexCharts ถูกโหลด
    const initializeChart = () => {
      if (window.ApexCharts && chartDates && chartDates.length > 0) {
        console.log('Initializing ApexCharts', { chartDates, orderData, purchaseData })
        
        const options = {
          series: [{
            name: 'คำสั่งซื้อ',
            data: orderData || []
          }, {
            name: 'สั่งซื้อสินค้า',
            data: purchaseData || []
          }],
          chart: {
            type: 'area',
            height: 300,
            toolbar: {
              show: false
            }
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'smooth',
            width: 2
          },
          xaxis: {
            type: 'datetime',
            categories: chartDates || []
          },
          tooltip: {
            x: {
              format: 'dd MMM yyyy'
            }
          },
          colors: ['#206bc4', '#4299e1'],
          fill: {
            type: 'gradient',
            gradient: {
              shadeIntensity: 1,
              opacityFrom: 0.7,
              opacityTo: 0.3,
            }
          }
        }

        const chartElement = document.getElementById('orders-chart')
        if (chartElement) {
          // เคลียร์เนื้อหาเดิมในกรณีที่มีกราฟอยู่แล้ว
          chartElement.innerHTML = ''
          const chart = new window.ApexCharts(chartElement, options)
          chart.render()
        }
      }
    }

    // ตรวจสอบว่า ApexCharts ถูกโหลดแล้วหรือไม่
    if (typeof window !== 'undefined') {
      if (window.ApexCharts) {
        initializeChart()
      } else {
        return loadApexCharts()
      }
    }
  }, [chartDates, orderData, purchaseData])

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="page-header d-print-none">
          <div className="container-xl">
            <div className="row g-2 align-items-center">
              <div className="col">
                <div className="page-pretitle">
                  ภาพรวม
                </div>
                <h2 className="page-title">
                  แดชบอร์ด
                </h2>
              </div>
              <div className="col-auto ms-auto d-print-none">
                <div className="btn-list">
                  <Link href={route('orders.create')} className="btn btn-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <path d="M12 5l0 14"></path>
                      <path d="M5 12l14 0"></path>
                    </svg>
                    สร้างคำสั่งซื้อใหม่
                  </Link>
                  <Link href={route('orders.create')} className="btn btn-primary d-sm-none btn-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <path d="M12 5l0 14"></path>
                      <path d="M5 12l14 0"></path>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    >
      <Head title="แดชบอร์ด" />

      <div className="page-body">
        <div className="container-xl">
          <div className="row row-deck row-cards">

            {/* 4 บล็อกด้านบน */}
            <div className="col-12">
              <div className="row row-cards">
                <div className="col-sm-6 col-lg-3">
                  <div className="card card-sm">
                    <div className="card-body">
                      <div className="row align-items-center">
                        <div className="col-auto">
                          <span className="bg-primary text-white avatar">
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-packages" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                              <path d="M7 16.5l-5 -3l5 -3l5 3v5.5l-5 3z" />
                              <path d="M2 13.5v5.5l5 3" />
                              <path d="M7 16.545l5 -3.03" />
                              <path d="M17 16.5l-5 -3l5 -3l5 3v5.5l-5 3z" />
                              <path d="M12 19l5 3" />
                              <path d="M17 16.5l5 -3" />
                              <path d="M12 13.5v-5.5l-5 -3l5 -3l5 3v5.5" />
                              <path d="M7 5.03v5.455" />
                              <path d="M12 8l5 -3" />
                            </svg>
                          </span>
                        </div>
                        <div className="col">
                          <div className="font-weight-medium">
                            {products} สินค้า
                          </div>
                          <div className="text-muted">
                            {categories} หมวดหมู่
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-lg-3">
                  <div className="card card-sm">
                    <div className="card-body">
                      <div className="row align-items-center">
                        <div className="col-auto">
                          <span className="bg-green text-white avatar">
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                              <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                              <path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                              <path d="M17 17h-11v-14h-2" />
                              <path d="M6 5l14 1l-1 7h-13" />
                            </svg>
                          </span>
                        </div>
                        <div className="col">
                          <div className="font-weight-medium">
                            {orders} คำสั่งซื้อ
                          </div>
                          <div className="text-muted">
                            {completedOrders} เสร็จสมบูรณ์
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-lg-3">
                  <div className="card card-sm">
                    <div className="card-body">
                      <div className="row align-items-center">
                        <div className="col-auto">
                          <span className="bg-twitter text-white avatar">
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-truck-delivery" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                              <path d="M7 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                              <path d="M17 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                              <path d="M5 17h-2v-4m-1 -8h11v12m-4 0h6m4 0h2v-6h-8m0 -5h5l3 5" />
                              <path d="M3 9l4 0" />
                            </svg>
                          </span>
                        </div>
                        <div className="col">
                          <div className="font-weight-medium">
                            {purchases} สั่งซื้อ
                          </div>
                          <div className="text-muted">
                            {todayPurchases} วันนี้
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-lg-3">
                  <div className="card card-sm">
                    <div className="card-body">
                      <div className="row align-items-center">
                        <div className="col-auto">
                          <span className="bg-facebook text-white avatar">
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-files" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                              <path d="M15 3v4a1 1 0 0 0 1 1h4" />
                              <path d="M18 17h-7a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2h4l5 5v7a2 2 0 0 1 -2 2z" />
                              <path d="M16 17v2a2 2 0 0 1 -2 2h-7a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2h2" />
                            </svg>
                          </span>
                        </div>
                        <div className="col">
                          <div className="font-weight-medium">
                            {quotations} ใบเสนอราคา
                          </div>
                          <div className="text-muted">
                            {todayQuotations} วันนี้
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* กราฟแสดงสถิติ */}
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">สถิติคำสั่งซื้อและสั่งซื้อสินค้า</h3>
                </div>
                <div className="card-body">
                  <div id="orders-chart" style={{ height: '300px' }}></div>
                </div>
              </div>
            </div>

            {/* ลบส่วนสถิติคำสั่งซื้อย่อย เพราะข้อมูลใน Controller ไม่ได้มีการส่งข้อมูลเหล่านี้มา */}
            {/* ลบส่วนสถิติสินค้า เพราะข้อมูลใน Controller ไม่ได้มีการส่งข้อมูล out_of_stock มา */}

          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  )
} 