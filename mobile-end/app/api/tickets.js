// import api from "./client";

// const endpoint = "/tickets";

// export const getTickets = () => api.get(endpoint);
// export const getTicket = (id) => api.get(`${endpoint}/${id}`);
// export const deleteTicket = (id) => api.delete(`${endpoint}/${id}`);

// export const deleteTicketAttachment = (attachmentId, path) => {
//   return api.delete(`attachments/${attachmentId}/ticket/${path}`);
// }

// export const saveTicket = (ticket) => {
//   const body = { ...ticket };
//   const { _id, ...data } = body;
//   if (body._id) {
//     // delete body._id; deleteTicketAttachment(item._id, item.filePath)
//     return api.put(`${endpoint}/${body._id}`, {
//       ...data,
//       participants: JSON.stringify(body.participants),
//       deadline: JSON.stringify(body.deadline),
//     });
//   }
//   return api.post(endpoint, {
//     ...body,
//     participants: JSON.stringify(body.participants),
//     deadline: JSON.stringify(body.deadline),
//   });
// };
