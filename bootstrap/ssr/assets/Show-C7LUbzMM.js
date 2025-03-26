import { jsxs, jsx } from "react/jsx-runtime";
import { Head, Link } from "@inertiajs/react";
import { A as Authenticated } from "./AuthenticatedLayout-CzjzYk7O.js";
import { B as Breadcrumbs } from "./Breadcrumbs-Cz6SsN78.js";
import { D as DataTable } from "./DataTable-DUXHZJCe.js";
import "react";
function Show({ auth, supplier }) {
  const breadcrumbsItems = [
    { title: "หน้าหลัก", url: route("dashboard") },
    { title: "ซัพพลายเออร์", url: route("suppliers.index") },
    { title: supplier.name, url: void 0 }
  ];
  const purchaseColumns = [
    {
      field: "purchase_no",
      label: "เลขที่ใบสั่งซื้อ",
      sortable: true,
      render: (purchase) => /* @__PURE__ */ jsx(Link, { href: route("purchases.show", purchase.id), children: purchase.purchase_no })
    },
    {
      field: "date",
      label: "วันที่",
      sortable: true
    },
    {
      field: "total_amount",
      label: "จำนวนเงินรวม",
      sortable: true,
      render: (purchase) => /* @__PURE__ */ jsxs("span", { children: [
        "฿",
        parseFloat(purchase.total_amount.toString()).toLocaleString("th-TH", { minimumFractionDigits: 2 })
      ] })
    },
    {
      field: "status",
      label: "สถานะ",
      sortable: true,
      render: (purchase) => {
        let statusClass = "badge bg-secondary me-1";
        if (purchase.status === "completed") {
          statusClass = "badge bg-success me-1";
        } else if (purchase.status === "pending") {
          statusClass = "badge bg-warning me-1";
        } else if (purchase.status === "cancelled") {
          statusClass = "badge bg-danger me-1";
        }
        return /* @__PURE__ */ jsx("span", { className: statusClass, children: purchase.status });
      }
    },
    {
      field: "actions",
      label: "จัดการ",
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
            href: route("purchases.edit", purchase.id),
            className: "btn btn-sm btn-primary",
            children: "แก้ไข"
          }
        )
      ] })
    }
  ];
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      user: auth.user,
      header: /* @__PURE__ */ jsx("div", { className: "page-header d-print-none", children: /* @__PURE__ */ jsxs("div", { className: "container-xl", children: [
        /* @__PURE__ */ jsx("div", { className: "page-pretitle", children: "ข้อมูล" }),
        /* @__PURE__ */ jsx("h2", { className: "page-title", children: supplier.name })
      ] }) }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: `ซัพพลายเออร์: ${supplier.name}` }),
        /* @__PURE__ */ jsx("div", { className: "page-body", children: /* @__PURE__ */ jsxs("div", { className: "container-xl", children: [
          /* @__PURE__ */ jsx(Breadcrumbs, { items: breadcrumbsItems }),
          /* @__PURE__ */ jsxs("div", { className: "row", children: [
            /* @__PURE__ */ jsx("div", { className: "col-lg-4", children: /* @__PURE__ */ jsxs("div", { className: "card", children: [
              /* @__PURE__ */ jsxs("div", { className: "card-body", children: [
                /* @__PURE__ */ jsx("h3", { className: "card-title", children: "รูปโปรไฟล์" }),
                /* @__PURE__ */ jsx("div", { className: "text-center", children: /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: supplier.photo ? `/storage/${supplier.photo}` : "/assets/img/demo/user-placeholder.svg",
                    alt: supplier.name,
                    className: "rounded",
                    style: { maxWidth: "100%", height: "auto", maxHeight: "250px" }
                  }
                ) })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "card-footer", children: /* @__PURE__ */ jsxs("div", { className: "d-flex", children: [
                /* @__PURE__ */ jsx(
                  Link,
                  {
                    href: route("suppliers.edit", supplier.id),
                    className: "btn btn-link",
                    children: "แก้ไขซัพพลายเออร์"
                  }
                ),
                /* @__PURE__ */ jsx(
                  Link,
                  {
                    href: route("suppliers.index"),
                    className: "btn btn-link ms-auto",
                    children: "กลับไปยังรายการซัพพลายเออร์"
                  }
                )
              ] }) })
            ] }) }),
            /* @__PURE__ */ jsxs("div", { className: "col-lg-8", children: [
              /* @__PURE__ */ jsxs("div", { className: "card", children: [
                /* @__PURE__ */ jsx("div", { className: "card-header", children: /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("h3", { className: "card-title", children: "รายละเอียดซัพพลายเออร์" }) }) }),
                /* @__PURE__ */ jsx("div", { className: "table-responsive", children: /* @__PURE__ */ jsx("table", { className: "table table-bordered card-table table-vcenter text-nowrap", children: /* @__PURE__ */ jsxs("tbody", { children: [
                  /* @__PURE__ */ jsxs("tr", { children: [
                    /* @__PURE__ */ jsx("td", { style: { width: "30%" }, children: "ชื่อ" }),
                    /* @__PURE__ */ jsx("td", { children: supplier.name })
                  ] }),
                  /* @__PURE__ */ jsxs("tr", { children: [
                    /* @__PURE__ */ jsx("td", { children: "อีเมล" }),
                    /* @__PURE__ */ jsx("td", { children: supplier.email })
                  ] }),
                  /* @__PURE__ */ jsxs("tr", { children: [
                    /* @__PURE__ */ jsx("td", { children: "เบอร์โทรศัพท์" }),
                    /* @__PURE__ */ jsx("td", { children: supplier.phone })
                  ] }),
                  /* @__PURE__ */ jsxs("tr", { children: [
                    /* @__PURE__ */ jsx("td", { children: "ที่อยู่" }),
                    /* @__PURE__ */ jsx("td", { children: supplier.address })
                  ] }),
                  /* @__PURE__ */ jsxs("tr", { children: [
                    /* @__PURE__ */ jsx("td", { children: "ชื่อร้าน" }),
                    /* @__PURE__ */ jsx("td", { children: supplier.shopname })
                  ] }),
                  /* @__PURE__ */ jsxs("tr", { children: [
                    /* @__PURE__ */ jsx("td", { children: "ประเภท" }),
                    /* @__PURE__ */ jsx("td", { children: supplier.type.label })
                  ] }),
                  supplier.account_holder && /* @__PURE__ */ jsxs("tr", { children: [
                    /* @__PURE__ */ jsx("td", { children: "ชื่อเจ้าของบัญชี" }),
                    /* @__PURE__ */ jsx("td", { children: supplier.account_holder })
                  ] }),
                  supplier.account_number && /* @__PURE__ */ jsxs("tr", { children: [
                    /* @__PURE__ */ jsx("td", { children: "เลขที่บัญชี" }),
                    /* @__PURE__ */ jsx("td", { children: supplier.account_number })
                  ] }),
                  supplier.bank_name && /* @__PURE__ */ jsxs("tr", { children: [
                    /* @__PURE__ */ jsx("td", { children: "ชื่อธนาคาร" }),
                    /* @__PURE__ */ jsx("td", { children: supplier.bank_name })
                  ] })
                ] }) }) })
              ] }),
              supplier.purchases && supplier.purchases.length > 0 && /* @__PURE__ */ jsxs("div", { className: "card mt-3", children: [
                /* @__PURE__ */ jsx("div", { className: "card-header", children: /* @__PURE__ */ jsx("h3", { className: "card-title", children: "รายการสั่งซื้อ" }) }),
                /* @__PURE__ */ jsx("div", { className: "card-body", children: /* @__PURE__ */ jsx(
                  DataTable,
                  {
                    data: supplier.purchases,
                    columns: purchaseColumns,
                    sortField: "date",
                    sortDirection: "desc"
                  }
                ) })
              ] })
            ] })
          ] })
        ] }) })
      ]
    }
  );
}
export {
  Show as default
};
