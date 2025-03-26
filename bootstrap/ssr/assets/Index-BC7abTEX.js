import { jsxs, jsx } from "react/jsx-runtime";
import { Head } from "@inertiajs/react";
function Index({ auth, customer, carts }) {
  const calculateSubTotal = () => {
    return carts.reduce((total2, item) => total2 + item.price * item.qty, 0);
  };
  const subTotal = calculateSubTotal();
  const vat = subTotal * 0.07;
  const total = subTotal + vat;
  const handlePrint = () => {
    window.print();
  };
  const today = (/* @__PURE__ */ new Date()).toLocaleDateString("th-TH", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
  return /* @__PURE__ */ jsxs("div", { className: "container-xl print-margin", children: [
    /* @__PURE__ */ jsx(Head, { title: `ใบแจ้งหนี้: ${customer.name}` }),
    /* @__PURE__ */ jsxs("div", { className: "d-flex justify-content-between mb-3 no-print", children: [
      /* @__PURE__ */ jsxs("button", { onClick: () => window.history.back(), className: "btn btn-outline-secondary", children: [
        /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", className: "icon icon-tabler icon-tabler-arrow-left", width: "24", height: "24", viewBox: "0 0 24 24", strokeWidth: "2", stroke: "currentColor", fill: "none", strokeLinecap: "round", strokeLinejoin: "round", children: [
          /* @__PURE__ */ jsx("path", { stroke: "none", d: "M0 0h24v24H0z", fill: "none" }),
          /* @__PURE__ */ jsx("path", { d: "M5 12l14 0" }),
          /* @__PURE__ */ jsx("path", { d: "M5 12l6 6" }),
          /* @__PURE__ */ jsx("path", { d: "M5 12l6 -6" })
        ] }),
        "ย้อนกลับ"
      ] }),
      /* @__PURE__ */ jsxs("button", { onClick: handlePrint, className: "btn btn-primary", children: [
        /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", className: "icon icon-tabler icon-tabler-printer", width: "24", height: "24", viewBox: "0 0 24 24", strokeWidth: "2", stroke: "currentColor", fill: "none", strokeLinecap: "round", strokeLinejoin: "round", children: [
          /* @__PURE__ */ jsx("path", { stroke: "none", d: "M0 0h24v24H0z", fill: "none" }),
          /* @__PURE__ */ jsx("path", { d: "M17 17h2a2 2 0 0 0 2 -2v-4a2 2 0 0 0 -2 -2h-14a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h2" }),
          /* @__PURE__ */ jsx("path", { d: "M17 9v-4a2 2 0 0 0 -2 -2h-6a2 2 0 0 0 -2 2v4" }),
          /* @__PURE__ */ jsx("path", { d: "M7 13m0 2a2 2 0 0 1 2 -2h6a2 2 0 0 1 2 2v4a2 2 0 0 1 -2 2h-6a2 2 0 0 1 -2 -2z" })
        ] }),
        "พิมพ์ใบแจ้งหนี้"
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "card print-content", children: /* @__PURE__ */ jsxs("div", { className: "card-body", children: [
      /* @__PURE__ */ jsxs("div", { className: "d-flex justify-content-between mb-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h1", { className: "mb-1", children: "ใบแจ้งหนี้" }),
          /* @__PURE__ */ jsxs("h2", { className: "text-muted", children: [
            "เลขที่: INV-",
            (/* @__PURE__ */ new Date()).getFullYear(),
            "-",
            String(customer.id).padStart(4, "0")
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-end", children: [
          /* @__PURE__ */ jsx("h2", { className: "mb-1", children: "บริษัท ABC จำกัด" }),
          /* @__PURE__ */ jsx("p", { className: "mb-0", children: "123 ถนนสุขุมวิท แขวงคลองเตย" }),
          /* @__PURE__ */ jsx("p", { className: "mb-0", children: "เขตคลองเตย กรุงเทพฯ 10110" }),
          /* @__PURE__ */ jsx("p", { className: "mb-0", children: "โทร: 02-123-4567" }),
          /* @__PURE__ */ jsx("p", { className: "mb-0", children: "อีเมล: info@abccompany.co.th" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("hr", { className: "mb-4" }),
      /* @__PURE__ */ jsxs("div", { className: "row mb-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "col-6", children: [
          /* @__PURE__ */ jsx("h3", { className: "mb-2", children: "ลูกค้า" }),
          /* @__PURE__ */ jsxs("p", { className: "mb-1", children: [
            /* @__PURE__ */ jsx("strong", { children: "ชื่อ:" }),
            " ",
            customer.name
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "mb-1", children: [
            /* @__PURE__ */ jsx("strong", { children: "อีเมล:" }),
            " ",
            customer.email
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "mb-1", children: [
            /* @__PURE__ */ jsx("strong", { children: "โทรศัพท์:" }),
            " ",
            customer.phone
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "mb-1", children: [
            /* @__PURE__ */ jsx("strong", { children: "ที่อยู่:" }),
            " ",
            customer.address
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "col-6 text-end", children: [
          /* @__PURE__ */ jsx("h3", { className: "mb-2", children: "รายละเอียด" }),
          /* @__PURE__ */ jsxs("p", { className: "mb-1", children: [
            /* @__PURE__ */ jsx("strong", { children: "วันที่:" }),
            " ",
            today
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "mb-1", children: [
            /* @__PURE__ */ jsx("strong", { children: "เลขประจำตัวผู้เสียภาษี:" }),
            " 0123456789012"
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "mb-1", children: [
            /* @__PURE__ */ jsx("strong", { children: "เงื่อนไขการชำระเงิน:" }),
            " 30 วัน"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "table-responsive mb-4", children: /* @__PURE__ */ jsxs("table", { className: "table table-bordered table-vcenter", children: [
        /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "bg-light", children: [
          /* @__PURE__ */ jsx("th", { className: "text-center", children: "ลำดับ" }),
          /* @__PURE__ */ jsx("th", { children: "รหัสสินค้า" }),
          /* @__PURE__ */ jsx("th", { children: "รายการ" }),
          /* @__PURE__ */ jsx("th", { className: "text-end", children: "จำนวน" }),
          /* @__PURE__ */ jsx("th", { className: "text-end", children: "ราคาต่อหน่วย" }),
          /* @__PURE__ */ jsx("th", { className: "text-end", children: "จำนวนเงิน" })
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { children: carts.map((item, index) => {
          var _a;
          return /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("td", { className: "text-center", children: index + 1 }),
            /* @__PURE__ */ jsx("td", { children: ((_a = item.options.product) == null ? void 0 : _a.code) || "-" }),
            /* @__PURE__ */ jsx("td", { children: item.name }),
            /* @__PURE__ */ jsx("td", { className: "text-end", children: item.qty }),
            /* @__PURE__ */ jsxs("td", { className: "text-end", children: [
              "฿",
              (item.price / 100).toLocaleString("th-TH", { minimumFractionDigits: 2 })
            ] }),
            /* @__PURE__ */ jsxs("td", { className: "text-end", children: [
              "฿",
              (item.price * item.qty / 100).toLocaleString("th-TH", { minimumFractionDigits: 2 })
            ] })
          ] }, item.id);
        }) }),
        /* @__PURE__ */ jsxs("tfoot", { children: [
          /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("th", { colSpan: 5, className: "text-end", children: "ยอดรวม:" }),
            /* @__PURE__ */ jsxs("th", { className: "text-end", children: [
              "฿",
              (subTotal / 100).toLocaleString("th-TH", { minimumFractionDigits: 2 })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("th", { colSpan: 5, className: "text-end", children: "ภาษีมูลค่าเพิ่ม (7%):" }),
            /* @__PURE__ */ jsxs("th", { className: "text-end", children: [
              "฿",
              (vat / 100).toLocaleString("th-TH", { minimumFractionDigits: 2 })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("th", { colSpan: 5, className: "text-end", children: "ยอดรวมทั้งสิ้น:" }),
            /* @__PURE__ */ jsxs("th", { className: "text-end", children: [
              "฿",
              (total / 100).toLocaleString("th-TH", { minimumFractionDigits: 2 })
            ] })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("hr", { className: "mb-4" }),
      /* @__PURE__ */ jsxs("div", { className: "row mb-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "col-8", children: [
          /* @__PURE__ */ jsx("h3", { className: "mb-2", children: "หมายเหตุ" }),
          /* @__PURE__ */ jsx("p", { children: "กรุณาชำระเงินภายในกำหนด 30 วัน นับจากวันที่ออกใบแจ้งหนี้" }),
          /* @__PURE__ */ jsx("p", { children: "การชำระเงินสามารถทำได้โดยการโอนเงินเข้าบัญชีบริษัท หรือชำระเป็นเงินสด" }),
          /* @__PURE__ */ jsx("h4", { className: "mt-3", children: "รายละเอียดการชำระเงิน" }),
          /* @__PURE__ */ jsx("p", { className: "mb-1", children: "ธนาคารกสิกรไทย" }),
          /* @__PURE__ */ jsx("p", { className: "mb-1", children: "เลขที่บัญชี: 123-4-56789-0" }),
          /* @__PURE__ */ jsx("p", { className: "mb-1", children: "ชื่อบัญชี: บริษัท ABC จำกัด" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "col-4", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsxs("div", { className: "mb-5", children: [
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("p", { className: "border-top pt-2", children: "ลายเซ็นผู้รับสินค้า" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("p", { className: "border-top pt-2", children: "ลายเซ็นผู้มีอำนาจ" })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "text-center text-muted mt-5", children: [
        /* @__PURE__ */ jsx("p", { children: "เอกสารนี้ออกโดยระบบคอมพิวเตอร์ ไม่ต้องลงลายมือชื่อ" }),
        /* @__PURE__ */ jsx("p", { children: "ขอบคุณที่ใช้บริการ" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("style", { children: `
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
      ` })
  ] });
}
export {
  Index as default
};
