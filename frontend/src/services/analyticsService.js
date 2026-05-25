import client from "../api/client";

export async function createAnalyticsEvent(
  data
) {

  const response = await client.post(
    "/analytics/event",
    data
  );

  return response.data;
}