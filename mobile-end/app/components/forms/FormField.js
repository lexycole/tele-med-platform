import React from "react";
import { useFormikContext } from "formik";
import { AppText } from "./../AppText";
import ErrorMessage from "./ErrorMessage";

function FormField({
  name,
  width,
  style,
  onGetValue,
  onPressUp,
  onPressDown,
  value,
  inputType,
  auto,
  ...otherProps
}) {
  const formik = useFormikContext();

  // console.log("FormField formik:", formik);

  if (!formik) {
    console.error("FormField must be used within a Formik component");
    return null;
  }

  const { setFieldTouched, handleChange, errors, touched, values } = formik;

  // console.log(`FormField name: ${name}`);
  // console.log(`FormField values:`, values);

  const fieldValue = value !== undefined 
  ? value 
  : (formik && formik.values && name in formik.values)
    ? formik.values[name]
    : "";

  // console.log(`FormField fieldValue:`, fieldValue);

  const safeHandleChange = (name) => (value) => {
    if (handleChange && typeof handleChange === 'function') {
      handleChange(name)(value);
    } else if (formik && formik.setFieldValue) {
      formik.setFieldValue(name, value);
    } else {
      console.error(`Unable to handle change for field: ${name}`);
    }
  };

  const safeSetFieldTouched = (name) => {
    if (setFieldTouched) {
      setFieldTouched(name);
    } else {
      console.error(`setFieldTouched is not available for field: ${name}`);
    }
  };

  return (
    <>
<AppText
  onChangeText={(value) => {
    safeHandleChange(name)(value);
    if (onGetValue) onGetValue(value);
  }}
  onBlur={() => {
    if (setFieldTouched) setFieldTouched(name);
  }}
  width={width}
  style={style || {}}
  value={fieldValue}
  inputType={inputType}
  {...otherProps}
/>
      {/* <ErrorMessage error={errors && errors[name]} visible={touched && touched[name]} /> */}
      <ErrorMessage 
  error={errors[name]} 
  visible={touched[name] === true} 
/>
    </>
  );
}

export default FormField;