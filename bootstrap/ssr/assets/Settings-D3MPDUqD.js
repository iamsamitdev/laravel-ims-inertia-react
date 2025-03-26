import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { useForm, Head } from "@inertiajs/react";
import { A as Authenticated } from "./AuthenticatedLayout-CzjzYk7O.js";
import { B as Breadcrumbs } from "./Breadcrumbs-Cz6SsN78.js";
function Settings({ auth, user }) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const { data, setData, post, errors, processing } = useForm({
    password: ""
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    post(route("profile.destroy"));
  };
  const breadcrumbsItems = [
    { title: "หน้าหลัก", url: route("dashboard") },
    { title: "ข้อมูลส่วนตัว", url: route("profile.edit") },
    { title: "การตั้งค่าบัญชี", url: void 0 }
  ];
  return /* @__PURE__ */ jsxs(Authenticated, { user: auth.user, children: [
    /* @__PURE__ */ jsx(Head, { title: "การตั้งค่าบัญชี" }),
    /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsxs("div", { className: "container-xl", children: [
      /* @__PURE__ */ jsx(Breadcrumbs, { items: breadcrumbsItems }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white overflow-hidden shadow-sm sm:rounded-lg p-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold mb-1", children: "การตั้งค่าบัญชี" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-sm", children: "จัดการการตั้งค่าบัญชีและความปลอดภัย" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "border-t border-gray-200 pt-4", children: /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium text-red-600 mb-2", children: "ลบบัญชี" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-500 mb-4", children: "เมื่อบัญชีของคุณถูกลบ ทรัพยากรและข้อมูลทั้งหมดจะถูกลบอย่างถาวร โปรดดาวน์โหลดข้อมูลหรือข้อมูลใดๆ ที่คุณต้องการเก็บไว้ก่อนลบบัญชีของคุณ" }),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              className: "inline-flex items-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-700 focus:bg-red-700 active:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition ease-in-out duration-150",
              onClick: () => setShowDeleteConfirm(true),
              children: "ลบบัญชี"
            }
          )
        ] }) })
      ] })
    ] }) }),
    showDeleteConfirm && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50", children: /* @__PURE__ */ jsx("div", { className: "bg-white rounded-lg shadow-xl max-w-md w-full", children: /* @__PURE__ */ jsxs("div", { className: "p-4 sm:p-6", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium text-gray-900 mb-4", children: "คุณแน่ใจหรือไม่ว่าต้องการลบบัญชี?" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-500 mb-6", children: "เมื่อบัญชีของคุณถูกลบ ทรัพยากรและข้อมูลทั้งหมดจะถูกลบอย่างถาวร กรุณาใส่รหัสผ่านของคุณเพื่อยืนยันว่าคุณต้องการลบบัญชีของคุณอย่างถาวร" }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
          /* @__PURE__ */ jsx("label", { htmlFor: "password", className: "block text-sm font-medium text-gray-700 mb-1", children: "รหัสผ่าน" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "password",
              id: "password",
              className: `w-full rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${errors.password ? "border-red-500" : ""}`,
              value: data.password,
              onChange: (e) => setData("password", e.target.value),
              required: true
            }
          ),
          errors.password && /* @__PURE__ */ jsx("div", { className: "text-red-500 mt-1 text-sm", children: errors.password })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-end mt-6", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              className: "inline-flex items-center px-4 py-2 bg-gray-200 border border-transparent rounded-md font-semibold text-xs text-gray-900 uppercase tracking-widest hover:bg-gray-300 focus:bg-gray-300 active:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition ease-in-out duration-150 mr-2",
              onClick: () => setShowDeleteConfirm(false),
              children: "ยกเลิก"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "submit",
              className: "inline-flex items-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-700 focus:bg-red-700 active:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition ease-in-out duration-150",
              disabled: processing,
              children: processing ? "กำลังลบบัญชี..." : "ลบบัญชี"
            }
          )
        ] })
      ] })
    ] }) }) })
  ] });
}
export {
  Settings as default
};
