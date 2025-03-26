import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { Link, Head, router } from "@inertiajs/react";
import { A as Authenticated } from "./AuthenticatedLayout-CzjzYk7O.js";
import { D as DataTable } from "./DataTable-DUXHZJCe.js";
import { B as Breadcrumbs } from "./Breadcrumbs-Cz6SsN78.js";
function Index({ auth, customers, filters }) {
  const [loading, setLoading] = useState(false);
  const columns = [
    {
      field: "name",
      label: "ชื่อลูกค้า",
      sortable: true,
      render: (customer) => /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("div", { className: "font-medium text-gray-900", children: customer.name }) })
    },
    {
      field: "email",
      label: "อีเมล",
      sortable: true
    },
    {
      field: "phone",
      label: "เบอร์โทรศัพท์",
      sortable: true
    },
    {
      field: "address",
      label: "ที่อยู่",
      sortable: false,
      render: (customer) => /* @__PURE__ */ jsx("div", { className: "text-wrap", style: { maxWidth: "300px" }, children: customer.address })
    },
    {
      field: "actions",
      label: "จัดการ",
      className: "w-1",
      render: (customer) => /* @__PURE__ */ jsxs("div", { className: "btn-list", children: [
        /* @__PURE__ */ jsx(
          Link,
          {
            href: route("customers.show", customer.id),
            className: "btn btn-sm",
            children: "ดู"
          }
        ),
        /* @__PURE__ */ jsx(
          Link,
          {
            href: route("customers.edit", customer.id),
            className: "btn btn-sm btn-primary",
            children: "แก้ไข"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => handleDelete(customer.id),
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
      route("customers.index"),
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
      route("customers.index"),
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
      route("customers.index"),
      { ...filters, field, direction },
      {
        preserveState: true,
        preserveScroll: true,
        onSuccess: () => setLoading(false)
      }
    );
  };
  const handleDelete = (id) => {
    if (confirm("คุณแน่ใจหรือไม่ที่จะลบลูกค้านี้?")) {
      router.delete(route("customers.destroy", id), {
        onSuccess: () => {
        }
      });
    }
  };
  const tableActions = /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(
      Link,
      {
        href: route("customers.create"),
        className: "btn btn-primary d-none d-sm-inline-block",
        children: [
          /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", className: "icon", width: "24", height: "24", viewBox: "0 0 24 24", strokeWidth: "2", stroke: "currentColor", fill: "none", strokeLinecap: "round", strokeLinejoin: "round", children: [
            /* @__PURE__ */ jsx("path", { stroke: "none", d: "M0 0h24v24H0z", fill: "none" }),
            /* @__PURE__ */ jsx("path", { d: "M12 5l0 14" }),
            /* @__PURE__ */ jsx("path", { d: "M5 12l14 0" })
          ] }),
          "เพิ่มลูกค้าใหม่"
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      Link,
      {
        href: route("customers.create"),
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
    total: customers.total,
    currentPage: customers.current_page,
    perPage: customers.per_page,
    links: customers.links,
    from: customers.from,
    to: customers.to
  };
  const breadcrumbsItems = [
    { title: "หน้าหลัก", url: route("dashboard") },
    { title: "ลูกค้า", url: void 0 }
  ];
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      user: auth.user,
      header: /* @__PURE__ */ jsx("div", { className: "page-header d-print-none", children: /* @__PURE__ */ jsxs("div", { className: "container-xl", children: [
        /* @__PURE__ */ jsx("div", { className: "page-pretitle", children: "รายการ" }),
        /* @__PURE__ */ jsx("h2", { className: "page-title", children: "ลูกค้า" })
      ] }) }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "ลูกค้า" }),
        /* @__PURE__ */ jsx("div", { className: "page-body", children: /* @__PURE__ */ jsxs("div", { className: "container-xl", children: [
          /* @__PURE__ */ jsx(Breadcrumbs, { items: breadcrumbsItems }),
          /* @__PURE__ */ jsx(
            DataTable,
            {
              data: customers.data,
              columns,
              pagination,
              onSearch: handleSearch,
              onPerPageChange: handlePerPageChange,
              onSort: handleSort,
              sortField: filters.field,
              sortDirection: filters.direction,
              loading,
              title: "รายการลูกค้า",
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
