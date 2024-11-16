import React from "react";
import { useFormikContext } from "formik";
import DatePicker from "./../DatePicker";
import ErrorMessage from "./ErrorMessage";
import moment from "moment";

const FormDatePicker = ({
  name,
  defaultDate = "1992-10-01",
  maxYears = 0,
  minYears = 130,
  onDateChange,
  ...otherProps
}) => {
  const { errors, touched, values } = useFormikContext();

  // Safely access the date value
  const dateValue = values && values[name] ? moment(values[name]) : moment(defaultDate);
  // console.log('Date Value from Form Date picker: ', dateValue)

  return (
    <>
      <DatePicker
        onDateChange={(value) => onDateChange(name, value)}
        defaultDate={dateValue}
        maxYears={maxYears}
        minYears={minYears}
        {...otherProps}
      />
      <ErrorMessage error={errors && errors[name]} visible={touched && touched[name]} />
    </>
  );
};

export default FormDatePicker;