export const FileStackConfig = {
  maxFiles: 5,
  maxSize: 10 * 1024 * 1024,
  fromSources: [
    "local_file_system",
    "url",
    "imagesearch",
    "facebook",
    "instagram",
    "googledrive",
    "dropbox",
    "onedrive",
    "unsplash",
  ],
  accept: ["image/jpeg", "image/png", "image/jpg"],
  transformations: {
    crop: {
      aspectRatio: 4 / 3,
    },
  },
};
