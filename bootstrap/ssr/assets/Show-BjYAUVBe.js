import { jsxs, jsx } from "react/jsx-runtime";
import { Head, Link } from "@inertiajs/react";
import { A as Authenticated } from "./AuthenticatedLayout-CzjzYk7O.js";
import { B as Breadcrumbs } from "./Breadcrumbs-Cz6SsN78.js";
import "react";
function Show({ auth, order }) {
  const breadcrumbsItems = [
    { title: "หน้าหลัก", url: route("dashboard") },
    { title: "รายการค้างชำระ", url: route("due.index") },
    { title: order.invoice_no, url: void 0 }
  ];
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      user: auth.user,
      header: /* @__PURE__ */ jsxs("div", { className: "page-header d-print-none", children: [
        /* @__PURE__ */ jsx("div", { className: "container-xl", children: /* @__PURE__ */ jsx("h2", { className: "page-title", children: "รายละเอียดรายการค้างชำระ" }) }),
        /* @__PURE__ */ jsx("div", { className: "col-auto ms-auto", children: /* @__PURE__ */ jsxs("div", { className: "btn-list", children: [
          /* @__PURE__ */ jsxs(
            Link,
            {
              href: route("orders.print", order.id),
              className: "btn btn-info d-none d-sm-inline-block",
              target: "_blank",
              children: [
                /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", className: "icon icon-tabler icon-tabler-printer", width: "24", height: "24", viewBox: "0 0 24 24", strokeWidth: "2", stroke: "currentColor", fill: "none", strokeLinecap: "round", strokeLinejoin: "round", children: [
                  /* @__PURE__ */ jsx("path", { stroke: "none", d: "M0 0h24v24H0z", fill: "none" }),
                  /* @__PURE__ */ jsx("path", { d: "M17 17h2a2 2 0 0 0 2 -2v-4a2 2 0 0 0 -2 -2h-14a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h2" }),
                  /* @__PURE__ */ jsx("path", { d: "M17 9v-4a2 2 0 0 0 -2 -2h-6a2 2 0 0 0 -2 2v4" }),
                  /* @__PURE__ */ jsx("path", { d: "M7 13m0 2a2 2 0 0 1 2 -2h6a2 2 0 0 1 2 2v4a2 2 0 0 1 -2 2h-6a2 2 0 0 1 -2 -2z" })
                ] }),
                "พิมพ์ใบเสร็จ"
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            Link,
            {
              href: route("due.edit", order.id),
              className: "btn btn-primary d-none d-sm-inline-block",
              children: [
                /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", className: "icon icon-tabler icon-tabler-cash", width: "24", height: "24", viewBox: "0 0 24 24", strokeWidth: "2", stroke: "currentColor", fill: "none", strokeLinecap: "round", strokeLinejoin: "round", children: [
                  /* @__PURE__ */ jsx("path", { stroke: "none", d: "M0 0h24v24H0z", fill: "none" }),
                  /* @__PURE__ */ jsx("path", { d: "M7 9m0 2a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2z" }),
                  /* @__PURE__ */ jsx("path", { d: "M14 14m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" }),
                  /* @__PURE__ */ jsx("path", { d: "M17 9v-2a2 2 0 0 0 -2 -2h-10a2 2 0 0 0 -2 2v6a2 2 0 0 0 2 2h2" })
                ] }),
                "ชำระเงิน"
              ]
            }
          )
        ] }) })
      ] }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: `รายการค้างชำระ: ${order.invoice_no}` }),
        /* @__PURE__ */ jsx("div", { className: "page-body", children: /* @__PURE__ */ jsxs("div", { className: "container-xl", children: [
          /* @__PURE__ */ jsx(Breadcrumbs, { items: breadcrumbsItems }),
          /* @__PURE__ */ jsxs("div", { className: "row row-cards", children: [
            /* @__PURE__ */ jsx("div", { className: "col-lg-4", children: /* @__PURE__ */ jsxs("div", { className: "card", children: [
              /* @__PURE__ */ jsx("div", { className: "card-header", children: /* @__PURE__ */ jsx("h3", { className: "card-title", children: "ข้อมูลการสั่งซื้อ" }) }),
              /* @__PURE__ */ jsxs("div", { className: "card-body", children: [
                /* @__PURE__ */ jsxs("div", { className: "mb-2", children: [
                  /* @__PURE__ */ jsx("strong", { className: "me-1", children: "เลขที่ใบแจ้งหนี้:" }),
                  order.invoice_no
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "mb-2", children: [
                  /* @__PURE__ */ jsx("strong", { className: "me-1", children: "วันที่สั่งซื้อ:" }),
                  new Date(order.order_date).toLocaleDateString("th-TH")
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "mb-2", children: [
                  /* @__PURE__ */ jsx("strong", { className: "me-1", children: "จำนวนสินค้า:" }),
                  order.total_products,
                  " รายการ"
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "mb-2", children: [
                  /* @__PURE__ */ jsx("strong", { className: "me-1", children: "ราคารวม:" }),
                  "฿",
                  (order.sub_total / 100).toLocaleString("th-TH", { minimumFractionDigits: 2 })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "mb-2", children: [
                  /* @__PURE__ */ jsx("strong", { className: "me-1", children: "ภาษี (7%):" }),
                  "฿",
                  (order.vat / 100).toLocaleString("th-TH", { minimumFractionDigits: 2 })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "mb-2", children: [
                  /* @__PURE__ */ jsx("strong", { className: "me-1", children: "ยอดรวมทั้งสิ้น:" }),
                  "฿",
                  (order.total / 100).toLocaleString("th-TH", { minimumFractionDigits: 2 })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "mb-2", children: [
                  /* @__PURE__ */ jsx("strong", { className: "me-1", children: "ชำระแล้ว:" }),
                  "฿",
                  (order.pay / 100).toLocaleString("th-TH", { minimumFractionDigits: 2 })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "mb-2", children: [
                  /* @__PURE__ */ jsx("strong", { className: "me-1", children: "ค้างชำระ:" }),
                  /* @__PURE__ */ jsxs("span", { className: "text-danger", children: [
                    "฿",
                    (order.due / 100).toLocaleString("th-TH", { minimumFractionDigits: 2 })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "mb-2", children: [
                  /* @__PURE__ */ jsx("strong", { className: "me-1", children: "สถานะ:" }),
                  /* @__PURE__ */ jsx("span", { className: order.order_status === 0 ? "badge bg-warning" : "badge bg-success", children: order.order_status === 0 ? "รอดำเนินการ" : "เสร็จสิ้น" })
                ] })
              ] })
            ] }) }),
            /* @__PURE__ */ jsx("div", { className: "col-lg-8", children: /* @__PURE__ */ jsxs("div", { className: "card", children: [
              /* @__PURE__ */ jsx("div", { className: "card-header", children: /* @__PURE__ */ jsx("h3", { className: "card-title", children: "ข้อมูลลูกค้า" }) }),
              /* @__PURE__ */ jsxs("div", { className: "card-body", children: [
                /* @__PURE__ */ jsxs("div", { className: "mb-2", children: [
                  /* @__PURE__ */ jsx("strong", { className: "me-1", children: "ชื่อ:" }),
                  /* @__PURE__ */ jsx(Link, { href: route("customers.show", order.customer_id), children: order.customer.name })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "mb-2", children: [
                  /* @__PURE__ */ jsx("strong", { className: "me-1", children: "อีเมล:" }),
                  /* @__PURE__ */ jsx("a", { href: `mailto:${order.customer.email}`, children: order.customer.email })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "mb-2", children: [
                  /* @__PURE__ */ jsx("strong", { className: "me-1", children: "เบอร์โทรศัพท์:" }),
                  order.customer.phone
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "mb-2", children: [
                  /* @__PURE__ */ jsx("strong", { className: "me-1", children: "ที่อยู่:" }),
                  order.customer.address
                ] })
              ] })
            ] }) }),
            /* @__PURE__ */ jsx("div", { className: "col-12", children: /* @__PURE__ */ jsxs("div", { className: "card", children: [
              /* @__PURE__ */ jsx("div", { className: "card-header", children: /* @__PURE__ */ jsx("h3", { className: "card-title", children: "รายการสินค้า" }) }),
              /* @__PURE__ */ jsx("div", { className: "card-body", children: /* @__PURE__ */ jsx("div", { className: "table-responsive", children: /* @__PURE__ */ jsxs("table", { className: "table table-vcenter card-table", children: [
                /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
                  /* @__PURE__ */ jsx("th", { className: "w-1", children: "ลำดับ" }),
                  /* @__PURE__ */ jsx("th", { children: "รหัสสินค้า" }),
                  /* @__PURE__ */ jsx("th", { children: "ชื่อสินค้า" }),
                  /* @__PURE__ */ jsx("th", { children: "หมวดหมู่" }),
                  /* @__PURE__ */ jsx("th", { children: "หน่วย" }),
                  /* @__PURE__ */ jsx("th", { className: "text-end", children: "จำนวน" }),
                  /* @__PURE__ */ jsx("th", { className: "text-end", children: "ราคา/หน่วย" }),
                  /* @__PURE__ */ jsx("th", { className: "text-end", children: "รวม" })
                ] }) }),
                /* @__PURE__ */ jsx("tbody", { children: order.details.map((item, index) => /* @__PURE__ */ jsxs("tr", { children: [
                  /* @__PURE__ */ jsx("td", { children: index + 1 }),
                  /* @__PURE__ */ jsx("td", { children: item.product.code }),
                  /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx(Link, { href: route("products.show", item.product_id), children: item.product.name }) }),
                  /* @__PURE__ */ jsx("td", { children: item.product.category.name }),
                  /* @__PURE__ */ jsx("td", { children: item.product.unit.short_code }),
                  /* @__PURE__ */ jsx("td", { className: "text-end", children: item.quantity }),
                  /* @__PURE__ */ jsxs("td", { className: "text-end", children: [
                    "฿",
                    (item.unitcost / 100).toLocaleString("th-TH", { minimumFractionDigits: 2 })
                  ] }),
                  /* @__PURE__ */ jsxs("td", { className: "text-end", children: [
                    "฿",
                    (item.total / 100).toLocaleString("th-TH", { minimumFractionDigits: 2 })
                  ] })
                ] }, item.id)) }),
                /* @__PURE__ */ jsxs("tfoot", { children: [
                  /* @__PURE__ */ jsxs("tr", { children: [
                    /* @__PURE__ */ jsx("th", { colSpan: 7, className: "text-end", children: "ราคารวม" }),
                    /* @__PURE__ */ jsxs("th", { className: "text-end", children: [
                      "฿",
                      (order.sub_total / 100).toLocaleString("th-TH", { minimumFractionDigits: 2 })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("tr", { children: [
                    /* @__PURE__ */ jsx("th", { colSpan: 7, className: "text-end", children: "ภาษี (7%)" }),
                    /* @__PURE__ */ jsxs("th", { className: "text-end", children: [
                      "฿",
                      (order.vat / 100).toLocaleString("th-TH", { minimumFractionDigits: 2 })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("tr", { children: [
                    /* @__PURE__ */ jsx("th", { colSpan: 7, className: "text-end", children: "ยอดรวมทั้งสิ้น" }),
                    /* @__PURE__ */ jsxs("th", { className: "text-end", children: [
                      "฿",
                      (order.total / 100).toLocaleString("th-TH", { minimumFractionDigits: 2 })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("tr", { children: [
                    /* @__PURE__ */ jsx("th", { colSpan: 7, className: "text-end", children: "ชำระแล้ว" }),
                    /* @__PURE__ */ jsxs("th", { className: "text-end", children: [
                      "฿",
                      (order.pay / 100).toLocaleString("th-TH", { minimumFractionDigits: 2 })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("tr", { children: [
                    /* @__PURE__ */ jsx("th", { colSpan: 7, className: "text-end", children: "ค้างชำระ" }),
                    /* @__PURE__ */ jsxs("th", { className: "text-end text-danger", children: [
                      "฿",
                      (order.due / 100).toLocaleString("th-TH", { minimumFractionDigits: 2 })
                    ] })
                  ] })
                ] })
              ] }) }) })
            ] }) })
          ] })
        ] }) })
      ]
    }
  );
}
export {
  Show as default
};
