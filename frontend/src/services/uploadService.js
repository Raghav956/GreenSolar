import client from "../api/client";

export async function uploadImage(file) {

  const formData = new FormData();

  formData.append("file", file);

  const response = await client.post(
    "/upload/image",
    formData
  );

  return response.data;
}

export async function uploadVideo(file) {

  const formData = new FormData();

  formData.append("file", file);

  const response = await client.post(
    "/upload/video",
    formData
  );

  return response.data;
}