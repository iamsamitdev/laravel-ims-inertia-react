import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { Link, Head, router } from "@inertiajs/react";
import { A as Authenticated } from "./AuthenticatedLayout-CzjzYk7O.js";
import { D as DataTable } from "./DataTable-DUXHZJCe.js";
import { B as Breadcrumbs } from "./Breadcrumbs-Cz6SsN78.js";
function Index({ auth, users, filters }) {
  const [loading, setLoading] = useState(false);
  const columns = [
    {
      field: "name",
      label: "ชื่อ",
      sortable: true
    },
    {
      field: "email",
      label: "อีเมล",
      sortable: true
    },
    {
      field: "role.name",
      label: "สิทธิ์การใช้งาน",
      sortable: true,
      render: (user) => {
        var _a;
        return /* @__PURE__ */ jsx("span", { className: "badge bg-blue me-1", children: ((_a = user.role) == null ? void 0 : _a.name) || "ผู้ใช้งานทั่วไป" });
      }
    },
    {
      field: "email_verified_at",
      label: "ยืนยันอีเมล",
      sortable: true,
      render: (user) => user.email_verified_at ? /* @__PURE__ */ jsx("span", { className: "badge bg-success me-1", children: "ยืนยันแล้ว" }) : /* @__PURE__ */ jsx("span", { className: "badge bg-danger me-1", children: "ยังไม่ยืนยัน" })
    },
    {
      field: "created_at",
      label: "วันที่สร้าง",
      sortable: true,
      render: (user) => /* @__PURE__ */ jsx("span", { children: new Date(user.created_at).toLocaleDateString("th-TH") })
    },
    {
      field: "actions",
      label: "จัดการ",
      className: "w-1",
      render: (user) => /* @__PURE__ */ jsxs("div", { className: "btn-list", children: [
        /* @__PURE__ */ jsx(
          Link,
          {
            href: route("users.show", user.id),
            className: "btn btn-sm",
            children: "ดู"
          }
        ),
        /* @__PURE__ */ jsx(
          Link,
          {
            href: route("users.edit", user.id),
            className: "btn btn-sm btn-primary",
            children: "แก้ไข"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => handleDelete(user.id),
            className: "btn btn-sm btn-danger",
            disabled: user.id === auth.user.id,
            children: "ลบ"
          }
        )
      ] })
    }
  ];
  const handleSearch = (value) => {
    setLoading(true);
    router.get(
      route("users.index"),
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
      route("users.index"),
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
      route("users.index"),
      { ...filters, field, direction },
      {
        preserveState: true,
        preserveScroll: true,
        onSuccess: () => setLoading(false)
      }
    );
  };
  const handleDelete = (id) => {
    if (id === auth.user.id) {
      alert("ไม่สามารถลบบัญชีของตัวเองได้");
      return;
    }
    if (confirm("คุณแน่ใจหรือไม่ที่จะลบผู้ใช้นี้?")) {
      router.delete(route("users.destroy", id), {
        onSuccess: () => {
        }
      });
    }
  };
  const tableActions = /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(
      Link,
      {
        href: route("users.create"),
        className: "btn btn-primary d-none d-sm-inline-block",
        children: [
          /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", className: "icon", width: "24", height: "24", viewBox: "0 0 24 24", strokeWidth: "2", stroke: "currentColor", fill: "none", strokeLinecap: "round", strokeLinejoin: "round", children: [
            /* @__PURE__ */ jsx("path", { stroke: "none", d: "M0 0h24v24H0z", fill: "none" }),
            /* @__PURE__ */ jsx("path", { d: "M12 5l0 14" }),
            /* @__PURE__ */ jsx("path", { d: "M5 12l14 0" })
          ] }),
          "เพิ่มผู้ใช้ใหม่"
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      Link,
      {
        href: route("users.create"),
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
    total: users.total,
    currentPage: users.current_page,
    perPage: users.per_page,
    links: users.links,
    from: users.from,
    to: users.to
  };
  const breadcrumbsItems = [
    { title: "หน้าหลัก", url: route("dashboard") },
    { title: "ผู้ใช้งาน", url: void 0 }
  ];
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      user: auth.user,
      header: /* @__PURE__ */ jsx("div", { className: "row g-2 align-items-center", children: /* @__PURE__ */ jsxs("div", { className: "col", children: [
        /* @__PURE__ */ jsx("div", { className: "page-pretitle", children: "รายการ" }),
        /* @__PURE__ */ jsx("h2", { className: "page-title", children: "ผู้ใช้งาน" })
      ] }) }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "ผู้ใช้งาน" }),
        /* @__PURE__ */ jsx("div", { className: "page-body", children: /* @__PURE__ */ jsxs("div", { className: "container-xl", children: [
          /* @__PURE__ */ jsx(Breadcrumbs, { items: breadcrumbsItems }),
          /* @__PURE__ */ jsx(
            DataTable,
            {
              data: users.data,
              columns,
              pagination,
              onSearch: handleSearch,
              onPerPageChange: handlePerPageChange,
              onSort: handleSort,
              sortField: filters.field,
              sortDirection: filters.direction,
              loading,
              title: "รายการผู้ใช้งาน",
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
