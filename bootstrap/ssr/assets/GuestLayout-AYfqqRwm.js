import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@inertiajs/react";
function Guest({ children }) {
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100 dark:bg-gray-900", children: [
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(Link, { href: "/", className: "flex justify-center", children: /* @__PURE__ */ jsx("img", { src: "/static/logo.svg", width: "110", height: "32", alt: "IMS-Thai" }) }) }),
    /* @__PURE__ */ jsx("div", { className: "w-full sm:max-w-md mt-6 px-6 py-4 bg-white dark:bg-gray-800 shadow-md overflow-hidden sm:rounded-lg", children })
  ] });
}
export {
  Guest as G
};
