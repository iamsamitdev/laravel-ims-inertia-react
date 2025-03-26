import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { Link, Head, router } from "@inertiajs/react";
import { A as Authenticated } from "./AuthenticatedLayout-CzjzYk7O.js";
import { D as DataTable } from "./DataTable-DUXHZJCe.js";
import { B as Breadcrumbs } from "./Breadcrumbs-Cz6SsN78.js";
function Index({ auth, units, filters }) {
  const [loading, setLoading] = useState(false);
  const columns = [
    {
      field: "name",
      label: "ชื่อหน่วยวัด",
      sortable: true,
      render: (unit) => /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("div", { className: "font-medium text-gray-900", children: unit.name }) })
    },
    {
      field: "slug",
      label: "Slug",
      sortable: true
    },
    {
      field: "short_code",
      label: "โค้ดย่อ",
      sortable: true
    },
    {
      field: "actions",
      label: "จัดการ",
      className: "w-1",
      render: (unit) => /* @__PURE__ */ jsxs("div", { className: "btn-list", children: [
        /* @__PURE__ */ jsx(
          Link,
          {
            href: route("units.show", unit.slug),
            className: "btn btn-sm",
            children: "ดู"
          }
        ),
        /* @__PURE__ */ jsx(
          Link,
          {
            href: route("units.edit", unit.slug),
            className: "btn btn-sm btn-primary",
            children: "แก้ไข"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => handleDelete(unit.id),
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
      route("units.index"),
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
      route("units.index"),
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
      route("units.index"),
      { ...filters, field, direction },
      {
        preserveState: true,
        preserveScroll: true,
        onSuccess: () => setLoading(false)
      }
    );
  };
  const handleDelete = (id) => {
    if (confirm("คุณแน่ใจหรือไม่ที่จะลบหน่วยวัดนี้?")) {
      router.delete(route("units.destroy", id), {
        onSuccess: () => {
        }
      });
    }
  };
  const tableActions = /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(
      Link,
      {
        href: route("units.create"),
        className: "btn btn-primary d-none d-sm-inline-block",
        children: [
          /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", className: "icon", width: "24", height: "24", viewBox: "0 0 24 24", strokeWidth: "2", stroke: "currentColor", fill: "none", strokeLinecap: "round", strokeLinejoin: "round", children: [
            /* @__PURE__ */ jsx("path", { stroke: "none", d: "M0 0h24v24H0z", fill: "none" }),
            /* @__PURE__ */ jsx("path", { d: "M12 5l0 14" }),
            /* @__PURE__ */ jsx("path", { d: "M5 12l14 0" })
          ] }),
          "เพิ่มหน่วยวัดใหม่"
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      Link,
      {
        href: route("units.create"),
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
    total: units.total,
    currentPage: units.current_page,
    perPage: units.per_page,
    links: units.links,
    from: units.from,
    to: units.to
  };
  const breadcrumbsItems = [
    { title: "หน้าหลัก", url: route("dashboard") },
    { title: "หน่วยวัด", url: void 0 }
  ];
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      user: auth.user,
      header: /* @__PURE__ */ jsx("div", { className: "row g-2 align-items-center", children: /* @__PURE__ */ jsxs("div", { className: "col", children: [
        /* @__PURE__ */ jsx("div", { className: "page-pretitle", children: "รายการ" }),
        /* @__PURE__ */ jsx("h2", { className: "page-title", children: "หน่วยวัด" })
      ] }) }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "หน่วยวัด" }),
        /* @__PURE__ */ jsx("div", { className: "page-body", children: /* @__PURE__ */ jsxs("div", { className: "container-xl", children: [
          /* @__PURE__ */ jsx(Breadcrumbs, { items: breadcrumbsItems }),
          /* @__PURE__ */ jsx(
            DataTable,
            {
              data: units.data,
              columns,
              pagination,
              onSearch: handleSearch,
              onPerPageChange: handlePerPageChange,
              onSort: handleSort,
              sortField: filters.field,
              sortDirection: filters.direction,
              loading,
              title: "รายการหน่วยวัด",
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
