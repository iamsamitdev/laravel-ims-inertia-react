import { jsxs, jsx } from "react/jsx-runtime";
import { useEffect } from "react";
import { Head, Link } from "@inertiajs/react";
import { A as Authenticated } from "./AuthenticatedLayout-CzjzYk7O.js";
function Dashboard({
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
}) {
  useEffect(() => {
    const loadApexCharts = () => {
      const script = document.createElement("script");
      script.src = "/dist/libs/apexcharts/dist/apexcharts.min.js";
      script.async = true;
      script.onload = initializeChart;
      document.body.appendChild(script);
      return () => {
        document.body.removeChild(script);
      };
    };
    const initializeChart = () => {
      if (window.ApexCharts && chartDates && chartDates.length > 0) {
        console.log("Initializing ApexCharts", { chartDates, orderData, purchaseData });
        const options = {
          series: [{
            name: "คำสั่งซื้อ",
            data: orderData || []
          }, {
            name: "สั่งซื้อสินค้า",
            data: purchaseData || []
          }],
          chart: {
            type: "area",
            height: 300,
            toolbar: {
              show: false
            }
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: "smooth",
            width: 2
          },
          xaxis: {
            type: "datetime",
            categories: chartDates || []
          },
          tooltip: {
            x: {
              format: "dd MMM yyyy"
            }
          },
          colors: ["#206bc4", "#4299e1"],
          fill: {
            type: "gradient",
            gradient: {
              shadeIntensity: 1,
              opacityFrom: 0.7,
              opacityTo: 0.3
            }
          }
        };
        const chartElement = document.getElementById("orders-chart");
        if (chartElement) {
          chartElement.innerHTML = "";
          const chart = new window.ApexCharts(chartElement, options);
          chart.render();
        }
      }
    };
    if (typeof window !== "undefined") {
      if (window.ApexCharts) {
        initializeChart();
      } else {
        return loadApexCharts();
      }
    }
  }, [chartDates, orderData, purchaseData]);
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      user: auth.user,
      header: /* @__PURE__ */ jsx("div", { className: "page-header d-print-none", children: /* @__PURE__ */ jsx("div", { className: "container-xl", children: /* @__PURE__ */ jsxs("div", { className: "row g-2 align-items-center", children: [
        /* @__PURE__ */ jsxs("div", { className: "col", children: [
          /* @__PURE__ */ jsx("div", { className: "page-pretitle", children: "ภาพรวม" }),
          /* @__PURE__ */ jsx("h2", { className: "page-title", children: "แดชบอร์ด" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "col-auto ms-auto d-print-none", children: /* @__PURE__ */ jsxs("div", { className: "btn-list", children: [
          /* @__PURE__ */ jsxs(Link, { href: route("orders.create"), className: "btn btn-primary", children: [
            /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", className: "icon", width: "24", height: "24", viewBox: "0 0 24 24", strokeWidth: "2", stroke: "currentColor", fill: "none", strokeLinecap: "round", strokeLinejoin: "round", children: [
              /* @__PURE__ */ jsx("path", { stroke: "none", d: "M0 0h24v24H0z", fill: "none" }),
              /* @__PURE__ */ jsx("path", { d: "M12 5l0 14" }),
              /* @__PURE__ */ jsx("path", { d: "M5 12l14 0" })
            ] }),
            "สร้างคำสั่งซื้อใหม่"
          ] }),
          /* @__PURE__ */ jsx(Link, { href: route("orders.create"), className: "btn btn-primary d-sm-none btn-icon", children: /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", className: "icon", width: "24", height: "24", viewBox: "0 0 24 24", strokeWidth: "2", stroke: "currentColor", fill: "none", strokeLinecap: "round", strokeLinejoin: "round", children: [
            /* @__PURE__ */ jsx("path", { stroke: "none", d: "M0 0h24v24H0z", fill: "none" }),
            /* @__PURE__ */ jsx("path", { d: "M12 5l0 14" }),
            /* @__PURE__ */ jsx("path", { d: "M5 12l14 0" })
          ] }) })
        ] }) })
      ] }) }) }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "แดชบอร์ด" }),
        /* @__PURE__ */ jsx("div", { className: "page-body", children: /* @__PURE__ */ jsx("div", { className: "container-xl", children: /* @__PURE__ */ jsxs("div", { className: "row row-deck row-cards", children: [
          /* @__PURE__ */ jsx("div", { className: "col-12", children: /* @__PURE__ */ jsxs("div", { className: "row row-cards", children: [
            /* @__PURE__ */ jsx("div", { className: "col-sm-6 col-lg-3", children: /* @__PURE__ */ jsx("div", { className: "card card-sm", children: /* @__PURE__ */ jsx("div", { className: "card-body", children: /* @__PURE__ */ jsxs("div", { className: "row align-items-center", children: [
              /* @__PURE__ */ jsx("div", { className: "col-auto", children: /* @__PURE__ */ jsx("span", { className: "bg-primary text-white avatar", children: /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", className: "icon icon-tabler icon-tabler-packages", width: "24", height: "24", viewBox: "0 0 24 24", strokeWidth: "2", stroke: "currentColor", fill: "none", strokeLinecap: "round", strokeLinejoin: "round", children: [
                /* @__PURE__ */ jsx("path", { stroke: "none", d: "M0 0h24v24H0z", fill: "none" }),
                /* @__PURE__ */ jsx("path", { d: "M7 16.5l-5 -3l5 -3l5 3v5.5l-5 3z" }),
                /* @__PURE__ */ jsx("path", { d: "M2 13.5v5.5l5 3" }),
                /* @__PURE__ */ jsx("path", { d: "M7 16.545l5 -3.03" }),
                /* @__PURE__ */ jsx("path", { d: "M17 16.5l-5 -3l5 -3l5 3v5.5l-5 3z" }),
                /* @__PURE__ */ jsx("path", { d: "M12 19l5 3" }),
                /* @__PURE__ */ jsx("path", { d: "M17 16.5l5 -3" }),
                /* @__PURE__ */ jsx("path", { d: "M12 13.5v-5.5l-5 -3l5 -3l5 3v5.5" }),
                /* @__PURE__ */ jsx("path", { d: "M7 5.03v5.455" }),
                /* @__PURE__ */ jsx("path", { d: "M12 8l5 -3" })
              ] }) }) }),
              /* @__PURE__ */ jsxs("div", { className: "col", children: [
                /* @__PURE__ */ jsxs("div", { className: "font-weight-medium", children: [
                  products,
                  " สินค้า"
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "text-muted", children: [
                  categories,
                  " หมวดหมู่"
                ] })
              ] })
            ] }) }) }) }),
            /* @__PURE__ */ jsx("div", { className: "col-sm-6 col-lg-3", children: /* @__PURE__ */ jsx("div", { className: "card card-sm", children: /* @__PURE__ */ jsx("div", { className: "card-body", children: /* @__PURE__ */ jsxs("div", { className: "row align-items-center", children: [
              /* @__PURE__ */ jsx("div", { className: "col-auto", children: /* @__PURE__ */ jsx("span", { className: "bg-green text-white avatar", children: /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", className: "icon", width: "24", height: "24", viewBox: "0 0 24 24", strokeWidth: "2", stroke: "currentColor", fill: "none", strokeLinecap: "round", strokeLinejoin: "round", children: [
                /* @__PURE__ */ jsx("path", { stroke: "none", d: "M0 0h24v24H0z", fill: "none" }),
                /* @__PURE__ */ jsx("path", { d: "M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" }),
                /* @__PURE__ */ jsx("path", { d: "M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" }),
                /* @__PURE__ */ jsx("path", { d: "M17 17h-11v-14h-2" }),
                /* @__PURE__ */ jsx("path", { d: "M6 5l14 1l-1 7h-13" })
              ] }) }) }),
              /* @__PURE__ */ jsxs("div", { className: "col", children: [
                /* @__PURE__ */ jsxs("div", { className: "font-weight-medium", children: [
                  orders,
                  " คำสั่งซื้อ"
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "text-muted", children: [
                  completedOrders,
                  " เสร็จสมบูรณ์"
                ] })
              ] })
            ] }) }) }) }),
            /* @__PURE__ */ jsx("div", { className: "col-sm-6 col-lg-3", children: /* @__PURE__ */ jsx("div", { className: "card card-sm", children: /* @__PURE__ */ jsx("div", { className: "card-body", children: /* @__PURE__ */ jsxs("div", { className: "row align-items-center", children: [
              /* @__PURE__ */ jsx("div", { className: "col-auto", children: /* @__PURE__ */ jsx("span", { className: "bg-twitter text-white avatar", children: /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", className: "icon icon-tabler icon-tabler-truck-delivery", width: "24", height: "24", viewBox: "0 0 24 24", strokeWidth: "2", stroke: "currentColor", fill: "none", strokeLinecap: "round", strokeLinejoin: "round", children: [
                /* @__PURE__ */ jsx("path", { stroke: "none", d: "M0 0h24v24H0z", fill: "none" }),
                /* @__PURE__ */ jsx("path", { d: "M7 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" }),
                /* @__PURE__ */ jsx("path", { d: "M17 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" }),
                /* @__PURE__ */ jsx("path", { d: "M5 17h-2v-4m-1 -8h11v12m-4 0h6m4 0h2v-6h-8m0 -5h5l3 5" }),
                /* @__PURE__ */ jsx("path", { d: "M3 9l4 0" })
              ] }) }) }),
              /* @__PURE__ */ jsxs("div", { className: "col", children: [
                /* @__PURE__ */ jsxs("div", { className: "font-weight-medium", children: [
                  purchases,
                  " สั่งซื้อ"
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "text-muted", children: [
                  todayPurchases,
                  " วันนี้"
                ] })
              ] })
            ] }) }) }) }),
            /* @__PURE__ */ jsx("div", { className: "col-sm-6 col-lg-3", children: /* @__PURE__ */ jsx("div", { className: "card card-sm", children: /* @__PURE__ */ jsx("div", { className: "card-body", children: /* @__PURE__ */ jsxs("div", { className: "row align-items-center", children: [
              /* @__PURE__ */ jsx("div", { className: "col-auto", children: /* @__PURE__ */ jsx("span", { className: "bg-facebook text-white avatar", children: /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", className: "icon icon-tabler icon-tabler-files", width: "24", height: "24", viewBox: "0 0 24 24", strokeWidth: "2", stroke: "currentColor", fill: "none", strokeLinecap: "round", strokeLinejoin: "round", children: [
                /* @__PURE__ */ jsx("path", { stroke: "none", d: "M0 0h24v24H0z", fill: "none" }),
                /* @__PURE__ */ jsx("path", { d: "M15 3v4a1 1 0 0 0 1 1h4" }),
                /* @__PURE__ */ jsx("path", { d: "M18 17h-7a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2h4l5 5v7a2 2 0 0 1 -2 2z" }),
                /* @__PURE__ */ jsx("path", { d: "M16 17v2a2 2 0 0 1 -2 2h-7a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2h2" })
              ] }) }) }),
              /* @__PURE__ */ jsxs("div", { className: "col", children: [
                /* @__PURE__ */ jsxs("div", { className: "font-weight-medium", children: [
                  quotations,
                  " ใบเสนอราคา"
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "text-muted", children: [
                  todayQuotations,
                  " วันนี้"
                ] })
              ] })
            ] }) }) }) })
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "col-12", children: /* @__PURE__ */ jsxs("div", { className: "card", children: [
            /* @__PURE__ */ jsx("div", { className: "card-header", children: /* @__PURE__ */ jsx("h3", { className: "card-title", children: "สถิติคำสั่งซื้อและสั่งซื้อสินค้า" }) }),
            /* @__PURE__ */ jsx("div", { className: "card-body", children: /* @__PURE__ */ jsx("div", { id: "orders-chart", style: { height: "300px" } }) })
          ] }) })
        ] }) }) })
      ]
    }
  );
}
export {
  Dashboard as default
};
