import { jsxs, jsx } from "react/jsx-runtime";
import { Head, Link } from "@inertiajs/react";
import { A as Authenticated } from "./AuthenticatedLayout-CzjzYk7O.js";
import { B as Breadcrumbs } from "./Breadcrumbs-Cz6SsN78.js";
import "react";
function Show({ auth, purchase }) {
  const breadcrumbsItems = [
    { title: "หน้าหลัก", url: route("dashboard") },
    { title: "รายการสั่งซื้อ", url: route("purchases.index") },
    { title: `${purchase.reference_no}`, url: void 0 }
  ];
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      user: auth.user,
      header: /* @__PURE__ */ jsxs("div", { className: "page-header d-print-none", children: [
        /* @__PURE__ */ jsx("div", { className: "container-xl", children: /* @__PURE__ */ jsx("h2", { className: "page-title", children: "รายละเอียดการสั่งซื้อ" }) }),
        /* @__PURE__ */ jsx("div", { className: "col-auto ms-auto", children: /* @__PURE__ */ jsxs("div", { className: "btn-list", children: [
          /* @__PURE__ */ jsxs(
            Link,
            {
              href: route("purchases.print", purchase.id),
              className: "btn btn-info d-none d-sm-inline-block",
              target: "_blank",
              children: [
                /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", className: "icon icon-tabler icon-tabler-printer", width: "24", height: "24", viewBox: "0 0 24 24", strokeWidth: "2", stroke: "currentColor", fill: "none", strokeLinecap: "round", strokeLinejoin: "round", children: [
                  /* @__PURE__ */ jsx("path", { stroke: "none", d: "M0 0h24v24H0z", fill: "none" }),
                  /* @__PURE__ */ jsx("path", { d: "M17 17h2a2 2 0 0 0 2 -2v-4a2 2 0 0 0 -2 -2h-14a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h2" }),
                  /* @__PURE__ */ jsx("path", { d: "M17 9v-4a2 2 0 0 0 -2 -2h-6a2 2 0 0 0 -2 2v4" }),
                  /* @__PURE__ */ jsx("path", { d: "M7 13m0 2a2 2 0 0 1 2 -2h6a2 2 0 0 1 2 2v4a2 2 0 0 1 -2 2h-6a2 2 0 0 1 -2 -2z" })
                ] }),
                "พิมพ์รายการสั่งซื้อ"
              ]
            }
          ),
          purchase.purchase_status.value === 0 && /* @__PURE__ */ jsxs(
            Link,
            {
              href: route("purchases.edit", purchase.id),
              className: "btn btn-primary d-none d-sm-inline-block",
              children: [
                /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", className: "icon icon-tabler icon-tabler-edit", width: "24", height: "24", viewBox: "0 0 24 24", strokeWidth: "2", stroke: "currentColor", fill: "none", strokeLinecap: "round", strokeLinejoin: "round", children: [
                  /* @__PURE__ */ jsx("path", { stroke: "none", d: "M0 0h24v24H0z", fill: "none" }),
                  /* @__PURE__ */ jsx("path", { d: "M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" }),
                  /* @__PURE__ */ jsx("path", { d: "M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" }),
                  /* @__PURE__ */ jsx("path", { d: "M16 5l3 3" })
                ] }),
                "แก้ไขรายการสั่งซื้อ"
              ]
            }
          )
        ] }) })
      ] }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: `รายการสั่งซื้อ: ${purchase.reference_no}` }),
        /* @__PURE__ */ jsx("div", { className: "page-body", children: /* @__PURE__ */ jsxs("div", { className: "container-xl", children: [
          /* @__PURE__ */ jsx(Breadcrumbs, { items: breadcrumbsItems }),
          /* @__PURE__ */ jsxs("div", { className: "row row-cards", children: [
            /* @__PURE__ */ jsx("div", { className: "col-lg-4", children: /* @__PURE__ */ jsxs("div", { className: "card", children: [
              /* @__PURE__ */ jsx("div", { className: "card-header", children: /* @__PURE__ */ jsx("h3", { className: "card-title", children: "ข้อมูลการสั่งซื้อ" }) }),
              /* @__PURE__ */ jsxs("div", { className: "card-body", children: [
                /* @__PURE__ */ jsxs("div", { className: "mb-2", children: [
                  /* @__PURE__ */ jsx("strong", { className: "me-1", children: "เลขที่อ้างอิง:" }),
                  purchase.reference_no
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "mb-2", children: [
                  /* @__PURE__ */ jsx("strong", { className: "me-1", children: "วันที่สั่งซื้อ:" }),
                  new Date(purchase.purchase_date).toLocaleDateString("th-TH")
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "mb-2", children: [
                  /* @__PURE__ */ jsx("strong", { className: "me-1", children: "วันที่บันทึก:" }),
                  new Date(purchase.created_at).toLocaleDateString("th-TH")
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "mb-2", children: [
                  /* @__PURE__ */ jsx("strong", { className: "me-1", children: "ยอดรวมทั้งสิ้น:" }),
                  "฿",
                  (purchase.total_amount / 100).toLocaleString("th-TH", { minimumFractionDigits: 2 })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "mb-2", children: [
                  /* @__PURE__ */ jsx("strong", { className: "me-1", children: "ชำระแล้ว:" }),
                  "฿",
                  (purchase.paid_amount / 100).toLocaleString("th-TH", { minimumFractionDigits: 2 })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "mb-2", children: [
                  /* @__PURE__ */ jsx("strong", { className: "me-1", children: "ค้างชำระ:" }),
                  purchase.due_amount > 0 ? /* @__PURE__ */ jsxs("span", { className: "text-danger", children: [
                    "฿",
                    (purchase.due_amount / 100).toLocaleString("th-TH", { minimumFractionDigits: 2 })
                  ] }) : /* @__PURE__ */ jsxs("span", { children: [
                    "฿",
                    (purchase.due_amount / 100).toLocaleString("th-TH", { minimumFractionDigits: 2 })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "mb-2", children: [
                  /* @__PURE__ */ jsx("strong", { className: "me-1", children: "สถานะการสั่งซื้อ:" }),
                  /* @__PURE__ */ jsx("span", { className: purchase.purchase_status.value === 0 ? "badge bg-warning" : "badge bg-success", children: purchase.purchase_status.label })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "mb-2", children: [
                  /* @__PURE__ */ jsx("strong", { className: "me-1", children: "สถานะการชำระเงิน:" }),
                  /* @__PURE__ */ jsx("span", { className: purchase.payment_status.value === 0 ? "badge bg-danger" : purchase.payment_status.value === 1 ? "badge bg-warning" : "badge bg-success", children: purchase.payment_status.label })
                ] }),
                purchase.purchase_note && /* @__PURE__ */ jsxs("div", { className: "mb-2", children: [
                  /* @__PURE__ */ jsx("strong", { className: "me-1", children: "หมายเหตุ:" }),
                  /* @__PURE__ */ jsx("p", { children: purchase.purchase_note })
                ] })
              ] })
            ] }) }),
            /* @__PURE__ */ jsx("div", { className: "col-lg-8", children: /* @__PURE__ */ jsxs("div", { className: "card", children: [
              /* @__PURE__ */ jsx("div", { className: "card-header", children: /* @__PURE__ */ jsx("h3", { className: "card-title", children: "ข้อมูลซัพพลายเออร์" }) }),
              /* @__PURE__ */ jsxs("div", { className: "card-body", children: [
                /* @__PURE__ */ jsxs("div", { className: "mb-2", children: [
                  /* @__PURE__ */ jsx("strong", { className: "me-1", children: "ชื่อ:" }),
                  /* @__PURE__ */ jsx(Link, { href: route("suppliers.show", purchase.supplier_id), children: purchase.supplier.name })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "mb-2", children: [
                  /* @__PURE__ */ jsx("strong", { className: "me-1", children: "อีเมล:" }),
                  /* @__PURE__ */ jsx("a", { href: `mailto:${purchase.supplier.email}`, children: purchase.supplier.email })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "mb-2", children: [
                  /* @__PURE__ */ jsx("strong", { className: "me-1", children: "เบอร์โทรศัพท์:" }),
                  purchase.supplier.phone
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "mb-2", children: [
                  /* @__PURE__ */ jsx("strong", { className: "me-1", children: "ที่อยู่:" }),
                  purchase.supplier.address
                ] })
              ] })
            ] }) }),
            /* @__PURE__ */ jsx("div", { className: "col-12", children: /* @__PURE__ */ jsxs("div", { className: "card", children: [
              /* @__PURE__ */ jsx("div", { className: "card-header", children: /* @__PURE__ */ jsx("h3", { className: "card-title", children: "รายการสินค้าที่สั่งซื้อ" }) }),
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
                /* @__PURE__ */ jsx("tbody", { children: purchase.details.map((item, index) => /* @__PURE__ */ jsxs("tr", { children: [
                  /* @__PURE__ */ jsx("td", { children: index + 1 }),
                  /* @__PURE__ */ jsx("td", { children: item.product.code }),
                  /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx(Link, { href: route("products.show", item.product_id), children: item.product.name }) }),
                  /* @__PURE__ */ jsx("td", { children: item.product.category.name }),
                  /* @__PURE__ */ jsx("td", { children: item.product.unit.short_code }),
                  /* @__PURE__ */ jsx("td", { className: "text-end", children: item.quantity }),
                  /* @__PURE__ */ jsxs("td", { className: "text-end", children: [
                    "฿",
                    (item.unit_price / 100).toLocaleString("th-TH", { minimumFractionDigits: 2 })
                  ] }),
                  /* @__PURE__ */ jsxs("td", { className: "text-end", children: [
                    "฿",
                    (item.sub_total / 100).toLocaleString("th-TH", { minimumFractionDigits: 2 })
                  ] })
                ] }, item.id)) }),
                /* @__PURE__ */ jsxs("tfoot", { children: [
                  /* @__PURE__ */ jsxs("tr", { children: [
                    /* @__PURE__ */ jsx("th", { colSpan: 7, className: "text-end", children: "ยอดรวมทั้งสิ้น" }),
                    /* @__PURE__ */ jsxs("th", { className: "text-end", children: [
                      "฿",
                      (purchase.total_amount / 100).toLocaleString("th-TH", { minimumFractionDigits: 2 })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("tr", { children: [
                    /* @__PURE__ */ jsx("th", { colSpan: 7, className: "text-end", children: "ชำระแล้ว" }),
                    /* @__PURE__ */ jsxs("th", { className: "text-end", children: [
                      "฿",
                      (purchase.paid_amount / 100).toLocaleString("th-TH", { minimumFractionDigits: 2 })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("tr", { children: [
                    /* @__PURE__ */ jsx("th", { colSpan: 7, className: "text-end", children: "ค้างชำระ" }),
                    /* @__PURE__ */ jsx("th", { className: "text-end", children: purchase.due_amount > 0 ? /* @__PURE__ */ jsxs("span", { className: "text-danger", children: [
                      "฿",
                      (purchase.due_amount / 100).toLocaleString("th-TH", { minimumFractionDigits: 2 })
                    ] }) : /* @__PURE__ */ jsxs("span", { children: [
                      "฿",
                      (purchase.due_amount / 100).toLocaleString("th-TH", { minimumFractionDigits: 2 })
                    ] }) })
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
