import client from "../api/client";

export async function loginAdmin(data) {

  const response = await client.post(
    "/auth/login",
    data
  );

  return response.data;
}