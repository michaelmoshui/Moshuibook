import { ErrorMessage, useField } from "formik";
import "../../css/registerInputs.css";
import { useMediaQuery } from "react-responsive";

export default function RegisterInputs({ lastName, ...props }) {
  const [field, meta] = useField(props);
  const view1 = useMediaQuery({
    query: "(min-width: 960px)",
  });
  const view2 = useMediaQuery({
    query: "(min-width: 1600px)",
  });
  return (
    <div className="input-wrap register-input-wrap">
      <input
        style={{
          width: `${
            view1 && (field.name === "firstName" || field.name === "lastName")
              ? "265px"
              : view1 && (field.name === "email" || field.name === "password")
              ? "540px"
              : "300px"
          }`,
        }}
        /* must have {...field} and {...props} */
        {...field}
        {...props}
        className={meta.touched && meta.error ? "input-error-border" : ""}
        // boolean satisfies? if not then no class name at all
      />

      {/* error message for bottom */}
      {meta.touched && meta.error && (
        <div
          style={{
            width: `${view2 ? "265px" : view1 ? "100%" : "300px"}`,
          }}
          className={
            view2 && lastName
              ? "input-error-message input-error-message-register-lastName"
              : view2
              ? "input-error-message input-error-message-register"
              : "input-error-message"
          }
        >
          {
            // sees error in input, output that error message (validation through Yup!)
            meta.touched && meta.error && <ErrorMessage name={field.name} />
          }
          <div
            className={
              view2 && lastName
                ? "error-arrow-right"
                : view2
                ? "error-arrow-left"
                : "error-arrow-bottom"
            }
          ></div>
        </div>
      )}
    </div>
  );
}
