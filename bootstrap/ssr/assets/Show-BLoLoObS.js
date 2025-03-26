import { jsxs, jsx } from "react/jsx-runtime";
import { Head, Link } from "@inertiajs/react";
import { A as Authenticated } from "./AuthenticatedLayout-CzjzYk7O.js";
import { B as Breadcrumbs } from "./Breadcrumbs-Cz6SsN78.js";
import { D as DataTable } from "./DataTable-DUXHZJCe.js";
import "react";
function Show({ auth, category, products }) {
  const columns = [
    {
      field: "name",
      label: "ชื่อสินค้า",
      render: (product) => /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("div", { className: "font-medium text-gray-900", children: product.name }) })
    },
    {
      field: "code",
      label: "รหัสสินค้า"
    },
    {
      field: "unit.name",
      label: "หน่วย",
      render: (product) => {
        var _a;
        return ((_a = product.unit) == null ? void 0 : _a.name) || "-";
      }
    },
    {
      field: "quantity",
      label: "จำนวน"
    },
    {
      field: "selling_price",
      label: "ราคาขาย",
      render: (product) => /* @__PURE__ */ jsxs("span", { children: [
        "฿",
        product.selling_price.toLocaleString("th-TH")
      ] })
    },
    {
      field: "actions",
      label: "จัดการ",
      className: "w-1",
      render: (product) => /* @__PURE__ */ jsxs("div", { className: "btn-list", children: [
        /* @__PURE__ */ jsx(
          Link,
          {
            href: route("products.show", product.id),
            className: "btn btn-sm",
            children: "ดู"
          }
        ),
        /* @__PURE__ */ jsx(
          Link,
          {
            href: route("products.edit", product.id),
            className: "btn btn-sm btn-primary",
            children: "แก้ไข"
          }
        )
      ] })
    }
  ];
  const breadcrumbsItems = [
    { title: "หน้าหลัก", url: route("dashboard") },
    { title: "หมวดหมู่", url: route("categories.index") },
    { title: category.name, url: void 0 }
  ];
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      user: auth.user,
      header: /* @__PURE__ */ jsx("div", { className: "row g-2 align-items-center", children: /* @__PURE__ */ jsxs("div", { className: "container-xl", children: [
        /* @__PURE__ */ jsx("div", { className: "page-pretitle", children: "รายละเอียด" }),
        /* @__PURE__ */ jsxs("h2", { className: "page-title", children: [
          "หมวดหมู่: ",
          category.name
        ] })
      ] }) }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: `รายละเอียดหมวดหมู่ - ${category.name}` }),
        /* @__PURE__ */ jsx("div", { className: "page-body", children: /* @__PURE__ */ jsxs("div", { className: "container-xl", children: [
          /* @__PURE__ */ jsx(Breadcrumbs, { items: breadcrumbsItems }),
          /* @__PURE__ */ jsxs("div", { className: "row", children: [
            /* @__PURE__ */ jsx("div", { className: "col-md-4", children: /* @__PURE__ */ jsxs("div", { className: "card", children: [
              /* @__PURE__ */ jsxs("div", { className: "card-header", children: [
                /* @__PURE__ */ jsx("h3", { className: "card-title", children: "ข้อมูลหมวดหมู่" }),
                /* @__PURE__ */ jsx("div", { className: "card-actions", children: /* @__PURE__ */ jsx(Link, { href: route("categories.edit", category.id), className: "btn btn-primary", children: "แก้ไขข้อมูล" }) })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "card-body", children: [
                /* @__PURE__ */ jsx("div", { className: "mb-3", children: /* @__PURE__ */ jsxs("div", { className: "row", children: [
                  /* @__PURE__ */ jsx("div", { className: "col-md-4 fw-bold", children: "ชื่อ" }),
                  /* @__PURE__ */ jsx("div", { className: "col-md-8", children: category.name })
                ] }) }),
                /* @__PURE__ */ jsx("div", { className: "mb-3", children: /* @__PURE__ */ jsxs("div", { className: "row", children: [
                  /* @__PURE__ */ jsx("div", { className: "col-md-4 fw-bold", children: "Slug" }),
                  /* @__PURE__ */ jsx("div", { className: "col-md-8", children: category.slug })
                ] }) }),
                /* @__PURE__ */ jsx("div", { className: "mb-3", children: /* @__PURE__ */ jsxs("div", { className: "row", children: [
                  /* @__PURE__ */ jsx("div", { className: "col-md-4 fw-bold", children: "วันที่สร้าง" }),
                  /* @__PURE__ */ jsx("div", { className: "col-md-8", children: new Date(category.created_at).toLocaleDateString("th-TH") })
                ] }) }),
                /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("div", { className: "row", children: [
                  /* @__PURE__ */ jsx("div", { className: "col-md-4 fw-bold", children: "อัปเดตล่าสุด" }),
                  /* @__PURE__ */ jsx("div", { className: "col-md-8", children: new Date(category.updated_at).toLocaleDateString("th-TH") })
                ] }) })
              ] })
            ] }) }),
            /* @__PURE__ */ jsx("div", { className: "col-md-8", children: /* @__PURE__ */ jsx(
              DataTable,
              {
                data: products,
                columns,
                title: `สินค้าในหมวดหมู่ (${products.length})`,
                noDataText: "ไม่พบสินค้าในหมวดหมู่นี้"
              }
            ) })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mt-3", children: /* @__PURE__ */ jsx(Link, { href: route("categories.index"), className: "btn btn-link", children: "กลับไปยังรายการหมวดหมู่" }) })
        ] }) })
      ]
    }
  );
}
export {
  Show as default
};
