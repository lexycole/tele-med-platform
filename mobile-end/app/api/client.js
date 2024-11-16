// import { create } from 'apisauce';

// const apiClient = create({
//   baseURL: 'http://localhost:8080/api',
// });

// //access protected apis
// apiClient.addAsyncRequestTransform(async(request)=>{

// const authToken = await authStorage.getToken();

// if(!authToken) return;
//   request.headers["x-auth-token"] = authToken;
// });


// // import { create } from 'apisauce';
// // import authStorage from '../auth/storage';

// // //import cache from "./../utils/cache";
// // // define the api
// // const apiClient = create({
// //     baseURL: 'https://telemed-referral-main-dc7214c.d2.zuplo.dev/v1/api'
// //   });

// // console.log('API client created with base URL:', apiClient.getBaseURL());

// // //access protected apis
// // apiClient.addAsyncRequestTransform(async(request)=>{
// // console.log('Transforming request:', request.url);
  
// // const authToken = await authStorage.getToken();
// // console.log('Retrieved auth token:', authToken ? 'Token exists' : 'No token');
  
// // if(!authToken) return;

// // console.log('Added x-auth-token to headers');
  
// // request.headers["x-auth-token"] = authToken;
// // request.headers["zuplo-api-key"] = "";

// // console.log('Added zuplo-api-key to headers');
  
// // console.log('Final request headers:', request.headers);

// // });
// // console.log('API client setup complete');

// // //cache
// // // const get = apiClient.get;
// // // apiClient.get = async(url,params,axiosConfig)=>{
// // //   const response = await get(url,params,axiosConfig);
// // //   if (response.ok) {
// // //     cache.store(url, response.data);
// // //     return response;
// // //   }

// // //   const data = await cache.get(url);
// // //   return data ? { ok: true, data } : response;

// // // }
// // export default apiClient;