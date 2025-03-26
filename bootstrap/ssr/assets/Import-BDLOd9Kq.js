import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { useForm, Head, Link, router } from "@inertiajs/react";
import { A as Authenticated } from "./AuthenticatedLayout-CzjzYk7O.js";
import { B as Breadcrumbs } from "./Breadcrumbs-Cz6SsN78.js";
function Import({ auth }) {
  const [isUploading, setIsUploading] = useState(false);
  const [fileName, setFileName] = useState("");
  const { data, setData, post, errors, reset, processing } = useForm({
    file: null
  });
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setData("file", file);
      setFileName(file.name);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsUploading(true);
    post(route("products.import.store"), {
      preserveScroll: true,
      onSuccess: () => {
        reset();
        setFileName("");
        setIsUploading(false);
        router.visit(route("products.index"));
      },
      onError: () => {
        setIsUploading(false);
      }
    });
  };
  const breadcrumbsItems = [
    { title: "หน้าหลัก", url: route("dashboard") },
    { title: "รายการผลิตภัณฑ์", url: route("products.index") },
    { title: "นำเข้าผลิตภัณฑ์", active: true }
  ];
  return /* @__PURE__ */ jsxs(Authenticated, { user: auth.user, children: [
    /* @__PURE__ */ jsx(Head, { title: "นำเข้าผลิตภัณฑ์" }),
    /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsx(Breadcrumbs, { items: breadcrumbsItems }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white overflow-hidden shadow-sm sm:rounded-lg p-6", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold mb-6", children: "นำเข้าผลิตภัณฑ์" }),
        /* @__PURE__ */ jsxs("div", { className: "mb-6 p-4 bg-blue-50 border-l-4 border-blue-500 text-blue-700", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-bold", children: "คำแนะนำ:" }),
          /* @__PURE__ */ jsxs("ul", { className: "list-disc ml-5 mt-2", children: [
            /* @__PURE__ */ jsx("li", { children: "ไฟล์ต้องเป็นนามสกุล .xls หรือ .xlsx เท่านั้น" }),
            /* @__PURE__ */ jsx("li", { children: "ตรวจสอบรูปแบบข้อมูลให้ถูกต้องตามแม่แบบที่กำหนด" }),
            /* @__PURE__ */ jsx("li", { children: "คอลัมน์ A: ชื่อสินค้า" }),
            /* @__PURE__ */ jsx("li", { children: "คอลัมน์ B: ID หมวดหมู่" }),
            /* @__PURE__ */ jsx("li", { children: "คอลัมน์ C: ID หน่วยนับ" }),
            /* @__PURE__ */ jsx("li", { children: "คอลัมน์ D: รหัสสินค้า" }),
            /* @__PURE__ */ jsx("li", { children: "คอลัมน์ E: จำนวน" }),
            /* @__PURE__ */ jsx("li", { children: "คอลัมน์ F: ราคาซื้อ" }),
            /* @__PURE__ */ jsx("li", { children: "คอลัมน์ G: ราคาขาย" }),
            /* @__PURE__ */ jsx("li", { children: "คอลัมน์ H: ชื่อรูปภาพ (ถ้ามี)" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mt-3", children: /* @__PURE__ */ jsx(
            Link,
            {
              href: route("products.export.store"),
              className: "text-blue-600 hover:text-blue-800 font-medium",
              children: "ดาวน์โหลดแม่แบบ Excel"
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, encType: "multipart/form-data", children: [
          /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
            /* @__PURE__ */ jsx("label", { className: "block text-gray-700 text-sm font-bold mb-2", htmlFor: "file", children: "เลือกไฟล์ Excel" }),
            /* @__PURE__ */ jsxs("div", { className: "mt-1 flex", children: [
              /* @__PURE__ */ jsxs("label", { className: "flex flex-col items-center px-4 py-2 bg-white text-blue-500 rounded-lg border border-blue-500 cursor-pointer hover:bg-blue-50", children: [
                /* @__PURE__ */ jsx("span", { className: "text-base leading-normal", children: "เลือกไฟล์" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "file",
                    id: "file",
                    name: "file",
                    className: "hidden",
                    accept: ".xls,.xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel",
                    onChange: handleFileChange,
                    required: true
                  }
                )
              ] }),
              /* @__PURE__ */ jsx("span", { className: "ml-3 mt-2", children: fileName ? fileName : "ยังไม่ได้เลือกไฟล์" })
            ] }),
            errors.file && /* @__PURE__ */ jsx("div", { className: "text-red-500 mt-2 text-sm", children: errors.file })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end mt-6", children: [
            /* @__PURE__ */ jsx(
              Link,
              {
                href: route("products.index"),
                className: "px-4 py-2 bg-gray-300 border border-transparent rounded-md font-semibold text-xs text-gray-800 uppercase tracking-widest hover:bg-gray-400 focus:bg-gray-400 active:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 mr-3",
                children: "ยกเลิก"
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "submit",
                disabled: processing || !data.file || isUploading,
                className: `px-4 py-2 bg-green-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-green-700 focus:bg-green-700 active:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition ease-in-out duration-150 ${processing || !data.file || isUploading ? "opacity-50 cursor-not-allowed" : ""}`,
                children: isUploading ? "กำลังนำเข้า..." : "นำเข้าผลิตภัณฑ์"
              }
            )
          ] })
        ] })
      ] })
    ] }) })
  ] });
}
export {
  Import as default
};
