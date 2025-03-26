import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { Link, Head, router } from "@inertiajs/react";
import { A as Authenticated } from "./AuthenticatedLayout-CzjzYk7O.js";
import { D as DataTable } from "./DataTable-DUXHZJCe.js";
import { B as Breadcrumbs } from "./Breadcrumbs-Cz6SsN78.js";
function Approved({ auth, purchases, filters }) {
  const [loading, setLoading] = useState(false);
  const columns = [
    {
      field: "reference_no",
      label: "เลขที่อ้างอิง",
      sortable: true,
      render: (purchase) => /* @__PURE__ */ jsx(Link, { href: route("purchases.show", purchase.id), className: "text-decoration-none", children: purchase.reference_no })
    },
    {
      field: "supplier.name",
      label: "ซัพพลายเออร์",
      sortable: true,
      render: (purchase) => /* @__PURE__ */ jsx(Link, { href: route("suppliers.show", purchase.supplier_id), className: "text-decoration-none", children: purchase.supplier.name })
    },
    {
      field: "purchase_date",
      label: "วันที่",
      sortable: true,
      render: (purchase) => /* @__PURE__ */ jsx("span", { children: new Date(purchase.purchase_date).toLocaleDateString("th-TH") })
    },
    {
      field: "total_amount",
      label: "ยอดรวม",
      sortable: true,
      render: (purchase) => /* @__PURE__ */ jsxs("span", { children: [
        "฿",
        (purchase.total_amount / 100).toLocaleString("th-TH", { minimumFractionDigits: 2 })
      ] })
    },
    {
      field: "payment_status",
      label: "สถานะการชำระเงิน",
      sortable: true,
      render: (purchase) => {
        let statusClass;
        switch (purchase.payment_status.value) {
          case 0:
            statusClass = "badge bg-danger me-1";
            break;
          case 1:
            statusClass = "badge bg-warning me-1";
            break;
          case 2:
            statusClass = "badge bg-success me-1";
            break;
          default:
            statusClass = "badge me-1";
        }
        return /* @__PURE__ */ jsx("span", { className: statusClass, children: purchase.payment_status.label });
      }
    },
    {
      field: "actions",
      label: "จัดการ",
      className: "w-1",
      render: (purchase) => /* @__PURE__ */ jsxs("div", { className: "btn-list", children: [
        /* @__PURE__ */ jsx(
          Link,
          {
            href: route("purchases.show", purchase.id),
            className: "btn btn-sm",
            children: "ดู"
          }
        ),
        /* @__PURE__ */ jsx(
          Link,
          {
            href: route("purchases.print", purchase.id),
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
      route("purchases.approvedPurchases"),
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
      route("purchases.approvedPurchases"),
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
      route("purchases.approvedPurchases"),
      { ...filters, field, direction },
      {
        preserveState: true,
        preserveScroll: true,
        onSuccess: () => setLoading(false)
      }
    );
  };
  const tabs = /* @__PURE__ */ jsxs("div", { className: "d-flex mt-2 mb-3", children: [
    /* @__PURE__ */ jsx(Link, { href: route("purchases.index"), className: "btn", children: "รายการทั้งหมด" }),
    /* @__PURE__ */ jsx(Link, { href: route("purchases.approvedPurchases"), className: "btn active", children: "รายการที่อนุมัติแล้ว" }),
    /* @__PURE__ */ jsx(Link, { href: route("purchases.dailyPurchaseReport"), className: "btn", children: "รายงานประจำวัน" })
  ] });
  const pagination = {
    total: purchases.total,
    currentPage: purchases.current_page,
    perPage: purchases.per_page,
    links: purchases.links,
    from: purchases.from,
    to: purchases.to
  };
  const breadcrumbsItems = [
    { title: "หน้าหลัก", url: route("dashboard") },
    { title: "รายการสั่งซื้อ", url: route("purchases.index") },
    { title: "รายการที่อนุมัติแล้ว", url: void 0 }
  ];
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      user: auth.user,
      header: /* @__PURE__ */ jsx("div", { className: "page-header d-print-none", children: /* @__PURE__ */ jsxs("div", { className: "container-xl", children: [
        /* @__PURE__ */ jsx("div", { className: "page-pretitle", children: "ระบบจัดการ" }),
        /* @__PURE__ */ jsx("h2", { className: "page-title", children: "รายการสั่งซื้อที่อนุมัติแล้ว" })
      ] }) }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "รายการสั่งซื้อที่อนุมัติแล้ว" }),
        /* @__PURE__ */ jsx("div", { className: "page-body", children: /* @__PURE__ */ jsxs("div", { className: "container-xl", children: [
          /* @__PURE__ */ jsx(Breadcrumbs, { items: breadcrumbsItems }),
          tabs,
          /* @__PURE__ */ jsx(
            DataTable,
            {
              data: purchases.data,
              columns,
              pagination,
              onSearch: handleSearch,
              onPerPageChange: handlePerPageChange,
              onSort: handleSort,
              sortField: filters.field,
              sortDirection: filters.direction,
              loading,
              title: "รายการสั่งซื้อที่อนุมัติแล้ว"
            }
          )
        ] }) })
      ]
    }
  );
}
export {
  Approved as default
};
