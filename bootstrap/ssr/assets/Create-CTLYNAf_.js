import { jsxs, jsx } from "react/jsx-runtime";
import { useForm, Head, Link } from "@inertiajs/react";
import { A as Authenticated } from "./AuthenticatedLayout-CzjzYk7O.js";
import { B as Breadcrumbs } from "./Breadcrumbs-Cz6SsN78.js";
import "react";
function Create({ auth }) {
  const { data, setData, post, errors, processing } = useForm({
    name: "",
    slug: ""
  });
  const handleNameChange = (e) => {
    const name = e.target.value;
    setData("name", name);
    const slug = name.toLowerCase().replace(/\s+/g, "-").replace(/[^\w\-]+/g, "");
    setData("slug", slug);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    post(route("categories.store"));
  };
  const breadcrumbsItems = [
    { title: "หน้าหลัก", url: route("dashboard") },
    { title: "หมวดหมู่", url: route("categories.index") },
    { title: "เพิ่มหมวดหมู่ใหม่", url: void 0 }
  ];
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      user: auth.user,
      header: /* @__PURE__ */ jsx("div", { className: "row g-2 align-items-center", children: /* @__PURE__ */ jsxs("div", { className: "col", children: [
        /* @__PURE__ */ jsx("div", { className: "page-pretitle", children: "เพิ่มรายการ" }),
        /* @__PURE__ */ jsx("h2", { className: "page-title", children: "หมวดหมู่ใหม่" })
      ] }) }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "เพิ่มหมวดหมู่ใหม่" }),
        /* @__PURE__ */ jsx("div", { className: "page-body", children: /* @__PURE__ */ jsxs("div", { className: "container-xl", children: [
          /* @__PURE__ */ jsx(Breadcrumbs, { items: breadcrumbsItems }),
          /* @__PURE__ */ jsx("div", { className: "row justify-content-center", children: /* @__PURE__ */ jsx("div", { className: "col-12 col-md-8", children: /* @__PURE__ */ jsx("form", { onSubmit: handleSubmit, children: /* @__PURE__ */ jsxs("div", { className: "card", children: [
            /* @__PURE__ */ jsx("div", { className: "card-header", children: /* @__PURE__ */ jsx("h3", { className: "card-title", children: "รายละเอียดหมวดหมู่" }) }),
            /* @__PURE__ */ jsxs("div", { className: "card-body", children: [
              /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
                /* @__PURE__ */ jsx("label", { className: "form-label required", children: "ชื่อหมวดหมู่" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    className: `form-control ${errors.name ? "is-invalid" : ""}`,
                    value: data.name,
                    onChange: handleNameChange,
                    placeholder: "ป้อนชื่อหมวดหมู่"
                  }
                ),
                errors.name && /* @__PURE__ */ jsx("div", { className: "invalid-feedback", children: errors.name })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
                /* @__PURE__ */ jsx("label", { className: "form-label required", children: "Slug" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    className: `form-control ${errors.slug ? "is-invalid" : ""}`,
                    value: data.slug,
                    onChange: (e) => setData("slug", e.target.value),
                    placeholder: "ป้อน slug"
                  }
                ),
                errors.slug && /* @__PURE__ */ jsx("div", { className: "invalid-feedback", children: errors.slug })
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "card-footer text-end", children: /* @__PURE__ */ jsxs("div", { className: "d-flex", children: [
              /* @__PURE__ */ jsx(Link, { href: route("categories.index"), className: "btn btn-link", children: "ยกเลิก" }),
              /* @__PURE__ */ jsx("button", { type: "submit", className: "btn btn-primary ms-auto", disabled: processing, children: processing ? "กำลังบันทึก..." : "บันทึกข้อมูล" })
            ] }) })
          ] }) }) }) })
        ] }) })
      ]
    }
  );
}
export {
  Create as default
};
