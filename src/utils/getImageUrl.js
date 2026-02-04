const IMAGE_BASE_URL = process.env.REACT_APP_IMAGE_BASE_URL;

export const getImageUrl = (url) => {
  if (!url) return "";

  // agar already full URL hai (Cloudinary etc.)
  if (url.startsWith("http")) {
    return url;
  }

  // relative path → server url add
  return `${IMAGE_BASE_URL}${url}`;
};
