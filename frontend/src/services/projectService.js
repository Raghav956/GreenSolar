import client from "../api/client";

export async function getProjects() {

  const response = await client.get("/projects/");

  return response.data;
}

export async function createProject(data) {

  const response = await client.post(
    "/projects/",
    data
  );

  return response.data;
}