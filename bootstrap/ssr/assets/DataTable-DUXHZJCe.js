import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { Link } from "@inertiajs/react";
function DataTable({
  data,
  columns,
  pagination,
  onSearch,
  onPerPageChange,
  onSort,
  sortField,
  sortDirection = "asc",
  loading = false,
  noDataText = "ไม่พบข้อมูล",
  title,
  actions
}) {
  const [search, setSearch] = useState("");
  const [perPage, setPerPage] = useState(10);
  const handleSearch = (e) => {
    setSearch(e.target.value);
    if (onSearch) {
      onSearch(e.target.value);
    }
  };
  const handlePerPageChange = (e) => {
    const value = parseInt(e.target.value);
    setPerPage(value);
    if (onPerPageChange) {
      onPerPageChange(value);
    }
  };
  const handleSort = (field) => {
    if (onSort) {
      onSort(field);
    }
  };
  const renderSortIcon = (field) => {
    if (field !== sortField) return null;
    return /* @__PURE__ */ jsx("span", { className: "ms-1", children: sortDirection === "asc" ? /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", className: "icon icon-sm", width: "24", height: "24", viewBox: "0 0 24 24", strokeWidth: "2", stroke: "currentColor", fill: "none", strokeLinecap: "round", strokeLinejoin: "round", children: [
      /* @__PURE__ */ jsx("path", { stroke: "none", d: "M0 0h24v24H0z", fill: "none" }),
      /* @__PURE__ */ jsx("path", { d: "M5 12l7 -7l7 7" })
    ] }) : /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", className: "icon icon-sm", width: "24", height: "24", viewBox: "0 0 24 24", strokeWidth: "2", stroke: "currentColor", fill: "none", strokeLinecap: "round", strokeLinejoin: "round", children: [
      /* @__PURE__ */ jsx("path", { stroke: "none", d: "M0 0h24v24H0z", fill: "none" }),
      /* @__PURE__ */ jsx("path", { d: "M5 12l7 7l7 -7" })
    ] }) });
  };
  return /* @__PURE__ */ jsxs("div", { className: "card", children: [
    (title || actions) && /* @__PURE__ */ jsxs("div", { className: "card-header", children: [
      title && /* @__PURE__ */ jsx("h3", { className: "card-title", children: title }),
      actions && /* @__PURE__ */ jsx("div", { className: "card-actions", children: actions })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "card-body border-bottom py-3", children: /* @__PURE__ */ jsxs("div", { className: "d-flex", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-secondary", children: [
        "แสดง",
        /* @__PURE__ */ jsx("div", { className: "mx-2 d-inline-block", children: /* @__PURE__ */ jsxs(
          "select",
          {
            className: "form-select form-select-sm",
            value: perPage,
            onChange: handlePerPageChange,
            children: [
              /* @__PURE__ */ jsx("option", { value: 5, children: "5" }),
              /* @__PURE__ */ jsx("option", { value: 10, children: "10" }),
              /* @__PURE__ */ jsx("option", { value: 15, children: "15" }),
              /* @__PURE__ */ jsx("option", { value: 25, children: "25" })
            ]
          }
        ) }),
        "รายการ"
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "ms-auto text-secondary", children: [
        "ค้นหา:",
        /* @__PURE__ */ jsx("div", { className: "ms-2 d-inline-block", children: /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            className: "form-control form-control-sm",
            value: search,
            onChange: handleSearch
          }
        ) })
      ] })
    ] }) }),
    loading && /* @__PURE__ */ jsx("div", { className: "progress progress-sm", children: /* @__PURE__ */ jsx("div", { className: "progress-bar progress-bar-indeterminate" }) }),
    /* @__PURE__ */ jsx("div", { className: "table-responsive", children: /* @__PURE__ */ jsxs("table", { className: `table table-vcenter card-table ${loading ? "opacity-50" : ""}`, children: [
      /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsx("tr", { children: columns.map((column, index) => /* @__PURE__ */ jsx("th", { className: column.className || "", children: column.sortable ? /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => handleSort(column.field),
          className: "btn-sort",
          children: [
            column.label,
            renderSortIcon(column.field)
          ]
        }
      ) : column.label }, index)) }) }),
      /* @__PURE__ */ jsx("tbody", { children: data.length > 0 ? data.map((item, index) => /* @__PURE__ */ jsx("tr", { children: columns.map((column, colIndex) => /* @__PURE__ */ jsx("td", { className: column.className || "", children: column.render ? column.render(item) : item[column.field] }, colIndex)) }, index)) : /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: columns.length, className: "text-center py-3", children: noDataText }) }) })
    ] }) }),
    pagination && /* @__PURE__ */ jsxs("div", { className: "card-footer d-flex align-items-center", children: [
      /* @__PURE__ */ jsxs("p", { className: "m-0 text-secondary", children: [
        "แสดง ",
        /* @__PURE__ */ jsx("span", { children: pagination.from }),
        "ถึง ",
        /* @__PURE__ */ jsx("span", { children: pagination.to }),
        " จาก ",
        /* @__PURE__ */ jsx("span", { children: pagination.total }),
        " รายการ"
      ] }),
      /* @__PURE__ */ jsx("ul", { className: "pagination m-0 ms-auto", children: pagination.links.map((link, index) => /* @__PURE__ */ jsx(
        "li",
        {
          className: `page-item ${link.active ? "active" : ""} ${!link.url ? "disabled" : ""}`,
          children: link.url ? /* @__PURE__ */ jsx(Link, { href: link.url, className: "page-link", dangerouslySetInnerHTML: { __html: link.label } }) : /* @__PURE__ */ jsx("span", { className: "page-link", dangerouslySetInnerHTML: { __html: link.label } })
        },
        index
      )) })
    ] })
  ] });
}
export {
  DataTable as D
};
