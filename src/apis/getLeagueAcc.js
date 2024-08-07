// Function to get all league accounts
export default async function getLeagueAcc() {
  try {
    const response = await fetch("./data.json"); //in the tutorial code we

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Data fetched successfully:", data);
    return data;
  } catch (error) {
    console.error("Error fetching league accounts:", error.message);
    // You can choose to rethrow the error or return a default value
    // throw error;
    return []; // Return an empty array as a fallback
  }
}
