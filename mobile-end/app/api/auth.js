// import authStorage from '../auth/storage';

// const login = async (username,password) => {
//     try {
//         const response = await client.post('/auth', { username,password });
//         if (response.ok) {
//             await authStorage.saveToken(response.data.token);
//             console.log('Login successful, token saved');
//             return true;
//         } else {
//             console.log('Login failed:', response.problem);
//             return false;
//         }
//     } catch (error) {
//         console.log('Login error:', error);
//         return false;
//     }
// };

// export default login;