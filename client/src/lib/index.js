import { Axios } from "../config";

export const uploadPhotoFiles = async (body) => {
  try {
    const {
      data: { message, error, data },
    } = await Axios.post("uploadFiles", body);
    return { message, error, data };
  } catch (error) {
    return { error: true, message: error.message, data: [] };
  }
};
export const getPhotoFiles = async () => {
  try {
    const {
      data: { message, error, data },
    } = await Axios.get("getFiles");
    return { message, error, data };
  } catch (error) {
    return { error: true, message: error.message, data: [] };
  }
};

export const sendNewsletter = async (payload) => {
  try {
    const {
      data: { message, error, data },
    } = await Axios.post("sendNewsletter", payload);
    return { message, error, data };
  } catch (error) {
    return { error: true, message: error.message, data: [] };
  }
};
export const getImageDimensions = (file) => {
  const url = window.URL.createObjectURL(file);
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      //URL.revokeObjectURL(img.src)
      resolve({
        width: img.width,
        height: img.height,
        url,
        file,
      });
    };
    img.onerror = (error) => reject(error);
    img.src = url;
  });
};

export const validateEmail = (email) => {
  // eslint-disable-next-line
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};
