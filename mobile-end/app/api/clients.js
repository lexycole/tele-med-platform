// import api from "./client";

// const endpoint = "/clients";

// export const getClients = () => api.get(endpoint);

// export const getClient = (id) => api.get(endpoint + `/${id}`);
// export const getClientByUser = (id) => api.get(`${endpoint}/user/${id}`);

// const saveClient = (data) => {
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
//     return updateClient(data._id, formData);
//   }

//   for (let key in body) {
//     formData.append(key, body[key]);
//   }
//   return addClient(formData);
// };

// const addClient = (data) => api.post(endpoint, data);

// const updateClient = (id, data) => api.patch(`${endpoint}/${id}`, data);

// export const deleteClient = (id) => api.delete(`${endpoint}/${id}`);

// export default {
//   addClient,
//   saveClient,
//   getClientByUser,
// };
