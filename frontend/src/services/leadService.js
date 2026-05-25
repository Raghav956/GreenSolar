import client from "../api/client";

export async function createLead(data) {

  const response = await client.post(
    "/leads/",
    data
  );

  return response.data;
}