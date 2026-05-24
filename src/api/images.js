import api from './axios';

export const listImages = (page = 1, limit = 12) =>
  api.get('/images/', { params: { page, limit } });

export const uploadImage = (file, onProgress) => {
  const formData = new FormData();
  formData.append('image', file);
  return api.post('/images/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress: onProgress,
  });
};

export const transformImage = (id, transformations) =>
  api.post(`/images/transform/${id}`, { transformations });

export const downloadImage = (id) =>
  api.get(`/images/download/${id}`, { responseType: 'blob' });

export const deleteImage = (id) => api.delete(`/images/${id}`);
