// import { Field, useFormikContext } from "formik";

const AppSelectField = ({ name, placeholder, array, title, ...rest }) => {
  // const { errors, values, touched, handleBlur, handleChange } =
  //   useFormikContext();

  // const value = values[name];
  // const error = errors[name];
  // const isInputTouched = touched[name];

  return (
    <div className="col-span-1 w-">
      <select name={name} as="select" className="text-[14px] border rounded-md p-2 w-full">
        {title ? <option value="">{title}</option> : null}
        {array.map((item, i) => (
          <option className="" key={i} value={item}>
            {item}
          </option>
        ))}
      </select>
      {/* {error && isInputTouched ? (
        <div className="text-red-500 text-[12px] font-400 lowercase">
          {error}
        </div>
      ) : null} */}
    </div>
  );
};

export default AppSelectField;
