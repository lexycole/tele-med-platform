import React from 'react';
import { useFormikContext } from 'formik';
import { Picker } from '@react-native-picker/picker';
import ErrorMessage from './ErrorMessage';

function FormPicker({ name, items = [], onValueChange, ...otherProps }) {
  const { errors, touched, values } = useFormikContext();

  // Safely access the field value
  const fieldValue = values && values[name] ? values[name] : '';

  // console.log(`FormPicker name: ${name}`);
  // console.log(`FormPicker values:`, values);
  // console.log(`FormPicker items:`, items);

  return (
    <>
      <Picker
        selectedValue={fieldValue}
        onValueChange={(itemValue) => onValueChange(name, itemValue)}
        {...otherProps}
      >
        {Array.isArray(items) && items.map((item) => (
          <Picker.Item key={item.value} label={item.label} value={item.value} />
        ))}
      </Picker>
      <ErrorMessage error={errors && errors[name]} visible={touched && touched[name]} />
    </>
  );
}

export default FormPicker;


// import React from "react";
// import { Picker } from '@react-native-picker/picker';
// import { useFormikContext } from "formik";
// import ErrorMessage from "./ErrorMessage";

// const FormPicker = ({ data = [], name, textInputPlaceholder, onGeTValue = () => {}, ...otherProps }) => {
//   const formikContext = useFormikContext();

//   if (!formikContext) {
//     console.error("FormPicker must be used within a Formik component");
//     return null;
//   }

//   const { errors, setFieldValue, touched, values } = formikContext;

//   // Log the name prop and the current values
//   console.log('FormPicker name:', name);
//   console.log('FormPicker values:', values);

//   // Safely access the value
//   const currentValue = values && name in values ? values[name] : '';

//   return (
//     <>
//       <Picker
//         selectedValue={currentValue}
//         onValueChange={(itemValue) => {
//           setFieldValue(name, itemValue);
//           onGeTValue(itemValue); 
//         }}
//         {...otherProps}
//       >
//         <Picker.Item label={textInputPlaceholder} value="" />
//         {Array.isArray(data) && data.map((item) => (
//           <Picker.Item key={item.value} label={item.label || ''} value={item.value || ''} />
//         ))}
//       </Picker>
//       <ErrorMessage error={errors[name]} visible={touched[name]} />
//     </>
//   );
// };

// export default FormPicker;


// import React from "react";
// import { Picker } from '@react-native-picker/picker';
// import { useFormikContext } from "formik";
// import ErrorMessage from "./ErrorMessage";

// const FormPicker = ({ data = [], name, textInputPlaceholder, onGeTValue = () => {}, ...otherProps }) => {
//   const { errors, setFieldValue, touched, values } = useFormikContext();

//   // Check if the context is available
//   if (!setFieldValue) {
//     console.error("FormPicker must be used within a Formik component");
//     return null;
//   }

//   return (
//     <>
//       <Picker
//         selectedValue={values[name] || ''}
//         onValueChange={(itemValue) => {
//           setFieldValue(name, itemValue);
//           onGeTValue(itemValue);
//         }}
//         {...otherProps}
//       >
//        <Picker.Item label={textInputPlaceholder} value="" />
//         {Array.isArray(data) && data.length > 0 && data.map((item) => (
//           <Picker.Item key={item.value} label={item.label} value={item.value} />
//         ))}
//       </Picker>
//       <ErrorMessage error={errors && errors[name]} visible={touched && touched[name]} />
//     </>
//   );
// };

// export default FormPicker;


// import React from "react";
// import { useFormikContext } from "formik";
// import { Dropdown } from "sharingan-rn-modal-dropdown";
// import ErrorMessage from "./ErrorMessage";
// import { Picker } from '@react-native-picker/picker';

// const FormPicker = ({ data, name, textInputPlaceholder, enableAvatar,style, onGeTValue = () => {}, ...otherProps }) => {
//   const { errors, handleChange, setFieldValue, touched, values } = useFormikContext();

//   return (
//     <>
//       <Picker
//                 items={items}
//                 numberOfColumns={numberOfColumns}
//                 icon={icon}
//                 onItemSelect={(item) => setFieldValue(name, item)}
//                 placeholder={placeholder}
//                 PickerItemComponent={PickerItemComponent}
//                 selectedItem={values[name]}
//                 width={width}
//                 {...otherProps}
//             />

//       {/* <Dropdown
//         //textInputPlaceholder="Select current treatment"
//         textInputPlaceholder={textInputPlaceholder}
//         data={data}
//         value={ values[name] }
//         //onChange={handleChange(name)}
//         onChange={ value => {
//           setFieldValue(name, value)
//           onGeTValue(value)
//         }}
//         avatarSize={35}
//         //mode="flat"
//         // activityIndicatorColor={'black'}
//         textInputStyle={style}
//         enableAvatar={enableAvatar}
//         {...otherProps}
//       /> */}
//       <ErrorMessage error={errors[name]} visible={touched[name]} />
//     </>
//   );
// };

// export default FormPicker;
