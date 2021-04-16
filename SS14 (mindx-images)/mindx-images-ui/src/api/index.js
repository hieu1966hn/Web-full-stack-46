import axios from 'axios';

const customAxios = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL
});

// đính kèm token vào mỗi request lên server
// trước khi chạy request lên server => chạy qua cái hàm này trước
// nếu token trong localstorage => gán vào headers
customAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
}, function (err) {
  return Promise.reject(err);
});

// custom axios để đata trả về nằm ở chính ở response => ko cần phải gọi response.data
// customAxios.interceptors.response.use
export default customAxios;