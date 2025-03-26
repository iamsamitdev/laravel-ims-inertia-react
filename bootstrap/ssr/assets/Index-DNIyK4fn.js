import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { Link, Head, router } from "@inertiajs/react";
import { A as Authenticated } from "./AuthenticatedLayout-CzjzYk7O.js";
import { D as DataTable } from "./DataTable-DUXHZJCe.js";
import { B as Breadcrumbs } from "./Breadcrumbs-Cz6SsN78.js";
function Index({ auth, products, filters }) {
  const [loading, setLoading] = useState(false);
  const columns = [
    {
      field: "name",
      label: "ชื่อสินค้า",
      sortable: true,
      render: (product) => /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("div", { className: "font-medium text-gray-900", children: product.name }) })
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
        var _a;
        return (_a = product.category) == null ? void 0 : _a.name;
      }
    },
    {
      field: "quantity",
      label: "จำนวน",
      sortable: true
    },
    {
      field: "selling_price",
      label: "ราคาขาย",
      sortable: true,
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
            href: route("products.show", product.slug),
            className: "btn btn-sm",
            children: "ดู"
          }
        ),
        /* @__PURE__ */ jsx(
          Link,
          {
            href: route("products.edit", product.slug),
            className: "btn btn-sm btn-primary",
            children: "แก้ไข"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => handleDelete(product.slug),
            className: "btn btn-sm btn-danger",
            children: "ลบ"
          }
        )
      ] })
    }
  ];
  const handleSearch = (value) => {
    setLoading(true);
    router.get(
      route("products.index"),
      { ...filters, search: value },
      {
        preserveState: true,
        preserveScroll: true,
        onSuccess: () => setLoading(false)
      }
    );
  };
  const handlePerPageChange = (value) => {
    setLoading(true);
    router.get(
      route("products.index"),
      { ...filters, perPage: value },
      {
        preserveState: true,
        preserveScroll: true,
        onSuccess: () => setLoading(false)
      }
    );
  };
  const handleSort = (field) => {
    setLoading(true);
    const direction = field === filters.field && filters.direction === "asc" ? "desc" : "asc";
    router.get(
      route("products.index"),
      { ...filters, field, direction },
      {
        preserveState: true,
        preserveScroll: true,
        onSuccess: () => setLoading(false)
      }
    );
  };
  const handleDelete = (slug) => {
    if (confirm("คุณแน่ใจหรือไม่ที่จะลบสินค้านี้?")) {
      router.delete(route("products.destroy", slug), {
        onSuccess: () => {
        }
      });
    }
  };
  const tableActions = /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(
      Link,
      {
        href: route("products.import.view"),
        className: "btn btn-info me-2",
        children: [
          /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", className: "icon", width: "24", height: "24", viewBox: "0 0 24 24", strokeWidth: "2", stroke: "currentColor", fill: "none", strokeLinecap: "round", strokeLinejoin: "round", children: [
            /* @__PURE__ */ jsx("path", { stroke: "none", d: "M0 0h24v24H0z", fill: "none" }),
            /* @__PURE__ */ jsx("path", { d: "M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" }),
            /* @__PURE__ */ jsx("path", { d: "M7 11l5 5l5 -5" }),
            /* @__PURE__ */ jsx("path", { d: "M12 4l0 12" })
          ] }),
          "นำเข้าสินค้า"
        ]
      }
    ),
    /* @__PURE__ */ jsxs(
      Link,
      {
        href: route("products.create"),
        className: "btn btn-primary",
        children: [
          /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", className: "icon", width: "24", height: "24", viewBox: "0 0 24 24", strokeWidth: "2", stroke: "currentColor", fill: "none", strokeLinecap: "round", strokeLinejoin: "round", children: [
            /* @__PURE__ */ jsx("path", { stroke: "none", d: "M0 0h24v24H0z", fill: "none" }),
            /* @__PURE__ */ jsx("path", { d: "M12 5l0 14" }),
            /* @__PURE__ */ jsx("path", { d: "M5 12l14 0" })
          ] }),
          "สร้างสินค้าใหม่"
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      Link,
      {
        href: route("products.create"),
        className: "btn btn-primary d-sm-none btn-icon",
        children: /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", className: "icon", width: "24", height: "24", viewBox: "0 0 24 24", strokeWidth: "2", stroke: "currentColor", fill: "none", strokeLinecap: "round", strokeLinejoin: "round", children: [
          /* @__PURE__ */ jsx("path", { stroke: "none", d: "M0 0h24v24H0z", fill: "none" }),
          /* @__PURE__ */ jsx("path", { d: "M12 5l0 14" }),
          /* @__PURE__ */ jsx("path", { d: "M5 12l14 0" })
        ] })
      }
    )
  ] });
  const pagination = {
    total: products.total,
    currentPage: products.current_page,
    perPage: products.per_page,
    links: products.links,
    from: products.from,
    to: products.to
  };
  const breadcrumbsItems = [
    { title: "หน้าหลัก", url: route("dashboard") },
    { title: "สินค้า", url: void 0 }
  ];
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      user: auth.user,
      header: /* @__PURE__ */ jsx("div", { className: "page-header d-print-none", children: /* @__PURE__ */ jsxs("div", { className: "container-xl", children: [
        /* @__PURE__ */ jsx("div", { className: "page-pretitle", children: "รายการ" }),
        /* @__PURE__ */ jsx("h2", { className: "page-title", children: "สินค้า" })
      ] }) }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "สินค้า" }),
        /* @__PURE__ */ jsx("div", { className: "page-body", children: /* @__PURE__ */ jsxs("div", { className: "container-xl", children: [
          /* @__PURE__ */ jsx(Breadcrumbs, { items: breadcrumbsItems }),
          /* @__PURE__ */ jsx(
            DataTable,
            {
              data: products.data,
              columns,
              pagination,
              onSearch: handleSearch,
              onPerPageChange: handlePerPageChange,
              onSort: handleSort,
              sortField: filters.field,
              sortDirection: filters.direction,
              loading,
              title: "รายการสินค้า",
              actions: tableActions
            }
          )
        ] }) })
      ]
    }
  );
}
export {
  Index as default
};
