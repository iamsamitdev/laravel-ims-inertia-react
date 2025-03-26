import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { useForm, Head, Link } from "@inertiajs/react";
import { A as Authenticated } from "./AuthenticatedLayout-CzjzYk7O.js";
import { B as Breadcrumbs } from "./Breadcrumbs-Cz6SsN78.js";
function Edit({ auth, categories, units, product }) {
  const [imagePreview, setImagePreview] = useState(
    product.product_image ? `/storage/products/${product.product_image}` : null
  );
  const { data, setData, post, errors, processing } = useForm({
    _method: "PUT",
    name: product.name || "",
    slug: product.slug || "",
    category_id: product.category_id || (categories.length > 0 ? categories[0].id : ""),
    unit_id: product.unit_id || (units.length > 0 ? units[0].id : ""),
    quantity: product.quantity || 0,
    quantity_alert: product.quantity_alert || 0,
    buying_price: product.buying_price || 0,
    selling_price: product.selling_price || 0,
    tax: product.tax || 0,
    tax_type: product.tax_type || 0,
    product_image: null,
    notes: product.notes || ""
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    post(route("products.update", product.slug));
  };
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setData("product_image", file);
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
    { title: "สินค้า", url: route("products.index") },
    { title: product.name, url: route("products.show", product.slug) },
    { title: "แก้ไข", url: void 0 }
  ];
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      user: auth.user,
      header: /* @__PURE__ */ jsx("div", { className: "page-header d-print-none", children: /* @__PURE__ */ jsxs("div", { className: "container-xl", children: [
        /* @__PURE__ */ jsx("div", { className: "page-pretitle", children: "ฟอร์ม" }),
        /* @__PURE__ */ jsxs("h2", { className: "page-title", children: [
          "แก้ไขสินค้า: ",
          product.name
        ] })
      ] }) }),
      children: [
        /* @__PURE__ */ jsx(Head, { title: `แก้ไขสินค้า: ${product.name}` }),
        /* @__PURE__ */ jsx("div", { className: "page-body", children: /* @__PURE__ */ jsxs("div", { className: "container-xl", children: [
          /* @__PURE__ */ jsx(Breadcrumbs, { items: breadcrumbsItems }),
          /* @__PURE__ */ jsx("form", { onSubmit: handleSubmit, encType: "multipart/form-data", children: /* @__PURE__ */ jsxs("div", { className: "row", children: [
            /* @__PURE__ */ jsx("div", { className: "col-lg-4", children: /* @__PURE__ */ jsx("div", { className: "card", children: /* @__PURE__ */ jsxs("div", { className: "card-body", children: [
              /* @__PURE__ */ jsx("h3", { className: "card-title", children: "รูปสินค้า" }),
              /* @__PURE__ */ jsx(
                "img",
                {
                  className: "img-account-profile mb-2 img-thumbnail",
                  src: imagePreview || "/assets/img/demo/product-placeholder.png",
                  alt: "รูปสินค้า",
                  style: { maxWidth: "100%", height: "auto" }
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "small font-italic text-muted mb-2", children: "JPG หรือ PNG ขนาดไม่เกิน 2 MB" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  className: `form-control ${errors.product_image ? "is-invalid" : ""}`,
                  type: "file",
                  id: "image",
                  name: "product_image",
                  accept: "image/*",
                  onChange: handleImageChange
                }
              ),
              errors.product_image && /* @__PURE__ */ jsx("div", { className: "invalid-feedback", children: errors.product_image })
            ] }) }) }),
            /* @__PURE__ */ jsx("div", { className: "col-lg-8", children: /* @__PURE__ */ jsxs("div", { className: "card", children: [
              /* @__PURE__ */ jsxs("div", { className: "card-body", children: [
                /* @__PURE__ */ jsx("h3", { className: "card-title", children: "รายละเอียดสินค้า" }),
                /* @__PURE__ */ jsxs("div", { className: "row row-cards", children: [
                  /* @__PURE__ */ jsxs("div", { className: "col-md-12", children: [
                    /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
                      /* @__PURE__ */ jsx("label", { htmlFor: "name", className: "form-label required", children: "ชื่อสินค้า" }),
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
                      /* @__PURE__ */ jsx("label", { htmlFor: "slug", className: "form-label required", children: "Slug" }),
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          id: "slug",
                          type: "text",
                          className: `form-control ${errors.slug ? "is-invalid" : ""}`,
                          value: data.slug,
                          onChange: (e) => setData("slug", e.target.value)
                        }
                      ),
                      errors.slug && /* @__PURE__ */ jsx("div", { className: "invalid-feedback", children: errors.slug }),
                      /* @__PURE__ */ jsx("small", { className: "text-muted", children: "ใช้สำหรับ URL และระบบภายใน ควรเป็นตัวพิมพ์เล็ก ไม่มีช่องว่าง" })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
                      /* @__PURE__ */ jsx("label", { htmlFor: "category_id", className: "form-label required", children: "หมวดหมู่" }),
                      /* @__PURE__ */ jsx(
                        "select",
                        {
                          id: "category_id",
                          className: `form-select ${errors.category_id ? "is-invalid" : ""}`,
                          value: data.category_id,
                          onChange: (e) => setData("category_id", e.target.value),
                          children: categories.map((category) => /* @__PURE__ */ jsx("option", { value: category.id, children: category.name }, category.id))
                        }
                      ),
                      errors.category_id && /* @__PURE__ */ jsx("div", { className: "invalid-feedback", children: errors.category_id })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
                      /* @__PURE__ */ jsx("label", { htmlFor: "unit_id", className: "form-label required", children: "หน่วยวัด" }),
                      /* @__PURE__ */ jsx(
                        "select",
                        {
                          id: "unit_id",
                          className: `form-select ${errors.unit_id ? "is-invalid" : ""}`,
                          value: data.unit_id,
                          onChange: (e) => setData("unit_id", e.target.value),
                          children: units.map((unit) => /* @__PURE__ */ jsx("option", { value: unit.id, children: unit.name }, unit.id))
                        }
                      ),
                      errors.unit_id && /* @__PURE__ */ jsx("div", { className: "invalid-feedback", children: errors.unit_id })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsx("div", { className: "col-sm-6 col-md-4", children: /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
                    /* @__PURE__ */ jsx("label", { htmlFor: "quantity", className: "form-label required", children: "จำนวนคงเหลือ" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        id: "quantity",
                        type: "number",
                        className: `form-control ${errors.quantity ? "is-invalid" : ""}`,
                        value: data.quantity,
                        onChange: (e) => setData("quantity", Number(e.target.value)),
                        min: "0"
                      }
                    ),
                    errors.quantity && /* @__PURE__ */ jsx("div", { className: "invalid-feedback", children: errors.quantity })
                  ] }) }),
                  /* @__PURE__ */ jsx("div", { className: "col-sm-6 col-md-4", children: /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
                    /* @__PURE__ */ jsx("label", { htmlFor: "quantity_alert", className: "form-label required", children: "จำนวนแจ้งเตือน" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        id: "quantity_alert",
                        type: "number",
                        className: `form-control ${errors.quantity_alert ? "is-invalid" : ""}`,
                        value: data.quantity_alert,
                        onChange: (e) => setData("quantity_alert", Number(e.target.value)),
                        min: "0"
                      }
                    ),
                    errors.quantity_alert && /* @__PURE__ */ jsx("div", { className: "invalid-feedback", children: errors.quantity_alert }),
                    /* @__PURE__ */ jsx("small", { className: "text-muted", children: "แจ้งเตือนเมื่อสินค้าในสต๊อกต่ำกว่านี้" })
                  ] }) }),
                  /* @__PURE__ */ jsx("div", { className: "col-sm-6 col-md-4", children: /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
                    /* @__PURE__ */ jsx("label", { htmlFor: "buying_price", className: "form-label required", children: "ราคาซื้อ (บาท)" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        id: "buying_price",
                        type: "number",
                        className: `form-control ${errors.buying_price ? "is-invalid" : ""}`,
                        value: data.buying_price,
                        onChange: (e) => setData("buying_price", Number(e.target.value)),
                        min: "0",
                        step: "0.01"
                      }
                    ),
                    errors.buying_price && /* @__PURE__ */ jsx("div", { className: "invalid-feedback", children: errors.buying_price })
                  ] }) }),
                  /* @__PURE__ */ jsx("div", { className: "col-sm-6 col-md-4", children: /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
                    /* @__PURE__ */ jsx("label", { htmlFor: "selling_price", className: "form-label required", children: "ราคาขาย (บาท)" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        id: "selling_price",
                        type: "number",
                        className: `form-control ${errors.selling_price ? "is-invalid" : ""}`,
                        value: data.selling_price,
                        onChange: (e) => setData("selling_price", Number(e.target.value)),
                        min: "0",
                        step: "0.01"
                      }
                    ),
                    errors.selling_price && /* @__PURE__ */ jsx("div", { className: "invalid-feedback", children: errors.selling_price })
                  ] }) }),
                  /* @__PURE__ */ jsx("div", { className: "col-sm-6 col-md-4", children: /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
                    /* @__PURE__ */ jsx("label", { htmlFor: "tax", className: "form-label", children: "ภาษี (%)" }),
                    /* @__PURE__ */ jsx(
                      "input",
                      {
                        id: "tax",
                        type: "number",
                        className: `form-control ${errors.tax ? "is-invalid" : ""}`,
                        value: data.tax,
                        onChange: (e) => setData("tax", Number(e.target.value)),
                        min: "0",
                        max: "100",
                        step: "0.01"
                      }
                    ),
                    errors.tax && /* @__PURE__ */ jsx("div", { className: "invalid-feedback", children: errors.tax })
                  ] }) }),
                  /* @__PURE__ */ jsx("div", { className: "col-sm-6 col-md-4", children: /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
                    /* @__PURE__ */ jsx("label", { htmlFor: "tax_type", className: "form-label", children: "ประเภทภาษี" }),
                    /* @__PURE__ */ jsxs(
                      "select",
                      {
                        id: "tax_type",
                        className: `form-select ${errors.tax_type ? "is-invalid" : ""}`,
                        value: data.tax_type,
                        onChange: (e) => setData("tax_type", Number(e.target.value)),
                        children: [
                          /* @__PURE__ */ jsx("option", { value: "0", children: "รวมในราคาสินค้า" }),
                          /* @__PURE__ */ jsx("option", { value: "1", children: "แยกต่างหาก" })
                        ]
                      }
                    ),
                    errors.tax_type && /* @__PURE__ */ jsx("div", { className: "invalid-feedback", children: errors.tax_type })
                  ] }) }),
                  /* @__PURE__ */ jsx("div", { className: "col-md-12", children: /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
                    /* @__PURE__ */ jsx("label", { htmlFor: "notes", className: "form-label", children: "หมายเหตุ" }),
                    /* @__PURE__ */ jsx(
                      "textarea",
                      {
                        id: "notes",
                        className: `form-control ${errors.notes ? "is-invalid" : ""}`,
                        rows: 3,
                        value: data.notes,
                        onChange: (e) => setData("notes", e.target.value)
                      }
                    ),
                    errors.notes && /* @__PURE__ */ jsx("div", { className: "invalid-feedback", children: errors.notes })
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
                    href: route("products.show", product.slug),
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
  Edit as default
};
