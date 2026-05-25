import client from "../api/client";

export async function verifyCustomer(phone) {

  const response = await client.post(
    `/complaints/login?phone_number=${phone}`
  );

  return response.data;
}

export async function createComplaint(
  projectId,
  data
) {

  const response = await client.post(
    `/complaints/${projectId}`,
    data
  );

  return response.data;
}