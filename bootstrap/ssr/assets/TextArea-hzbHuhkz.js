import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { I as InputLabel, a as InputError } from "./TextInput-BQ8risdN.js";
function SelectInput({
  label,
  error,
  className = "",
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    label && /* @__PURE__ */ jsx(InputLabel, { value: label, htmlFor: props.id }),
    /* @__PURE__ */ jsx(
      "select",
      {
        ...props,
        className: `form-select ${error ? "is-invalid" : ""} ${className}`,
        children
      }
    ),
    error && /* @__PURE__ */ jsx(InputError, { message: error })
  ] });
}
function TextArea({
  label,
  error,
  className = "",
  ...props
}) {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    label && /* @__PURE__ */ jsx(InputLabel, { value: label, htmlFor: props.id }),
    /* @__PURE__ */ jsx(
      "textarea",
      {
        ...props,
        className: `form-control ${error ? "is-invalid" : ""} ${className}`
      }
    ),
    error && /* @__PURE__ */ jsx(InputError, { message: error })
  ] });
}
export {
  SelectInput as S,
  TextArea as T
};
