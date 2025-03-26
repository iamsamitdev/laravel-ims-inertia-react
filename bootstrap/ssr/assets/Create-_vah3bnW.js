import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { useForm, Head, Link } from "@inertiajs/react";
import { A as Authenticated } from "./AuthenticatedLayout-CzjzYk7O.js";
import { B as Breadcrumbs } from "./Breadcrumbs-Cz6SsN78.js";
function Create({ auth }) {
  const [imagePreview, setImagePreview] = useState(null);
  const { data, setData, post, processing, errors } = useForm({
    name: "",
    email: "",
    phone: "",
    address: "",
    shopname: "",
    type: "",
    // distributor, wholesaler, producer
    photo: null,
    account_holder: "",
    account_number: "",
    bank_name: ""
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    post(route("suppliers.store"));
  };
  const handleImageChange = (e) => {
    var _a;
    const file = ((_a = e.target.files) == null ? void 0 : _a[0]) || null;
    setData("photo", file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };
  const breadcrumbsItems = [
    { title: "หน้าหลัก", url: route("dashboard") },
    { title: "ซัพพลายเออร์", url: route("suppliers.index") },
    { title: "เพิ่มซัพพลายเออร์ใหม่", url: void 0 }
  ];
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      user: auth.user,
      header: /* @__PURE__ */ jsx("div", { className: "page-header d-print-none", children: /* @__PURE__ */ jsxs("div", { className: "container-xl", children: [
        /* @__PURE__ */ jsx("div", { className: "page-pretitle", children: "ฟอร์ม" }),
        /* @__PURE__ */ jsx("h2", { className: "page-title", children: "เพิ่มซัพพลายเออร์ใหม่" })
      ] }) }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "เพิ่มซัพพลายเออร์ใหม่" }),
        /* @__PURE__ */ jsx("div", { className: "page-body", children: /* @__PURE__ */ jsxs("div", { className: "container-xl", children: [
          /* @__PURE__ */ jsx(Breadcrumbs, { items: breadcrumbsItems }),
          /* @__PURE__ */ jsx("form", { onSubmit: handleSubmit, encType: "multipart/form-data", children: /* @__PURE__ */ jsxs("div", { className: "row", children: [
            /* @__PURE__ */ jsx("div", { className: "col-lg-4", children: /* @__PURE__ */ jsx("div", { className: "card", children: /* @__PURE__ */ jsxs("div", { className: "card-body", children: [
              /* @__PURE__ */ jsx("h3", { className: "card-title", children: "รูปโปรไฟล์" }),
              /* @__PURE__ */ jsx(
                "img",
                {
                  className: "img-account-profile mb-2",
                  src: imagePreview || "/assets/img/demo/user-placeholder.svg",
                  alt: "Preview",
                  style: { maxWidth: "100%", height: "auto" }
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "small font-italic text-muted mb-2", children: "JPG หรือ PNG ขนาดไม่เกิน 1 MB" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  className: `form-control ${errors.photo ? "is-invalid" : ""}`,
                  type: "file",
                  id: "image",
                  name: "photo",
                  accept: "image/*",
                  onChange: handleImageChange
                }
              ),
              errors.photo && /* @__PURE__ */ jsx("div", { className: "invalid-feedback", children: errors.photo })
            ] }) }) }),
            /* @__PURE__ */ jsx("div", { className: "col-lg-8", children: /* @__PURE__ */ jsxs("div", { className: "card", children: [
              /* @__PURE__ */ jsxs("div", { className: "card-body", children: [
                /* @__PURE__ */ jsx("h3", { className: "card-title", children: "รายละเอียดซัพพลายเออร์" }),
                /* @__PURE__ */ jsxs("div", { className: "row row-cards", children: [
                  /* @__PURE__ */ jsxs("div", { className: "col-md-12", children: [
                    /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
                      /* @__PURE__ */ jsx("label", { htmlFor: "name", className: "form-label required", children: "ชื่อ" }),
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          id: "name",
                          type: "text",
                          className: `form-control ${errors.name ? "is-invalid" : ""}`,
                          value: data.name,
                          onChange: (e) => setData("name", e.target.value)
                        }
                      ),
                      errors.name && /* @__PURE__ */ jsx("div", { className: "invalid-feedback", children: errors.name })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
                      /* @__PURE__ */ jsx("label", { htmlFor: "email", className: "form-label required", children: "อีเมล" }),
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          id: "email",
                          type: "email",
                          className: `form-control ${errors.email ? "is-invalid" : ""}`,
                          value: data.email,
                          onChange: (e) => setData("email", e.target.value)
                        }
                      ),
                      errors.email && /* @__PURE__ */ jsx("div", { className: "invalid-feedback", children: errors.email })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
                      /* @__PURE__ */ jsx("label", { htmlFor: "shopname", className: "form-label required", children: "ชื่อร้าน" }),
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          id: "shopname",
                          type: "text",
                          className: `form-control ${errors.shopname ? "is-invalid" : ""}`,
                          value: data.shopname,
                          onChange: (e) => setData("shopname", e.target.value)
                        }
                      ),
                      errors.shopname && /* @__PURE__ */ jsx("div", { className: "invalid-feedback", children: errors.shopname })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
                      /* @__PURE__ */ jsx("label", { htmlFor: "phone", className: "form-label required", children: "เบอร์โทรศัพท์" }),
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          id: "phone",
                          type: "text",
                          className: `form-control ${errors.phone ? "is-invalid" : ""}`,
                          value: data.phone,
                          onChange: (e) => setData("phone", e.target.value)
                        }
                      ),
                      errors.phone && /* @__PURE__ */ jsx("div", { className: "invalid-feedback", children: errors.phone })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsx("div", { className: "col-sm-6 col-md-6", children: /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
                    /* @__PURE__ */ jsx("label", { htmlFor: "type", className: "form-label required", children: "ประเภทซัพพลายเออร์" }),
                    /* @__PURE__ */ jsxs(
                      "select",
                      {
                        id: "type",
                        className: `form-select ${errors.type ? "is-invalid" : ""}`,
                        value: data.type,
                        onChange: (e) => setData("type", e.target.value),
                        children: [
                          /* @__PURE__ */ jsx("option", { value: "", disabled: true, children: "เลือกประเภท:" }),
                          /* @__PURE__ */ jsx("option", { value: "distributor", children: "ผู้จัดจำหน่าย (Distributor)" }),
                          /* @__PURE__ */ jsx("option", { value: "wholesaler", children: "ผู้ค้าส่ง (Wholesaler)" }),
                          /* @__PURE__ */ jsx("option", { value: "producer", children: "ผู้ผลิต (Producer)" })
                        ]
                      }
                    ),
                    errors.type && /* @__PURE__ */ jsx("div", { className: "invalid-feedback", children: errors.type })
                  ] }) }),
                  /* @__PURE__ */ jsx("div", { className: "col-sm-6 col-md-6", children: /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
                    /* @__PURE__ */ jsx("label", { htmlFor: "bank_name", className: "form-label", children: "ชื่อธนาคาร" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        id: "bank_name",
                        type: "text",
                        className: `form-control ${errors.bank_name ? "is-invalid" : ""}`,
                        value: data.bank_name,
                        onChange: (e) => setData("bank_name", e.target.value)
                      }
                    ),
                    errors.bank_name && /* @__PURE__ */ jsx("div", { className: "invalid-feedback", children: errors.bank_name })
                  ] }) }),
                  /* @__PURE__ */ jsx("div", { className: "col-sm-6 col-md-6", children: /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
                    /* @__PURE__ */ jsx("label", { htmlFor: "account_holder", className: "form-label", children: "ชื่อเจ้าของบัญชี" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        id: "account_holder",
                        type: "text",
                        className: `form-control ${errors.account_holder ? "is-invalid" : ""}`,
                        value: data.account_holder,
                        onChange: (e) => setData("account_holder", e.target.value)
                      }
                    ),
                    errors.account_holder && /* @__PURE__ */ jsx("div", { className: "invalid-feedback", children: errors.account_holder })
                  ] }) }),
                  /* @__PURE__ */ jsx("div", { className: "col-sm-6 col-md-6", children: /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
                    /* @__PURE__ */ jsx("label", { htmlFor: "account_number", className: "form-label", children: "เลขที่บัญชี" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        id: "account_number",
                        type: "text",
                        className: `form-control ${errors.account_number ? "is-invalid" : ""}`,
                        value: data.account_number,
                        onChange: (e) => setData("account_number", e.target.value)
                      }
                    ),
                    errors.account_number && /* @__PURE__ */ jsx("div", { className: "invalid-feedback", children: errors.account_number })
                  ] }) }),
                  /* @__PURE__ */ jsx("div", { className: "col-md-12", children: /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
                    /* @__PURE__ */ jsx("label", { htmlFor: "address", className: "form-label required", children: "ที่อยู่" }),
                    /* @__PURE__ */ jsx(
                      "textarea",
                      {
                        id: "address",
                        className: `form-control ${errors.address ? "is-invalid" : ""}`,
                        rows: 3,
                        value: data.address,
                        onChange: (e) => setData("address", e.target.value)
                      }
                    ),
                    errors.address && /* @__PURE__ */ jsx("div", { className: "invalid-feedback", children: errors.address })
                  ] }) })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "card-footer text-end", children: [
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "submit",
                    className: "btn btn-primary",
                    disabled: processing,
                    children: "บันทึก"
                  }
                ),
                /* @__PURE__ */ jsx(
                  Link,
                  {
                    href: route("suppliers.index"),
                    className: "btn btn-outline-secondary ms-2",
                    children: "ยกเลิก"
                  }
                )
              ] })
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
