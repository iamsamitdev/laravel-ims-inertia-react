import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { useForm, Link, Head, router } from "@inertiajs/react";
import { A as Authenticated } from "./AuthenticatedLayout-CzjzYk7O.js";
import { D as DataTable } from "./DataTable-DUXHZJCe.js";
import { B as Breadcrumbs } from "./Breadcrumbs-Cz6SsN78.js";
function Report({ auth, purchases, filters, total_amount, start_date, end_date }) {
  const [loading, setLoading] = useState(false);
  const { data, setData, post, processing, errors } = useForm({
    start_date: start_date || "",
    end_date: end_date || ""
  });
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
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    post(route("purchases.getPurchaseReport"), {
      preserveState: true,
      preserveScroll: true,
      onSuccess: () => setLoading(false)
    });
  };
  const handleSearch = (value) => {
    if (!purchases) return;
    setLoading(true);
    router.get(
      route("purchases.getPurchaseReport"),
      { ...filters, search: value },
      {
        preserveState: true,
        preserveScroll: true,
        onSuccess: () => setLoading(false)
      }
    );
  };
  const handlePerPageChange = (value) => {
    if (!purchases) return;
    setLoading(true);
    router.get(
      route("purchases.getPurchaseReport"),
      { ...filters, perPage: value },
      {
        preserveState: true,
        preserveScroll: true,
        onSuccess: () => setLoading(false)
      }
    );
  };
  const handleSort = (field) => {
    if (!purchases) return;
    setLoading(true);
    const direction = field === filters.field && filters.direction === "asc" ? "desc" : "asc";
    router.get(
      route("purchases.getPurchaseReport"),
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
    /* @__PURE__ */ jsx(Link, { href: route("purchases.approvedPurchases"), className: "btn", children: "รายการที่อนุมัติแล้ว" }),
    /* @__PURE__ */ jsx(Link, { href: route("purchases.dailyPurchaseReport"), className: "btn", children: "รายงานประจำวัน" }),
    /* @__PURE__ */ jsx(Link, { href: route("purchases.getPurchaseReport"), className: "btn active", children: "ออกรายงาน" })
  ] });
  const pagination = purchases ? {
    total: purchases.total,
    currentPage: purchases.current_page,
    perPage: purchases.per_page,
    links: purchases.links,
    from: purchases.from,
    to: purchases.to
  } : void 0;
  const breadcrumbsItems = [
    { title: "หน้าหลัก", url: route("dashboard") },
    { title: "รายการสั่งซื้อ", url: route("purchases.index") },
    { title: "ออกรายงาน", url: void 0 }
  ];
  const tableActions = purchases && start_date && end_date && /* @__PURE__ */ jsxs(
    Link,
    {
      href: route("purchases.exportPurchaseReport", { start_date, end_date }),
      className: "btn btn-primary d-none d-sm-inline-block",
      target: "_blank",
      children: [
        /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", className: "icon icon-tabler icon-tabler-file-export", width: "24", height: "24", viewBox: "0 0 24 24", strokeWidth: "2", stroke: "currentColor", fill: "none", strokeLinecap: "round", strokeLinejoin: "round", children: [
          /* @__PURE__ */ jsx("path", { stroke: "none", d: "M0 0h24v24H0z", fill: "none" }),
          /* @__PURE__ */ jsx("path", { d: "M14 3v4a1 1 0 0 0 1 1h4" }),
          /* @__PURE__ */ jsx("path", { d: "M11.5 21h-4.5a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v5m-5 6h7m-3 -3l3 3l-3 3" })
        ] }),
        "ส่งออก Excel"
      ]
    }
  );
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      user: auth.user,
      header: /* @__PURE__ */ jsxs("div", { className: "page-header d-print-none", children: [
        /* @__PURE__ */ jsxs("div", { className: "container-xl", children: [
          /* @__PURE__ */ jsx("div", { className: "page-pretitle", children: "ระบบจัดการ" }),
          /* @__PURE__ */ jsx("h2", { className: "page-title", children: "ออกรายงานการสั่งซื้อ" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "col-auto ms-auto", children: /* @__PURE__ */ jsx("div", { className: "btn-list", children: tableActions }) })
      ] }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "ออกรายงานการสั่งซื้อ" }),
        /* @__PURE__ */ jsx("div", { className: "page-body", children: /* @__PURE__ */ jsxs("div", { className: "container-xl", children: [
          /* @__PURE__ */ jsx(Breadcrumbs, { items: breadcrumbsItems }),
          tabs,
          /* @__PURE__ */ jsxs("div", { className: "card mb-4", children: [
            /* @__PURE__ */ jsx("div", { className: "card-header", children: /* @__PURE__ */ jsx("h3", { className: "card-title", children: "เลือกช่วงเวลา" }) }),
            /* @__PURE__ */ jsx("div", { className: "card-body", children: /* @__PURE__ */ jsx("form", { onSubmit: handleSubmit, children: /* @__PURE__ */ jsxs("div", { className: "row", children: [
              /* @__PURE__ */ jsx("div", { className: "col-md-5", children: /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
                /* @__PURE__ */ jsx("label", { className: "form-label required", children: "วันที่เริ่มต้น" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "date",
                    className: `form-control ${errors.start_date ? "is-invalid" : ""}`,
                    value: data.start_date,
                    onChange: (e) => setData("start_date", e.target.value),
                    required: true
                  }
                ),
                errors.start_date && /* @__PURE__ */ jsx("div", { className: "invalid-feedback", children: errors.start_date })
              ] }) }),
              /* @__PURE__ */ jsx("div", { className: "col-md-5", children: /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
                /* @__PURE__ */ jsx("label", { className: "form-label required", children: "วันที่สิ้นสุด" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "date",
                    className: `form-control ${errors.end_date ? "is-invalid" : ""}`,
                    value: data.end_date,
                    onChange: (e) => setData("end_date", e.target.value),
                    required: true
                  }
                ),
                errors.end_date && /* @__PURE__ */ jsx("div", { className: "invalid-feedback", children: errors.end_date })
              ] }) }),
              /* @__PURE__ */ jsx("div", { className: "col-md-2", children: /* @__PURE__ */ jsxs("div", { className: "mb-3 d-flex align-items-end", children: [
                /* @__PURE__ */ jsx("label", { className: "form-label", children: " " }),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "submit",
                    className: "btn btn-primary w-100",
                    disabled: processing || loading,
                    children: processing || loading ? "กำลังค้นหา..." : "ค้นหา"
                  }
                )
              ] }) })
            ] }) }) })
          ] }),
          purchases && start_date && end_date && /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsxs("div", { className: "row mb-4", children: [
              /* @__PURE__ */ jsx("div", { className: "col-md-6", children: /* @__PURE__ */ jsx("div", { className: "card", children: /* @__PURE__ */ jsxs("div", { className: "card-body", children: [
                /* @__PURE__ */ jsx("div", { className: "d-flex align-items-center mb-3", children: /* @__PURE__ */ jsx("div", { className: "subheader", children: "ช่วงเวลา" }) }),
                /* @__PURE__ */ jsxs("div", { className: "h3 mb-3", children: [
                  new Date(start_date).toLocaleDateString("th-TH"),
                  " - ",
                  new Date(end_date).toLocaleDateString("th-TH")
                ] })
              ] }) }) }),
              /* @__PURE__ */ jsx("div", { className: "col-md-6", children: /* @__PURE__ */ jsx("div", { className: "card", children: /* @__PURE__ */ jsxs("div", { className: "card-body", children: [
                /* @__PURE__ */ jsx("div", { className: "d-flex align-items-center mb-3", children: /* @__PURE__ */ jsx("div", { className: "subheader", children: "ยอดรวมการสั่งซื้อในช่วงเวลาที่เลือก" }) }),
                /* @__PURE__ */ jsxs("div", { className: "h3 mb-3", children: [
                  "฿",
                  (total_amount / 100).toLocaleString("th-TH", { minimumFractionDigits: 2 })
                ] })
              ] }) }) })
            ] }),
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
                title: `รายงานการสั่งซื้อ ${new Date(start_date).toLocaleDateString("th-TH")} - ${new Date(end_date).toLocaleDateString("th-TH")}`
              }
            )
          ] }),
          !purchases && /* @__PURE__ */ jsxs("div", { className: "empty", children: [
            /* @__PURE__ */ jsx("div", { className: "empty-img", children: /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", className: "icon icon-tabler icon-tabler-search", width: "50", height: "50", viewBox: "0 0 24 24", strokeWidth: "2", stroke: "currentColor", fill: "none", strokeLinecap: "round", strokeLinejoin: "round", children: [
              /* @__PURE__ */ jsx("path", { stroke: "none", d: "M0 0h24v24H0z", fill: "none" }),
              /* @__PURE__ */ jsx("path", { d: "M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" }),
              /* @__PURE__ */ jsx("path", { d: "M21 21l-6 -6" })
            ] }) }),
            /* @__PURE__ */ jsx("p", { className: "empty-title", children: "โปรดเลือกช่วงเวลาที่ต้องการดูรายงาน" }),
            /* @__PURE__ */ jsx("p", { className: "empty-subtitle text-muted", children: "เลือกวันที่เริ่มต้นและวันที่สิ้นสุดเพื่อดูรายงานการสั่งซื้อในช่วงเวลาที่ต้องการ" })
          ] })
        ] }) })
      ]
    }
  );
}
export {
  Report as default
};
