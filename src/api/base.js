export const handleResponse = async (response) => {
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message);
  }
  return await response.json();
};
