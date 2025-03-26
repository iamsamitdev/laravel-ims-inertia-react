import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { Link, Head, router } from "@inertiajs/react";
import { A as Authenticated } from "./AuthenticatedLayout-CzjzYk7O.js";
import { D as DataTable } from "./DataTable-DUXHZJCe.js";
import { B as Breadcrumbs } from "./Breadcrumbs-Cz6SsN78.js";
function Index({ auth, quotations, filters }) {
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
      field: "status",
      label: "สถานะ",
      sortable: true,
      render: (quotation) => {
        let statusClass = "";
        let statusText = "";
        switch (quotation.status) {
          case 0:
            statusClass = "badge bg-secondary";
            statusText = "ร่าง";
            break;
          case 1:
            statusClass = "badge bg-primary";
            statusText = "ส่งแล้ว";
            break;
          case 2:
            statusClass = "badge bg-success";
            statusText = "ขายแล้ว";
            break;
          case 3:
            statusClass = "badge bg-danger";
            statusText = "ยกเลิก";
            break;
          default:
            statusClass = "badge bg-secondary";
            statusText = "ไม่ระบุ";
        }
        return /* @__PURE__ */ jsx("span", { className: statusClass, children: statusText });
      }
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
            children: "ดู"
          }
        ),
        /* @__PURE__ */ jsx(
          Link,
          {
            href: route("quotations.edit", quotation.id),
            className: "btn btn-sm btn-primary",
            children: "แก้ไข"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => handleDelete(quotation.id),
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
      route("quotations.index"),
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
      route("quotations.index"),
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
      route("quotations.index"),
      { ...filters, field, direction },
      {
        preserveState: true,
        preserveScroll: true,
        onSuccess: () => setLoading(false)
      }
    );
  };
  const handleDelete = (id) => {
    if (confirm("คุณแน่ใจหรือไม่ที่จะลบใบเสนอราคานี้?")) {
      router.delete(route("quotations.destroy", id), {
        onSuccess: () => {
        }
      });
    }
  };
  const tableActions = /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(
      Link,
      {
        href: route("quotations.sales"),
        className: "btn btn-info me-2",
        children: [
          /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", className: "icon", width: "24", height: "24", viewBox: "0 0 24 24", strokeWidth: "2", stroke: "currentColor", fill: "none", strokeLinecap: "round", strokeLinejoin: "round", children: [
            /* @__PURE__ */ jsx("path", { stroke: "none", d: "M0 0h24v24H0z", fill: "none" }),
            /* @__PURE__ */ jsx("path", { d: "M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2" }),
            /* @__PURE__ */ jsx("path", { d: "M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" }),
            /* @__PURE__ */ jsx("path", { d: "M9 12l6 0" }),
            /* @__PURE__ */ jsx("path", { d: "M9 16l6 0" })
          ] }),
          "ใบเสนอราคาที่ขายแล้ว"
        ]
      }
    ),
    /* @__PURE__ */ jsxs(
      Link,
      {
        href: route("quotations.create"),
        className: "btn btn-primary",
        children: [
          /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", className: "icon", width: "24", height: "24", viewBox: "0 0 24 24", strokeWidth: "2", stroke: "currentColor", fill: "none", strokeLinecap: "round", strokeLinejoin: "round", children: [
            /* @__PURE__ */ jsx("path", { stroke: "none", d: "M0 0h24v24H0z", fill: "none" }),
            /* @__PURE__ */ jsx("path", { d: "M12 5l0 14" }),
            /* @__PURE__ */ jsx("path", { d: "M5 12l14 0" })
          ] }),
          "สร้างใบเสนอราคาใหม่"
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      Link,
      {
        href: route("quotations.create"),
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
    total: quotations.total,
    currentPage: quotations.current_page,
    perPage: quotations.per_page,
    links: quotations.links,
    from: quotations.from,
    to: quotations.to
  };
  const breadcrumbsItems = [
    { title: "หน้าหลัก", url: route("dashboard") },
    { title: "ใบเสนอราคา", url: void 0 }
  ];
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      user: auth.user,
      header: /* @__PURE__ */ jsx("div", { className: "page-header d-print-none", children: /* @__PURE__ */ jsxs("div", { className: "container-xl", children: [
        /* @__PURE__ */ jsx("div", { className: "page-pretitle", children: "รายการ" }),
        /* @__PURE__ */ jsx("h2", { className: "page-title", children: "ใบเสนอราคา" })
      ] }) }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "ใบเสนอราคา" }),
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
              title: "รายการใบเสนอราคา",
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
