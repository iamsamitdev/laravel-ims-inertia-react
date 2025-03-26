import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { useForm, Head, Link } from "@inertiajs/react";
import { A as Authenticated } from "./AuthenticatedLayout-CzjzYk7O.js";
import { B as Breadcrumbs } from "./Breadcrumbs-Cz6SsN78.js";
function Create({ auth, roles }) {
  const [imagePreview, setImagePreview] = useState(null);
  const { data, setData, post, errors, processing } = useForm({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    role_id: "",
    phone: "",
    address: "",
    bio: "",
    profile_image: null
  });
  const breadcrumbsItems = [
    { title: "หน้าหลัก", url: route("dashboard") },
    { title: "ผู้ใช้งาน", url: route("users.index") },
    { title: "เพิ่มผู้ใช้งานใหม่", url: void 0 }
  ];
  const handleSubmit = (e) => {
    e.preventDefault();
    post(route("users.store"));
  };
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setData("profile_image", file);
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
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      user: auth.user,
      header: /* @__PURE__ */ jsx("div", { className: "row g-2 align-items-center", children: /* @__PURE__ */ jsx("div", { className: "col", children: /* @__PURE__ */ jsx("h2", { className: "page-title", children: "เพิ่มผู้ใช้งานใหม่" }) }) }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: "เพิ่มผู้ใช้งานใหม่" }),
        /* @__PURE__ */ jsx("div", { className: "page-body", children: /* @__PURE__ */ jsxs("div", { className: "container-xl", children: [
          /* @__PURE__ */ jsx(Breadcrumbs, { items: breadcrumbsItems }),
          /* @__PURE__ */ jsx("div", { className: "row", children: /* @__PURE__ */ jsx("div", { className: "col-12", children: /* @__PURE__ */ jsx("form", { onSubmit: handleSubmit, children: /* @__PURE__ */ jsxs("div", { className: "row", children: [
            /* @__PURE__ */ jsx("div", { className: "col-md-4", children: /* @__PURE__ */ jsxs("div", { className: "card", children: [
              /* @__PURE__ */ jsx("div", { className: "card-header", children: /* @__PURE__ */ jsx("h3", { className: "card-title", children: "รูปโปรไฟล์" }) }),
              /* @__PURE__ */ jsxs("div", { className: "card-body", children: [
                /* @__PURE__ */ jsx("div", { className: "text-center mb-3", children: /* @__PURE__ */ jsx(
                  "img",
                  {
                    className: "avatar avatar-xl rounded-circle",
                    src: imagePreview || "/assets/img/demo/user-placeholder.png",
                    alt: "รูปโปรไฟล์"
                  }
                ) }),
                /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
                  /* @__PURE__ */ jsx("div", { className: "small font-italic text-muted mb-2", children: "JPG หรือ PNG ขนาดไม่เกิน 2 MB" }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      className: `form-control ${errors.profile_image ? "is-invalid" : ""}`,
                      type: "file",
                      id: "profile_image",
                      name: "profile_image",
                      accept: "image/*",
                      onChange: handleImageChange
                    }
                  ),
                  errors.profile_image && /* @__PURE__ */ jsx("div", { className: "invalid-feedback", children: errors.profile_image })
                ] })
              ] })
            ] }) }),
            /* @__PURE__ */ jsx("div", { className: "col-md-8", children: /* @__PURE__ */ jsxs("div", { className: "card", children: [
              /* @__PURE__ */ jsx("div", { className: "card-header", children: /* @__PURE__ */ jsx("h3", { className: "card-title", children: "ข้อมูลส่วนตัว" }) }),
              /* @__PURE__ */ jsxs("div", { className: "card-body", children: [
                /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
                  /* @__PURE__ */ jsx("label", { className: "form-label required", htmlFor: "name", children: "ชื่อ" }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      id: "name",
                      type: "text",
                      className: `form-control ${errors.name ? "is-invalid" : ""}`,
                      value: data.name,
                      onChange: (e) => setData("name", e.target.value),
                      required: true
                    }
                  ),
                  errors.name && /* @__PURE__ */ jsx("div", { className: "invalid-feedback", children: errors.name })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
                  /* @__PURE__ */ jsx("label", { className: "form-label required", htmlFor: "email", children: "อีเมล" }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      id: "email",
                      type: "email",
                      className: `form-control ${errors.email ? "is-invalid" : ""}`,
                      value: data.email,
                      onChange: (e) => setData("email", e.target.value),
                      required: true
                    }
                  ),
                  errors.email && /* @__PURE__ */ jsx("div", { className: "invalid-feedback", children: errors.email })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
                  /* @__PURE__ */ jsx("label", { className: "form-label required", htmlFor: "role_id", children: "สิทธิ์การใช้งาน" }),
                  /* @__PURE__ */ jsxs(
                    "select",
                    {
                      id: "role_id",
                      className: `form-select ${errors.role_id ? "is-invalid" : ""}`,
                      value: data.role_id,
                      onChange: (e) => setData("role_id", e.target.value),
                      required: true,
                      children: [
                        /* @__PURE__ */ jsx("option", { value: "", children: "เลือกสิทธิ์การใช้งาน" }),
                        roles.map((role) => /* @__PURE__ */ jsx("option", { value: role.id, children: role.name }, role.id))
                      ]
                    }
                  ),
                  errors.role_id && /* @__PURE__ */ jsx("div", { className: "invalid-feedback", children: errors.role_id })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
                  /* @__PURE__ */ jsx("label", { className: "form-label required", htmlFor: "password", children: "รหัสผ่าน" }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      id: "password",
                      type: "password",
                      className: `form-control ${errors.password ? "is-invalid" : ""}`,
                      value: data.password,
                      onChange: (e) => setData("password", e.target.value),
                      required: true
                    }
                  ),
                  errors.password && /* @__PURE__ */ jsx("div", { className: "invalid-feedback", children: errors.password })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
                  /* @__PURE__ */ jsx("label", { className: "form-label required", htmlFor: "password_confirmation", children: "ยืนยันรหัสผ่าน" }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      id: "password_confirmation",
                      type: "password",
                      className: `form-control ${errors.password_confirmation ? "is-invalid" : ""}`,
                      value: data.password_confirmation,
                      onChange: (e) => setData("password_confirmation", e.target.value),
                      required: true
                    }
                  ),
                  errors.password_confirmation && /* @__PURE__ */ jsx("div", { className: "invalid-feedback", children: errors.password_confirmation })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
                  /* @__PURE__ */ jsx("label", { className: "form-label", htmlFor: "phone", children: "เบอร์โทรศัพท์" }),
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
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
                  /* @__PURE__ */ jsx("label", { className: "form-label", htmlFor: "address", children: "ที่อยู่" }),
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
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
                  /* @__PURE__ */ jsx("label", { className: "form-label", htmlFor: "bio", children: "ประวัติย่อ" }),
                  /* @__PURE__ */ jsx(
                    "textarea",
                    {
                      id: "bio",
                      className: `form-control ${errors.bio ? "is-invalid" : ""}`,
                      rows: 3,
                      value: data.bio,
                      onChange: (e) => setData("bio", e.target.value)
                    }
                  ),
                  errors.bio && /* @__PURE__ */ jsx("div", { className: "invalid-feedback", children: errors.bio })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "card-footer text-end", children: [
                /* @__PURE__ */ jsx(Link, { href: route("users.index"), className: "btn btn-outline-secondary me-2", children: "ยกเลิก" }),
                /* @__PURE__ */ jsx("button", { type: "submit", className: "btn btn-primary", disabled: processing, children: processing ? "กำลังบันทึก..." : "บันทึกข้อมูล" })
              ] })
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
