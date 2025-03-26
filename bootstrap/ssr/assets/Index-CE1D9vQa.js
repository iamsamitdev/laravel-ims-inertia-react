import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { Link, Head, router } from "@inertiajs/react";
import { A as Authenticated } from "./AuthenticatedLayout-CzjzYk7O.js";
import { D as DataTable } from "./DataTable-DUXHZJCe.js";
import { B as Breadcrumbs } from "./Breadcrumbs-Cz6SsN78.js";
function Index({ auth, purchases, filters }) {
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
      field: "purchase_status",
      label: "สถานะการสั่งซื้อ",
      sortable: true,
      render: (purchase) => {
        const statusClass = purchase.purchase_status.value === 0 ? "badge bg-warning me-1" : "badge bg-success me-1";
        return /* @__PURE__ */ jsx("span", { className: statusClass, children: purchase.purchase_status.label });
      }
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
        purchase.purchase_status.value === 0 && /* @__PURE__ */ jsx(
          Link,
          {
            href: route("purchases.edit", purchase.id),
            className: "btn btn-sm btn-primary",
            children: "แก้ไข"
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
      route("purchases.index"),
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
      route("purchases.index"),
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
      route("purchases.index"),
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
        href: route("purchases.create"),
        className: "btn btn-primary d-none d-sm-inline-block",
        children: [
          /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", className: "icon", width: "24", height: "24", viewBox: "0 0 24 24", strokeWidth: "2", stroke: "currentColor", fill: "none", strokeLinecap: "round", strokeLinejoin: "round", children: [
            /* @__PURE__ */ jsx("path", { stroke: "none", d: "M0 0h24v24H0z", fill: "none" }),
            /* @__PURE__ */ jsx("path", { d: "M12 5l0 14" }),
            /* @__PURE__ */ jsx("path", { d: "M5 12l14 0" })
          ] }),
          "สร้างรายการสั่งซื้อใหม่"
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      Link,
      {
        href: route("purchases.create"),
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
    /* @__PURE__ */ jsx(Link, { href: route("purchases.index"), className: "btn active", children: "รายการทั้งหมด" }),
    /* @__PURE__ */ jsx(Link, { href: route("purchases.pending"), className: "btn", children: "รออนุมัติ" }),
    /* @__PURE__ */ jsx(Link, { href: route("purchases.complete"), className: "btn", children: "เสร็จสิ้น" }),
    /* @__PURE__ */ jsx(Link, { href: route("purchases.due"), className: "btn", children: "ค้างชำระ" })
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
    { title: "รายการสั่งซื้อสินค้าเข้า", url: void 0 }
  ];
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      user: auth.user,
      header: /* @__PURE__ */ jsx("div", { className: "row g-2 align-items-center", children: /* @__PURE__ */ jsxs("div", { className: "col", children: [
        /* @__PURE__ */ jsx("div", { className: "page-pretitle", children: "รายการ" }),
        /* @__PURE__ */ jsx("h2", { className: "page-title", children: "รายการสั่งซื้อสินค้าเข้า" })
      ] }) }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "รายการสั่งซื้อสินค้าเข้า" }),
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
              title: "รายการสั่งซื้อสินค้าเข้า",
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
