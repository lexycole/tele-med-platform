// import api from "./client";

// const endpoint = "/beautysalonsolo";

// export const getBeautySalons = () => api.get(endpoint);

// export const getBeautySalon = (id) => api.get(`${endpoint}/${id}`);

// export const getBeautySalonUser = (id) => api.get(`${endpoint}/user/${id}`);

// export const updateBeautySalonUser = (id,data) => {
//   const formData = new FormData();
//   formData.append("workingHours", JSON.stringify(data));
//   return  api.patch(`${endpoint}/${id}`, formData)
// };

// export const postBeautySalon = (data) => api.post(endpoint, data);

// export const updateBeautySalon = (id, data) => api.patch(`${endpoint}/${id}`, data);

// export const deleteBeautySalon = (id) => api.delete(`${endpoint}/${id}`);

// const addBeautySalon = (data) => api.post(endpoint, data);

// const saveBeautySalon = (data) => {
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
//     return updateBeautySalon(data._id, formData);
//   }

//   for (let key in body) {
//     formData.append(key, body[key]);
//   }
//   return addBeautySalon(formData);
// };

// export default {
//   addBeautySalon,
//   saveBeautySalon,
// };
