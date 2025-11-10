// Library Imports
import { createAsyncThunk } from '@reduxjs/toolkit';
import { endPoints } from '../../constant';
import axiosInstance from '../../http';
import { compressBase64Image } from '../../../utils/compressBase64';

// Login User API Fn
export const getYearsAPIFn = createAsyncThunk(
  'studio/getYears',
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(endPoints.getYears, {
        ...values
      });
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.error?.message);
    }
  }
);


export const getMakesAPIFn = createAsyncThunk(
  'studio/getMakes',
  async (year, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`${endPoints.getMakes}?year=${year}`);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.error?.message || 'Failed to fetch makes');
    }
  }
);



export const getModelsAPIFn = createAsyncThunk(
  'studio/getModels',
  async ({ year, make }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(`${endPoints.getModels}?year=${year}&make=${encodeURIComponent(make)}`);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.error?.message || 'Failed to fetch models');
    }
  }
);

export const generateCarImageAPIFn = createAsyncThunk(
  'studio/generateCarImage',
  async (values, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(endPoints.generateCarImage, values);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data || 'Image generation failed');
    }
  }
);

// Create user post API (upload images)
export const createUserPostAPIFn = createAsyncThunk(
  'studio/createUserPost',
  async ({ title, description, selectedImages, onProgress }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);

      for (const [idx, imgBase64] of selectedImages.entries()) {
        const smallBase64 = await compressBase64Image(imgBase64, 1280, 0.7);
        const byteString = atob(smallBase64.split(',')[1]);
        const mimeString = smallBase64.split(',')[0].match(/:(.*?);/)[1];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);
        const blob = new Blob([ab], { type: mimeString });
        const file = new File([blob], `image_${idx}.jpg`, { type: mimeString });
        formData.append('images', file);
      }

      const { data } = await axiosInstance.post(
        endPoints.createUserPost,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          onUploadProgress: (progressEvent) => {
            if (onProgress) {
              const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
              onProgress(percent);
            }
          },
        }
      );

      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data || 'Failed to create post');
    }
  }
);



export const getPublicPostAPIFn = createAsyncThunk(
  "studio/getPublicPost",
  async (publicId, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(
        `${endPoints.getPublicPost}/${publicId}`
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to fetch public post"
      );
    }
  }
);
