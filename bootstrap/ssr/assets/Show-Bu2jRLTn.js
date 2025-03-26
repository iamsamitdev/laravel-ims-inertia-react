import { jsxs, jsx } from "react/jsx-runtime";
import { Head, Link } from "@inertiajs/react";
import { A as Authenticated } from "./AuthenticatedLayout-CzjzYk7O.js";
import { B as Breadcrumbs } from "./Breadcrumbs-Cz6SsN78.js";
import "react";
function Show({ auth, quotation }) {
  const getStatusText = (status) => {
    switch (status) {
      case 0:
        return "ร่าง";
      case 1:
        return "ส่งแล้ว";
      case 2:
        return "ขายแล้ว";
      case 3:
        return "ยกเลิก";
      default:
        return "ไม่ระบุ";
    }
  };
  const getStatusClass = (status) => {
    switch (status) {
      case 0:
        return "badge bg-secondary";
      case 1:
        return "badge bg-primary";
      case 2:
        return "badge bg-success";
      case 3:
        return "badge bg-danger";
      default:
        return "badge bg-secondary";
    }
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("th-TH");
  };
  const formatCurrency = (amount) => {
    return (amount / 100).toLocaleString("th-TH", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };
  const breadcrumbsItems = [
    { title: "หน้าหลัก", url: route("dashboard") },
    { title: "ใบเสนอราคา", url: route("quotations.index") },
    { title: "รายละเอียด", url: void 0 }
  ];
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      user: auth.user,
      header: /* @__PURE__ */ jsxs("div", { className: "page-header d-print-none", children: [
        /* @__PURE__ */ jsxs("div", { className: "container-xl", children: [
          /* @__PURE__ */ jsx("div", { className: "page-pretitle", children: "รายละเอียด" }),
          /* @__PURE__ */ jsxs("h2", { className: "page-title", children: [
            "ใบเสนอราคา #",
            quotation.reference
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "col-auto ms-auto d-print-none", children: /* @__PURE__ */ jsxs("div", { className: "btn-list", children: [
          /* @__PURE__ */ jsxs(
            "button",
            {
              className: "btn btn-ghost-primary d-none d-sm-inline-block",
              onClick: () => window.print(),
              children: [
                /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", className: "icon icon-tabler icon-tabler-printer", width: "24", height: "24", viewBox: "0 0 24 24", strokeWidth: "2", stroke: "currentColor", fill: "none", strokeLinecap: "round", strokeLinejoin: "round", children: [
                  /* @__PURE__ */ jsx("path", { stroke: "none", d: "M0 0h24v24H0z", fill: "none" }),
                  /* @__PURE__ */ jsx("path", { d: "M17 17h2a2 2 0 0 0 2 -2v-4a2 2 0 0 0 -2 -2h-14a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h2" }),
                  /* @__PURE__ */ jsx("path", { d: "M17 9v-4a2 2 0 0 0 -2 -2h-6a2 2 0 0 0 -2 2v4" }),
                  /* @__PURE__ */ jsx("path", { d: "M7 13m0 2a2 2 0 0 1 2 -2h6a2 2 0 0 1 2 2v4a2 2 0 0 1 -2 2h-6a2 2 0 0 1 -2 -2z" })
                ] }),
                "พิมพ์ใบเสนอราคา"
              ]
            }
          ),
          quotation.status !== 2 && quotation.status !== 3 && /* @__PURE__ */ jsxs(
            Link,
            {
              href: route("quotations.edit", quotation.id),
              className: "btn btn-primary d-none d-sm-inline-block",
              children: [
                /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", className: "icon icon-tabler icon-tabler-edit", width: "24", height: "24", viewBox: "0 0 24 24", strokeWidth: "2", stroke: "currentColor", fill: "none", strokeLinecap: "round", strokeLinejoin: "round", children: [
                  /* @__PURE__ */ jsx("path", { stroke: "none", d: "M0 0h24v24H0z", fill: "none" }),
                  /* @__PURE__ */ jsx("path", { d: "M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" }),
                  /* @__PURE__ */ jsx("path", { d: "M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" }),
                  /* @__PURE__ */ jsx("path", { d: "M16 5l3 3" })
                ] }),
                "แก้ไข"
              ]
            }
          ),
          quotation.status === 1 && /* @__PURE__ */ jsxs(
            Link,
            {
              href: route("quotations.convert-to-sale", quotation.id),
              className: "btn btn-success d-none d-sm-inline-block",
              children: [
                /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", className: "icon icon-tabler icon-tabler-shopping-cart", width: "24", height: "24", viewBox: "0 0 24 24", strokeWidth: "2", stroke: "currentColor", fill: "none", strokeLinecap: "round", strokeLinejoin: "round", children: [
                  /* @__PURE__ */ jsx("path", { stroke: "none", d: "M0 0h24v24H0z", fill: "none" }),
                  /* @__PURE__ */ jsx("path", { d: "M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" }),
                  /* @__PURE__ */ jsx("path", { d: "M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" }),
                  /* @__PURE__ */ jsx("path", { d: "M17 17h-11v-14h-2" }),
                  /* @__PURE__ */ jsx("path", { d: "M6 5l14 1l-1 7h-13" })
                ] }),
                "แปลงเป็นรายการขาย"
              ]
            }
          )
        ] }) })
      ] }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: `ใบเสนอราคา #${quotation.reference}` }),
        /* @__PURE__ */ jsx("div", { className: "page-body", children: /* @__PURE__ */ jsxs("div", { className: "container-xl", children: [
          /* @__PURE__ */ jsx(Breadcrumbs, { items: breadcrumbsItems }),
          /* @__PURE__ */ jsxs("div", { className: "card", children: [
            /* @__PURE__ */ jsxs("div", { className: "card-header", children: [
              /* @__PURE__ */ jsx("h3", { className: "card-title", children: "รายละเอียดใบเสนอราคา" }),
              /* @__PURE__ */ jsx("div", { className: "card-actions", children: /* @__PURE__ */ jsx("span", { className: getStatusClass(quotation.status), children: getStatusText(quotation.status) }) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "card-body", children: [
              /* @__PURE__ */ jsxs("div", { className: "row mb-4", children: [
                /* @__PURE__ */ jsxs("div", { className: "col-md-6", children: [
                  /* @__PURE__ */ jsx("h4", { children: "ข้อมูลลูกค้า" }),
                  /* @__PURE__ */ jsxs("address", { children: [
                    /* @__PURE__ */ jsx("strong", { children: quotation.customer.name }),
                    /* @__PURE__ */ jsx("br", {}),
                    "อีเมล: ",
                    quotation.customer.email,
                    /* @__PURE__ */ jsx("br", {}),
                    "โทร: ",
                    quotation.customer.phone,
                    /* @__PURE__ */ jsx("br", {}),
                    "ที่อยู่: ",
                    quotation.customer.address
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "col-md-6 text-md-end", children: [
                  /* @__PURE__ */ jsx("h4", { children: "รายละเอียดใบเสนอราคา" }),
                  /* @__PURE__ */ jsxs("p", { children: [
                    /* @__PURE__ */ jsx("strong", { children: "เลขที่อ้างอิง:" }),
                    " ",
                    quotation.reference,
                    /* @__PURE__ */ jsx("br", {}),
                    /* @__PURE__ */ jsx("strong", { children: "วันที่:" }),
                    " ",
                    formatDate(quotation.date),
                    /* @__PURE__ */ jsx("br", {}),
                    /* @__PURE__ */ jsx("strong", { children: "วันที่หมดอายุ:" }),
                    " ",
                    formatDate(quotation.due_date),
                    /* @__PURE__ */ jsx("br", {})
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "table-responsive", children: /* @__PURE__ */ jsxs("table", { className: "table table-vcenter card-table", children: [
                /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
                  /* @__PURE__ */ jsx("th", { style: { width: "50px" }, children: "ลำดับ" }),
                  /* @__PURE__ */ jsx("th", { children: "สินค้า" }),
                  /* @__PURE__ */ jsx("th", { className: "text-end", style: { width: "100px" }, children: "ราคาต่อหน่วย" }),
                  /* @__PURE__ */ jsx("th", { className: "text-center", style: { width: "100px" }, children: "จำนวน" }),
                  /* @__PURE__ */ jsx("th", { className: "text-end", style: { width: "150px" }, children: "ยอดรวม" })
                ] }) }),
                /* @__PURE__ */ jsx("tbody", { children: quotation.items.map((item, index) => /* @__PURE__ */ jsxs("tr", { children: [
                  /* @__PURE__ */ jsx("td", { children: index + 1 }),
                  /* @__PURE__ */ jsx("td", { children: item.product_name }),
                  /* @__PURE__ */ jsxs("td", { className: "text-end", children: [
                    "฿",
                    formatCurrency(item.unit_price)
                  ] }),
                  /* @__PURE__ */ jsx("td", { className: "text-center", children: item.quantity }),
                  /* @__PURE__ */ jsxs("td", { className: "text-end", children: [
                    "฿",
                    formatCurrency(item.total_price)
                  ] })
                ] }, item.id)) }),
                /* @__PURE__ */ jsxs("tfoot", { children: [
                  /* @__PURE__ */ jsxs("tr", { children: [
                    /* @__PURE__ */ jsx("td", { colSpan: 4, className: "text-end", children: /* @__PURE__ */ jsx("strong", { children: "ยอดรวม:" }) }),
                    /* @__PURE__ */ jsxs("td", { className: "text-end", children: [
                      "฿",
                      formatCurrency(quotation.total_amount)
                    ] })
                  ] }),
                  quotation.discount_amount > 0 && /* @__PURE__ */ jsxs("tr", { children: [
                    /* @__PURE__ */ jsx("td", { colSpan: 4, className: "text-end", children: /* @__PURE__ */ jsx("strong", { children: "ส่วนลด:" }) }),
                    /* @__PURE__ */ jsxs("td", { className: "text-end", children: [
                      "-฿",
                      formatCurrency(quotation.discount_amount)
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("tr", { children: [
                    /* @__PURE__ */ jsx("td", { colSpan: 4, className: "text-end", children: /* @__PURE__ */ jsx("strong", { children: "ภาษีมูลค่าเพิ่ม (7%):" }) }),
                    /* @__PURE__ */ jsxs("td", { className: "text-end", children: [
                      "฿",
                      formatCurrency(quotation.tax_amount)
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("tr", { children: [
                    /* @__PURE__ */ jsx("td", { colSpan: 4, className: "text-end", children: /* @__PURE__ */ jsx("strong", { children: "ยอดรวมสุทธิ:" }) }),
                    /* @__PURE__ */ jsx("td", { className: "text-end", children: /* @__PURE__ */ jsxs("strong", { children: [
                      "฿",
                      formatCurrency(quotation.grand_total)
                    ] }) })
                  ] })
                ] })
              ] }) }),
              quotation.notes && /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
                /* @__PURE__ */ jsx("h4", { children: "หมายเหตุ" }),
                /* @__PURE__ */ jsx("p", { children: quotation.notes })
              ] }),
              quotation.terms && /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
                /* @__PURE__ */ jsx("h4", { children: "เงื่อนไขและข้อตกลง" }),
                /* @__PURE__ */ jsx("p", { children: quotation.terms })
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
