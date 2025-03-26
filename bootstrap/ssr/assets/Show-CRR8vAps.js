import { jsxs, jsx } from "react/jsx-runtime";
import { Link, Head } from "@inertiajs/react";
import { A as Authenticated } from "./AuthenticatedLayout-CzjzYk7O.js";
import { B as Breadcrumbs } from "./Breadcrumbs-Cz6SsN78.js";
import "react";
function Show({ auth, order }) {
  const breadcrumbsItems = [
    { title: "หน้าหลัก", url: route("dashboard") },
    { title: "รายการสั่งซื้อ", url: route("orders.index") },
    { title: order.invoice_no, url: void 0 }
  ];
  const formatPrice = (price) => {
    return (price / 100).toLocaleString("th-TH", { minimumFractionDigits: 2 });
  };
  const orderActions = /* @__PURE__ */ jsxs("div", { className: "btn-list", children: [
    /* @__PURE__ */ jsxs(
      Link,
      {
        href: route("orders.invoice.download", order.id),
        className: "btn btn-outline-primary",
        target: "_blank",
        children: [
          /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", className: "icon icon-tabler icon-tabler-printer", width: "24", height: "24", viewBox: "0 0 24 24", strokeWidth: "2", stroke: "currentColor", fill: "none", strokeLinecap: "round", strokeLinejoin: "round", children: [
            /* @__PURE__ */ jsx("path", { stroke: "none", d: "M0 0h24v24H0z", fill: "none" }),
            /* @__PURE__ */ jsx("path", { d: "M17 17h2a2 2 0 0 0 2 -2v-4a2 2 0 0 0 -2 -2h-14a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h2" }),
            /* @__PURE__ */ jsx("path", { d: "M17 9v-4a2 2 0 0 0 -2 -2h-6a2 2 0 0 0 -2 2v4" }),
            /* @__PURE__ */ jsx("path", { d: "M7 13m0 2a2 2 0 0 1 2 -2h6a2 2 0 0 1 2 2v4a2 2 0 0 1 -2 2h-6a2 2 0 0 1 -2 -2z" })
          ] }),
          "พิมพ์ใบสั่งซื้อ"
        ]
      }
    ),
    order.order_status.value === 0 && /* @__PURE__ */ jsxs(
      Link,
      {
        href: route("orders.edit", order.id),
        className: "btn btn-outline-warning",
        children: [
          /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", className: "icon icon-tabler icon-tabler-edit", width: "24", height: "24", viewBox: "0 0 24 24", strokeWidth: "2", stroke: "currentColor", fill: "none", strokeLinecap: "round", strokeLinejoin: "round", children: [
            /* @__PURE__ */ jsx("path", { stroke: "none", d: "M0 0h24v24H0z", fill: "none" }),
            /* @__PURE__ */ jsx("path", { d: "M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" }),
            /* @__PURE__ */ jsx("path", { d: "M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" }),
            /* @__PURE__ */ jsx("path", { d: "M16 5l3 3" })
          ] }),
          "แก้ไขคำสั่งซื้อ"
        ]
      }
    ),
    order.order_status.value === 0 && /* @__PURE__ */ jsxs(
      Link,
      {
        href: route("orders.update", order.id),
        className: "btn btn-success",
        method: "put",
        as: "button",
        children: [
          /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", className: "icon icon-tabler icon-tabler-check", width: "24", height: "24", viewBox: "0 0 24 24", strokeWidth: "2", stroke: "currentColor", fill: "none", strokeLinecap: "round", strokeLinejoin: "round", children: [
            /* @__PURE__ */ jsx("path", { stroke: "none", d: "M0 0h24v24H0z", fill: "none" }),
            /* @__PURE__ */ jsx("path", { d: "M5 12l5 5l10 -10" })
          ] }),
          "ยืนยันคำสั่งซื้อ"
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      Link,
      {
        href: route("orders.index"),
        className: "btn btn-outline-secondary",
        children: "กลับไปยังรายการคำสั่งซื้อ"
      }
    )
  ] });
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      user: auth.user,
      header: /* @__PURE__ */ jsxs("div", { className: "row g-2 align-items-center", children: [
        /* @__PURE__ */ jsxs("div", { className: "col", children: [
          /* @__PURE__ */ jsx("div", { className: "page-pretitle", children: "รายละเอียด" }),
          /* @__PURE__ */ jsxs("h2", { className: "page-title", children: [
            "คำสั่งซื้อ ",
            order.invoice_no
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "col-auto", children: /* @__PURE__ */ jsx("div", { className: "btn-list", children: /* @__PURE__ */ jsx("span", { className: `badge me-1 ${order.order_status.value === 0 ? "bg-warning" : "bg-success"}`, children: order.order_status.label }) }) })
      ] }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: `คำสั่งซื้อ: ${order.invoice_no}` }),
        /* @__PURE__ */ jsx("div", { className: "page-body", children: /* @__PURE__ */ jsxs("div", { className: "container-xl", children: [
          /* @__PURE__ */ jsx(Breadcrumbs, { items: breadcrumbsItems }),
          /* @__PURE__ */ jsxs("div", { className: "row row-cards", children: [
            /* @__PURE__ */ jsx("div", { className: "col-lg-8", children: /* @__PURE__ */ jsxs("div", { className: "card", children: [
              /* @__PURE__ */ jsx("div", { className: "card-header", children: /* @__PURE__ */ jsx("h3", { className: "card-title", children: "รายการสินค้า" }) }),
              /* @__PURE__ */ jsx("div", { className: "table-responsive", children: /* @__PURE__ */ jsxs("table", { className: "table card-table table-vcenter text-nowrap", children: [
                /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
                  /* @__PURE__ */ jsx("th", { children: "รหัสสินค้า" }),
                  /* @__PURE__ */ jsx("th", { children: "ชื่อสินค้า" }),
                  /* @__PURE__ */ jsx("th", { className: "text-end", children: "ราคา" }),
                  /* @__PURE__ */ jsx("th", { className: "text-end", children: "จำนวน" }),
                  /* @__PURE__ */ jsx("th", { className: "text-end", children: "รวม" })
                ] }) }),
                /* @__PURE__ */ jsxs("tbody", { children: [
                  order.details.map((detail) => /* @__PURE__ */ jsxs("tr", { children: [
                    /* @__PURE__ */ jsx("td", { children: detail.product.code }),
                    /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx(Link, { href: route("products.show", detail.product_id), children: detail.product.name }) }),
                    /* @__PURE__ */ jsxs("td", { className: "text-end", children: [
                      "฿",
                      formatPrice(detail.unitcost)
                    ] }),
                    /* @__PURE__ */ jsx("td", { className: "text-end", children: detail.quantity }),
                    /* @__PURE__ */ jsxs("td", { className: "text-end", children: [
                      "฿",
                      formatPrice(detail.total)
                    ] })
                  ] }, detail.id)),
                  /* @__PURE__ */ jsxs("tr", { children: [
                    /* @__PURE__ */ jsx("td", { colSpan: 4, className: "strong text-end", children: "รวม" }),
                    /* @__PURE__ */ jsxs("td", { className: "text-end", children: [
                      "฿",
                      formatPrice(order.sub_total)
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("tr", { children: [
                    /* @__PURE__ */ jsx("td", { colSpan: 4, className: "strong text-end", children: "ภาษีมูลค่าเพิ่ม 7%" }),
                    /* @__PURE__ */ jsxs("td", { className: "text-end", children: [
                      "฿",
                      formatPrice(order.vat)
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("tr", { children: [
                    /* @__PURE__ */ jsx("td", { colSpan: 4, className: "font-weight-bold text-uppercase text-end", children: "ยอดรวมสุทธิ" }),
                    /* @__PURE__ */ jsxs("td", { className: "font-weight-bold text-end", children: [
                      "฿",
                      formatPrice(order.total)
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("tr", { children: [
                    /* @__PURE__ */ jsx("td", { colSpan: 4, className: "text-green text-end", children: "ชำระแล้ว" }),
                    /* @__PURE__ */ jsxs("td", { className: "text-green text-end", children: [
                      "฿",
                      formatPrice(order.pay)
                    ] })
                  ] }),
                  order.due > 0 && /* @__PURE__ */ jsxs("tr", { children: [
                    /* @__PURE__ */ jsx("td", { colSpan: 4, className: "text-danger text-end", children: "ค้างชำระ" }),
                    /* @__PURE__ */ jsxs("td", { className: "text-danger text-end", children: [
                      "฿",
                      formatPrice(order.due)
                    ] })
                  ] })
                ] })
              ] }) }),
              /* @__PURE__ */ jsx("div", { className: "card-footer text-end", children: orderActions })
            ] }) }),
            /* @__PURE__ */ jsxs("div", { className: "col-lg-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "card", children: [
                /* @__PURE__ */ jsx("div", { className: "card-header", children: /* @__PURE__ */ jsx("h3", { className: "card-title", children: "ข้อมูลลูกค้า" }) }),
                /* @__PURE__ */ jsx("div", { className: "table-responsive", children: /* @__PURE__ */ jsx("table", { className: "table card-table table-vcenter", children: /* @__PURE__ */ jsxs("tbody", { children: [
                  /* @__PURE__ */ jsxs("tr", { children: [
                    /* @__PURE__ */ jsx("td", { className: "w-50", children: "ชื่อลูกค้า" }),
                    /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx(Link, { href: route("customers.show", order.customer_id), children: order.customer.name }) })
                  ] }),
                  /* @__PURE__ */ jsxs("tr", { children: [
                    /* @__PURE__ */ jsx("td", { children: "อีเมล" }),
                    /* @__PURE__ */ jsx("td", { children: order.customer.email })
                  ] }),
                  /* @__PURE__ */ jsxs("tr", { children: [
                    /* @__PURE__ */ jsx("td", { children: "เบอร์โทรศัพท์" }),
                    /* @__PURE__ */ jsx("td", { children: order.customer.phone })
                  ] }),
                  /* @__PURE__ */ jsxs("tr", { children: [
                    /* @__PURE__ */ jsx("td", { children: "ที่อยู่" }),
                    /* @__PURE__ */ jsx("td", { children: order.customer.address })
                  ] })
                ] }) }) })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "card mt-3", children: [
                /* @__PURE__ */ jsx("div", { className: "card-header", children: /* @__PURE__ */ jsx("h3", { className: "card-title", children: "ข้อมูลคำสั่งซื้อ" }) }),
                /* @__PURE__ */ jsx("div", { className: "table-responsive", children: /* @__PURE__ */ jsx("table", { className: "table card-table table-vcenter", children: /* @__PURE__ */ jsxs("tbody", { children: [
                  /* @__PURE__ */ jsxs("tr", { children: [
                    /* @__PURE__ */ jsx("td", { className: "w-50", children: "เลขที่ใบสั่งซื้อ" }),
                    /* @__PURE__ */ jsx("td", { children: order.invoice_no })
                  ] }),
                  /* @__PURE__ */ jsxs("tr", { children: [
                    /* @__PURE__ */ jsx("td", { children: "วันที่สั่งซื้อ" }),
                    /* @__PURE__ */ jsx("td", { children: new Date(order.order_date).toLocaleDateString("th-TH", { dateStyle: "full" }) })
                  ] }),
                  /* @__PURE__ */ jsxs("tr", { children: [
                    /* @__PURE__ */ jsx("td", { children: "สถานะ" }),
                    /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx("span", { className: `badge ${order.order_status.value === 0 ? "bg-warning" : "bg-success"}`, children: order.order_status.label }) })
                  ] }),
                  /* @__PURE__ */ jsxs("tr", { children: [
                    /* @__PURE__ */ jsx("td", { children: "ประเภทการชำระเงิน" }),
                    /* @__PURE__ */ jsx("td", { children: order.payment_type })
                  ] }),
                  /* @__PURE__ */ jsxs("tr", { children: [
                    /* @__PURE__ */ jsx("td", { children: "จำนวนสินค้า" }),
                    /* @__PURE__ */ jsxs("td", { children: [
                      order.total_products,
                      " รายการ"
                    ] })
                  ] })
                ] }) }) })
              ] })
            ] })
          ] })
        ] }) })
      ]
    }
  );
}
export {
  Show as default
};
