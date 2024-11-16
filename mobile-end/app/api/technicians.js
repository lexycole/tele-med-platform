// import api from "./client";

// const endpoint = "/technicians";

// export const getTechnicians = () => api.get(endpoint);

// export const getTechnician = (id) => api.get(endpoint + `/${id}`);

// const saveTechnician = (data) => {
//   const formData = new FormData();
//   const body = { ...data };
//   const image = "" + body?.imageSrc;
//   if (!image.startsWith("data:image")) {
//     delete body.imageSrc;
//     formData.append("imageSrc", {
//       name: "avatar_" + new Date(),
//       type: "image/jpeg",
//       uri: data.imageSrc,
//     });
//   }

//   //update
//   if (data._id) {
//     delete body._id;
//     for (let key in body) {
//       formData.append(key, body[key]);
//     }
//     return updateTechnician(data._id, data);
//   }

//   for (let key in body) {
//     formData.append(key, body[key]);
//   }
//   return addTechnician(formData);
// };

// const addTechnician = (data) => api.post(endpoint, data);

// const updateTechnician = (id, data) => api.put(`${endpoint}/${id}`, data);

// export const deleteTechnician = (id) => api.delete(`${endpoint}/${id}`);

// export default {
//   addTechnician,
//   saveTechnician,
// };
