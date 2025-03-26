import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { Head, Link, router } from "@inertiajs/react";
import { A as Authenticated } from "./AuthenticatedLayout-CzjzYk7O.js";
import { D as DataTable } from "./DataTable-DUXHZJCe.js";
import { B as Breadcrumbs } from "./Breadcrumbs-Cz6SsN78.js";
function Index({ auth, orders, filters }) {
  const [loading, setLoading] = useState(false);
  const columns = [
    {
      field: "invoice_no",
      label: "เลขที่ใบแจ้งหนี้",
      sortable: true,
      render: (order) => /* @__PURE__ */ jsx(Link, { href: route("due.show", order.id), className: "text-decoration-none", children: order.invoice_no })
    },
    {
      field: "customer.name",
      label: "ลูกค้า",
      sortable: true,
      render: (order) => /* @__PURE__ */ jsx(Link, { href: route("customers.show", order.customer_id), className: "text-decoration-none", children: order.customer.name })
    },
    {
      field: "order_date",
      label: "วันที่",
      sortable: true,
      render: (order) => /* @__PURE__ */ jsx("span", { children: new Date(order.order_date).toLocaleDateString("th-TH") })
    },
    {
      field: "total",
      label: "ยอดรวม",
      sortable: true,
      render: (order) => /* @__PURE__ */ jsxs("span", { children: [
        "฿",
        (order.total / 100).toLocaleString("th-TH", { minimumFractionDigits: 2 })
      ] })
    },
    {
      field: "pay",
      label: "ชำระแล้ว",
      sortable: true,
      render: (order) => /* @__PURE__ */ jsxs("span", { children: [
        "฿",
        (order.pay / 100).toLocaleString("th-TH", { minimumFractionDigits: 2 })
      ] })
    },
    {
      field: "due",
      label: "ค้างชำระ",
      sortable: true,
      render: (order) => /* @__PURE__ */ jsxs("span", { className: "text-danger", children: [
        "฿",
        (order.due / 100).toLocaleString("th-TH", { minimumFractionDigits: 2 })
      ] })
    },
    {
      field: "actions",
      label: "จัดการ",
      className: "w-1",
      render: (order) => /* @__PURE__ */ jsxs("div", { className: "btn-list", children: [
        /* @__PURE__ */ jsx(
          Link,
          {
            href: route("due.show", order.id),
            className: "btn btn-sm",
            children: "ดู"
          }
        ),
        /* @__PURE__ */ jsx(
          Link,
          {
            href: route("due.edit", order.id),
            className: "btn btn-sm btn-primary",
            children: "ชำระเงิน"
          }
        )
      ] })
    }
  ];
  const handleSearch = (value) => {
    setLoading(true);
    router.get(
      route("due.index"),
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
      route("due.index"),
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
      route("due.index"),
      { ...filters, field, direction },
      {
        preserveState: true,
        preserveScroll: true,
        onSuccess: () => setLoading(false)
      }
    );
  };
  const pagination = {
    total: orders.total,
    currentPage: orders.current_page,
    perPage: orders.per_page,
    links: orders.links,
    from: orders.from,
    to: orders.to
  };
  const breadcrumbsItems = [
    { title: "หน้าหลัก", url: route("dashboard") },
    { title: "รายการค้างชำระ", url: void 0 }
  ];
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      user: auth.user,
      header: /* @__PURE__ */ jsx("div", { className: "page-header d-print-none", children: /* @__PURE__ */ jsxs("div", { className: "container-xl", children: [
        /* @__PURE__ */ jsx("div", { className: "page-pretitle", children: "รายการ" }),
        /* @__PURE__ */ jsx("h2", { className: "page-title", children: "รายการค้างชำระ" })
      ] }) }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "รายการค้างชำระ" }),
        /* @__PURE__ */ jsx("div", { className: "page-body", children: /* @__PURE__ */ jsxs("div", { className: "container-xl", children: [
          /* @__PURE__ */ jsx(Breadcrumbs, { items: breadcrumbsItems }),
          /* @__PURE__ */ jsx(
            DataTable,
            {
              data: orders.data,
              columns,
              pagination,
              onSearch: handleSearch,
              onPerPageChange: handlePerPageChange,
              onSort: handleSort,
              sortField: filters.field,
              sortDirection: filters.direction,
              loading,
              title: "รายการค้างชำระ"
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
