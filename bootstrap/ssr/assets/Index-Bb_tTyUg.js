import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { Link, Head, router } from "@inertiajs/react";
import { A as Authenticated } from "./AuthenticatedLayout-CzjzYk7O.js";
import { D as DataTable } from "./DataTable-DUXHZJCe.js";
import { B as Breadcrumbs } from "./Breadcrumbs-Cz6SsN78.js";
function Index({ auth, orders, filters }) {
  const [loading, setLoading] = useState(false);
  const columns = [
    {
      field: "invoice_no",
      label: "เลขที่ใบสั่งซื้อ",
      sortable: true,
      render: (order) => /* @__PURE__ */ jsx(Link, { href: route("orders.show", order.id), className: "text-decoration-none", children: order.invoice_no })
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
      field: "total_products",
      label: "รายการ",
      sortable: true
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
      field: "order_status",
      label: "สถานะ",
      sortable: true,
      render: (order) => {
        const statusClass = order.order_status.value === 0 ? "badge bg-warning me-1" : "badge bg-success me-1";
        return /* @__PURE__ */ jsx("span", { className: statusClass, children: order.order_status.label });
      }
    },
    {
      field: "actions",
      label: "จัดการ",
      className: "w-1",
      render: (order) => /* @__PURE__ */ jsxs("div", { className: "btn-list", children: [
        /* @__PURE__ */ jsx(
          Link,
          {
            href: route("orders.show", order.id),
            className: "btn btn-sm",
            children: "ดู"
          }
        ),
        order.order_status.value === 0 && /* @__PURE__ */ jsx(
          Link,
          {
            href: route("orders.edit", order.id),
            className: "btn btn-sm btn-primary",
            children: "แก้ไข"
          }
        ),
        /* @__PURE__ */ jsx(
          Link,
          {
            href: route("orders.invoice.download", order.id),
            className: "btn btn-sm btn-info",
            target: "_blank",
            children: "พิมพ์"
          }
        )
      ] })
    }
  ];
  const handleSearch = (value) => {
    setLoading(true);
    router.get(
      route("orders.index"),
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
      route("orders.index"),
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
      route("orders.index"),
      { ...filters, field, direction },
      {
        preserveState: true,
        preserveScroll: true,
        onSuccess: () => setLoading(false)
      }
    );
  };
  const tableActions = /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(
      Link,
      {
        href: route("orders.create"),
        className: "btn btn-primary d-none d-sm-inline-block",
        children: [
          /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", className: "icon", width: "24", height: "24", viewBox: "0 0 24 24", strokeWidth: "2", stroke: "currentColor", fill: "none", strokeLinecap: "round", strokeLinejoin: "round", children: [
            /* @__PURE__ */ jsx("path", { stroke: "none", d: "M0 0h24v24H0z", fill: "none" }),
            /* @__PURE__ */ jsx("path", { d: "M12 5l0 14" }),
            /* @__PURE__ */ jsx("path", { d: "M5 12l14 0" })
          ] }),
          "สร้างคำสั่งซื้อใหม่"
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      Link,
      {
        href: route("orders.create"),
        className: "btn btn-primary d-sm-none btn-icon",
        children: /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", className: "icon", width: "24", height: "24", viewBox: "0 0 24 24", strokeWidth: "2", stroke: "currentColor", fill: "none", strokeLinecap: "round", strokeLinejoin: "round", children: [
          /* @__PURE__ */ jsx("path", { stroke: "none", d: "M0 0h24v24H0z", fill: "none" }),
          /* @__PURE__ */ jsx("path", { d: "M12 5l0 14" }),
          /* @__PURE__ */ jsx("path", { d: "M5 12l14 0" })
        ] })
      }
    )
  ] });
  const tabs = /* @__PURE__ */ jsxs("div", { className: "d-flex mt-2 mb-3", children: [
    /* @__PURE__ */ jsx(Link, { href: route("orders.index"), className: "btn active", children: "รายการทั้งหมด" }),
    /* @__PURE__ */ jsx(Link, { href: route("orders.pending"), className: "btn", children: "รออนุมัติ" }),
    /* @__PURE__ */ jsx(Link, { href: route("orders.complete"), className: "btn", children: "เสร็จสิ้น" }),
    /* @__PURE__ */ jsx(Link, { href: route("due.index"), className: "btn", children: "ค้างชำระ" })
  ] });
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
    { title: "รายการสั่งซื้อ", url: void 0 }
  ];
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      user: auth.user,
      header: /* @__PURE__ */ jsx("div", { className: "page-header d-print-none", children: /* @__PURE__ */ jsxs("div", { className: "container-xl", children: [
        /* @__PURE__ */ jsx("div", { className: "page-pretitle", children: "รายการ" }),
        /* @__PURE__ */ jsx("h2", { className: "page-title", children: "รายการสั่งซื้อ" })
      ] }) }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "รายการสั่งซื้อ" }),
        /* @__PURE__ */ jsx("div", { className: "page-body", children: /* @__PURE__ */ jsxs("div", { className: "container-xl", children: [
          /* @__PURE__ */ jsx(Breadcrumbs, { items: breadcrumbsItems }),
          tabs,
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
              title: "รายการคำสั่งซื้อ",
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
