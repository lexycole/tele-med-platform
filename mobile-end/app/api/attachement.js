// import api from "./client";

// const endpoint = "/attachments";

// export const uploadFile = (file, id) => {
//   const formData = new FormData();
//   formData.append("type", "ticket");
//   formData.append("attachments", {
//     name:  file?.width ? file.uri.substring(file.uri.lastIndexOf("/") + 1) : file.name,
//     type: file?.mimeType || "image/jpeg",
//     uri: file.uri,
//   });
//   return api.put(endpoint + `/${id}` ,  formData);
// };

// export const createNewFolder = (folder, path) => {
//   const raw = { folder, path };
//   return api.post(endpoint + "/createfolder", JSON.stringify(raw));
// };

// export const renameFile = (newName, path) => {
//   const raw = { path, newname: newName };
//   return api.post(endpoint + "/rename", raw);
// };

// export const copy = (file, path) => {
//   const raw = {};
//   formData.append("newname", newName);
//   return api.post(endpoint + "/copy", formData);
// };

// export const folderTree = () => {
//   return api.post(endpoint + "/foldertree", {});
// };

// export const getFiles = (path) => {
//     const file = path.replace('/api' ,'') 
//   return api.get(file);
// };

// export const uploads = (path) => {
//   const formData = new FormData();
//   formData.append("path", path);
//   return api.post(endpoint + "/uploads", formData);
// };
// export const download = (path) => {
//   return api.post(endpoint + "/download", formData);
// };
// export const deleteItems = (items) => {
//   return api.post(endpoint + "/delete", {items});
// };