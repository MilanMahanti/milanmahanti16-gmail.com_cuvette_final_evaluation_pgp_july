import customFetch from "../utils/customFetch";

export async function getCurrUser() {
  const { data } = await customFetch("/user/current-user");
  return data;
}
