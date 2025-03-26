import { jsx } from "react/jsx-runtime";
import { Link } from "@inertiajs/react";
function Breadcrumbs({ items }) {
  return /* @__PURE__ */ jsx("ol", { className: "breadcrumb breadcrumb-arrows", "aria-label": "breadcrumbs", children: items.map((item, index) => /* @__PURE__ */ jsx(
    "li",
    {
      className: `breadcrumb-item ${item.active ? "active" : ""}`,
      "aria-current": item.active ? "page" : void 0,
      children: item.url && !item.active ? /* @__PURE__ */ jsx(Link, { href: item.url, children: item.title }) : item.title
    },
    index
  )) });
}
export {
  Breadcrumbs as B
};
