import { jsxs, jsx } from "react/jsx-runtime";
import { Head, Link } from "@inertiajs/react";
import { A as Authenticated } from "./AuthenticatedLayout-CzjzYk7O.js";
import { B as Breadcrumbs } from "./Breadcrumbs-Cz6SsN78.js";
import "react";
function Show({ auth, product, barcode }) {
  const breadcrumbsItems = [
    { title: "หน้าหลัก", url: route("dashboard") },
    { title: "สินค้า", url: route("products.index") },
    { title: product.name, url: void 0 }
  ];
  const taxTypeText = product.tax_type === 0 ? "รวมในราคาสินค้า" : "แยกต่างหาก";
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      user: auth.user,
      header: /* @__PURE__ */ jsxs("div", { className: "page-header d-print-none", children: [
        /* @__PURE__ */ jsxs("div", { className: "container-xl", children: [
          /* @__PURE__ */ jsx("div", { className: "page-pretitle", children: "รายละเอียด" }),
          /* @__PURE__ */ jsx("h2", { className: "page-title", children: product.name })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "col-auto ms-auto", children: /* @__PURE__ */ jsx("div", { className: "btn-list", children: /* @__PURE__ */ jsxs(
          Link,
          {
            href: route("products.edit", product.slug),
            className: "btn btn-primary d-none d-sm-inline-block",
            children: [
              /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", className: "icon icon-tabler icon-tabler-edit", width: "24", height: "24", viewBox: "0 0 24 24", strokeWidth: "2", stroke: "currentColor", fill: "none", strokeLinecap: "round", strokeLinejoin: "round", children: [
                /* @__PURE__ */ jsx("path", { stroke: "none", d: "M0 0h24v24H0z", fill: "none" }),
                /* @__PURE__ */ jsx("path", { d: "M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" }),
                /* @__PURE__ */ jsx("path", { d: "M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" }),
                /* @__PURE__ */ jsx("path", { d: "M16 5l3 3" })
              ] }),
              "แก้ไขสินค้า"
            ]
          }
        ) }) })
      ] }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: `สินค้า: ${product.name}` }),
        /* @__PURE__ */ jsx("div", { className: "page-body", children: /* @__PURE__ */ jsxs("div", { className: "container-xl", children: [
          /* @__PURE__ */ jsx(Breadcrumbs, { items: breadcrumbsItems }),
          /* @__PURE__ */ jsxs("div", { className: "row row-cards", children: [
            /* @__PURE__ */ jsxs("div", { className: "col-lg-4", children: [
              /* @__PURE__ */ jsx("div", { className: "card", children: /* @__PURE__ */ jsxs("div", { className: "card-body", children: [
                /* @__PURE__ */ jsx("h3", { className: "card-title", children: "รูปสินค้า" }),
                /* @__PURE__ */ jsx("div", { className: "text-center", children: /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: product.product_image ? `/storage/products/${product.product_image}` : "/assets/img/demo/product-placeholder.png",
                    alt: product.name,
                    className: "img-thumbnail",
                    style: { maxWidth: "100%", height: "auto", maxHeight: "250px" }
                  }
                ) })
              ] }) }),
              /* @__PURE__ */ jsx("div", { className: "card mt-3", children: /* @__PURE__ */ jsxs("div", { className: "card-body", children: [
                /* @__PURE__ */ jsx("h3", { className: "card-title", children: "บาร์โค้ด" }),
                /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
                  /* @__PURE__ */ jsx("div", { dangerouslySetInnerHTML: { __html: barcode } }),
                  /* @__PURE__ */ jsx("div", { className: "mt-2", children: product.code })
                ] })
              ] }) })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "col-lg-8", children: /* @__PURE__ */ jsxs("div", { className: "card", children: [
              /* @__PURE__ */ jsx("div", { className: "card-header", children: /* @__PURE__ */ jsx("h3", { className: "card-title", children: "ข้อมูลสินค้า" }) }),
              /* @__PURE__ */ jsx("div", { className: "table-responsive", children: /* @__PURE__ */ jsx("table", { className: "table table-bordered card-table table-vcenter text-nowrap", children: /* @__PURE__ */ jsxs("tbody", { children: [
                /* @__PURE__ */ jsxs("tr", { children: [
                  /* @__PURE__ */ jsx("td", { style: { width: "30%" }, children: "ชื่อสินค้า" }),
                  /* @__PURE__ */ jsx("td", { children: product.name })
                ] }),
                /* @__PURE__ */ jsxs("tr", { children: [
                  /* @__PURE__ */ jsx("td", { children: "Slug" }),
                  /* @__PURE__ */ jsx("td", { children: product.slug })
                ] }),
                /* @__PURE__ */ jsxs("tr", { children: [
                  /* @__PURE__ */ jsx("td", { children: "รหัสสินค้า" }),
                  /* @__PURE__ */ jsx("td", { children: product.code })
                ] }),
                /* @__PURE__ */ jsxs("tr", { children: [
                  /* @__PURE__ */ jsx("td", { children: "หมวดหมู่" }),
                  /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsx(Link, { href: route("categories.show", product.category.slug), children: product.category.name }) })
                ] }),
                /* @__PURE__ */ jsxs("tr", { children: [
                  /* @__PURE__ */ jsx("td", { children: "หน่วยวัด" }),
                  /* @__PURE__ */ jsx("td", { children: /* @__PURE__ */ jsxs(Link, { href: route("units.show", product.unit.id), children: [
                    product.unit.name,
                    " (",
                    product.unit.short_code,
                    ")"
                  ] }) })
                ] }),
                /* @__PURE__ */ jsxs("tr", { children: [
                  /* @__PURE__ */ jsx("td", { children: "จำนวนคงเหลือ" }),
                  /* @__PURE__ */ jsxs("td", { children: [
                    /* @__PURE__ */ jsxs("span", { className: product.quantity <= product.quantity_alert ? "text-danger" : "", children: [
                      product.quantity.toLocaleString(),
                      " ",
                      product.unit.short_code
                    ] }),
                    product.quantity <= product.quantity_alert && /* @__PURE__ */ jsx("span", { className: "badge bg-danger ms-2", children: "สินค้าใกล้หมด" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("tr", { children: [
                  /* @__PURE__ */ jsx("td", { children: "จำนวนแจ้งเตือน" }),
                  /* @__PURE__ */ jsxs("td", { children: [
                    product.quantity_alert.toLocaleString(),
                    " ",
                    product.unit.short_code
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("tr", { children: [
                  /* @__PURE__ */ jsx("td", { children: "ราคาซื้อ" }),
                  /* @__PURE__ */ jsxs("td", { children: [
                    "฿",
                    product.buying_price.toLocaleString("th-TH", { minimumFractionDigits: 2 })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("tr", { children: [
                  /* @__PURE__ */ jsx("td", { children: "ราคาขาย" }),
                  /* @__PURE__ */ jsxs("td", { children: [
                    "฿",
                    product.selling_price.toLocaleString("th-TH", { minimumFractionDigits: 2 })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("tr", { children: [
                  /* @__PURE__ */ jsx("td", { children: "ภาษี" }),
                  /* @__PURE__ */ jsx("td", { children: product.tax > 0 ? `${product.tax}% (${taxTypeText})` : "ไม่มี" })
                ] }),
                /* @__PURE__ */ jsxs("tr", { children: [
                  /* @__PURE__ */ jsx("td", { children: "วันที่สร้าง" }),
                  /* @__PURE__ */ jsx("td", { children: new Date(product.created_at).toLocaleDateString("th-TH", { dateStyle: "long" }) })
                ] }),
                /* @__PURE__ */ jsxs("tr", { children: [
                  /* @__PURE__ */ jsx("td", { children: "วันที่อัปเดต" }),
                  /* @__PURE__ */ jsx("td", { children: new Date(product.updated_at).toLocaleDateString("th-TH", { dateStyle: "long" }) })
                ] }),
                product.notes && /* @__PURE__ */ jsxs("tr", { children: [
                  /* @__PURE__ */ jsx("td", { children: "หมายเหตุ" }),
                  /* @__PURE__ */ jsx("td", { children: product.notes })
                ] })
              ] }) }) }),
              /* @__PURE__ */ jsx("div", { className: "card-footer text-end", children: /* @__PURE__ */ jsx(Link, { href: route("products.index"), className: "btn btn-outline-secondary", children: "กลับไปยังรายการสินค้า" }) })
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
