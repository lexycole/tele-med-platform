import React from "react";
import { useFormikContext } from "formik";
import { Appbtn } from "./../Appbtn";

function SubmitButton({ txt, disabled }) {
  const { handleSubmit, isValid, dirty } = useFormikContext();
  
  const onPress = () => {
    console.log('SubmitButton pressed');
    console.log('Form is valid:', isValid);
    console.log('Form is dirty:', dirty);
    handleSubmit();
  };

  return <Appbtn disabled={disabled} onPress={onPress} txt={txt} />;
}

export default SubmitButton;
// import React from "react";
// import { useFormikContext } from "formik";
// import { Appbtn } from "./../Appbtn";

// function SubmitButton({ txt, disabled }) {
//   const { handleSubmit } = useFormikContext();
//   return <Appbtn disabled={disabled} onPress={handleSubmit} txt={txt} />;
// }

// export default SubmitButton;
