import { jsxs, jsx } from "react/jsx-runtime";
import { useForm, Head, Link } from "@inertiajs/react";
import { G as Guest } from "./GuestLayout-AYfqqRwm.js";
function VerifyEmail({ status }) {
  const { post, processing } = useForm({});
  const submit = (e) => {
    e.preventDefault();
    post(route("verification.send"));
  };
  return /* @__PURE__ */ jsxs(Guest, { children: [
    /* @__PURE__ */ jsx(Head, { title: "ยืนยันอีเมล" }),
    /* @__PURE__ */ jsx("div", { className: "mb-4 text-center", children: /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-gray-900 dark:text-gray-100", children: "ยืนยันอีเมลของคุณ" }) }),
    /* @__PURE__ */ jsx("div", { className: "mb-4 text-sm text-gray-600 dark:text-gray-400", children: "ขอบคุณสำหรับการลงทะเบียน! ก่อนเริ่มใช้งาน โปรดยืนยันอีเมลของคุณโดยคลิกที่ลิงก์ที่เราได้ส่งไปให้คุณทางอีเมล หากคุณไม่ได้รับอีเมล เราจะส่งอีกฉบับให้คุณ" }),
    status === "verification-link-sent" && /* @__PURE__ */ jsx("div", { className: "mb-4 font-medium text-sm text-green-600 dark:text-green-400", children: "ลิงก์ยืนยันใหม่ได้ถูกส่งไปยังอีเมลที่คุณให้ไว้ตอนลงทะเบียน" }),
    /* @__PURE__ */ jsx("form", { onSubmit: submit, children: /* @__PURE__ */ jsxs("div", { className: "mt-4 flex items-center justify-between", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "submit",
          className: "inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-700 focus:bg-indigo-700 active:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150",
          disabled: processing,
          children: "ส่งอีเมลยืนยันอีกครั้ง"
        }
      ),
      /* @__PURE__ */ jsx(
        Link,
        {
          href: route("logout"),
          method: "post",
          as: "button",
          type: "button",
          className: "text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
          children: "ออกจากระบบ"
        }
      )
    ] }) })
  ] });
}
export {
  VerifyEmail as default
};
