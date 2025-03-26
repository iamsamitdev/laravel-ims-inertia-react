import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { Head } from "@inertiajs/react";
import { useRef, useEffect } from "react";
function Print({ purchase, company }) {
  const printRef = useRef(null);
  useEffect(() => {
    setTimeout(() => {
      window.print();
    }, 500);
  }, []);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Head, { title: `พิมพ์ใบสั่งซื้อ #${purchase.reference_no}` }),
    /* @__PURE__ */ jsx("div", { className: "d-print-none p-4 text-end", children: /* @__PURE__ */ jsxs(
      "button",
      {
        className: "btn btn-primary",
        onClick: () => window.print(),
        children: [
          /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", className: "icon icon-tabler icon-tabler-printer", width: "24", height: "24", viewBox: "0 0 24 24", strokeWidth: "2", stroke: "currentColor", fill: "none", strokeLinecap: "round", strokeLinejoin: "round", children: [
            /* @__PURE__ */ jsx("path", { stroke: "none", d: "M0 0h24v24H0z", fill: "none" }),
            /* @__PURE__ */ jsx("path", { d: "M17 17h2a2 2 0 0 0 2 -2v-4a2 2 0 0 0 -2 -2h-14a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h2" }),
            /* @__PURE__ */ jsx("path", { d: "M17 9v-4a2 2 0 0 0 -2 -2h-6a2 2 0 0 0 -2 2v4" }),
            /* @__PURE__ */ jsx("path", { d: "M7 13m0 2a2 2 0 0 1 2 -2h6a2 2 0 0 1 2 2v4a2 2 0 0 1 -2 2h-6a2 2 0 0 1 -2 -2z" })
          ] }),
          "พิมพ์"
        ]
      }
    ) }),
    /* @__PURE__ */ jsx("div", { className: "invoice-print p-4", ref: printRef, children: /* @__PURE__ */ jsx("div", { className: "card", children: /* @__PURE__ */ jsxs("div", { className: "card-body", children: [
      /* @__PURE__ */ jsxs("div", { className: "d-flex justify-content-between mb-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("h2", { className: "mb-1", children: [
            "ใบสั่งซื้อ #",
            purchase.reference_no
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "text-muted", children: [
            "วันที่: ",
            new Date(purchase.purchase_date).toLocaleDateString("th-TH")
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-end", children: [
          company.logo && /* @__PURE__ */ jsx("img", { src: company.logo, alt: company.name, className: "mb-2", style: { maxHeight: "70px" } }),
          /* @__PURE__ */ jsx("h3", { className: "mb-1", children: company.name }),
          /* @__PURE__ */ jsx("div", { children: company.address }),
          /* @__PURE__ */ jsxs("div", { children: [
            "โทร: ",
            company.phone
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            "อีเมล: ",
            company.email
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "row mb-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "col-md-6", children: [
          /* @__PURE__ */ jsx("h3", { className: "mb-2", children: "ข้อมูลซัพพลายเออร์" }),
          /* @__PURE__ */ jsx("div", { className: "mb-1", children: purchase.supplier.name }),
          purchase.supplier.shop_name && /* @__PURE__ */ jsx("div", { className: "mb-1", children: purchase.supplier.shop_name }),
          /* @__PURE__ */ jsx("div", { className: "mb-1", children: purchase.supplier.address }),
          /* @__PURE__ */ jsxs("div", { className: "mb-1", children: [
            "โทร: ",
            purchase.supplier.phone
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mb-1", children: [
            "อีเมล: ",
            purchase.supplier.email
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "col-md-6 text-end", children: [
          /* @__PURE__ */ jsx("h3", { className: "mb-2", children: "สถานะ" }),
          /* @__PURE__ */ jsxs("div", { className: "mb-1", children: [
            /* @__PURE__ */ jsx("span", { className: "fw-bold", children: "สถานะการสั่งซื้อ:" }),
            " ",
            purchase.purchase_status.label
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mb-1", children: [
            /* @__PURE__ */ jsx("span", { className: "fw-bold", children: "สถานะการชำระเงิน:" }),
            " ",
            purchase.payment_status.label
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mb-1", children: [
            /* @__PURE__ */ jsx("span", { className: "fw-bold", children: "วันที่สร้าง:" }),
            " ",
            new Date(purchase.created_at).toLocaleDateString("th-TH")
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "table-responsive", children: /* @__PURE__ */ jsxs("table", { className: "table table-bordered", children: [
        /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("th", { className: "text-center", style: { width: "5%" }, children: "ลำดับ" }),
          /* @__PURE__ */ jsx("th", { style: { width: "15%" }, children: "รหัสสินค้า" }),
          /* @__PURE__ */ jsx("th", { style: { width: "30%" }, children: "ชื่อสินค้า" }),
          /* @__PURE__ */ jsx("th", { className: "text-center", style: { width: "10%" }, children: "จำนวน" }),
          /* @__PURE__ */ jsx("th", { className: "text-end", style: { width: "15%" }, children: "ราคาต่อหน่วย" }),
          /* @__PURE__ */ jsx("th", { className: "text-end", style: { width: "15%" }, children: "ราคารวม" })
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { children: purchase.purchase_items.map((item, index) => /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("td", { className: "text-center", children: index + 1 }),
          /* @__PURE__ */ jsx("td", { children: item.product.code }),
          /* @__PURE__ */ jsxs("td", { children: [
            item.product.name,
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsxs("small", { className: "text-muted", children: [
              "หมวดหมู่: ",
              item.product.category.name
            ] })
          ] }),
          /* @__PURE__ */ jsxs("td", { className: "text-center", children: [
            item.quantity,
            " ",
            item.product.unit
          ] }),
          /* @__PURE__ */ jsxs("td", { className: "text-end", children: [
            "฿",
            (item.unit_price / 100).toLocaleString("th-TH", { minimumFractionDigits: 2 })
          ] }),
          /* @__PURE__ */ jsxs("td", { className: "text-end", children: [
            "฿",
            (item.total_price / 100).toLocaleString("th-TH", { minimumFractionDigits: 2 })
          ] })
        ] }, item.id)) }),
        /* @__PURE__ */ jsxs("tfoot", { children: [
          /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("th", { colSpan: 5, className: "text-end", children: "ยอดรวมก่อนภาษี" }),
            /* @__PURE__ */ jsxs("th", { className: "text-end", children: [
              "฿",
              (purchase.subtotal / 100).toLocaleString("th-TH", { minimumFractionDigits: 2 })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("th", { colSpan: 5, className: "text-end", children: "ภาษีมูลค่าเพิ่ม (7%)" }),
            /* @__PURE__ */ jsxs("th", { className: "text-end", children: [
              "฿",
              (purchase.vat / 100).toLocaleString("th-TH", { minimumFractionDigits: 2 })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("th", { colSpan: 5, className: "text-end", children: "ยอดรวมทั้งสิ้น" }),
            /* @__PURE__ */ jsxs("th", { className: "text-end", children: [
              "฿",
              (purchase.total_amount / 100).toLocaleString("th-TH", { minimumFractionDigits: 2 })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("th", { colSpan: 5, className: "text-end", children: "ชำระแล้ว" }),
            /* @__PURE__ */ jsxs("th", { className: "text-end", children: [
              "฿",
              (purchase.paid_amount / 100).toLocaleString("th-TH", { minimumFractionDigits: 2 })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("th", { colSpan: 5, className: "text-end", children: "ยอดค้างชำระ" }),
            /* @__PURE__ */ jsxs("th", { className: "text-end", children: [
              "฿",
              (purchase.due_amount / 100).toLocaleString("th-TH", { minimumFractionDigits: 2 })
            ] })
          ] })
        ] })
      ] }) }),
      purchase.purchase_note && /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
        /* @__PURE__ */ jsx("h4", { children: "หมายเหตุ" }),
        /* @__PURE__ */ jsx("p", { children: purchase.purchase_note })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "row mt-5", children: [
        /* @__PURE__ */ jsx("div", { className: "col-4 text-center", children: /* @__PURE__ */ jsx("div", { className: "border-top pt-2", children: "ลงชื่อผู้สั่งซื้อ" }) }),
        /* @__PURE__ */ jsx("div", { className: "col-4 text-center", children: /* @__PURE__ */ jsx("div", { className: "border-top pt-2", children: "ลงชื่อผู้อนุมัติ" }) }),
        /* @__PURE__ */ jsx("div", { className: "col-4 text-center", children: /* @__PURE__ */ jsx("div", { className: "border-top pt-2", children: "ลงชื่อซัพพลายเออร์" }) })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsx("style", { children: `
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
      ` })
  ] });
}
export {
  Print as default
};
