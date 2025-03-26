import { jsxs, jsx } from "react/jsx-runtime";
import { Head, Link } from "@inertiajs/react";
import { A as Authenticated } from "./AuthenticatedLayout-CzjzYk7O.js";
import { B as Breadcrumbs } from "./Breadcrumbs-Cz6SsN78.js";
import { D as DataTable } from "./DataTable-DUXHZJCe.js";
import "react";
function Show({ auth, unit }) {
  var _a;
  const breadcrumbsItems = [
    { title: "หน้าหลัก", url: route("dashboard") },
    { title: "หน่วยวัด", url: route("units.index") },
    { title: unit.name, url: void 0 }
  ];
  const productColumns = [
    {
      field: "name",
      label: "ชื่อสินค้า",
      sortable: true,
      render: (product) => /* @__PURE__ */ jsx(Link, { href: route("products.show", product.id), className: "text-decoration-none", children: product.name })
    },
    {
      field: "code",
      label: "รหัสสินค้า",
      sortable: true
    },
    {
      field: "category.name",
      label: "หมวดหมู่",
      sortable: true,
      render: (product) => {
        var _a2;
        return /* @__PURE__ */ jsx("span", { children: ((_a2 = product.category) == null ? void 0 : _a2.name) || "-" });
      }
    },
    {
      field: "stock",
      label: "คงเหลือ",
      sortable: true,
      render: (product) => /* @__PURE__ */ jsxs("span", { children: [
        product.stock,
        " ",
        unit.short_code
      ] })
    },
    {
      field: "selling_price",
      label: "ราคาขาย",
      sortable: true,
      render: (product) => /* @__PURE__ */ jsxs("span", { children: [
        "฿",
        parseFloat(product.selling_price.toString()).toLocaleString("th-TH", { minimumFractionDigits: 2 })
      ] })
    },
    {
      field: "actions",
      label: "จัดการ",
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
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      user: auth.user,
      header: /* @__PURE__ */ jsxs("div", { className: "row g-2 align-items-center", children: [
        /* @__PURE__ */ jsxs("div", { className: "col", children: [
          /* @__PURE__ */ jsx("div", { className: "page-pretitle", children: "ข้อมูล" }),
          /* @__PURE__ */ jsxs("h2", { className: "page-title", children: [
            "หน่วยวัด: ",
            unit.name
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "col-auto ms-auto", children: /* @__PURE__ */ jsx("div", { className: "btn-list", children: /* @__PURE__ */ jsxs(
          Link,
          {
            href: route("units.edit", unit.slug),
            className: "btn btn-primary d-none d-sm-inline-block",
            children: [
              /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", className: "icon icon-tabler icon-tabler-edit", width: "24", height: "24", viewBox: "0 0 24 24", strokeWidth: "2", stroke: "currentColor", fill: "none", strokeLinecap: "round", strokeLinejoin: "round", children: [
                /* @__PURE__ */ jsx("path", { stroke: "none", d: "M0 0h24v24H0z", fill: "none" }),
                /* @__PURE__ */ jsx("path", { d: "M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" }),
                /* @__PURE__ */ jsx("path", { d: "M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" }),
                /* @__PURE__ */ jsx("path", { d: "M16 5l3 3" })
              ] }),
              "แก้ไขหน่วยวัด"
            ]
          }
        ) }) })
      ] }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: `หน่วยวัด: ${unit.name}` }),
        /* @__PURE__ */ jsx("div", { className: "page-body", children: /* @__PURE__ */ jsxs("div", { className: "container-xl", children: [
          /* @__PURE__ */ jsx(Breadcrumbs, { items: breadcrumbsItems }),
          /* @__PURE__ */ jsx("div", { className: "row row-cards", children: /* @__PURE__ */ jsx("div", { className: "col-12", children: /* @__PURE__ */ jsxs("div", { className: "card", children: [
            /* @__PURE__ */ jsx("div", { className: "card-header", children: /* @__PURE__ */ jsx("h3", { className: "card-title", children: "รายละเอียดหน่วยวัด" }) }),
            /* @__PURE__ */ jsx("div", { className: "card-body", children: /* @__PURE__ */ jsxs("div", { className: "datagrid", children: [
              /* @__PURE__ */ jsxs("div", { className: "datagrid-item", children: [
                /* @__PURE__ */ jsx("div", { className: "datagrid-title", children: "ชื่อหน่วยวัด" }),
                /* @__PURE__ */ jsx("div", { className: "datagrid-content", children: unit.name })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "datagrid-item", children: [
                /* @__PURE__ */ jsx("div", { className: "datagrid-title", children: "Slug" }),
                /* @__PURE__ */ jsx("div", { className: "datagrid-content", children: unit.slug })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "datagrid-item", children: [
                /* @__PURE__ */ jsx("div", { className: "datagrid-title", children: "โค้ดย่อ" }),
                /* @__PURE__ */ jsx("div", { className: "datagrid-content", children: unit.short_code })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "datagrid-item", children: [
                /* @__PURE__ */ jsx("div", { className: "datagrid-title", children: "จำนวนสินค้าที่ใช้หน่วยวัดนี้" }),
                /* @__PURE__ */ jsxs("div", { className: "datagrid-content", children: [
                  ((_a = unit.products) == null ? void 0 : _a.length) || 0,
                  " รายการ"
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "datagrid-item", children: [
                /* @__PURE__ */ jsx("div", { className: "datagrid-title", children: "วันที่สร้าง" }),
                /* @__PURE__ */ jsx("div", { className: "datagrid-content", children: new Date(unit.created_at).toLocaleDateString("th-TH", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit"
                }) })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "datagrid-item", children: [
                /* @__PURE__ */ jsx("div", { className: "datagrid-title", children: "วันที่แก้ไขล่าสุด" }),
                /* @__PURE__ */ jsx("div", { className: "datagrid-content", children: new Date(unit.updated_at).toLocaleDateString("th-TH", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit"
                }) })
              ] })
            ] }) })
          ] }) }) }),
          /* @__PURE__ */ jsx("div", { className: "row mt-3", children: /* @__PURE__ */ jsx("div", { className: "col-12", children: /* @__PURE__ */ jsxs("div", { className: "card", children: [
            /* @__PURE__ */ jsx("div", { className: "card-header", children: /* @__PURE__ */ jsx("h3", { className: "card-title", children: "สินค้าที่ใช้หน่วยวัดนี้" }) }),
            /* @__PURE__ */ jsx("div", { className: "card-body", children: unit.products && unit.products.length > 0 ? /* @__PURE__ */ jsx(
              DataTable,
              {
                data: unit.products,
                columns: productColumns,
                sortField: "name",
                sortDirection: "asc"
              }
            ) : /* @__PURE__ */ jsxs("div", { className: "empty", children: [
              /* @__PURE__ */ jsx("div", { className: "empty-img", children: /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", className: "icon icon-tabler icon-tabler-package", width: "50", height: "50", viewBox: "0 0 24 24", strokeWidth: "2", stroke: "currentColor", fill: "none", strokeLinecap: "round", strokeLinejoin: "round", children: [
                /* @__PURE__ */ jsx("path", { stroke: "none", d: "M0 0h24v24H0z", fill: "none" }),
                /* @__PURE__ */ jsx("polyline", { points: "12 3 20 7.5 20 16.5 12 21 4 16.5 4 7.5 12 3" }),
                /* @__PURE__ */ jsx("line", { x1: "12", y1: "12", x2: "20", y2: "7.5" }),
                /* @__PURE__ */ jsx("line", { x1: "12", y1: "12", x2: "12", y2: "21" }),
                /* @__PURE__ */ jsx("line", { x1: "12", y1: "12", x2: "4", y2: "7.5" })
              ] }) }),
              /* @__PURE__ */ jsx("p", { className: "empty-title", children: "ไม่มีสินค้าที่ใช้หน่วยวัดนี้" }),
              /* @__PURE__ */ jsx("p", { className: "empty-subtitle text-muted", children: "คุณสามารถเพิ่มสินค้าใหม่และเลือกหน่วยวัดนี้ได้" }),
              /* @__PURE__ */ jsx("div", { className: "empty-action", children: /* @__PURE__ */ jsxs(Link, { href: route("products.create"), className: "btn btn-primary", children: [
                /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", className: "icon", width: "24", height: "24", viewBox: "0 0 24 24", strokeWidth: "2", stroke: "currentColor", fill: "none", strokeLinecap: "round", strokeLinejoin: "round", children: [
                  /* @__PURE__ */ jsx("path", { stroke: "none", d: "M0 0h24v24H0z", fill: "none" }),
                  /* @__PURE__ */ jsx("line", { x1: "12", y1: "5", x2: "12", y2: "19" }),
                  /* @__PURE__ */ jsx("line", { x1: "5", y1: "12", x2: "19", y2: "12" })
                ] }),
                "เพิ่มสินค้าใหม่"
              ] }) })
            ] }) })
          ] }) }) })
        ] }) })
      ]
    }
  );
}
export {
  Show as default
};
