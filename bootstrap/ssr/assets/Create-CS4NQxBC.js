import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { useForm, Head, Link } from "@inertiajs/react";
import { A as Authenticated } from "./AuthenticatedLayout-CzjzYk7O.js";
import { B as Breadcrumbs } from "./Breadcrumbs-Cz6SsN78.js";
function Create({ auth }) {
  const [imagePreview, setImagePreview] = useState(null);
  const { data, setData, post, errors, processing } = useForm({
    photo: null,
    name: "",
    email: "",
    phone: "",
    address: "",
    account_holder: "",
    account_number: "",
    bank_name: ""
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    post(route("customers.store"));
  };
  const handlePhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setData("photo", file);
      const reader = new FileReader();
      reader.onload = (e2) => {
        var _a;
        if ((_a = e2.target) == null ? void 0 : _a.result) {
          setImagePreview(e2.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  const breadcrumbsItems = [
    { title: "หน้าหลัก", url: route("dashboard") },
    { title: "ลูกค้า", url: route("customers.index") },
    { title: "เพิ่มลูกค้าใหม่", url: void 0 }
  ];
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      user: auth.user,
      header: /* @__PURE__ */ jsx("div", { className: "row g-2 align-items-center", children: /* @__PURE__ */ jsxs("div", { className: "col", children: [
        /* @__PURE__ */ jsx("div", { className: "page-pretitle", children: "รายการ" }),
        /* @__PURE__ */ jsx("h2", { className: "page-title", children: "เพิ่มลูกค้าใหม่" })
      ] }) }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "เพิ่มลูกค้าใหม่" }),
        /* @__PURE__ */ jsx("div", { className: "page-body", children: /* @__PURE__ */ jsxs("div", { className: "container-xl", children: [
          /* @__PURE__ */ jsx(Breadcrumbs, { items: breadcrumbsItems }),
          /* @__PURE__ */ jsx("form", { onSubmit: handleSubmit, children: /* @__PURE__ */ jsxs("div", { className: "row", children: [
            /* @__PURE__ */ jsx("div", { className: "col-lg-4", children: /* @__PURE__ */ jsx("div", { className: "card", children: /* @__PURE__ */ jsxs("div", { className: "card-body", children: [
              /* @__PURE__ */ jsx("h3", { className: "card-title", children: "รูปลูกค้า" }),
              /* @__PURE__ */ jsx(
                "img",
                {
                  className: "img-account-profile mb-2",
                  src: imagePreview || "/assets/img/demo/user-placeholder.svg",
                  alt: "รูปโปรไฟล์ลูกค้า",
                  style: { maxWidth: "100%", height: "auto" }
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "small font-italic text-muted mb-2", children: "ไฟล์ JPG หรือ PNG ขนาดไม่เกิน 2 MB" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  className: `form-control ${errors.photo ? "is-invalid" : ""}`,
                  type: "file",
                  id: "image",
                  onChange: handlePhotoChange,
                  accept: "image/*"
                }
              ),
              errors.photo && /* @__PURE__ */ jsx("div", { className: "invalid-feedback", children: errors.photo })
            ] }) }) }),
            /* @__PURE__ */ jsx("div", { className: "col-lg-8", children: /* @__PURE__ */ jsxs("div", { className: "card", children: [
              /* @__PURE__ */ jsxs("div", { className: "card-body", children: [
                /* @__PURE__ */ jsx("h3", { className: "card-title", children: "ข้อมูลลูกค้า" }),
                /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
                  /* @__PURE__ */ jsx("label", { className: "form-label required", children: "ชื่อ" }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "text",
                      className: `form-control ${errors.name ? "is-invalid" : ""}`,
                      name: "name",
                      placeholder: "กรอกชื่อลูกค้า",
                      value: data.name,
                      onChange: (e) => setData("name", e.target.value)
                    }
                  ),
                  errors.name && /* @__PURE__ */ jsx("div", { className: "invalid-feedback", children: errors.name })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
                  /* @__PURE__ */ jsx("label", { className: "form-label required", children: "อีเมล" }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "email",
                      className: `form-control ${errors.email ? "is-invalid" : ""}`,
                      name: "email",
                      placeholder: "กรอกอีเมล",
                      value: data.email,
                      onChange: (e) => setData("email", e.target.value)
                    }
                  ),
                  errors.email && /* @__PURE__ */ jsx("div", { className: "invalid-feedback", children: errors.email })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
                  /* @__PURE__ */ jsx("label", { className: "form-label required", children: "เบอร์โทรศัพท์" }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "text",
                      className: `form-control ${errors.phone ? "is-invalid" : ""}`,
                      name: "phone",
                      placeholder: "กรอกเบอร์โทรศัพท์",
                      value: data.phone,
                      onChange: (e) => setData("phone", e.target.value)
                    }
                  ),
                  errors.phone && /* @__PURE__ */ jsx("div", { className: "invalid-feedback", children: errors.phone })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
                  /* @__PURE__ */ jsx("label", { className: "form-label required", children: "ที่อยู่" }),
                  /* @__PURE__ */ jsx(
                    "textarea",
                    {
                      className: `form-control ${errors.address ? "is-invalid" : ""}`,
                      name: "address",
                      rows: 3,
                      placeholder: "กรอกที่อยู่",
                      value: data.address,
                      onChange: (e) => setData("address", e.target.value)
                    }
                  ),
                  errors.address && /* @__PURE__ */ jsx("div", { className: "invalid-feedback", children: errors.address })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "hr-text", children: "ข้อมูลบัญชีธนาคาร (ไม่บังคับ)" }),
                /* @__PURE__ */ jsxs("div", { className: "row", children: [
                  /* @__PURE__ */ jsx("div", { className: "col-md-6", children: /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
                    /* @__PURE__ */ jsx("label", { className: "form-label", children: "ชื่อเจ้าของบัญชี" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        className: `form-control ${errors.account_holder ? "is-invalid" : ""}`,
                        name: "account_holder",
                        placeholder: "กรอกชื่อเจ้าของบัญชี",
                        value: data.account_holder,
                        onChange: (e) => setData("account_holder", e.target.value)
                      }
                    ),
                    errors.account_holder && /* @__PURE__ */ jsx("div", { className: "invalid-feedback", children: errors.account_holder })
                  ] }) }),
                  /* @__PURE__ */ jsx("div", { className: "col-md-6", children: /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
                    /* @__PURE__ */ jsx("label", { className: "form-label", children: "เลขที่บัญชี" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        className: `form-control ${errors.account_number ? "is-invalid" : ""}`,
                        name: "account_number",
                        placeholder: "กรอกเลขที่บัญชี",
                        value: data.account_number,
                        onChange: (e) => setData("account_number", e.target.value)
                      }
                    ),
                    errors.account_number && /* @__PURE__ */ jsx("div", { className: "invalid-feedback", children: errors.account_number })
                  ] }) }),
                  /* @__PURE__ */ jsx("div", { className: "col-md-6", children: /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
                    /* @__PURE__ */ jsx("label", { className: "form-label", children: "ธนาคาร" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        type: "text",
                        className: `form-control ${errors.bank_name ? "is-invalid" : ""}`,
                        name: "bank_name",
                        placeholder: "กรอกชื่อธนาคาร",
                        value: data.bank_name,
                        onChange: (e) => setData("bank_name", e.target.value)
                      }
                    ),
                    errors.bank_name && /* @__PURE__ */ jsx("div", { className: "invalid-feedback", children: errors.bank_name })
                  ] }) })
                ] })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "card-footer text-end", children: /* @__PURE__ */ jsxs("div", { className: "d-flex", children: [
                /* @__PURE__ */ jsx(Link, { href: route("customers.index"), className: "btn btn-link", children: "ยกเลิก" }),
                /* @__PURE__ */ jsx("button", { type: "submit", className: "btn btn-primary ms-auto", disabled: processing, children: processing ? "กำลังบันทึก..." : "บันทึกข้อมูล" })
              ] }) })
            ] }) })
          ] }) })
        ] }) })
      ]
    }
  );
}
export {
  Create as default
};
