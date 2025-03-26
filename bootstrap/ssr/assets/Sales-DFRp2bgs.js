import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { Head, Link, router } from "@inertiajs/react";
import { A as Authenticated } from "./AuthenticatedLayout-CzjzYk7O.js";
import { D as DataTable } from "./DataTable-DUXHZJCe.js";
import { B as Breadcrumbs } from "./Breadcrumbs-Cz6SsN78.js";
function Sales({ auth, quotations, filters }) {
  const [loading, setLoading] = useState(false);
  const columns = [
    {
      field: "reference",
      label: "เลขที่อ้างอิง",
      sortable: true
    },
    {
      field: "date",
      label: "วันที่",
      sortable: true,
      render: (quotation) => {
        const date = new Date(quotation.date);
        return date.toLocaleDateString("th-TH");
      }
    },
    {
      field: "customer_name",
      label: "ลูกค้า",
      sortable: true
    },
    {
      field: "total_amount",
      label: "ยอดรวม",
      sortable: true,
      render: (quotation) => /* @__PURE__ */ jsxs("span", { children: [
        "฿",
        (quotation.total_amount / 100).toLocaleString("th-TH")
      ] })
    },
    {
      field: "actions",
      label: "จัดการ",
      className: "w-1",
      render: (quotation) => /* @__PURE__ */ jsxs("div", { className: "btn-list", children: [
        /* @__PURE__ */ jsx(
          Link,
          {
            href: route("quotations.show", quotation.id),
            className: "btn btn-sm",
            children: "ดูใบเสนอราคา"
          }
        ),
        quotation.order_id && /* @__PURE__ */ jsx(
          Link,
          {
            href: route("orders.show", quotation.order_id),
            className: "btn btn-sm btn-success",
            children: "ดูออเดอร์"
          }
        )
      ] })
    }
  ];
  const handleSearch = (value) => {
    setLoading(true);
    router.get(
      route("quotations.sales"),
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
      route("quotations.sales"),
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
      route("quotations.sales"),
      { ...filters, field, direction },
      {
        preserveState: true,
        preserveScroll: true,
        onSuccess: () => setLoading(false)
      }
    );
  };
  const pagination = {
    total: quotations.total,
    currentPage: quotations.current_page,
    perPage: quotations.per_page,
    links: quotations.links,
    from: quotations.from,
    to: quotations.to
  };
  const breadcrumbsItems = [
    { title: "หน้าหลัก", url: route("dashboard") },
    { title: "ใบเสนอราคา", url: route("quotations.index") },
    { title: "ใบเสนอราคาที่ขายแล้ว", url: void 0 }
  ];
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      user: auth.user,
      header: /* @__PURE__ */ jsx("div", { className: "page-header d-print-none", children: /* @__PURE__ */ jsxs("div", { className: "container-xl", children: [
        /* @__PURE__ */ jsx("div", { className: "page-pretitle", children: "รายการ" }),
        /* @__PURE__ */ jsx("h2", { className: "page-title", children: "ใบเสนอราคาที่ขายแล้ว" })
      ] }) }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "ใบเสนอราคาที่ขายแล้ว" }),
        /* @__PURE__ */ jsx("div", { className: "page-body", children: /* @__PURE__ */ jsxs("div", { className: "container-xl", children: [
          /* @__PURE__ */ jsx(Breadcrumbs, { items: breadcrumbsItems }),
          /* @__PURE__ */ jsx(
            DataTable,
            {
              data: quotations.data,
              columns,
              pagination,
              onSearch: handleSearch,
              onPerPageChange: handlePerPageChange,
              onSort: handleSort,
              sortField: filters.field,
              sortDirection: filters.direction,
              loading,
              title: "รายการใบเสนอราคาที่ขายแล้ว"
            }
          )
        ] }) })
      ]
    }
  );
}
export {
  Sales as default
};
