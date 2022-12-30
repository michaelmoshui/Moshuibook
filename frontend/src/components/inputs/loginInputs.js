import "../../css/loginInputs.css";
import { ErrorMessage, useField } from "formik";

export default function LoginInputs({ bottom, ...props }) {
  const [field, meta] = useField(props);

  return (
    <div className="input-wrap">
      {/* error message for top */}
      {meta.touched && meta.error && !bottom && (
        <div className="input-error-message">
          {
            // sees error in input, output that error message (validation through Yup!)
            meta.touched && meta.error && <ErrorMessage name={field.name} />
          }
          <div className="error-arrow-top"></div>
        </div>
      )}

      <input
        /* must have {...field} and {...props} */
        {...field}
        {...props}
        className={meta.touched && meta.error ? "input-error-border" : ""}
        // boolean satisfies? if not then no class name at all
      />

      {/* error message for bottom */}
      {meta.touched && meta.error && bottom && (
        <div className="input-error-message">
          {
            // sees error in input, output that error message (validation through Yup!)
            meta.touched && meta.error && <ErrorMessage name={field.name} />
          }
          <div className="error-arrow-bottom"></div>
        </div>
      )}
    </div>
  );
}
