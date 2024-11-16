import React from 'react';
import { useFormikContext } from "formik";
import ErrorMessage from './ErrorMessage';
import ImageInput from '../ImageInput';

function FormSingleImagePicker({ name, readOnly = false, value, onChangeImage }) {
    const { errors, touched, values } = useFormikContext();
  
    // Safely access the imageUri
    const imageUri = readOnly ? value : (values && values[name] ? values[name] : null);
    // console.log(`Image URI for ${name}:`, imageUri);
  
    return (
      <>
        <ImageInput 
          imageUri={imageUri}
          onChangeImage={(uri) => {
            // console.log(`New image URI for ${name}:`, uri);
            onChangeImage(name, uri);
          }}
        />
        <ErrorMessage error={errors && errors[name]} visible={touched && touched[name]} />
      </>
    );
  }

export default FormSingleImagePicker;


// import React from 'react';
// import { useFormikContext } from "formik";

// import ErrorMessage from './ErrorMessage';
// import ImageInput from '../ImageInput';

// function FormSingleImagePicker({name ,readOnly = false, value}) {
//     const { errors, setFieldValue, touched, values } = useFormikContext();

//     const imageUri = readOnly ? value : values[name];
//     const onChangeImage = uri => {
//         setFieldValue(name,uri);
//       }
  

//     return (
//         <>
  
//         <ImageInput 
//              imageUri={imageUri}
//              onChangeImage={onChangeImage}
//         />
//        <ErrorMessage error={errors[name]} visible={touched[name]} />
//        </>
//     );
// }

// export default FormSingleImagePicker;