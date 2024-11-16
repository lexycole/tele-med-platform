// import api from "./client";

// const endpoint = "/leavereasons";

// export const getLeaveReasons = () => api.get(endpoint);

// //export const getPatient = (id) => api.get(endpoint + `/${id}`);
// export const getLeaveReason = (id) => api.get(endpoint + "/" + id);
// //export const getProduct = (id) => api.get(endpoint + `/${id}`);
// //export const getservice = (id) => api.get(endpoint + `/${id}`);

// const addLeaveReason = (leavereason) => {
//   const formData = new FormData();

//   const body = { ...leavereason };
//   delete body.imageSrc;
//   for (let key in body) {
//     formData.append(key, body[key]);
//   }
//   formData.append('imageSrc', {
//     name: 'avatar_' + new Date(),
//     type: "image/jpeg",
//     uri: leavereason.imageSrc,
//   });
//   return api.post(endpoint, formData);
// };
// export default {
//   getLeaveReasons,
//   addLeaveReason,
// };
