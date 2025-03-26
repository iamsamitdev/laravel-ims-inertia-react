import { jsxs, jsx } from "react/jsx-runtime";
import { useEffect } from "react";
import { useForm, Head, Link } from "@inertiajs/react";
import { A as Authenticated } from "./AuthenticatedLayout-CzjzYk7O.js";
import { B as Breadcrumbs } from "./Breadcrumbs-Cz6SsN78.js";
function Create({ auth }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: "",
    slug: "",
    short_code: ""
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    post(route("units.store"), {
      onSuccess: () => reset()
    });
  };
  useEffect(() => {
    const slug = data.name.toLowerCase().replace(/\s+/g, "-").replace(/[^\w\-]+/g, "");
    setData("slug", slug);
  }, [data.name]);
  const breadcrumbsItems = [
    { title: "หน้าหลัก", url: route("dashboard") },
    { title: "หน่วยวัด", url: route("units.index") },
    { title: "เพิ่มหน่วยวัดใหม่", url: void 0 }
  ];
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      user: auth.user,
      header: /* @__PURE__ */ jsx("div", { className: "row g-2 align-items-center", children: /* @__PURE__ */ jsxs("div", { className: "col", children: [
        /* @__PURE__ */ jsx("div", { className: "page-pretitle", children: "ฟอร์ม" }),
        /* @__PURE__ */ jsx("h2", { className: "page-title", children: "เพิ่มหน่วยวัดใหม่" })
      ] }) }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "เพิ่มหน่วยวัดใหม่" }),
        /* @__PURE__ */ jsx("div", { className: "page-body", children: /* @__PURE__ */ jsxs("div", { className: "container-xl", children: [
          /* @__PURE__ */ jsx(Breadcrumbs, { items: breadcrumbsItems }),
          /* @__PURE__ */ jsx("div", { className: "row row-cards", children: /* @__PURE__ */ jsx("div", { className: "col-12", children: /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "card", children: [
            /* @__PURE__ */ jsx("div", { className: "card-header", children: /* @__PURE__ */ jsx("h4", { className: "card-title", children: "ข้อมูลหน่วยวัด" }) }),
            /* @__PURE__ */ jsxs("div", { className: "card-body", children: [
              /* @__PURE__ */ jsxs("div", { className: "mb-3 row", children: [
                /* @__PURE__ */ jsx("label", { className: "col-3 col-form-label required", children: "ชื่อหน่วยวัด" }),
                /* @__PURE__ */ jsxs("div", { className: "col", children: [
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "text",
                      className: `form-control ${errors.name ? "is-invalid" : ""}`,
                      placeholder: "เช่น กล่อง, ชิ้น, เมตร",
                      value: data.name,
                      onChange: (e) => setData("name", e.target.value)
                    }
                  ),
                  errors.name && /* @__PURE__ */ jsx("div", { className: "invalid-feedback", children: errors.name })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "mb-3 row", children: [
                /* @__PURE__ */ jsx("label", { className: "col-3 col-form-label required", children: "Slug" }),
                /* @__PURE__ */ jsxs("div", { className: "col", children: [
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "text",
                      className: `form-control ${errors.slug ? "is-invalid" : ""}`,
                      placeholder: "slug-url-format",
                      value: data.slug,
                      onChange: (e) => setData("slug", e.target.value)
                    }
                  ),
                  errors.slug && /* @__PURE__ */ jsx("div", { className: "invalid-feedback", children: errors.slug }),
                  /* @__PURE__ */ jsx("small", { className: "form-hint", children: "ใช้สำหรับ URL และระบบภายใน ควรเป็นภาษาอังกฤษ ตัวพิมพ์เล็ก ไม่มีช่องว่าง" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "mb-3 row", children: [
                /* @__PURE__ */ jsx("label", { className: "col-3 col-form-label required", children: "โค้ดย่อ" }),
                /* @__PURE__ */ jsxs("div", { className: "col", children: [
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "text",
                      className: `form-control ${errors.short_code ? "is-invalid" : ""}`,
                      placeholder: "เช่น pcs, kg, m",
                      value: data.short_code,
                      onChange: (e) => setData("short_code", e.target.value)
                    }
                  ),
                  errors.short_code && /* @__PURE__ */ jsx("div", { className: "invalid-feedback", children: errors.short_code }),
                  /* @__PURE__ */ jsx("small", { className: "form-hint", children: "ใช้แสดงตัวย่อสั้นๆ ของหน่วยวัด เช่น pcs, kg, m" })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "card-footer text-end", children: /* @__PURE__ */ jsxs("div", { className: "d-flex", children: [
              /* @__PURE__ */ jsx(
                Link,
                {
                  href: route("units.index"),
                  className: "btn btn-link",
                  children: "ยกเลิก"
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "submit",
                  className: "btn btn-primary ms-auto",
                  disabled: processing,
                  children: "บันทึก"
                }
              )
            ] }) })
          ] }) }) })
        ] }) })
      ]
    }
  );
}
export {
  Create as default
};
